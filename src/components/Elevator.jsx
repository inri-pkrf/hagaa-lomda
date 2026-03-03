import React, { useEffect, useState } from 'react';
import './Styles/Elevator.css';
import ElevatorButtons from './ElevatorButtons';

function Elevator() {
  const [stage, setStage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5000),
      // טיימאאוט קצר אחרי התמונה השלישית (0.5 שניות)
      setTimeout(() => setShowButtons(true), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="Elevator">

      {/* מעלית סגורה */}
      <img
        className={`elevator-img ${stage >= 1 ? 'fade-out' : 'visible'}`}
        src={`${process.env.PUBLIC_URL}/assets/General/Elevator.png`}
        alt=""
      />

      {/* מעלית פתוחה */}
      <img
        className={`elevator-img 
          ${stage >= 1 ? 'visible' : ''} 
          ${stage >= 2 ? 'zoom-in' : ''} 
          ${stage >= 3 ? 'fade-out' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorOpen.png`}
        alt=""
      />

      {/* פנים המעלית */}
      <img
        className={`elevator-img-inside ${stage >= 3 ? 'fade-in-slow' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorInside.png`}
        alt=""
      />

      {/* הכפתורים – מופיעים עם דיליי קצר אחרי התמונה השלישית */}
      {showButtons && (
        <div className="buttons-wrapper">
          <ElevatorButtons unit="unit1" />
        </div>
      )}

    </main>
  );
}

export default Elevator;