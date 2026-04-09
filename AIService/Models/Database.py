from flask import Flask

try:
    from Models.db import db
except ImportError:
    from AIService.Models.db import db

class Database:
    def __init__(self):
        self.app = Flask(__name__)


    def create_app(self):
        self.app.config["SQLALCHEMY_DATABASE_URI"] = ("mysql+pymysql://admin:1234@localhost:3310/chatapp_database")
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)

        return self.app


    
