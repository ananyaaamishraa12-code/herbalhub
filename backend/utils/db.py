from pymongo import MongoClient
from config import Config

_client = MongoClient(Config.MONGO_URI)
db = _client.get_default_database()

products_col = db["products"]
categories_col = db["categories"]
users_col = db["users"]
orders_col = db["orders"]
reviews_col = db["reviews"]
contacts_col = db["contact_messages"]
