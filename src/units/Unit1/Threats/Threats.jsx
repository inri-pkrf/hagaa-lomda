import React, { useState, useEffect } from 'react';
import './Threats.css';
import VideoThreats from './VideoThreats';

function Threats({ setVideoPlaying }) {
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי טלוויזיה 1.png`);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    // --- שינוי עבור החצים בלבד ---
    // השבתת החץ הכללי של הלומדה בכניסה לפרק
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));

    return () => {
      // שחרור החסימה ביציאה מהפרק
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
    // ----------------------------
  }, []);

  const handleTvClick = () => {
    if (showVideo) return;
    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
    
    if (setVideoPlaying) {
      setVideoPlaying(true);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'true');
    }
    setShowVideo(true);
  };

  return (
    <div className="threats-container">
      <div className='subtext-threats'>
        לחצו על הטלוויזיה המוצגת במשרד כדי לצפות בסרטון המסביר על האיומים של העורף
      </div>

      <img
        className="room-background-threats"
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי טלוויזיה 1.png`}
        alt="Office Background"
      />

      {!showVideo && (
        <div className='click-div-tv' onClick={handleTvClick}></div>
      )}

      {showVideo && (
        <>
          <div className="overlay-dark-threats"></div>
          <div className="tv-zoom-container">
            <img 
              className="tv-frame-image" 
              src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`} 
              alt="TV Frame" 
            />
            <VideoThreats setVideoPlaying={setVideoPlaying} />
          </div>
        </>
      )}
    </div>
  );
}

export default Threats;