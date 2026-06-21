from flask import Blueprint, request, jsonify
from bson import ObjectId
import datetime
from utils.db import users_col
from utils.auth_utils import hash_password, check_password, generate_token, token_required
from config import Config

auth_bp = Blueprint("auth", __name__)


def serialize_user(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user.get("phone", ""),
        "role": user.get("role", "customer"),
        "addresses": user.get("addresses", []),
    }


@auth_bp.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    required = ["name", "email", "password", "phone"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"Missing field: {field}"}), 400

    if users_col.find_one({"email": data["email"].lower()}):
        return jsonify({"error": "An account with this email already exists"}), 409

    role = "customer"
    if data.get("admin_key") and data.get("admin_key") == Config.ADMIN_SIGNUP_KEY:
        role = "admin"

    user_doc = {
        "name": data["name"],
        "email": data["email"].lower(),
        "phone": data["phone"],
        "password_hash": hash_password(data["password"]),
        "role": role,
        "addresses": [],
        "created_at": datetime.datetime.utcnow(),
    }
    result = users_col.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    token = generate_token(str(result.inserted_id), role)
    return jsonify({"token": token, "user": serialize_user(user_doc)}), 201


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = (data.get("email") or "").lower()
    password = data.get("password") or ""

    user = users_col.find_one({"email": email})
    if not user or not check_password(password, user["password_hash"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_token(str(user["_id"]), user.get("role", "customer"))
    return jsonify({"token": token, "user": serialize_user(user)})


@auth_bp.route("/api/auth/me", methods=["GET"])
@token_required
def me():
    from flask import request as req
    user = users_col.find_one({"_id": ObjectId(req.user["user_id"])})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(serialize_user(user))


@auth_bp.route("/api/auth/address", methods=["POST"])
@token_required
def add_address():
    data = request.get_json()
    users_col.update_one(
        {"_id": ObjectId(request.user["user_id"])},
        {"$push": {"addresses": data}},
    )
    return jsonify({"message": "Address saved"})
