from flask import Blueprint, jsonify
from bson import ObjectId
from utils.db import users_col, orders_col, products_col
from utils.auth_utils import admin_required

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/api/admin/customers", methods=["GET"])
@admin_required
def list_customers():
    customers = list(users_col.find({"role": "customer"}))
    out = []
    for c in customers:
        order_count = orders_col.count_documents({"user_id": str(c["_id"])})
        out.append({
            "id": str(c["_id"]),
            "name": c["name"],
            "email": c["email"],
            "phone": c.get("phone", ""),
            "orders": order_count,
            "joined": c.get("created_at").isoformat() if c.get("created_at") else None,
        })
    return jsonify({"customers": out})


@admin_bp.route("/api/admin/customers/<customer_id>", methods=["DELETE"])
@admin_required
def delete_customer(customer_id):
    users_col.delete_one({"_id": ObjectId(customer_id), "role": "customer"})
    return jsonify({"message": "Customer removed"})


@admin_bp.route("/api/admin/stats", methods=["GET"])
@admin_required
def dashboard_stats():
    total_products = products_col.count_documents({})
    total_orders = orders_col.count_documents({})
    total_customers = users_col.count_documents({"role": "customer"})
    revenue_cursor = orders_col.aggregate([
        {"$match": {"payment_status": {"$ne": "failed"}}},
        {"$group": {"_id": None, "total": {"$sum": "$total"}}}
    ])
    revenue = 0
    for r in revenue_cursor:
        revenue = r.get("total", 0)
    pending_orders = orders_col.count_documents({"order_status": {"$in": ["placed", "confirmed", "packed"]}})

    return jsonify({
        "total_products": total_products,
        "total_orders": total_orders,
        "total_customers": total_customers,
        "total_revenue": round(revenue, 2),
        "pending_orders": pending_orders,
    })
