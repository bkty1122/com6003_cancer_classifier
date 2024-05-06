from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import joblib
import io
import tensorflow as tf

app = Flask(__name__)

# Load your trained model (ensure the path matches)
model = joblib.load('model_resultfinal_stack_2.joblib')

# define the predict function
def predict(features):
    """ Make a prediction with the model """
    prediction = model.predict([features])
    return prediction

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

        # Check if an image file exists
        if 'image' in request.files:
            image_file = request.files['image']
            image = Image.open(image_file.stream)
            # Preprocess the image
            image = img_preprocessing(image)
            
        # add the image to the data dictionary
        data['image'] = image
        
        # Convert form data to model input format
        features = np.array([list(data.values())], dtype=float)
        
        # make prediction
        prediction = predict(features)
        
        return jsonify({'prediction': str(prediction[0])})
        
    except Exception as e:
        return jsonify({'error': str(e)})

# image processing for model
def img_preprocessing(img):
    """ Image preprocessing function """
    img = tf.io.read_file(img)  # Read the image file
    img = tf.image.decode_png(img, channels=3)  # Decode the PNG image
    img = tf.image.resize(img, (256, 256))  # Resize the image, image size is (256, 256)
    img = tf.cast(img, tf.float32) / 255.0  # Normalize pixel values to [0, 1] range
    return img

if __name__ == '__main__':
    app.run(debug=True)