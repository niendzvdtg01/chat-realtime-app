from flask import jsonify
import requests


url = "http://localhost:8080/user/getAllUser"
login_url = "http://localhost:8080/auth/login"
session = requests.Session()

data = {
    "email":"admin55@gmail.com",
    "userpassword":"1234"
}
def AutoReply():
    session.post(login_url, json=data)
    response = session.get(url)
    print(response.status_code)
    return response.json()

AutoReply()
