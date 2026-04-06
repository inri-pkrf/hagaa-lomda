import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoThreats.css';

function VideoThreats({ setVideoPlaying }) {
  const navigate = useNavigate();
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    // טיימר המאפשר סיום רק אחרי 2 שניות
    const showButtonTimer = setTimeout(() => {
      setCanFinish(true);
      window.dispatchEvent(new Event('updateNavbar'));
    }, 2000);

    const handleNext = (e) => {
      // אנחנו עוצרים את הניווט הכללי של Buttons.js בכל מקרה
      // כדי שהקומפוננטה הזו תחליט לאן לנווט (למסדרון)
      e.preventDefault(); 

      if (canFinish) {
        // אם עברו 2 שניות, נבצע את לוגיקת הסיום והחזרה למסדרון
        handleVideoEnd();
      } else {
        // אם המשתמש לוחץ לפני הזמן, לא קורה כלום
        console.log("הסרטון טרם הסתיים");
      }
    };

    window.addEventListener('onNextNav', handleNext);
    
    return () => {
      clearTimeout(showButtonTimer);
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [canFinish]);

  const handleVideoEnd = () => {
    if (setVideoPlaying) {
      setVideoPlaying(false);
    } else {
      sessionStorage.setItem('VIDEO IS PLAYING', 'false');
    }
    
    // 1. עדכון סטטוס הפרק
    sessionStorage.setItem('unitOne-first', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'UnitOne-first', state: 'finished' }));
    
    // 2. עדכון ה-Sidebar בזמן אמת (להופעת ה-V)
    window.dispatchEvent(new Event('updateNavbar'));
    
    // 3. ניווט ידני למסדרון (בדיוק מה שהכפתור עשה)
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

        {/* הכפתור הישן בהערה */}
        {/* {canFinish && (
          <button onClick={handleVideoEnd} className="video-threats-button">
            סיום
          </button>
        )} */}
      </div>
    </div>
  );
}

export default VideoThreats;