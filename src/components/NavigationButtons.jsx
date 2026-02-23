import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationButtons.css';

function NavigationButtons({ previousPath, nextPath, unitNumber }) {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons">
      <button
        className={`navigation-buttons__button dynamic-${unitNumber}`}
        onClick={() => previousPath && navigate(previousPath)}
        disabled={!previousPath}
      >
        <span className="icon">←</span>
        הקודם
      </button>

      <button
        className={`navigation-buttons__button dynamic-${unitNumber}`}
        onClick={() => nextPath && navigate(nextPath)}
        disabled={!nextPath}
      >
        המשך
        <span className="icon">→</span>
      </button>
    </div>
  );
}

export default NavigationButtons;