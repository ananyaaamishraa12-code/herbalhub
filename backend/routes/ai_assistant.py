"""
HerbalHub AI Health Assistant
------------------------------
SAFETY RULES (must not be violated):
  - Never diagnoses a disease or medical condition.
  - Never prescribes or names a specific medicine/dosage for a symptom.
  - Always recommends consulting a doctor or pharmacist for anything beyond
    general wellness information.
  - Can help with: general wellness info, product search help, order help,
    and store information (hours, delivery, location).
This is a rule-based assistant (no external LLM call) so behaviour is fully
predictable and auditable. Swap `generate_reply` for an LLM call later if
desired, but keep the same safety guardrails in the system instructions.
"""

from flask import Blueprint, request, jsonify
from utils.db import products_col

ai_bp = Blueprint("ai_assistant", __name__)

DISCLAIMER = ("This is general wellness information only, not a diagnosis or "
              "prescription. For anything beyond general guidance, please "
              "consult a doctor or our in-store pharmacist.")

WELLNESS_TOPICS = {
    "cold": "Staying hydrated, resting well, and warm fluids like ginger or "
            "tulsi tea are commonly used to feel more comfortable during a "
            "common cold. Our Fever & Cold category has supportive products "
            "like balms, syrups, and steam inhalers.",
    "immunity": "A balanced diet, regular sleep, light exercise, and "
                "immunity-supporting supplements (like Chyawanprash or "
                "Vitamin C) are commonly used to support general wellness. "
                "Check our Health Supplements category.",
    "digestion": "Eating on time, staying hydrated, and avoiding very oily "
                 "food are commonly suggested for everyday digestive "
                 "comfort. Browse our Digestive Care category for relevant "
                 "products.",
    "skin": "Gentle cleansing, moisturizing, and sun protection are general "
            "skincare habits. Our Creams & Tubes and Personal Care "
            "categories have a range of options.",
    "stress": "Light physical activity, breathing exercises, and adequate "
              "sleep are commonly recommended for everyday stress relief. "
              "For ongoing stress or anxiety, please speak with a "
              "healthcare professional.",
    "baby": "Always check product labels for age suitability with baby "
            "care items, and consult a pediatrician for anything related "
            "to an infant's health.",
}


def find_relevant_products(text):
    words = [w for w in text.lower().split() if len(w) > 3]
    if not words:
        return []
    regex_or = [{"name": {"$regex": w, "$options": "i"}} for w in words]
    regex_or += [{"tags": {"$regex": w, "$options": "i"}} for w in words]
    cursor = products_col.find({"$or": regex_or}).limit(4)
    results = []
    for p in cursor:
        results.append({
            "id": str(p["_id"]),
            "name": p["name"],
            "brand": p.get("brand", ""),
            "price": p.get("price", 0),
            "image": p.get("image", ""),
        })
    return results


def generate_reply(message: str):
    text = message.lower()

    danger_words = ["chest pain", "can't breathe", "cannot breathe", "suicide",
                     "overdose", "bleeding heavily", "unconscious", "severe pain"]
    if any(w in text for w in danger_words):
        return {
            "reply": "This sounds like it could be a medical emergency. "
                     "Please call your local emergency number or go to the "
                     "nearest hospital immediately. I'm not able to help "
                     "with emergencies, but please seek urgent in-person "
                     "medical care right away.",
            "products": [],
            "type": "emergency",
        }

    if any(w in text for w in ["order", "track", "delivery status", "where is my"]):
        return {
            "reply": "I can help with that! You can check live order status "
                     "and tracking on the 'My Orders' page. If you'd like, "
                     "tell me your order number and I'll point you in the "
                     "right direction, or our support team is happy to "
                     "help over WhatsApp.",
            "products": [],
            "type": "order_help",
        }

    if any(w in text for w in ["hour", "open", "timing", "location", "address",
                                "where are you"]):
        return {
            "reply": "HerbalHub is located in Sonia Vihar, Delhi, and we "
                     "offer home delivery across nearby areas. You can reach "
                     "us anytime on WhatsApp for store timings and order "
                     "support.",
            "products": [],
            "type": "store_info",
        }

    for topic, info in WELLNESS_TOPICS.items():
        if topic in text:
            return {
                "reply": f"{info}\n\n{DISCLAIMER}",
                "products": find_relevant_products(topic),
                "type": "wellness",
            }

    diagnostic_phrases = ["do i have", "what disease", "diagnose", "what medicine should i take",
                           "which medicine", "prescribe", "what dosage"]
    if any(p in text for p in diagnostic_phrases):
        return {
            "reply": "I'm not able to diagnose conditions or recommend "
                     "specific medicines or dosages — that needs a "
                     "qualified doctor or pharmacist who can look at your "
                     "full health picture. I can share general wellness "
                     "information, or help you find relevant product "
                     "categories. Would that help?",
            "products": [],
            "type": "guardrail",
        }

    products = find_relevant_products(text)
    if products:
        return {
            "reply": "Here are some products that might be relevant to what "
                     f"you're looking for. {DISCLAIMER}",
            "products": products,
            "type": "product_search",
        }

    return {
        "reply": "I'm your HerbalHub wellness assistant. I can share general "
                  "health information, help you find products, or assist "
                  "with order questions. For diagnosis or medicine "
                  "recommendations, please consult a doctor or our "
                  "pharmacist. What would you like help with today?",
        "products": [],
        "type": "general",
    }


@ai_bp.route("/api/ai/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = (data or {}).get("message", "").strip()
    if not message:
        return jsonify({"error": "Message is required"}), 400
    result = generate_reply(message)
    return jsonify(result)
