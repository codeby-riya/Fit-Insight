from flask import Blueprint, request, jsonify
import joblib
import os

diabetes_bp = Blueprint('diabetes', __name__)

# Load model
MODEL_PATH = os.path.join('models', 'diabetes_model.pkl')
model = joblib.load(MODEL_PATH)

# Labels and captions
class_labels = {
    0: "Non-diabetic",
    1: "Pre-diabetic",
    2: "Diabetic"
}

captions = {
    0: "✅ Great! Keep maintaining a healthy lifestyle to stay diabetes-free.",
    1: "⚠️ You are at risk. Monitor sugar intake and consult a doctor for regular checkups.",
    2: "🚨 Diabetic condition detected. Please follow medical advice and treatment strictly."
}

@diabetes_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Convert height to meters from feet + inches
        feet = float(data['HeightFeet'])
        inches = float(data['HeightInches'])
        height_m = ((feet * 12) + inches) * 0.0254

        # Convert weight to float
        weight = float(data['Weight'])

        # Calculate BMI
        bmi = round(weight / (height_m ** 2), 2)

        # Build feature list
        features = [
            int(data['HighBP']),
            int(data['HighChol']),
            int(data['CholCheck']),
            bmi,
            int(data['Smoker']),
            int(data['Stroke']),
            int(data['PhysActivity']),
            int(data['Fruits']),
            int(data['Veggies']),
            int(data['HvyAlcoholConsump']),
            int(data['AnyHealthcare']),
            int(data['GenHlth']),
            int(data['MentHlth']),
            int(data['PhysHlth']),
            int(data['DiffWalk']),
            int(data['Sex']),
            int(data['Age'])
        ]

        probs = model.predict_proba([features])[0]
        pred_class = probs.argmax()
        risk_percent = round(probs[1] * 75 + probs[2] * 100, 2)

        return jsonify({
            'risk': risk_percent,
            'category': class_labels[pred_class],
            'caption': captions[pred_class]
        })

    except Exception as e:
        print("🔴 Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 500
