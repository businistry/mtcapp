# Back-end code (app.py)
from flask import Flask, request, jsonify

# Create a Flask app
app = Flask(__name__)

# In-memory database (for simplicity)
tasks = []

# Get all tasks
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

# Create a new task
@app.route("/api/tasks", methods=["POST"])
def create_task():
    task = request.get_json()
    task["id"] = len(tasks) + 1
    tasks.append(task)
    return jsonify(task)

# Delete a task
@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    for task in tasks:
        if task["id"] == id:
            tasks.remove(task)
            break
    return jsonify({"success": True})

# Run the app
if __name__ == "__main__":
    app.run()