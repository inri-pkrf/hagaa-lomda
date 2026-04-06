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

  useEffect(() => {
    const saved = sessionStorage.getItem('interfacesVisited');
    if (saved) {
      setVisited(JSON.parse(saved));
    }
    sessionStorage.setItem('MainTitle', "ממשקים");
  }, []);

  // כפתור הדילוג המעודכן
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

  const totalItems = Object.keys(InterfencesData).length;

  return (
    <div className="interfaces-container">

      {/* כפתור הדילוג המקומי - מופיע רק אם עדיין לא סיימת הכל */}
      {visited.length < totalItems && (
        <button
          onClick={handleDevSkip}
          style={{
            position: 'fixed',
            top: '38%',
            left: '13%',
            zIndex: 9999,
            padding: '8px 18px',
            fontSize: '15px',
            backgroundColor: 'rgb(209 92 122)',
            color: 'white',
            border: '3px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: 'Assistant'
          }}
        >
          דילוג למפתחות
        </button>
      )
      }

      <h2 className="interfaces-title">
        במסגרת תפקידך, עליך לעבוד בשיתוף פעולה עם הגופים השונים. לחצו על הכרטיסיות שעל השולחן כדי ללמוד על הממשקים עם הגופים השונים:
      </h2>

      {
        Object.keys(InterfencesData).map((key) => {
          const item = InterfencesData[key];
          const keyNum = Number(key);

          // חישוב זווית הסיבוב לפי הבקשה שלך
          const rotationAngle = (keyNum >= 1 && keyNum <= 5) ? '-5deg' :
            (keyNum >= 6 && keyNum <= 10) ? '-7deg' : '0deg';

          // בדיקה האם מדובר במשולשים של צד שמאל (6-10) שבהם הטקסט יוצא הפוך
          const needsFlip = (keyNum >= 6 && keyNum <= 10);

          return (
            <div
              key={key}
              className={`tringle t${key} ${visited.includes(key) ? "visited" : ""}`}
              onClick={() => handleTriangleClick(key, item)}
            >
              <p
                className="tringle-name"
                style={{
                  // אם הטקסט הפוך (מראה), אנחנו מוסיפים scaleX(-1) כדי להחזיר אותו למצב קריא
                  transform: `rotate(${rotationAngle}) ${needsFlip ? 'scaleX(-1)' : ''}`,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  direction: 'rtl' // מבטיח שהעברית תסתדר נכון אחרי ההיפוך
                }}
              >
                {item.name}
              </p>
            </div>
          );
        })
      }

      {/* הכפתור המקורי שלך יופיע כאן ברגע שתלחץ על כפתור הדילוג */}
      {
        visited.length === totalItems && !completed && (
          <button className="complete-button-Interfaces" onClick={handleComplete}>
            סיים וחזור
          </button>
        )
      }

      {selectedItem && (
        <InterfacePopUp
          title={selectedItem.name}
          description={selectedItem.description}
          image={selectedItem.image}
          circleColor={selectedItem.coloeCircle} // העברת הצבע
          onClose={handleClosePopUp}
        />
      )}
    </div >
  );
}

export default Interfaces;