import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Threats.css';
import VideoThreats from './VideoThreats';

function Threats({ setVideoPlaying }) {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  
  // נתיבי התמונות
  const initialBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי טלוויזיה 1.png`;
  const finalBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/ThreatsBackground.png`;

  // טעינת מצב "בוצע" מהסטורג'
  const [isDone, setIsDone] = useState(
    sessionStorage.getItem('threatsFinished') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('MainTitle', " היערכות לאיומים");

    // אם הפרק כבר הושלם בעבר, החץ יהיה פעיל. אם לא - חסום.
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
    
    // סימון שהפרק בוצע
    setIsDone(true);
    sessionStorage.setItem('threatsFinished', 'true');
    sessionStorage.setItem('unitOne-first', 'finished'); // בשביל הדלתות במסדרון

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
        {isDone 
          ? "צפית בסרטון האיומים, ניתן לצפות שוב או להמשיך הלאה" 
          : "לחצו על הטלוויזיה המוצגת במשרד כדי לצפות בסרטון המסביר על האיומים של העורף"}
      </div>

      <img
        className="room-background-threats"
        // החלפת הרקע באופן דינמי לפי מצב הסיום
        src={isDone ? finalBg : initialBg}
        alt="Office Background"
      />

      {/* אזור הלחיצה משנה קלאס אם סיימנו */}
      {!showVideo && (
        <div 
          className={isDone ? 'click-div-tv-done' : 'click-div-tv'} 
          onClick={handleTvClick}
        >
          {/* הצגת סימן וי */}
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