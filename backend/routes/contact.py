from flask import Blueprint, request, jsonify
import datetime
from utils.db import contacts_col

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/api/contact", methods=["POST"])
def submit_contact():
    data = request.get_json()
    required = ["name", "email", "message"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"Missing field: {field}"}), 400

    contacts_col.insert_one({
        "name": data["name"],
        "email": data["email"],
        "phone": data.get("phone", ""),
        "message": data["message"],
        "created_at": datetime.datetime.utcnow(),
        "status": "new",
    })
    return jsonify({"message": "Thanks for reaching out! Our team will get back to you shortly."}), 201
