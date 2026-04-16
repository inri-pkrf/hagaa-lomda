import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Rockets.css';

function Rockets() {
  const navigate = useNavigate();
  // סטייט: אילו מסגרות נלחצו
  const [clickedFrames, setClickedFrames] = useState(() => {
    const saved = sessionStorage.getItem('clickedFrames');
    return saved ? JSON.parse(saved) : [];
  });

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
    { id: 1, text: <>מאפייני<br />האיום</>, path: "/info-rockets" },
    { id: 2, text: <>היערכות<br />והתגוננות</>, path: "/preparation" },
    { id: 3, text: <>מרחבים<br />מוגנים</>, path: "/frame3" },
    { id: 4, text: <>מדיניות<br />התגוננות</>, path: "/defense-policy/sub-one" },
    { id: 5, text: <>סיכום</>, path: "/summary-checklist-unit2-sub1" },
  ];

  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      // הוספת המסגרת לסטייט אם לא נלחצה
      setClickedFrames((prev) => {
        if (!prev.includes(frame.id)) {
          const updated = [...prev, frame.id];
          sessionStorage.setItem('clickedFrames', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
      // עדכון unlockedStep: כל לחיצה פותחת את הבא
      if (frame.id === unlockedStep && unlockedStep < rocketFramesData.length) {
        setUnlockedStep(unlockedStep + 1);
        sessionStorage.setItem('unlockedStep', String(unlockedStep + 1));
      }
      navigate(frame.path);
    }
  };
  // שליטה על כפתור "קדימה" (next) - חסום עד שכל המסגרות נלחצו
  useEffect(() => {
    const allClicked = rocketFramesData.every(f => clickedFrames.includes(f.id));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !allClicked }));
    // איפוס בלצאת מהעמוד
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [clickedFrames, rocketFramesData]);


  // 4. בניית הקלאסים: 'sequence-active' מפעיל את האנימציה, 'no-animation' מבטל אותה בחזרה
  // שים לב: 'no-animation' יתווסף רק אם hasPlayedIntro הוא true
  const containerClass = `rockets-container ${startSequence ? 'sequence-active' : ''} ${hasPlayedIntro ? 'no-animation' : ''}`;
  const showContent = startSequence;

  return (
    <div className={containerClass}>
      {/* הרקע נעלם רק אם אנחנו בתהליך האנימציה, לא אם חזרנו מהנושא */}
      {!hasPlayedIntro && (
        <div className="rockets-background-layer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/rocketsOpeningBg.png)` }} />
      )}

      {showContent && (
        <div className={`rockets-sub-header ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}>
          <h3>בפרק זה נלמד על:</h3>
        </div>
      )}

      <div className="rockets-frames-container">
        {rocketFramesData.map((frame) => {
          const isLocked = frame.id > unlockedStep;
          const isClicked = clickedFrames.includes(frame.id);
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? 'locked' : 'unlocked'}${isClicked ? ' clicked' : ''}`}
              onClick={() => handleFrameClick(frame)}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* טקסט ממורכז תמיד */}
              <div
                className={`rocket-frame-center-text${isLocked ? ' blurred' : ''}`}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 5, textAlign: 'center', pointerEvents: 'none', fontWeight: 700, fontSize: '1vw', color: '#472E1A', lineHeight: 1.2 }}
              >
                {frame.text}
              </div>

              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/frame${frame.id}.png`}
                className={`rocket-frame-img${isLocked ? ' blurred' : ''}`}
                alt={`frame-${frame.id}`}
              />

              {/* סימן וי של הושלם */}
              {isClicked && (
                <div className="rocket-frame-v">
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                    <polyline points="20 6 9 17 4 12" fill="none" stroke="white" strokeWidth="4" />
                  </svg>
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

