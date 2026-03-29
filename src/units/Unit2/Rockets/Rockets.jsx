import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Rockets.css';


function Rockets() {
  const navigate = useNavigate();
  const [startSequence, setStartSequence] = useState(false);
  const [unlockedStep, setUnlockedStep] = useState(1);


  useEffect(() => {
    sessionStorage.setItem('MainTitle', "ירי טילים");
    const sequenceTimeout = setTimeout(() => {
      setStartSequence(true);
    }, 2000);
    return () => clearTimeout(sequenceTimeout);
  }, []);


  const rocketFramesData = [
    { id: 1, text: "מאפייני האיום", path: "/threat-characteristics" },
    { id: 2, text: "היערכות והתגוננות", path: "/preparation" },
    { id: 3, text: "מרחבים מוגנים", path: "/protected-spaces" },
    { id: 4, text: "מדיניות התגוננות", path: "/defense-policy" },
    { id: 5, text: "סיכום", path: "/summary-rockets" },
  ];


const handleFrameClick = (frame) => {
  if (frame.id === unlockedStep) {
    navigate('/info-rockets');
  }
};


  const containerClass = `rockets-container ${startSequence ? 'sequence-active' : ''}`;
  const showContent = startSequence;


  return (
    <div className={containerClass}>
      <div className="rockets-background-layer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/unitTwoImgs/rocketsOpeningBg.png)` }} />




      {showContent && (
        <div className="rockets-sub-header fade-in-delayed">
          <h3>בפרק זה נלמד על:</h3>
        </div>
      )}


      <div className="rockets-frames-container">
        {rocketFramesData.map((frame) => {
          const isLocked = frame.id !== unlockedStep;
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? 'locked' : 'unlocked'}`}
              onClick={() => handleFrameClick(frame)}
            >
              {isLocked && <div className="rocket-frame-overlay fade-in-delayed"></div>}


              <img
                src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/frame${frame.id}.png`}
                className="rocket-frame-img"
                alt={`frame-${frame.id}`}
              />


              {showContent && (
                <div className="rocket-frame-content fade-in-delayed">
                  <p>{frame.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>


      {showContent && (
        <div className="rockets-footer-hint fade-in-delayed">
          <p>יש ללחוץ על המסגרת כדי להמשיך</p>
        </div>
      )}
    </div>
  );
}


export default Rockets;



