from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from datetime import datetime
import numpy as np

try:
    from flask_pymongo import PyMongo
    mongo_available = True
except ImportError:
    mongo_available = False
    print("Warning: flask_pymongo not installed. Database features disabled.")

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

# --- LOAD YOUR ACTUAL ML MODEL & VECTORIZER ---
# We load these outside the route so they only load once when the server starts
try:
    model = joblib.load('fraud_detection_model.pkl')  
    vectorizer = joblib.load('tfidf_vectorizer.pkl')  
    print("AI Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}. Make sure your .pkl files are in the folder.")

@app.route('/')
def home():
    return "Backend is running and AI is ready!"

@app.route('/predict', methods=['POST'])
def predict_fraud():
    data = request.json
    
    # Extract data from frontend
    company = data.get('company', '')
    description = data.get('description', '')
    stipend = data.get('stipend', '')
    url = data.get('url', '')

    # --- REAL ML LOGIC START ---
    
    # 1. Combine the text exactly like we did in the Jupyter Notebook EDA
    combined_text = f"{company} {description} {stipend}".strip()
    
    # 2. Convert the text into numbers using your saved vectorizer
    # We put combined_text inside a list [ ] because the model expects a 2D array
    vectorized_text = vectorizer.transform([combined_text])
    
    # 3. Predict (Returns 0 for Genuine, 1 for Fraudulent)
    # Using .toarray() prevents the XGBoost warning we discussed earlier!
    prediction_array = model.predict(vectorized_text.toarray())
    prediction_result = int(prediction_array[0])
    
    # 4. Get the Probability (Confidence Score) for the "Risk Score"
    probabilities = model.predict_proba(vectorized_text.toarray())
    # THE FIX: Wrap the math in float() to convert it from NumPy to standard Python
    fraud_probability = float(round(probabilities[0][1] * 100, 2))
    
    # 5. Set the final variables for the frontend
    if prediction_result == 1:
        prediction = "Fraudulent"
        risk_score = fraud_probability
        reason = "Our AI flagged this internship based on linguistic patterns typical of employment scams."
    else:
        prediction = "Genuine"
        risk_score = fraud_probability
        reason = "No immediate red flags detected by the AI. Always remain cautious."

    # --- REAL ML LOGIC END ---

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