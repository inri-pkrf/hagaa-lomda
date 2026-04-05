import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goalsData from '../Data/GoalsData';
import headerData from '../Data/HeaderData';
import './Styles/Goals.css';


function Goals() {
  const navigate = useNavigate();
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitOne'; // default to UnitOne if not set
  const data = goalsData[currentUnit];


  // מתי נראה
  const [visibleGoals, setVisibleGoals] = useState([]);


  // כל פעם שנרצה לשנות את הכותרת של היחידה נשנה ככה
  sessionStorage.setItem('MainTitle', data ? data.title : '');


  // Animate goals one by one on mount
  useEffect(() => {
    if (data && data.goals && data.goals.length > 0) {
      // Reset visibility
      setVisibleGoals([]);


      // Show goals one by one with delay
      data.goals.forEach((_, index) => {
        setTimeout(() => {
          setVisibleGoals(prev => [...prev, index]);
        }, 300 + (index * 500)); // 300ms initial delay, then 500ms between each
      });
    }
  }, [data]);


  if (!data) {
    return <div>Goals data not found for {currentUnit}</div>;
  }


  const { title, subtitle, goals, buttonText, navigateTo, colors } = data;
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


      {/*  אנימציה של המטרות */}
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


     <button
        className="goals-button"
        onClick={() => {
          // 1. עדכון המפתח והערך שיתאימו ל-Sidebar
          sessionStorage.setItem('unitOne-goals', 'finished');
         
          // 2. שליחת האירוע לעדכון ה-Sidebar בזמן אמת
          window.dispatchEvent(new Event('updateNavbar'));
         
          // 3. ניווט לדף הבא (היערכות לאיומים)
          navigate(navigateTo);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}


export default Goals;

