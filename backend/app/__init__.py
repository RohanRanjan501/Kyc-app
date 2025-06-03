from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Allow all origins, all methods
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    from .routes import kyc_bp
    app.register_blueprint(kyc_bp)

    return app
