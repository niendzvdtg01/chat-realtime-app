# python AIService/main.py
from flask import Flask, jsonify, request
from Services.AIAgentsService import AIAgentService

app = Flask(__name__)
ai_agent_service = AIAgentService()

@app.route('/')
def index():
    return jsonify({
        "service": "AI message suggestion",
        "status": "running"
    })

# @app.route('/suggest-messages', methods=['POST'])
# def suggest_messages():
#     payload = request.get_json(silent=True) or {}
#     messages = payload.get("messages", [])
#     tone = payload.get("tone", "friendly")
#     count = payload.get("count", 3)

#     if isinstance(messages, str):
#         messages = [messages]

#     suggestions = ai_agent_service.suggestMessages(messages, tone=tone, count=count)

#     return jsonify({
#         "suggestions": suggestions
#     })

@app.route('/ai/chat', methods=['POST'])
def ai_chat():
    payload = request.get_json(silent=True) or []

    messages = []
    if isinstance(payload, list):
        for item in payload:
            if not isinstance(item, dict):
                continue

            content = str(item.get("content", "")).strip()
            if content:
                messages.append(content)
    elif isinstance(payload, dict):
        content = payload.get("content")
        if isinstance(content, str) and content.strip():
            messages.append(content.strip())

    suggestions = ai_agent_service.suggestMessages(messages, tone="friendly", count=3)

    return jsonify({
        "reply": suggestions
    })

if __name__ == '__main__':
    app.run(debug=True)