import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoThreats.css';

function VideoThreats({ setVideoPlaying }) {
  const navigate = useNavigate();
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    // 1. בכניסה - משביתים את החץ הכללי
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));

    const showButtonTimer = setTimeout(() => {
      setCanFinish(true);
      // 2. ברגע שמופיע כפתור הסיום - משחררים את החץ הכללי שיהיה לחיץ (Enabled)
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
      window.dispatchEvent(new Event('updateNavbar'));
    }, 2000);

    // לוגיקה עבור החץ הכללי כשהוא לחיץ
    const handleNext = (e) => {
      if (canFinish) {
        // אם המשתמש לוחץ על החץ הכללי כשהוא פעיל, נסיים את הפרק
        e.preventDefault();
        handleVideoEnd();
      }
    };

    window.addEventListener('onNextNav', handleNext);

    return () => {
      clearTimeout(showButtonTimer);
      window.removeEventListener('onNextNav', handleNext);
      // ליתר ביטחון, מוודאים שהחץ משוחרר כשיוצאים מהדף
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [canFinish]);

  const handleVideoEnd = () => {
    if (setVideoPlaying) {
      setVideoPlaying(false);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'false');
    }

    sessionStorage.setItem('unitOne-first', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'UnitOne-first', state: 'finished' }));

    window.dispatchEvent(new Event('updateNavbar'));

    // ניווט חזרה למסדרון
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

        {/* כפתור הסיום רק כאינדיקציה ויזואלית או לחיצה נוספת */}
        {canFinish && (
          <button onClick={handleVideoEnd} className="video-threats-button">
            סיום
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoThreats;