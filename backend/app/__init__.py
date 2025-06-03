from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Enable CORS for frontend
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    from .routes import kyc_bp
    app.register_blueprint(kyc_bp)

    return app
