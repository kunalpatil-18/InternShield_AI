from flask import Flask, request, jsonify
from flask_cors import CORS
# Only import PyMongo if you installed it
try:
    from flask_pymongo import PyMongo
    mongo_available = True
except ImportError:
    mongo_available = False
    print("Warning: flask_pymongo not installed. Database features disabled.")

import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/internshield_db"

if mongo_available:
    try:
        mongo = PyMongo(app)
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        mongo_available = False

@app.route('/predict', methods=['POST'])
def predict_fraud():
    data = request.json
    
    # ... (Your existing variable extraction code) ...
    company = data.get('company', '')
    description = data.get('description', '')
    stipend = data.get('stipend', '')
    url = data.get('url', '')

    # ... (Your existing ML logic) ...
    risk_score = random.randint(1, 100)
    prediction = "Genuine"
    
    if "pay" in description.lower() and "fee" in description.lower():
        prediction = "Fraudulent"
        risk_score = 95
        reason = "Asking for registration fees is a scam pattern."
    else:
        reason = "No immediate red flags detected."

    # --- SAFE DATABASE SAVE ---
    if mongo_available:
        try:
            scan_record = {
                "company": company,
                "url": url,
                "prediction": prediction,
                "risk_score": risk_score,
                "reason": reason,
                "timestamp": datetime.utcnow()
            }
            # This line will AUTO-CREATE the database if it doesn't exist
            mongo.db.scans.insert_one(scan_record)
            print("Saved to MongoDB successfully!")
        except Exception as e:
            print(f"Could not save to DB: {e}")

    return jsonify({
        "status": "success",
        "prediction": prediction,
        "risk_score": f"{risk_score}%",
        "reason": reason
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)