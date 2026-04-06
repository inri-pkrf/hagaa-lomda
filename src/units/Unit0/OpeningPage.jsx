import React, { useEffect } from 'react';
import './Styles/OpeningPage.css';
import { useNavigate } from 'react-router-dom';

function OpeningPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // פונקציה שמאזינה ללחיצה על חץ "הבא" הכללי
    const handleNext = (e) => {
      // בדף הפתיחה אין צעדים פנימיים, אז אנחנו פשוט נותנים לחץ הכללי לעשות את שלו
      // או שאנחנו יכולים לנווט ידנית אם אנחנו רוצים לוודא שזה קורה:
      navigate('/info-lomda');
    };

    window.addEventListener('onNextNav', handleNext);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [navigate]);

  return (
    <main className="OpeningPage">
      <img
        className='openingPage-building'
        src={`${process.env.PUBLIC_URL}/assets/General/mainBuilding.png`}
        alt="Pakar Logo"
      />
      
      {/* כפתור התחלה מקורי בהערה - החצים הכלליים מחליפים אותו כעת */}
      {/* <button className="start-button-openingPage" onClick={() => navigate('/info-lomda')}>
        כפתור התחלה לבינתיים
      </button> 
      */}
    </main>
  );
}

export default OpeningPage;