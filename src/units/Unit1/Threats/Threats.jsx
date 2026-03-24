import React, { useState, useEffect } from 'react';
import './Threats.css';
import VideoThreats from './VideoThreats';

function Threats({ setVideoPlaying }) {
  // תמונת הרקע ההתחלתית
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי טלוויזיה 1.png`);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // עדכון כותרת ב-Session
    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    /* --- REMARKED: AUTOMATIC ANIMATION LOGIC (הושבת לגמרי) ---
    const startZoom = setTimeout(() => {
      // setAnimate('zoom-in');
    }, 500);

    const changeImage = setTimeout(() => {
      // setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
      // setAnimate('zoom-out');
    }, 2500);
    ...
    ------------------------------------------------------- */
  }, []);

  // פונקציית המעבר הישיר בלחיצה
  const handleTvClick = () => {
    if (showVideo) return; // מניעת לחיצות כפולות

    // 1. מעבר ישיר לתמונת הטלוויזיה (בלי אנימציה)
    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
    
    // 2. עדכון סטטוס וידאו
    if (setVideoPlaying) {
      setVideoPlaying(true);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'true');
    }
    
    // 3. הצגת רכיב הוידאו מיד
    setShowVideo(true);
  };

 return (
  <div className="threats-container">
    <div className='subtext-threats'>
      לחצו על הטלוויזיה המוצגת במשרד כדי לצפות בסרטון המסביר על האיומים של העורף
    </div>

    {/* רקע המשרד המקורי - תמיד קבוע */}
    <img
      className="room-background-threats"
      src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי טלוויזיה 1.png`}
      alt="Office Background"
    />

    {/* האזור הלחיץ המהבהב */}
    {!showVideo && (
      <div className='click-div-tv' onClick={handleTvClick}></div>
    )}

    {/* שכבת האוברליי והטלוויזיה שמופיעות בלחיצה */}
    {showVideo && (
      <>
        <div className="overlay-dark-threats"></div>
        
        <div className="tv-zoom-container">
          <img 
            className="tv-frame-image" 
            src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`} 
            alt="TV Frame" 
          />
          
          {/* רכיב הווידאו יושב עכשיו בתוך הקונטיינר של הטלוויזיה */}
          <VideoThreats setVideoPlaying={setVideoPlaying} />
        </div>
      </>
    )}
  </div>
);
}

export default Threats;