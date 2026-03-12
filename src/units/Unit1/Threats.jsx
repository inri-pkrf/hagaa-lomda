import React, { useState, useEffect } from 'react';
import './style/Threats.css';
import VideoThreats from './VideoThreats';
function Threats({ setVideoPlaying }) {
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsBackground.png`);
  const [animate, setAnimate] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // שינוי כותרת תפריט ראשי

    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    // מתחיל זום אחרי רגע קטן
    const startZoom = setTimeout(() => {
      setAnimate('zoom-in');
    }, 500);

    // בסוף הזום מחליפים לתמונה של הטלוויזיה ומתחילים זום אאוט
    const changeImage = setTimeout(() => {
      setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.png`);
      setAnimate('zoom-out');
    }, 2500);

    // אחרי שהזום אאוט נגמר, מציגים את הוידאו
    const showVideoTimer = setTimeout(() => {
      if (setVideoPlaying) {
        setVideoPlaying(true);
      } else {
        sessionStorage.setItem('VIDEO IS PLAYING', 'true');
      }
      setShowVideo(true);

    }, 4500);

    return () => {
      clearTimeout(startZoom);
      clearTimeout(changeImage);
      clearTimeout(showVideoTimer);
    };
  }, [setVideoPlaying]);

  return (
    <div className="threats-container">
      <img
        className={`room-background-threats ${animate} ${bgImage.includes('ThreatsTv') ? 'tv' : ''}`}
        src={bgImage}
        alt=""
      />
      {showVideo && <VideoThreats setVideoPlaying={setVideoPlaying} />}
    </div>
  );
}

export default Threats;

