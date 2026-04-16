import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Rockets.css';


function Earthquake() {
  const navigate = useNavigate();


  // סטייט נפרד לרעידת אדמה כדי לא לדרוס את ההתקדמות של הטילים
  const [clickedFrames, setClickedFrames] = useState(() => {
    const saved = sessionStorage.getItem('earthquake_clickedFrames');
    return saved ? JSON.parse(saved) : [];
  });


  const [hasPlayedIntro] = useState(() => {
    return sessionStorage.getItem('earthquake_introPlayed') === 'true';
  });


  const [startSequence, setStartSequence] = useState(hasPlayedIntro);


  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem('earthquake_unlockedStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });


  useEffect(() => {
    sessionStorage.setItem('MainTitle', "רעידת אדמה");


    if (!hasPlayedIntro) {
      const sequenceTimeout = setTimeout(() => {
        setStartSequence(true);
        sessionStorage.setItem('earthquake_introPlayed', 'true');
      }, 2000);
      return () => clearTimeout(sequenceTimeout);
    }
  }, [hasPlayedIntro]);


  // 4 מסגרות בלבד - משתמש בנתיבי התמונות המקוריים שלך
  const earthquakeFramesData = [
    { id: 1, text: <>מאפייני<br />האיום</>, path: "/earthquake/info-earthquake" },
    { id: 2, text: <>היערכות<br />והתגוננות</>, path: "/earthquake/safe-zone" },
    { id: 3, text: <>תרגיל אירוע -<br />רעידת אדמה</>, path: "/earthquake/equipment" },
    { id: 4, text: <>סיכום</>, path: "/earthquake/summary" },
  ];


  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      setClickedFrames((prev) => {
        if (!prev.includes(frame.id)) {
          const updated = [...prev, frame.id];
          sessionStorage.setItem('earthquake_clickedFrames', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });


      if (frame.id === unlockedStep && unlockedStep < earthquakeFramesData.length) {
        setUnlockedStep(unlockedStep + 1);
        sessionStorage.setItem('earthquake_unlockedStep', String(unlockedStep + 1));
      }
      navigate(frame.path);
    }
  };


  useEffect(() => {
    const allClicked = earthquakeFramesData.every(f => clickedFrames.includes(f.id));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !allClicked }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [clickedFrames]);


  const containerClass = `rockets-container ${startSequence ? 'sequence-active' : ''} ${hasPlayedIntro ? 'no-animation' : ''}`;
  const showContent = startSequence;


  return (
    <div className={containerClass}>
      {/* רקע פתיחה - משתמש באותו רקע כמו בטילים לפי בקשתך */}
      {!hasPlayedIntro && (
        <div className="rockets-background-layer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/rocketsOpeningBg.png)` }} />
      )}


      {showContent && (
        <div className={`rockets-sub-header ${hasPlayedIntro ? '' : 'fade-in-delayed'}`}>
          <h3>בפרק זה נלמד על:</h3>
        </div>
      )}


      <div className="rockets-frames-container">
        {earthquakeFramesData.map((frame) => {
          const isLocked = frame.id > unlockedStep;
          const isClicked = clickedFrames.includes(frame.id);
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? 'locked' : 'unlocked'}${isClicked ? ' clicked' : ''}`}
              onClick={() => handleFrameClick(frame)}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div
                className={`rocket-frame-center-text${isLocked ? ' blurred' : ''}`}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 5, textAlign: 'center', pointerEvents: 'none', fontWeight: 700, fontSize: '1vw', color: '#472E1A', lineHeight: 1.2 }}
              >
                {frame.text}
              </div>


              {/* משתמש בדיוק באותן תמונות frame1-4 */}
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/frame${frame.id}.png`}
                className={`rocket-frame-img${isLocked ? ' blurred' : ''}`}
                alt={`frame-${frame.id}`}
              />


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


export default Earthquake;

