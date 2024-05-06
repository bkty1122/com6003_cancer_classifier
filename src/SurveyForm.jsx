import React, { useState } from 'react';

const SurveyForm = () => {
    const initialState = {
        smoke: '0',
        drink: '0',
        background_father: '-1',
        background_mother: '-1',
        pesticide: '0',
        gender: '-1',
        skin_cancer_history: '0',
        cancer_history: '0',
        has_piped_water: '0',
        has_sewage_system: '0',
        grew: '0',
        changed: '0',
        image: null
    };

    const [formData, setFormData] = useState(initialState);

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

    const options = {
        smoke: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        drink: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        background_father: { '0': 'AUSTRIA', '1': 'BRASIL', '2': 'BRAZIL', '3': 'CZECH', '4': 'GERMANY', '5': 'ISRAEL', '6': 'ITALY', '7': 'NETHERLANDS', '8': 'POLAND', '9': 'POMERANIA', '10': 'PORTUGAL', '11': 'SPAIN', '-1': 'Unknown' },
        background_mother: { '0': 'BRAZIL', '1': 'FRANCE', '2': 'GERMANY', '3': 'ITALY', '4': 'NETHERLANDS', '5': 'NORWAY', '6': 'POLAND', '7': 'POMERANIA', '8': 'PORTUGAL', '9': 'SPAIN', '-1': 'Unknown' },
        pesticide: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        gender: { '0': 'FEMALE', '1': 'MALE', '-1': 'Unknown' },
        skin_cancer_history: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        cancer_history: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        has_piped_water: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        has_sewage_system: { '0': 'False', '1': 'True', '-1': 'Unknown' },
        grew: { '0': 'FALSE', '1': 'TRUE', '-1': 'Unknown' },
        changed: { '0': 'FALSE', '1': 'TRUE', '-1': 'Unknown' }
    };

    return (
        <div className="survey-form">
            <h1>Cancer Screening Tool</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(options).map(key => (
                    <div className="form-group" key={key}>
                        <label>{key.replace(/_/g, ' ').toUpperCase()}:</label>
                        <select name={key} value={formData[key]} onChange={handleChange}>
                            {Object.entries(options[key]).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                ))}
                {/* Image upload field */}
                <div className="form-group">
                    <label htmlFor="image">Upload your photo:</label>
                    <input type="file" name="image" id="image" onChange={handleChange} accept="image/*" />
                </div>
                {/* Submit button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyForm;