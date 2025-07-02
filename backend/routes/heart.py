from flask import Blueprint, request, jsonify
import joblib
import os

# ✅ Define blueprint first
heart_bp = Blueprint('heart', __name__)

# ✅ Load model
import pickle 
MODEL_PATH = os.path.join('models', 'heart_model.pkl')
model = joblib.load(MODEL_PATH)


@heart_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("🔵 Received data:", data)  # DEBUG

        input_features = [
            int(data['age']),
            int(data['sex']),
            int(data['cp']),
            int(data['trestbps']),
            int(data['chol']),
            int(data['fbs']),
            int(data['restecg']),
            int(data['thalach']),
            int(data['exang']),
            float(data['oldpeak']),
            int(data['slope']),
            int(data['ca']),
            int(data['thal'])
        ]

        print("🟢 Model input:", input_features)  # DEBUG

        risk = model.predict_proba([input_features])[0][1] * 100
        risk = round(risk, 2)
        print("🟡 Predicted risk:", risk)
        if risk < 20:
               caption = "✅ Very Low Risk – Your heart health looks excellent. Maintain regular checkups and a healthy lifestyle!"
        elif risk < 40:
               caption = "🟢 Low Risk – You have a low risk. Continue with your good habits like a balanced diet and exercise!"
        elif risk < 60:
               caption = "⚠️ Moderate Risk – Some signs of risk. Consider periodic health checkups and healthier choices."
        elif risk < 80:
               caption = "🚨 High Risk – You are at significant risk. Please consult a cardiologist and improve your lifestyle."
        else:
               caption = "❗ Very High Risk – Immediate medical attention is advised. Please consult a heart specialist urgently."

  
      
     


        return jsonify({'risk': risk, 'caption': caption})

    except Exception as e:
        print("🔴 Error during prediction:", str(e))  # DEBUG
        return jsonify({'error': str(e)}), 500
