from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from datetime import datetime, UTC
import pandas as pd

try:
    from flask_pymongo import PyMongo
    mongo_available = True
except ImportError:
    mongo_available = False
    print("Warning: flask_pymongo not installed. Database features disabled.")

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/internshield_db"

if mongo_available:
    try:
        mongo = PyMongo(app)
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        mongo_available = False

# --- LOAD MODEL & PREPROCESSOR ---
try:
    model = joblib.load('fraud_detection_model.pkl')  
    preprocessor = joblib.load('preprocessor.pkl') 
    print("ML Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/')
def home():
    return "InternShield AI Backend is running perfectly!"

@app.route('/predict', methods=['POST'])
def predict_fraud():
    data = request.json
    
    title = data.get('title', '')
    company = data.get('company', '')
    description = data.get('description', '')
    requirements = data.get('requirements', '')
    stipend = data.get('stipend', '')
    
    # Safely convert the string "true" from the React dropdowns into the integer 1
    has_company_logo = 1 if str(data.get('has_company_logo', '')).lower() == 'true' else 0
    telecommuting = 1 if str(data.get('telecommuting', '')).lower() == 'true' else 0
    has_questions = 1 if str(data.get('has_questions', '')).lower() == 'true' else 0

    combined_text = f"{title} {company} {description} {requirements} {stipend}".strip()
    
    # Create a DataFrame exactly like the Jupyter Notebook expects
    input_df = pd.DataFrame([{
        'combined_text': combined_text,
        'has_company_logo': has_company_logo,
        'telecommuting': telecommuting,
        'has_questions': has_questions
    }])
    
    # Transform using the preprocessor
    vectorized_input = preprocessor.transform(input_df)
    
    # Predict
    prediction_array = model.predict(vectorized_input)
    prediction_result = int(prediction_array[0])
    
    probabilities = model.predict_proba(vectorized_input)
    fraud_probability = float(round(probabilities[0][1] * 100, 2))
    
    if prediction_result == 1:
        prediction = "Fraudulent"
        risk_score = fraud_probability
        reason = "Our ML model flagged this internship based on linguistic patterns and missing credibility indicators."
    else:
        prediction = "Genuine"
        risk_score = fraud_probability
        reason = "No immediate red flags detected by the ML model. Always remain cautious."

    if mongo_available:
        try:
            mongo.db.scans.insert_one({
                "company": company, 
                "title": title, 
                "prediction": prediction,
                "risk_score": risk_score, 
                "reason": reason, 
                "timestamp": datetime.now(UTC) 
            })
        except Exception as e:
            pass

    return jsonify({"status": "success", "prediction": prediction, "risk_score": f"{risk_score}%", "reason": reason})

if __name__ == '__main__':
    app.run(debug=True, port=5000)