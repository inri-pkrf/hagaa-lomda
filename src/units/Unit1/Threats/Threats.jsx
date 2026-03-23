import React, { useState, useEffect } from 'react';
import '../style/Threats.css';
import VideoThreats from './VideoThreats';

function Threats({ setVideoPlaying }) {
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsBackground.png`);
  // const [animate, setAnimate] = useState(false); // REMARKED: Animation state
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // שינוי כותרת תפריט ראשי
    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    /* REMARKED: AUTOMATIC ANIMATION LOGIC
    const startZoom = setTimeout(() => {
      setAnimate('zoom-in');
    }, 500);

    const changeImage = setTimeout(() => {
      setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
      setAnimate('zoom-out');
    }, 2500);

    const showVideoTimer = setTimeout(() => {
       triggerVideo();
    }, 4500);

    return () => {
      clearTimeout(startZoom);
      clearTimeout(changeImage);
      clearTimeout(showVideoTimer);
    };
    */
  }, [setVideoPlaying]);

  // Function to handle the skip/cut to video
  const handleBackgroundClick = () => {
    if (showVideo) return; // Prevent multiple triggers

    // 1. Immediately switch to TV background
    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
    
    // 2. Trigger video start logic
    if (setVideoPlaying) {
      setVideoPlaying(true);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'true');
    }
    
    // 3. Show the video component
    setShowVideo(true);
  };

  return (
    <div className="threats-container" onClick={handleBackgroundClick} style={{ cursor: 'pointer' }}>
      <img
        className={`room-background-threats ${bgImage.includes('ThreatsTv') ? 'tv' : ''}`}
        src={bgImage}
        alt="Click to start video"
      />
      {showVideo && <VideoThreats setVideoPlaying={setVideoPlaying} />}
    </div>
  );
}

export default Threats;