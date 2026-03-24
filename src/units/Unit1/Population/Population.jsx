import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Population.css';

function Population() {
  const navigate = useNavigate();
  const location = useLocation();

  // נתיבי התמונות
  const backgroundImglaptop = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/חיווי מחשב 1.png`;
  const backgroundImglfolders = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/חיווי קלסרים 1.png`;
  const backgroundImglLights = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/חיווי מנורה 1.png`;
  const finalBackground = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationBackground.png`;

  const [isLaptopDone, setIsLaptopDone] = useState(false);
  const [isFoldersDone, setIsFoldersDone] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "אוכלוסיה");

    const laptopStatus = sessionStorage.getItem("populationLaptopFinished") === "true" || location.state?.laptopFinished;
    const foldersStatus = sessionStorage.getItem("populationFoldersFinished") === "true" || location.state?.foldersFinished;
    const gameStatus = sessionStorage.getItem("populationGameFinished") === "true" || location.state?.gameFinished;

    if (laptopStatus) setIsLaptopDone(true);
    if (foldersStatus) setIsFoldersDone(true);
    if (gameStatus) setIsGameDone(true);
  }, [location]);

  const getBackgroundImage = () => {
    if (isGameDone) return finalBackground; 
    if (!isLaptopDone) return backgroundImglaptop;
    if (!isFoldersDone) return backgroundImglfolders;
    return backgroundImglLights;
  };

  return (
    <div className="population-container">
      <div className='subtext-population'>
        {!isLaptopDone && "לחצו על המחשב המודגש"}
        {isLaptopDone && !isFoldersDone && "המשיכו לקלסרים (ניתן לחזור למחשב)"}
        {isFoldersDone && !isGameDone && "לחצו על המנורה למשחק (ניתן לחזור לקלסרים ולמחשב)"}
        {isGameDone && "סיימתם! כעת עברו לשאלות הסיכום של היחידה"}
      </div>

      <img
        className="room-background-population"
        src={getBackgroundImage()}
        alt="Office Background"
      />

      {/* --- אזורי לחיצה --- */}
      <div className="click-laptop" onClick={() => navigate('/PopulationInfo')}></div>

      {isLaptopDone && (
        <div className="click-folder" onClick={() => navigate('/population-parts')}></div>
      )}

      {isFoldersDone && (
        <div className="click-light" onClick={() => navigate('/PopulationGame')}></div>
      )}

      {/* --- סימני וי --- */}
      {isLaptopDone && <div className="population-laptop-check-static check-laptop-pos">✔</div>}
      {isFoldersDone && <div className="population-laptop-check-static check-folder-pos">✔</div>}
      {isGameDone && <div className="population-laptop-check-static check-light-pos">✔</div>}

      {/* הכפתור המעודכן - עובר לשאלות */}
      {isGameDone && (
        <button 
          className="nextUnitButton" 
          onClick={() => {
            // 1. סימון שהפרק הסתיים עבור מסך הדלתות
            sessionStorage.setItem('unitOne-fourth', 'finished');
            
            // 2. חזרה למסך הדלתות (ולא ישר לשאלון)
            navigate("/intro-unit-one"); // ודאי שזה הנתיב הנכון למסך הדלתות ב-App.js
          }}
        >
          חזרה למסך היחידה
        </button>
      )}
    </div>
  );
}

export default Population;