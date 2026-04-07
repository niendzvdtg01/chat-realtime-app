# python AIService/main.py
from flask import Flask, jsonify, request
from Services.AIAgentsService import AIAgentService
from Services.CalendarAnalyzer import CalendarAgentService

app = Flask(__name__)
ai_agent_service = AIAgentService()
calendar_agent_service = CalendarAgentService()

@app.route('/')
def index():
    return jsonify({
        "service": "AI message suggestion",
        "status": "running"
    })

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

@app.route('/ai/calendar', methods=['POST'])
def ai_calendar():
    payload = request.get_json(silent=True) or {}

    if isinstance(payload, dict):
        message = str(payload.get("message", "")).strip()
    else:
        message = ""

    if not message:
        return jsonify({
            "status": "error",
            "message": "message is required"
        }), 400

    results = calendar_agent_service.run(message)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
