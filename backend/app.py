from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Flask Backend is Running"


@app.route("/process", methods=["POST"])
def process_data():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    age = data.get("age")

    print("Received Data:")
    print("Name:", name)
    print("Email:", email)
    print("Age:", age)

    return jsonify({
        "message": "Data processed successfully by Flask",
        "name": name,
        "email": email,
        "age": age
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)