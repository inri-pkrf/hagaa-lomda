import React from 'react';
import "../components/Styles/ProgressBar.css";


const ProgressBar = ({ currentStep = 1, percentage = 88 }) => {
  const steps = [1, 2, 3, 4];


  return (
    <div className="pg-container">
      <div className="pg-text-section">
        <span className="pg-percentage">{percentage}%</span>
        <span className="pg-label">התקדמות</span>
      </div>


      <div className="pg-vertical-divider"></div>


      <div className="pg-steps-section">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`pg-step-wrapper ${step <= currentStep ? 'active' : 'inactive'}`}>
              <div className="pg-circle">{step}</div>
            </div>


            {index < steps.length - 1 && (
              <div className={`pg-line ${step < currentStep ? 'active' : 'inactive'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default ProgressBar;



