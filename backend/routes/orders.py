from flask import Blueprint, request, jsonify
from bson import ObjectId
import datetime
from utils.db import orders_col, products_col
from utils.auth_utils import token_required, admin_required

orders_bp = Blueprint("orders", __name__)

DELIVERY_FEE = 30.0
FREE_DELIVERY_THRESHOLD = 499.0

TRACKING_FLOW = ["placed", "confirmed", "packed", "out_for_delivery", "delivered"]


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@orders_bp.route("/api/orders", methods=["POST"])
@token_required
def create_order():
    data = request.get_json()
    items = data.get("items", [])
    if not items:
        return jsonify({"error": "Cart is empty"}), 400

    subtotal = 0.0
    line_items = []
    for item in items:
        product = products_col.find_one({"_id": ObjectId(item["product_id"])})
        if not product:
            continue
        multiplier = item.get("qty_multiplier", 1)
        qty_count = item.get("qty_count", 1)
        line_total = round(product["price"] * multiplier * qty_count, 2)
        subtotal += line_total
        line_items.append({
            "product_id": str(product["_id"]),
            "name": product["name"],
            "image": product.get("image", ""),
            "qty_label": item.get("qty_label", "1 piece"),
            "qty_multiplier": multiplier,
            "qty_count": qty_count,
            "price": product["price"],
            "line_total": line_total,
        })

    delivery_fee = 0.0 if subtotal >= FREE_DELIVERY_THRESHOLD else DELIVERY_FEE
    total = round(subtotal + delivery_fee, 2)

    order_doc = {
        "user_id": request.user["user_id"],
        "items": line_items,
        "subtotal": round(subtotal, 2),
        "delivery_fee": delivery_fee,
        "total": total,
        "address": data.get("address", {}),
        "phone": data.get("phone", ""),
        "delivery_instructions": data.get("delivery_instructions", ""),
        "payment_method": data.get("payment_method", "cod"),
        "payment_status": "pending" if data.get("payment_method") != "cod" else "pending",
        "order_status": "placed",
        "tracking_steps": [
            {"step": "placed", "label": "Order Placed", "done": True,
             "timestamp": datetime.datetime.utcnow().isoformat()}
        ],
        "created_at": datetime.datetime.utcnow(),
    }
    result = orders_col.insert_one(order_doc)
    order_doc["_id"] = result.inserted_id
    return jsonify({"message": "Order placed successfully", "order": serialize(order_doc)}), 201


@orders_bp.route("/api/orders/my", methods=["GET"])
@token_required
def my_orders():
    orders = list(orders_col.find({"user_id": request.user["user_id"]}).sort("created_at", -1))
    return jsonify({"orders": [serialize(o) for o in orders]})


@orders_bp.route("/api/orders/<order_id>", methods=["GET"])
@token_required
def get_order(order_id):
    order = orders_col.find_one({"_id": ObjectId(order_id)})
    if not order:
        return jsonify({"error": "Order not found"}), 404
    if order["user_id"] != request.user["user_id"] and request.user.get("role") != "admin":
        return jsonify({"error": "Not authorized"}), 403
    return jsonify(serialize(order))


# ---- Admin order management ----

@orders_bp.route("/api/admin/orders", methods=["GET"])
@admin_required
def admin_list_orders():
    orders = list(orders_col.find().sort("created_at", -1))
    return jsonify({"orders": [serialize(o) for o in orders]})


@orders_bp.route("/api/admin/orders/<order_id>/status", methods=["PUT"])
@admin_required
def update_order_status(order_id):
    data = request.get_json()
    new_status = data.get("order_status")
    if new_status not in TRACKING_FLOW + ["cancelled"]:
        return jsonify({"error": "Invalid status"}), 400

    order = orders_col.find_one({"_id": ObjectId(order_id)})
    if not order:
        return jsonify({"error": "Order not found"}), 404

    steps = order.get("tracking_steps", [])
    steps.append({
        "step": new_status,
        "label": new_status.replace("_", " ").title(),
        "done": True,
        "timestamp": datetime.datetime.utcnow().isoformat(),
    })

    orders_col.update_one(
        {"_id": ObjectId(order_id)},
        {"$set": {"order_status": new_status, "tracking_steps": steps}},
    )
    return jsonify({"message": "Order status updated"})
