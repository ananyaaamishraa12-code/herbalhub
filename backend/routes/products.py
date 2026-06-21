from flask import Blueprint, request, jsonify
from bson import ObjectId
from utils.db import products_col
from utils.auth_utils import admin_required
import datetime

products_bp = Blueprint("products", __name__)


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@products_bp.route("/api/products", methods=["GET"])
def list_products():
    query = {}
    category = request.args.get("category")
    if category:
        query["category"] = category
    featured = request.args.get("featured")
    if featured == "true":
        query["featured"] = True

    search = request.args.get("search")
    if search:
        regex = {"$regex": search, "$options": "i"}
        query["$or"] = [
            {"name": regex},
            {"brand": regex},
            {"category": regex},
            {"tags": regex},
        ]

    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")
    if min_price or max_price:
        price_filter = {}
        if min_price:
            price_filter["$gte"] = float(min_price)
        if max_price:
            price_filter["$lte"] = float(max_price)
        query["price"] = price_filter

    sort_param = request.args.get("sort")
    sort = None
    if sort_param == "price_asc":
        sort = [("price", 1)]
    elif sort_param == "price_desc":
        sort = [("price", -1)]
    elif sort_param == "rating":
        sort = [("rating", -1)]

    cursor = products_col.find(query)
    if sort:
        cursor = cursor.sort(sort)

    products = [serialize(p) for p in cursor]
    return jsonify({"products": products, "count": len(products)})


@products_bp.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    product = products_col.find_one({"_id": ObjectId(product_id)})
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(serialize(product))


@products_bp.route("/api/products", methods=["POST"])
@admin_required
def create_product():
    data = request.get_json()
    required = ["name", "brand", "category", "price"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    data.setdefault("pack_options", [
        {"label": "1 piece", "multiplier": 1},
        {"label": "1 box", "multiplier": 10},
        {"label": "2 boxes", "multiplier": 20},
        {"label": "4 boxes", "multiplier": 40},
    ])
    data.setdefault("stock", 100)
    data.setdefault("rating", 4.5)
    data.setdefault("rating_count", 0)
    data.setdefault("tags", [])
    data.setdefault("featured", False)
    data.setdefault("prescription_required", False)
    data["created_at"] = datetime.datetime.utcnow()

    result = products_col.insert_one(data)
    return jsonify({"message": "Product created", "id": str(result.inserted_id)}), 201


@products_bp.route("/api/products/<product_id>", methods=["PUT"])
@admin_required
def update_product(product_id):
    data = request.get_json()
    data.pop("_id", None)
    result = products_col.update_one({"_id": ObjectId(product_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product updated"})


@products_bp.route("/api/products/<product_id>", methods=["DELETE"])
@admin_required
def delete_product(product_id):
    result = products_col.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product deleted"})
