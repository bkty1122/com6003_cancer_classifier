import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PredictionForm from './SurveyForm';

function App() {
  return (
    <Router basename="/com6003_cancer_classifier">
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<PredictionForm />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;