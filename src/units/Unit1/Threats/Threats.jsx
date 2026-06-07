import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Threats.css';
import VideoThreats from './VideoThreats';

function Threats({ setVideoPlaying }) {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  
  const initialBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsBackground.jpg`;
  const finalBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsBackground.jpg`;

  const [isDone, setIsDone] = useState(
    sessionStorage.getItem('threatsFinished') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isDone }));

    const handlePrev = (e) => {
      e.preventDefault();
      navigate('/intro-unit-one');
    };

    window.addEventListener('onPrevNav', handlePrev);
    return () => {
      window.removeEventListener('onPrevNav', handlePrev);
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [isDone, navigate]);

  const handleTvClick = () => {
    if (showVideo) return;

    if (setVideoPlaying) {
      setVideoPlaying(true);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'true');
    }
    setShowVideo(true); // ← הטיימר מתחיל ב-VideoThreats ברגע שהוא נטען
  };

  return (
    <div className="threats-container">
      <div className='subtitles subtext-threats'>
        {isDone 
          ? "צפית בסרטון האיומים, ניתן לצפות שוב או להמשיך הלאה" 
          : "לחצו על הטלוויזיה המוצגת במשרד כדי לצפות בסרטון המסביר על האיומים של העורף"}
      </div>

      <img
        className="room-background-threats"
        src={isDone ? finalBg : initialBg}
        alt="Office Background"
      />

      {!showVideo && (
        <div 
          className={isDone ? 'click-div-tv-done' : 'click-div-tv'} 
          onClick={handleTvClick}
        >
          {isDone && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Interfences/doneSign.png`}
              alt="completed"
              className="threats-done-v"
            />
          )}
        </div>
      )}

      {showVideo && (
        <>
          <div className="overlay-dark-threats"></div>
          <div className="tv-zoom-container">
            <img 
              className="tv-frame-image" 
              src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsTv.jpg`} 
              alt="TV Frame" 
            />
            <VideoThreats
              setVideoPlaying={setVideoPlaying}
              onVideoEnd={() => {
                setIsDone(true);
                sessionStorage.setItem('threatsFinished', 'true');
                sessionStorage.setItem('unitOne-first', 'finished');
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Threats;