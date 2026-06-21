from flask import Blueprint, request, jsonify
from bson import ObjectId
from utils.db import categories_col
from utils.auth_utils import admin_required

categories_bp = Blueprint("categories", __name__)


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@categories_bp.route("/api/categories", methods=["GET"])
def list_categories():
    categories = [serialize(c) for c in categories_col.find()]
    return jsonify({"categories": categories})


@categories_bp.route("/api/categories", methods=["POST"])
@admin_required
def create_category():
    data = request.get_json()
    if "name" not in data or "slug" not in data:
        return jsonify({"error": "name and slug are required"}), 400
    result = categories_col.insert_one(data)
    return jsonify({"message": "Category created", "id": str(result.inserted_id)}), 201


@categories_bp.route("/api/categories/<category_id>", methods=["PUT"])
@admin_required
def update_category(category_id):
    data = request.get_json()
    data.pop("_id", None)
    categories_col.update_one({"_id": ObjectId(category_id)}, {"$set": data})
    return jsonify({"message": "Category updated"})


@categories_bp.route("/api/categories/<category_id>", methods=["DELETE"])
@admin_required
def delete_category(category_id):
    categories_col.delete_one({"_id": ObjectId(category_id)})
    return jsonify({"message": "Category deleted"})
