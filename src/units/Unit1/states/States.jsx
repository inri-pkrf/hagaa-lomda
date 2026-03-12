import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/States.css';
function States() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
   const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesBackground.png`);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
      // מתחיל זום אחרי רגע קטן
      const startZoom = setTimeout(() => {
        setAnimate('zoom-in-board');
      }, 500);
  
      // בסוף הזום מחליפים לתמונה של הטלוויזיה ומתחילים זום אאוט
      const changeImage = setTimeout(() => {
        setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`);
        setAnimate('zoom-out-board');
      }, 2500);
    }, []);

  const handleComplete = () => {
    // מסמן שסיימתי את הפרק
    sessionStorage.setItem('unitOne-second', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'finished' }));
    setCompleted(true);
    //מוביל חזרה לדלתות
    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 500);
  };


  return (
     <div className="threats-container">
      <img
className={`room-background-states ${animate} ${bgImage.includes('ArtBoard') ? 'Board' : ''}`}        src={bgImage}
        alt=""
      />
  
      {!completed && (
        <button 
          onClick={handleComplete}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          סיים וחזור
        </button>
      )}
      
      {completed && <p>הפרק הושלם! מעבר לדף הראשי...</p>}
    </div>
  );
}

export default States;

