import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goalsData from '../Data/GoalsData';
import headerData from '../Data/HeaderData';
import './Styles/Goals.css';

function Goals() {
  const navigate = useNavigate();
  
  // שליפת היחידה הנוכחית מהזיכרון - זה הופך את הקומפוננטה לגנרית
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitOne'; 
  const data = goalsData[currentUnit];

  const [visibleGoals, setVisibleGoals] = useState([]);

  // עדכון כותרת ראשית ב-Header לפי הנתונים של היחידה הנוכחית
  useEffect(() => {
    if (data) {
      sessionStorage.setItem('MainTitle', data.title);
    }
  }, [data]);

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

  // --- לוגיקת החצים הכלליים (הבא / חזור) ---
  useEffect(() => {
    const handleNext = (e) => {
      // עצירת הניווט האוטומטי כדי לבצע לוגיקה מותאמת אישית
      e.preventDefault();

      // עדכון ה-SessionStorage בצורה דינמית! 
      // אם אנחנו ביחידה UnitOne, המפתח יהיה unitone-goals
      const storageKey = `${currentUnit.toLowerCase()}-goals`;
      sessionStorage.setItem(storageKey, 'finished');
      
      // שליחת אירוע לעדכון הסיידבר (שיופיע V ליד המטרות)
      window.dispatchEvent(new Event('updateNavbar'));
      
      // ניווט לדף הבא כפי שמוגדר בקובץ הנתונים (למשל למסדרון הדלתות)
      if (data && data.navigateTo) {
        navigate(data.navigateTo);
      }
    };

    // האזנה לאירוע לחיצה על חץ "הבא" בכפתורים הכלליים
    window.addEventListener('onNextNav', handleNext);
    
    return () => {
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [data, navigate, currentUnit]);

  // הגנה למקרה שאין נתונים ליחידה הזו
  if (!data) {
    return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Goals data not found for {currentUnit}</div>;
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
    </div>
  );
}

export default Goals;