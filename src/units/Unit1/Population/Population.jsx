import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Population() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    // Mark unitOne-fourth as finished
    sessionStorage.setItem('unitOne-fourth', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-fourth', state: 'finished' }));
    setCompleted(true);
    // Navigate back to IntroUnitOne after a short delay
    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 500);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>אוכלוסיה</h2>
      <p>This is the Population (אוכלוסיה) screen placeholder.</p>
      
      {!completed && (
        <button 
          onClick={handleComplete}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          סיים וחזור
        </button>
      )}
      
      {completed && <p>הפרק הושלם! מעבר לדף הראשי...</p>}
    </div>
  );
}

export default Population;

