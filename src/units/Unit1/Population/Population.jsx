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

  // בדיקה האם כל שלושת השלבים הסתיימו
  const allStepsFinished = isLaptopDone && isFoldersDone && isGameDone;

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "אוכלוסיה");

    const laptopStatus = sessionStorage.getItem("populationLaptopFinished") === "true" || location.state?.laptopFinished;
    const foldersStatus = sessionStorage.getItem("populationFoldersFinished") === "true" || location.state?.foldersFinished;
    const gameStatus = sessionStorage.getItem("populationGameFinished") === "true" || location.state?.gameFinished;

    if (laptopStatus) setIsLaptopDone(true);
    if (foldersStatus) setIsFoldersDone(true);
    if (gameStatus) setIsGameDone(true);
  }, [location]);

  // --- לוגיקת החצים (קדימה מושבת, אחורה למסדרון) ---
  useEffect(() => {
    // השבתת החץ קדימה כל עוד לא סיימו הכל
    if (!allStepsFinished) {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    } else {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    }

    const handleNext = (e) => {
      if (allStepsFinished) {
        e.preventDefault();
        handleFinalComplete();
      }
    };

    const handlePrev = (e) => {
      // חץ אחורה תמיד מחזיר למסדרון
      e.preventDefault();
      navigate('/intro-unit-one');
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev);
      // איפוס החסימה ביציאה
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [allStepsFinished, navigate]);

  const handleFinalComplete = () => {
    sessionStorage.setItem('unitOne-fourth', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-fourth', state: 'finished' }));
    window.dispatchEvent(new Event('updateNavbar'));
    navigate("/intro-unit-one");
  };

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

      <div className="click-laptop" onClick={() => navigate('/PopulationInfo')}></div>

      {isLaptopDone && (
        <div className="click-folder" onClick={() => navigate('/population-parts')}></div>
      )}

      {isFoldersDone && (
        <div className="click-light" onClick={() => navigate('/PopulationGame')}></div>
      )}

      {isLaptopDone && <div className="population-laptop-check-static check-laptop-pos">✔</div>}
      {isFoldersDone && <div className="population-laptop-check-static check-folder-pos">✔</div>}
      {isGameDone && <div className="population-laptop-check-static check-light-pos">✔</div>}

      {isGameDone && (
        <button 
          className="nextUnitButton" 
          onClick={handleFinalComplete}
        >
          חזרה למסך היחידה
        </button>
      )}
    </div>
  );
}

export default Population;
