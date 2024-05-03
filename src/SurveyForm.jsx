import React, { useState } from 'react';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        smoke: '0',
        drink: '0',
        image: null
    });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setFormData({...formData, [name]: files[0]});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle the submission to the backend
        console.log(formData);
        alert('Form submitted. Check the console for output.');
    };

    return (
        <div className="survey-form">
            <h1>User Health Survey</h1>
            <form onSubmit={handleSubmit}>
                {/* Question about smoking habits */}
                <div className="form-group">
                    <label htmlFor="smoke">Smoke?</label>
                    <select name="smoke" id="smoke" value={formData.smoke} onChange={handleChange}>
                        <option value="0">Never</option>
                        <option value="1">Sometimes</option>
                        <option value="2">Regularly</option>
                    </select>
                </div>

                {/* Question about drinking habits */}
                <div className="form-group">
                    <label htmlFor="drink">Drink?</label>
                    <select name="drink" id="drink" value={formData.drink} onChange={handleChange}>
                        <option value="0">Never</option>
                        <option value="1">Sometimes</option>
                        <option value="2">Regularly</option>
                    </select>
                </div>

                {/* Image upload field */}
                <div className="form-group">
                    <label htmlFor="image">Upload your skin image:</label>
                    <input type="file" name="image" id="image" onChange={handleChange} accept="image/*" />
                </div>

                {/* Submit button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyForm;