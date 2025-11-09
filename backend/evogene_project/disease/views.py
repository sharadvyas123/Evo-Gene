from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from .models import DiabetesPrediction
from .serializers import DiabetesPredictionSerializer
from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd
import joblib
import numpy as np
import os
import sys
pd.set_option('future.no_silent_downcasting', True)

User = get_user_model()


# 👇 Your custom transformer (exactly as used in training)
class ZeroToMeanImputer(BaseEstimator, TransformerMixin):
    def __init__(self, cols=None):
        self.cols = cols
        self.means = {}

    def fit(self, X, y=None):
        X_df = pd.DataFrame(X, columns=X.columns)
        for col in self.cols:
            self.means[col] = X_df[col].replace(0, np.nan).mean()
        return self

    def transform(self, X):
        X_df = pd.DataFrame(X, columns=X.columns)
        for col in self.cols:
            X_df[col] = X_df[col].replace(0, np.nan).fillna(self.means[col])
        return X_df.values


sys.modules['__main__'].ZeroToMeanImputer = ZeroToMeanImputer


# 🧩 Path to your trained model (.pkl)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'diabetes_lgbm_ct_pipeline.pkl')
print(f"[DEBUG] Looking for model at: {MODEL_PATH}")

# Load model once at startup
try:
    diabetes_model = joblib.load(MODEL_PATH)
    print("[INFO] Diabetes prediction model loaded successfully ✅")
    print(diabetes_model.feature_names_in_)
except Exception as e:
    print(f"[ERROR] Could not load ML model: {e}")
    diabetes_model = None


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def predict_diabetes(request):
    """
    Handle diabetes prediction requests (REST API)
    """
    serializer = DiabetesPredictionSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if not diabetes_model:
        return Response({"error": "ML model not loaded"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        # ✅ Clean + cast incoming data
        data = serializer.validated_data
        feature_names = [
        'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
        'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]

        mean_bp = (float(data['blood_pressure_systolic']) + float(data['blood_pressure_diastolic'])) / 2

    # Wrap in a DataFrame instead of NumPy array
        features = pd.DataFrame([[
            float(data['pregnancies']),
            float(data['glucose']),
            mean_bp,
            float(data['skin_thickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['diabetes_pedigree_function']),
            float(data['age'])
        ]], columns=feature_names)


        # ✅ Model prediction
        prediction = diabetes_model.predict(features)[0]

        # Check if model supports probability output
        if hasattr(diabetes_model, "predict_proba"):
            proba = float(diabetes_model.predict_proba(features)[0][1])
        else:
            proba = float(prediction)

        # ✅ Convert prediction to human-readable
        result = "Diabetic" if prediction == 1 else "Non-Diabetic"

        # ✅ Save record in DB
        diabetes_record = DiabetesPrediction.objects.create(
            user=request.user if request.user.is_authenticated else None,
            glucose=data['glucose'],
            blood_pressure_systolic=data['blood_pressure_systolic'],
            blood_pressure_diastolic=data['blood_pressure_diastolic'],
            skin_thickness=data['skin_thickness'],
            insulin=data['insulin'],
            bmi=data['bmi'],
            age=data['age'],
            pregnancies=data['pregnancies'],
            diabetes_pedigree_function=data['diabetes_pedigree_function'],
            prediction_result=result,
            prediction_probability=proba
        )

        return Response({
            "message": "Prediction successful",
            "result": result,
            "probability": round(proba, 3),
            "record_id": diabetes_record.id
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"[ERROR] Prediction failed: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
