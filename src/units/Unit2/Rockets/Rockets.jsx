import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Rockets.css';


function Rockets() {
  const navigate = useNavigate();


  // 1. הגדרת הסטייט: בודקים *פעם אחת בלבד* בכניסה אם כבר הרצנו את האנימציה בעבר
  const [hasPlayedIntro] = useState(() => {
    return sessionStorage.getItem('introPlayed') === 'true';
  });


  // 2. סטייט לניהול תחילת הרצף (האנימציה עצמה)
  // אם כבר שיחקנו את האינטרו, הוא מתחיל כ-true מיד. אם לא, הוא מתחיל כ-false.
  const [startSequence, setStartSequence] = useState(hasPlayedIntro);


  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem('unlockedStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });


  useEffect(() => {
    sessionStorage.setItem('MainTitle', "ירי טילים");


    // 3. מריצים את האנימציה רק אם זו פעם ראשונה
    if (!hasPlayedIntro) {
      const sequenceTimeout = setTimeout(() => {
        setStartSequence(true); // זה מפעיל את ה-class 'sequence-active' שמפעיל את האנימציה המקורית
        sessionStorage.setItem('introPlayed', 'true'); // שומרים בזיכרון לדפדפן
      }, 2000);
      return () => clearTimeout(sequenceTimeout);
    }
  }, [hasPlayedIntro]);


  const rocketFramesData = [
    { id: 1, text: "מאפייני האיום", path: "/info-rockets" },
    { id: 2, text: "היערכות והתגוננות", path: "/preparation" },
    { id: 3, text: "מרחבים מוגנים", path: "/protected-spaces" },
    { id: 4, text: "מדיניות התגוננות", path: "/defense-policy" },
    { id: 5, text: "סיכום", path: "/summary-rockets" },
  ];


  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      navigate(frame.path);
    }
  };


  // 4. בניית הקלאסים: 'sequence-active' מפעיל את האנימציה, 'no-animation' מבטל אותה בחזרה
  // שים לב: 'no-animation' יתווסף רק אם hasPlayedIntro הוא true
  const containerClass = `rockets-container ${startSequence ? 'sequence-active' : ''} ${hasPlayedIntro ? 'no-animation' : ''}`;
  const showContent = startSequence;


  return (
    <div className={containerClass}>
      {/* הרקע נעלם רק אם אנחנו בתהליך האנימציה, לא אם חזרנו מהנושא */}
      {!hasPlayedIntro && (
        <div className="rockets-background-layer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/unitTwoImgs/rocketsOpeningBg.png)` }} />
      )}


      {showContent && (
        <div className={`rockets-sub-header ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}>
          <h3>בפרק זה נלמד על:</h3>
        </div>
      )}


      <div className="rockets-frames-container">
        {rocketFramesData.map((frame) => {
          const isLocked = frame.id > unlockedStep;
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? 'locked' : 'unlocked'}`}
              onClick={() => handleFrameClick(frame)}
            >
              {isLocked && <div className={`rocket-frame-overlay ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}></div>}


              <img
                src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/frame${frame.id}.png`}
                className="rocket-frame-img"
                alt={`frame-${frame.id}`}
              />


              {showContent && (
                <div className={`rocket-frame-content ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}>
                  <p>{frame.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>


      {showContent && (
        <div className={`rockets-footer-hint ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}>
          <p>יש ללחוץ על המסגרת כדי להמשיך</p>
        </div>
      )}
    </div>
  );
}


export default Rockets;



