import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/herbalhub")
    JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-key")
    JWT_EXPIRY_HOURS = 24 * 7
    ADMIN_SIGNUP_KEY = os.getenv("ADMIN_SIGNUP_KEY", "herbalhub-admin-2024")
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:5173")
