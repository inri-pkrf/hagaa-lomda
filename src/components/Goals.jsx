import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goalsData from '../Data/GoalsData';
import headerData from '../Data/HeaderData';
import './Styles/Goals.css';

function Goals() {
  const navigate = useNavigate();
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitOne'; 
  const data = goalsData[currentUnit];

  const [visibleGoals, setVisibleGoals] = useState([]);

  // עדכון כותרת ראשית
  sessionStorage.setItem('MainTitle', data ? data.title : '');

  // אנימציה של המטרות בכניסה לדף
  useEffect(() => {
    if (data && data.goals && data.goals.length > 0) {
      setVisibleGoals([]);
      data.goals.forEach((_, index) => {
        setTimeout(() => {
          setVisibleGoals(prev => [...prev, index]);
        }, 300 + (index * 500));
      });
    }
  }, [data]);

  // --- לוגיקת החצים הכלליים: מחליפה את הכפתור המקורי ---
  useEffect(() => {
    const handleNext = (e) => {
      // 1. עצירת הניווט האוטומטי כדי לבצע את הפקודות של הכפתור הישן
      e.preventDefault();

      // 2. הפקודות שהיו בכפתור: עדכון ה-Session כדי שהסיידבר ידע שהפרק נגמר
      sessionStorage.setItem('unitOne-goals', 'finished');
      
      // 3. שליחת האירוע שמעדכן את הסיידבר ויזואלית (מוסיף V)
      window.dispatchEvent(new Event('updateNavbar'));
      
      // 4. ניווט לדף הבא כפי שמוגדר ב-Data
      if (data && data.navigateTo) {
        navigate(data.navigateTo);
      }
    };

    // האזנה לחץ הבא
    window.addEventListener('onNextNav', handleNext);
    
    return () => {
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [data, navigate]);

  if (!data) {
    return <div>Goals data not found for {currentUnit}</div>;
  }

  const { subtitle, goals, colors } = data;
  const headerColor = headerData[currentUnit]?.backgroundColor || colors.main;

  return (
    <div
      className="Goals"
      style={{
        '--main-color': colors.main,
        '--layer1-color': colors.layer1,
        '--layer2-color': colors.layer2,
        '--text-color': colors.text
      }}
    >
      <p className="goals-subtitle">{subtitle}</p>

      <div className="goals-list">
        {goals && goals.map((goal, index) => (
          <div
            key={index}
            className={`goal-item ${index >= 3 ? 'second-row' : 'first-row'} ${visibleGoals.includes(index) ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="goal-cloud"
              style={{ borderColor: headerColor }}
            />
            <span className="goal-text">{goal}</span>
          </div>
        ))}
      </div>

      {/* הכפתור המקורי נשאר בהערה - החץ מחליף אותו לחלוטין */}
      {/* <button
        className="goals-button"
        onClick={() => {
          sessionStorage.setItem('unitOne-goals', 'finished');
          window.dispatchEvent(new Event('updateNavbar'));
          navigate(navigateTo);
        }}
      >
        {buttonText}
      </button> 
      */}
    </div>
  );
}

export default Goals;