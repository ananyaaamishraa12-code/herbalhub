"""
HerbalHub data schemas (MongoDB is schema-less; these are reference shapes
used across the app for consistency and documentation).
"""

PRODUCT_SCHEMA = {
    "name": str,
    "brand": str,
    "category": str,           # category slug, e.g. "ayurvedic-medicines"
    "description": str,
    "image": str,               # image URL
    "price": float,             # base price per unit/piece
    "mrp": float,                # optional strike-through price
    "stock": int,
    "unit_label": str,          # e.g. "tablet", "ml", "bottle"
    "pack_options": list,        # e.g. [{"label": "1 piece", "multiplier": 1}, ...]
    "rating": float,
    "rating_count": int,
    "tags": list,
    "featured": bool,
    "prescription_required": bool,
    "created_at": "datetime",
}

CATEGORY_SCHEMA = {
    "name": str,
    "slug": str,
    "icon": str,
    "description": str,
}

USER_SCHEMA = {
    "name": str,
    "email": str,
    "phone": str,
    "password_hash": str,
    "role": str,                # "customer" | "admin"
    "addresses": list,
    "created_at": "datetime",
}

ORDER_SCHEMA = {
    "user_id": str,
    "items": list,               # [{product_id, name, qty_label, qty_multiplier, price, line_total}]
    "subtotal": float,
    "delivery_fee": float,
    "total": float,
    "address": dict,
    "phone": str,
    "delivery_instructions": str,
    "payment_method": str,       # "upi" | "card" | "netbanking" | "cod"
    "payment_status": str,       # "pending" | "paid" | "failed"
    "order_status": str,         # "placed" | "confirmed" | "packed" | "out_for_delivery" | "delivered" | "cancelled"
    "tracking_steps": list,
    "created_at": "datetime",
}
