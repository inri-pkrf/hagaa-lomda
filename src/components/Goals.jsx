import React from 'react';
import { useNavigate } from 'react-router-dom';
import goalsData from '../Data/GoalsData';
import './Styles/Goals.css';

function Goals() {
  const navigate = useNavigate();
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitOne'; // default to UnitOne if not set
  const data = goalsData[currentUnit];

  if (!data) {
    return <div>Goals data not found for {currentUnit}</div>;
  }

  const { title, subtitle, text, buttonText, navigateTo, colors } = data;

  return (
    <div
      className="goals-container"
      style={{
        '--main-color': colors.main,
        '--layer1-color': colors.layer1,
        '--layer2-color': colors.layer2,
        '--text-color': colors.text
      }}
    >
      <h2 className="goals-title">{title}</h2>
      <p className="goals-subtitle">{subtitle}</p>
      <div className="goals-text">{text}</div>
      <button
        className="goals-button"
        onClick={() => navigate(navigateTo)}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Goals;

