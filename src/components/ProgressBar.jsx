import React from 'react';
import "../components/Styles/ProgressBar.css";




const ProgressBar = ({ currentStep = 1, percentage = 88 }) => {
  const steps = [4, 3, 2, 1];
  return (
    <div className="pg-container">
      <div className="pg-steps-section">
        <div className="pg-track"></div>
        {steps.map((step) => (
          <div
            key={step}
            className={`pg-step-wrapper ${step === currentStep ? 'active' : 'inactive'}`}
          >
            <div className="pg-circle">{step}</div>
          </div>
        ))}
      </div>


      <div className="pg-text-section">
        <span className="pg-label">התקדמות</span>
        <span className="pg-percentage">{percentage}%</span>
      </div>
    </div>
  );
};


export default ProgressBar;

