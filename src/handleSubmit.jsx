// const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => formData.append(key, value));

//     // fetch('http://localhost:5000/predict', {

//     fetch('https://special-doodle-674g9p6gp5qcrp7r-5000.app.github.dev/', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         alert('Form submitted. Check the console for output.');
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// };

const handleSubmit = (event) => {
    event.preventDefault();
    // Temporarily disable API call
    console.log('Form submitted, but API call is disabled');
    alert('Form submitted. API call is currently disabled.');
    
    /* Original API call code
    fetch('https://your-backend-url.com/predict', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Form submitted. Check the console for output.');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  };