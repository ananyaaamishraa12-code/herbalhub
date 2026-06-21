from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

from routes.products import products_bp
from routes.categories import categories_bp
from routes.auth import auth_bp
from routes.orders import orders_bp
from routes.ai_assistant import ai_bp
from routes.admin import admin_bp
from routes.contact import contact_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGIN}})

    app.register_blueprint(products_bp)
    app.register_blueprint(categories_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(contact_bp)

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "service": "HerbalHub API"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
