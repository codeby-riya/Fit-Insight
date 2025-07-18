from flask import Flask
from flask_cors import CORS

# Create app
app = Flask(__name__)
CORS(app)

# Import and register blueprints from routes
from routes.heart import heart_bp
from routes.obesity import obesity_bp


# Register routes
app.register_blueprint(heart_bp, url_prefix='/api/heart')
app.register_blueprint(obesity_bp, url_prefix='/api/obesity')


@app.route('/')
def home():
    return "FitInsight API is running!"

# Run
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)

