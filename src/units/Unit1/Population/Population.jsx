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

  // לוגיקת הרקע - מציג את החיווי הבא בתור, אלא אם הכל נגמר
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
        {isGameDone && "סיימתם! ניתן לחזור לתכנים או לעבור ליחידה הבאה"}
      </div>

      <img
        className="room-background-population"
        src={getBackgroundImage()}
        alt="Office Background"
      />

      {/* --- אזורי לחיצה --- */}

      {/* 1. המחשב - תמיד לחיץ מרגע שהתחילה היחידה */}
      <div className="click-laptop" onClick={() => navigate('/PopulationInfo')}></div>

      {/* 2. הקלסרים - נפתחים רק אחרי שהמחשב בוצע פעם אחת, ונשארים לחיצים לתמיד */}
      {isLaptopDone && (
        <div className="click-folder" onClick={() => navigate('/population-parts')}></div>
      )}

      {/* 3. המנורה - נפתחת רק אחרי שהקלסרים בוצעו פעם אחת, ונשארת לחיצה לתמיד */}
      {isFoldersDone && (
        <div className="click-light" onClick={() => navigate('/PopulationGame')}></div>
      )}

      {/* --- סימני וי (נשארים במקומם) --- */}
      {isLaptopDone && (
        <div className="population-laptop-check-static check-laptop-pos">✔</div>
      )}
      {isFoldersDone && (
        <div className="population-laptop-check-static check-folder-pos">✔</div>
      )}
      {isGameDone && (
        <div className="population-laptop-check-static check-light-pos">✔</div>
      )}

      {/* כפתור סיום - מופיע רק בסוף הכל */}
      {isGameDone && (
        <button 
          className="nextUnitButton" 
          onClick={() => {
            sessionStorage.setItem("currentUnit", "UnitTwo");
            navigate("/elevator");
          }}
        >
          ליחידה הבאה
        </button>
      )}
    </div>
  );
}

export default Population;