from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import joblib
import io

app = Flask(__name__)

# Load your trained model (ensure the path matches)
model = joblib.load('path_to_your_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse form data
        data = {
            'smoke': request.form['smoke'],
            'drink': request.form['drink'],
            'background_father': request.form['background_father'],
            'background_mother': request.form['background_mother'],
            'pesticide': request.form['pesticide'],
            'gender': request.form['gender'],
            'skin_cancer_history': request.form['skin_cancer_history'],
            'cancer_history': request.form['cancer_history'],
            'has_piped_water': request.form['has_piped_water'],
            'has_sewage_system': request.form['has_sewage_system'],
            'grew': request.form['grew'],
            'changed': request.form['changed']
        }

        # Convert form data to model input format
        features = np.array([list(data.values())], dtype=float)

        # Check if an image file exists
        if 'image' in request.files:
            image_file = request.files['image']
            image = Image.open(image_file.stream)
            # Example image processing: Convert to grayscale
            image = image.convert('L')
            image = image.resize((64, 64))  # Resize to the expected input size of the model
            image_array = np.asarray(image).flatten()  # Flatten the image to 1D array
            features = np.append(features, image_array)

        # Make prediction
        prediction = model.predict([features])
        return jsonify({'prediction': str(prediction[0])})
        
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)