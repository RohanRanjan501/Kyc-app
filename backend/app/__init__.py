from flask import Flask
from flask_cors import CORS
from .config import AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME

def create_app():
    app = Flask(__name__)

    # Allow your frontend origin only
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Load config values into app.config
    app.config['AZURE_STORAGE_CONNECTION_STRING'] = AZURE_STORAGE_CONNECTION_STRING
    app.config['AZURE_CONTAINER_NAME'] = AZURE_CONTAINER_NAME

    from .routes import main
    app.register_blueprint(main)

    return app

