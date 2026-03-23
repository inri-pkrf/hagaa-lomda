import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/VideoThreats.css';


function VideoThreats({ setVideoPlaying }) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // מציג את הכפתור אחרי 5 שניות, כדי שהוידאו יתחיל
    const showButtonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(showButtonTimer);
  }, []);

  const handleVideoEnd = () => {
    if (setVideoPlaying) {
      setVideoPlaying(false);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'false');
    }
    // Mark unitOne-first as finished
    sessionStorage.setItem('unitOne-first', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'UnitOne-first', state: 'finished' }));
    navigate('/intro-unit-one');
  };

  return (
    <div className='VideoThreats'>
      <div className='VideoThreats-container'>
        <iframe
          src="https://drive.google.com/file/d/1z9bXz10salwgmR_ybhGs0Y-Fs-qAB1v6/preview"
          width="80%"
          height="80%"
          allow="autoplay"
          title="Video Threats"
          className='VideoThreats-video'
        ></iframe>
        {showButton && (
          <button onClick={handleVideoEnd} className="video-threats-button">
            כפתור סיום לסרטון לבינתיים
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoThreats;

