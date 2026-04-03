from flask import jsonify
import requests


class AIAgentService:
    def __init__(self):
        self.url = "http://localhost:8080/user/getAllUser"
        self.login_url = "http://localhost:8080/auth/login"
        self.session = requests.Session()

        self.data = {
            "email":"admin55@gmail.com",
            "userpassword":"1234"
            }
    def AutoReply(self):
        self.session.post(self.login_url, json=self.data)
        response = self.session.get(self.url)
        print(response.status_code)
        return response.json()
