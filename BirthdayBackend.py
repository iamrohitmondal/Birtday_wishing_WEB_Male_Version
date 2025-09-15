# backend code
from flask import Flask, request, jsonify, send_from_directory,session
import json
import os

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = os.urandom(24)
MESSAGES_FILE = os.path.join(os.path.dirname(__file__), 'messages.json') #message storing folder

# Ensure messages.json exists
if not os.path.exists(MESSAGES_FILE):
    with open(MESSAGES_FILE, 'w') as f:
        json.dump([], f)

@app.route('/')
def serve_preview():
    if session.get("visited"):
        return serve_birthday()
    return send_from_directory('.', 'index.html')

@app.route('/birthday.html')
def serve_birthday():
    return send_from_directory('.', 'birthday.html')

@app.route('/clear')
def clear():
 session.clear()
 return "Session cleared"

@app.route('/save-message', methods=['POST'])
def save_message():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({"success": False, "error": "No message provided."})

    with open(MESSAGES_FILE, 'r+') as f:
        try:
            messages = json.load(f)
        except json.JSONDecodeError:
            messages = []

        messages.append({"message": message})
        f.seek(0)
        json.dump(messages, f, indent=2)
        f.truncate()

    return jsonify({"success": True})

application = app
if __name__ == '__main__':
    app.run(debug=True, port=5500)