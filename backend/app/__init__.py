from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Enhanced CORS configuration
    CORS(app, resources={
        r"/*": {
            "origins": "http://localhost:5173",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "max_age": 86400
        }
    })

    # Load configuration
    from .config import AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME
    app.config['AZURE_STORAGE_CONNECTION_STRING'] = AZURE_STORAGE_CONNECTION_STRING
    app.config['AZURE_CONTAINER_NAME'] = AZURE_CONTAINER_NAME

    # Register blueprint
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Add CORS headers to all responses
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
        return response

    return app