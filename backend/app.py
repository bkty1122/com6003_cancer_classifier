from flask import Flask, request, jsonify
import flask_cors
import numpy as np
import io
import tensorflow as tf
from keras.models import load_model
import pickle
import scipy.stats
scipy.stats.poisson



app = Flask(__name__)
flask_cors.CORS(app)  # Enable CORS if needed

# Function to load a Keras model
def load_image_model():
    return load_model('backend/VGG16Model2.h5')

# Function to load a pickle model
def load_text_model():
    with open('backend/text_model.pkl', 'rb') as file:
        return pickle.load(file)

# Initialize models
img_model = load_image_model()
text_model = load_text_model()

# image processing for model
def img_preprocessing(img):
    """ Image preprocessing function """
    img = tf.io.read_file(img)  # Read the image file
    img = tf.image.decode_png(img, channels=3)  # Decode the PNG image
    img = tf.image.resize(img, (256, 256))  # Resize the image, image size is (256, 256)
    img = tf.cast(img, tf.float32) / 255.0  # Normalize pixel values to [0, 1] range
    return img

# Prediction function for the image
def predict_image(model, img):
    prediction = model.predict(img)
    return prediction

# Define the route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if an image file exists in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file found'}), 400

        image_file = request.files['image']
        image = img_preprocessing(image_file)

        # Predict the image
        image_prediction = predict_image(img_model, image)

        # Process form data for text features
        form_data = request.form
        features = [float(form_data[field]) for field in [
            'smoke', 'drink', 'background_father', 'background_mother',
            'pesticide', 'gender', 'skin_cancer_history', 'cancer_history',
            'has_piped_water', 'has_sewage_system', 'grew', 'changed'
        ]]
        
        # Convert to numpy array for text model prediction
        features_array = np.array([features])
        text_prediction = text_model.predict(features_array)

        # Compute the final prediction (assuming both outputs are compatible)
        final_prediction = (image_prediction[0][0] + text_prediction[0]) / 2

        # Return the prediction result
        return jsonify({'prediction': str(final_prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)