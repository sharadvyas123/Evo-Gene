# brain_tumor/utils.py
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model_attention_layer_unet.h5")


try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Brain Tumor DL Model Loaded Successfully.")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")


def analyze_scan(image_file):
    """Process uploaded MRI image, resize, run prediction, return (score, mask_buffer)."""

    # 🧩 Step 1: Load and preprocess image
    img = Image.open(image_file)

    # Convert to grayscale if your model uses 2 channels
    # (Assumption: model trained on 2-channel input — e.g., MRI slices or merged modalities)
    img = img.convert("L")  # convert to single-channel grayscale
    img = img.resize((128, 128))  # match model input size

    # Convert to NumPy array and duplicate channels to make 2 channels
    img_array = np.array(img)
    if len(img_array.shape) == 2:  # (H, W)
        img_array = np.stack([img_array, img_array], axis=-1)  # (H, W, 2)

    # Normalize and add batch dimension
    img_array = img_array / 255.0
    input_tensor = np.expand_dims(img_array, axis=0)  # (1, 128, 128, 2)

    # 🧩 Step 2: Model prediction
    mask_output = model.predict(input_tensor)
    tumor_score = float(np.mean(mask_output))  # Use average activation as "score"

    # 🧩 Step 3: Create fake colored overlay mask
    mask_img = Image.fromarray((mask_output[0, :, :, 0] * 255).astype(np.uint8))
    mask_img = mask_img.resize((256, 256))  # upscale to display nicely

    # Save into BytesIO buffer
    mask_buffer = BytesIO()
    mask_img.save(mask_buffer, format="PNG")
    mask_buffer.seek(0)

    return tumor_score, mask_buffer
