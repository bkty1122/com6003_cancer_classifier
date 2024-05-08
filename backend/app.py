from flask import Flask, request, jsonify
import flask_cors
import numpy as np
import os
import tensorflow as tf
from keras.models import load_model
import pickle
import scipy.stats
from PIL import Image
import io

app = Flask(__name__)
flask_cors.CORS(app, resources={r"/predict": {"origins": "*"}})

dir_path = os.path.dirname(os.path.realpath(__file__))
image_model_path = os.path.join(dir_path, 'VGG16Model2.h5')
text_model_path = os.path.join(dir_path, 'text_model.pkl')

# img_model = load_model(image_model_path)
text_model = pickle.load(open(text_model_path, 'rb'))

def img_preprocessing(image_file):
    """ Image preprocessing function """
    image = Image.open(io.BytesIO(image_file.read()))  # Use PIL to open image files
    image = image.resize((256, 256))  # Resize the image
    image = np.array(image)  # Convert to numpy array
    image = image.astype('float32') / 255.0  # Normalize pixel values
    return image

def predict_image(model, img):
    img = np.expand_dims(img, axis=0)  # Expand the image dimensions
    prediction = model.predict(img)  # Predict the image
    return prediction

@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file found'}), 400
        
        image_file = request.files['image']
        image = img_preprocessing(image_file)

        # image_prediction = predict_image(img_model, image)

        form_data = request.form
        features = [int(form_data.get(field)) for field in [
            'smoke', 'drink', 'background_father', 'background_mother',
            'pesticide', 'gender', 'skin_cancer_history', 'cancer_history',
            'has_piped_water', 'has_sewage_system', 'grew', 'changed'
        ]]
        
        features_array = np.array([features])
        text_prediction = text_model.predict(features_array)

        # final_prediction = np.concatenate((image_prediction, text_prediction), axis=None)
        final_prediction = text_prediction
        return jsonify({'prediction': str(final_prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)