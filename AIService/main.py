# python src/main.py
from flask import Flask, jsonify
from requests import request
from Services import AIAgentsService
app = Flask(__name__)

@app.route('/')
def index():
    data = AIAgentsService.AutoReply()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)