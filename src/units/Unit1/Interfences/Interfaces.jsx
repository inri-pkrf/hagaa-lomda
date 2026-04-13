import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Interfaces.css';
import InterfencesData from '../../../Data/Unit1/InterfencesData.js';
import InterfacePopUp from './InterfacePopUp';

function Interfaces() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [visited, setVisited] = useState([]);

  const totalItems = Object.keys(InterfencesData).length;
  const isAllVisited = visited.length === totalItems;

  useEffect(() => {
    const saved = sessionStorage.getItem('interfacesVisited');
    if (saved) {
      setVisited(JSON.parse(saved));
    }
    sessionStorage.setItem('MainTitle', "ממשקים");

    // שליטה בחצים של ה-Navbar
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isAllVisited }));
    window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));

    const handleNext = (e) => {
      if (isAllVisited) {
        e.preventDefault();
        navigate('/interfaces-game');
      }
    };

    const handlePrev = (e) => {
      e.preventDefault();
      navigate('/intro-unit-one'); // חזרה למסדרון
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev);
    };
  }, [isAllVisited, navigate]);

  const handleTriangleClick = (key, item) => {
    setSelectedItem(item);
    if (!visited.includes(key)) {
      const newVisited = [...visited, key];
      setVisited(newVisited);
      sessionStorage.setItem('interfacesVisited', JSON.stringify(newVisited));
      
      // עדכון מיידי של החץ ב-Navbar אם סיימנו הכל
      if (newVisited.length === totalItems) {
        window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
      }
    }
  };

  const handleDevSkip = (e) => {
    e.stopPropagation();
    const allKeys = Object.keys(InterfencesData);
    setVisited(allKeys);
    sessionStorage.setItem('interfacesVisited', JSON.stringify(allKeys));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
  };

  const handleClosePopUp = () => {
    setSelectedItem(null);
  };

  return (
    <div className="interfaces-container">
      {!isAllVisited && (
        <button onClick={handleDevSkip} className="dev-skip-button-style"
          style={{ position: 'fixed', top: '38%', left: '13%', zIndex: 9999 }}>
          דילוג למפתחות
        </button>
      )}

      <h2 className="interfaces-title">
        במסגרת תפקידך, עליך לעבוד בשיתוף פעולה עם הגופים השונים. לחצו על הכרטיסיות שעל השולחן כדי ללמוד על הממשקים עם הגופים השונים:
      </h2>

      {Object.keys(InterfencesData).map((key) => {
        const item = InterfencesData[key];
        const keyNum = Number(key);
        const rotationAngle = (keyNum >= 1 && keyNum <= 5) ? '-5deg' : (keyNum >= 6 && keyNum <= 10) ? '-7deg' : '0deg';
        const needsFlip = (keyNum >= 6 && keyNum <= 10);

        return (
          <div
            key={key}
            className={`tringle t${key} ${visited.includes(key) ? "visited" : ""}`}
            onClick={() => handleTriangleClick(key, item)}
          >
            <p className="tringle-name" style={{ 
              transform: `rotate(${rotationAngle}) ${needsFlip ? 'scaleX(-1)' : ''}`, 
              display: 'inline-block', 
              whiteSpace: 'nowrap', 
              direction: 'rtl' 
            }}>
              {item.name}
            </p>
          </div>
        );
      })}

      {selectedItem && (
        <InterfacePopUp
          title={selectedItem.name}
          description={selectedItem.description}
          image={selectedItem.image}
          circleColor={selectedItem.coloeCircle}
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
}

export default Interfaces;