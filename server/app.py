from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from datetime import datetime, UTC
import pandas as pd
from dotenv import load_dotenv
import os
import certifi
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# 1. Load environment variables FIRST
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Configure URI and DB Name
raw_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = "InternShield_DB"

# 3. Connect using MongoClient directly
mongo_client = None
db = None
mongo_available = False

def connect_to_mongo():
    global mongo_client, db, mongo_available

    # --- Attempt 1: Secure connection with certifi ---
    try:
        print(f"📡 Connecting to MongoDB Atlas ({DB_NAME})...")
        client = MongoClient(
            raw_uri,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=10000
        )
        # Actually test the connection
        client[DB_NAME].command("ping")
        mongo_client = client
        db = client[DB_NAME]
        mongo_available = True
        print(f"🛡️ Connected to MongoDB Atlas ({DB_NAME}) successfully!")
        return
    except (ConnectionFailure, ServerSelectionTimeoutError, Exception) as e:
        print(f"❌ Secure connection failed: {e}")

    # --- Attempt 2: Fallback — allow invalid TLS certs (dev only) ---
    try:
        print("⚠️ Attempting fallback connection (tlsAllowInvalidCertificates)...")
        client = MongoClient(
            raw_uri,
            tls=True,
            tlsAllowInvalidCertificates=True,  # ⚠️ Dev only!
            serverSelectionTimeoutMS=10000
        )
        client[DB_NAME].command("ping")
        mongo_client = client
        db = client[DB_NAME]
        mongo_available = True
        print(f"⚠️ Connected with insecure fallback to ({DB_NAME}).")
    except Exception as e:
        print(f"❌ Fallback connection also failed: {e}")
        mongo_available = False

connect_to_mongo()

# 4. Load ML Model & Preprocessor
try:
    model = joblib.load('fraud_detection_model.pkl')
    preprocessor = joblib.load('preprocessor.pkl')
    print("ML Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    preprocessor = None


@app.route('/')
def home():
    return "InternShield AI Backend is running perfectly!"


@app.route('/history', methods=['GET'])
def get_history():
    if not mongo_available or db is None:
        return jsonify({"error": "Database not available"}), 503

    try:
        scans = list(db.scans.find().sort("timestamp", -1).limit(50))
        formatted_scans = []
        for scan in scans:
            formatted_scans.append({
                "id": str(scan["_id"]),
                "title": scan.get("title", "N/A"),
                "company": scan.get("company", "N/A"),
                "prediction": scan.get("prediction", "Unknown"),
                "risk_score": f"{scan.get('risk_score', 0)}%",
                "reason": scan.get("reason", ""),
                "timestamp": scan.get("timestamp")
            })
        return jsonify(formatted_scans)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict_fraud():
    if model is None or preprocessor is None:
        return jsonify({"error": "ML model not loaded"}), 503

    data = request.json
    title = data.get('title', '')
    company = data.get('company', '')
    description = data.get('description', '')
    requirements = data.get('requirements', '')
    stipend = data.get('stipend', '')

    has_company_logo = 1 if str(data.get('has_company_logo', '')).lower() == 'true' else 0
    telecommuting = 1 if str(data.get('telecommuting', '')).lower() == 'true' else 0
    has_questions = 1 if str(data.get('has_questions', '')).lower() == 'true' else 0

    combined_text = f"{title} {company} {description} {requirements} {stipend}".strip()
    input_df = pd.DataFrame([{
        'combined_text': combined_text,
        'has_company_logo': has_company_logo,
        'telecommuting': telecommuting,
        'has_questions': has_questions
    }])

    vectorized_input = preprocessor.transform(input_df)
    probabilities = model.predict_proba(vectorized_input)
    fraud_probability = float(round(probabilities[0][1] * 100, 2))

    if fraud_probability >= 35.0:
        prediction = "Fraudulent"
        reason = "High risk detected! The description contains scam patterns and missing credibility indicators."
    elif fraud_probability >= 15.0:
        prediction = "Suspicious"
        reason = "Moderate risk. This posting lacks professional verification or uses slightly suspicious language."
    else:
        prediction = "Genuine"
        reason = "No immediate red flags detected by the ML model. Always remain cautious."

    if mongo_available and db is not None:
        try:
            db.scans.insert_one({
                "company": company,
                "title": title,
                "prediction": prediction,
                "risk_score": fraud_probability,
                "reason": reason,
                "timestamp": datetime.now(UTC)
            })
        except Exception as e:
            print(f"Failed to save scan: {e}")

    return jsonify({
        "status": "success",
        "prediction": prediction,
        "risk_score": f"{fraud_probability}%",
        "reason": reason
    })

# --- FIXED ROUTE: Using 'db' instead of 'mongo' ---
@app.route('/reports', methods=['GET'])
def get_reports():
    if not mongo_available or db is None:
        return jsonify({"error": "Database not available"}), 503
    try:
        # We use 'db.reports' to match your manual connection setup
        reports = list(db.reports.find().sort("timestamp", -1).limit(5))
        for r in reports:
            r['_id'] = str(r['_id'])
        return jsonify(reports)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ADDED ROUTE: Handle submitting a new report ---
@app.route('/report', methods=['POST'])
def submit_report():
    if not mongo_available or db is None:
        return jsonify({"error": "Database not available"}), 503
    
    data = request.json
    try:
        db.reports.insert_one({
            "scammerName": data.get("scammerName"),
            "platform": data.get("platform"),
            "contact": data.get("contact"),
            "details": data.get("details"),
            "timestamp": datetime.now(UTC)
        })
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)