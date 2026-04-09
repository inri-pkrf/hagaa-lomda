import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Interfaces.css';
import InterfencesData from '../../../Data/Unit1/InterfencesData.js';
import InterfacePopUp from './InterfacePopUp';

function Interfaces() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
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

    // 1. מיד בכניסה לדף - השבתת החץ הכללי של הלומדה (Next)
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));

    return () => {
      // ניקוי ביציאה - שחרור החסימה
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  // 2. מעקב אחרי סיום המשימה - שחרור החץ קדימה כשהכל נפתח
  useEffect(() => {
    if (isAllVisited) {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    }
  }, [isAllVisited]);

  // 3. לוגיקת החצים (קדימה ואחורה)
  useEffect(() => {
    const handleNext = (e) => {
      if (isAllVisited) {
        e.preventDefault();
        handleComplete();
      }
    };

    const handlePrev = (e) => {
      // חטיפת כפתור "חזור" - מחזיר תמיד למסדרון היחידה
      e.preventDefault();
      navigate('/intro-unit-one');
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev); // האזנה לחץ אחורה

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev);
    };
  }, [isAllVisited, navigate]);

  const handleDevSkip = (e) => {
    e.stopPropagation();
    const allKeys = Object.keys(InterfencesData);
    setVisited(allKeys);
    sessionStorage.setItem('interfacesVisited', JSON.stringify(allKeys));
  };

  const handleComplete = () => {
    sessionStorage.setItem('unitOne-third', 'finished');
    sessionStorage.setItem(
      'currentChapter',
      JSON.stringify({ name: 'unitOne-third', state: 'finished' })
    );
    setCompleted(true);
    
    window.dispatchEvent(new Event('updateNavbar'));

    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 500);
  };

  const handleTriangleClick = (key, item) => {
    setSelectedItem(item);
    if (!visited.includes(key)) {
      const newVisited = [...visited, key];
      setVisited(newVisited);
      sessionStorage.setItem('interfacesVisited', JSON.stringify(newVisited));
    }
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
            <p className="tringle-name" style={{ transform: `rotate(${rotationAngle}) ${needsFlip ? 'scaleX(-1)' : ''}`, display: 'inline-block', whiteSpace: 'nowrap', direction: 'rtl' }}>
              {item.name}
            </p>
          </div>
        );
      })}

      {isAllVisited && !completed && (
        <button className="complete-button-Interfaces" onClick={handleComplete}>
          סיים וחזור
        </button>
      )}

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