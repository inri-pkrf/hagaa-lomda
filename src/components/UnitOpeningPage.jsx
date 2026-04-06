import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import openingData from '../Data/OpeningData';
import './Styles/UnitOpeningPage.css';

function UnitOpeningPage() {
  const navigate = useNavigate();
  const { unitName } = useParams();
  const data = openingData[unitName];

  // --- לוגיקת האזנה לחצים הכלליים ---
  useEffect(() => {
    const handleNext = () => {
      // ביצוע הלוגיקה שהייתה בכפתור
      sessionStorage.setItem('unitOne-opening', 'finished'); 
      window.dispatchEvent(new Event('updateNavbar'));
      navigate("/goals");
    };

    // אנחנו מאזינים רק ל"הבא", כי "חזור" בדף הזה פשוט יחזור אחורה בראוטר כרגיל
    window.addEventListener('onNextNav', handleNext);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [navigate]);

  if (!data) {
    return <div>Unit data not found for {unitName}</div>;
  }

  // Save mainTitle to sessionStorage
  sessionStorage.setItem('MainTitle', data.mainTitle);

  const colors = data.colors;
  
  return (
    <main className="UnitOpeningPage" style={{
      "--card-main": colors.main,
      "--card-layer1": colors.layer1,
      "--card-layer2": colors.layer2,
      "--card-text": colors.text
    }}>
      <img
        className='UnitOpeningPage__building'
        src={`${process.env.PUBLIC_URL}${data.image}`}
        alt={`${unitName} Image`}
      />

      <div className='UnitOpeningPage_cards'>
        <h1 className="UnitOpeningPage__title">{data.title}</h1>
        <p className="UnitOpeningPage__subtitle">{data.subtitle}</p>
        <p className="UnitOpeningPage__text">{data.text}</p>
      </div>

      {/* הכפתור הישן בהערה - הניווט עובר לחצים הכלליים */}
      {/* <button
        className="start-button-unitOpeningPage"
        onClick={() => {
          sessionStorage.setItem('unitOne-opening', 'finished'); 
          window.dispatchEvent(new Event('updateNavbar'));
          navigate("/goals");
        }}
      >
        {data.buttonText}
      </button> 
      */}
    </main>
  );
}

export default UnitOpeningPage;