import React from "react";
import './Styles/FirstPage.css';
import { useNavigate } from "react-router-dom";

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div
      className="FirstPage"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/General/mainBackground.jpg)`
      }}
    >
      <div id="content">
        <h2 id="Title1-FirstPage">ברוכים הבאים והבאות לקורס הכשרה מקוון להסמכת</h2>
        <h1 id="Title2-FirstPage">ממונה התגוננות אזרחית במפעל / מוסד</h1>
        <button id="button-FirstPage" onClick={() => navigate('/info-lomda')}>
          התחלה
        </button>
      </div>

      {/* כפתורי קיצור - למחוק אחר כך */}
      <div className="shortcutButtonsContainer">
        <button className="skipBtn" onClick={() => navigate('/intro-unit-one')}>כפתור קיצור - תוביל אותי פליז לדלתות של יחידה 1</button>
        <button className="skipBtn" onClick={() => navigate('/intro-unit-two')}>כפתור קיצור - תוביל אותי פליז לדלתות של יחידה 2</button>
        <button className="skipBtn" onClick={() => navigate('/intro-unit-three')}>כפתור קיצור - תוביל אותי פליז לדלתות של יחידה 3</button>
        <button className="skipBtn" onClick={() => navigate('/intro-unit-four')}>כפתור קיצור - תוביל אותי פליז לדלתות של יחידה 4</button>
      </div>
    </div>
  );
}

export default FirstPage;