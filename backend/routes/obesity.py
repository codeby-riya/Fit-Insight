from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os
from sklearn.preprocessing import OrdinalEncoder

obesity_bp = Blueprint('obesity', __name__)

# Load model
MODEL_PATH = os.path.join('models', 'obesity_model.pkl')
model = joblib.load(MODEL_PATH)

# Class labels (must match training order)
class_labels = [
    'Insufficient_Weight',
    'Normal_Weight',
    'Overweight_Level_I',
    'Overweight_Level_II',
    'Obesity_Type_I',
    'Obesity_Type_II',
    'Obesity_Type_III'
]

# Risk mapping
risk_map = {
    0: 15,
    1: 25,
    2: 50,
    3: 65,
    4: 80,
    5: 90,
    6: 97
}

# Insight message mapping
message_map = {
    'Insufficient_Weight': "You're underweight. A nutrient-rich, calorie-positive diet can help gain healthy weight.",
    'Normal_Weight': "You're maintaining a healthy weight. Continue balanced eating and physical activity.",
    'Overweight_Level_I': "You're slightly overweight. Consider regular exercise and portion control.",
    'Overweight_Level_II': "You fall in a moderate overweight range. Healthier habits can reduce future risks.",
    'Obesity_Type_I': "Obesity Type I detected. It's advisable to adopt a structured fitness plan.",
    'Obesity_Type_II': "Obesity Type II detected. Please consult a healthcare professional.",
    'Obesity_Type_III': "Obesity Type III — critical level. Medical supervision is strongly advised."
}

def get_risk_level(risk):
    if risk < 40:
        return "Low"
    elif risk < 70:
        return "Moderate"
    else:
        return "High"

@obesity_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])

        # Fix capitalization for ordinal fields
        df['CAEC'] = df['CAEC'].str.strip().str.lower().str.capitalize()
        df['CALC'] = df['CALC'].str.strip().str.lower().str.capitalize()

        # Ordinal encode CAEC & CALC
        ordinal_map = {
            'CAEC': ['No', 'Sometimes', 'Frequently', 'Always'],
            'CALC': ['No', 'Sometimes', 'Frequently', 'Always']
        }
        for col, categories in ordinal_map.items():
            encoder = OrdinalEncoder(categories=[categories])
            df[col] = encoder.fit_transform(df[[col]])

        # One-hot encode nominal features
        nominal_cols = ['Gender', 'family_history_with_overweight', 'FAVC', 'SMOKE', 'SCC', 'MTRANS']
        df = pd.get_dummies(df, columns=nominal_cols)

        # Add missing columns (not selected in form)
        expected_cols = [
            'Gender_Female', 'Gender_Male',
            'family_history_with_overweight_no', 'family_history_with_overweight_yes',
            'FAVC_no', 'FAVC_yes',
            'SMOKE_no', 'SMOKE_yes',
            'SCC_no', 'SCC_yes',
            'MTRANS_Automobile', 'MTRANS_Bike', 'MTRANS_Motorbike',
            'MTRANS_Public_Transportation', 'MTRANS_Walking'
        ]
        for col in expected_cols:
            if col not in df.columns:
                df[col] = 0

        # Final feature column order
        final_cols = [
            'Age', 'Height', 'Weight', 'FCVC', 'NCP', 'CAEC',
            'CH2O', 'FAF', 'TUE', 'CALC'
        ] + expected_cols
        df = df[final_cols]

        # ✅ Use your logic
        probas = model.predict_proba(df)[0]
        pred_class = probas.argmax()
        category = class_labels[pred_class]
        risk_percent = sum(p * risk_map[i] for i, p in enumerate(probas))
        insight = message_map[category]
        level = get_risk_level(risk_percent)

        return jsonify({
            'category': category,
            'risk': round(risk_percent, 2),
            'level': level,
            'message': insight
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
