import React from "react";
import "./style/HowPreper.css";

function Risk() {
  return (
    <div className="how-preper-page">
      {/* כותרת הדף והאייקון */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-risk-assessment.png"
          }
          alt="Risk"
          className="page-icon"
        />
        <h2 className="prep-title">ניתוח סיכונים במפעל</h2>
      </div>

      {/* הלוח */}
      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח למידה"
          className="whiteboard-image bottom"
        />
        <div className="risk-content">
          <h2 className="risk-title">
            ניתוח סיכונים במתקן ובניית תוכנית היערכות ומענה הכוללת תוכנית מילוט
          </h2>

          <ul className="risk-list">
            <li>
              ניתוח הסיכונים כולל התייחסות ל-מיקום המתקן, סוג הקרקע, שנת בנייה,
              המהווים מדדים להעריך את עמידות המתקן.
            </li>
            <li>
              בחינת נקודות תורפה בתוך המתקן ובסביבה (מס' דרכי גישה, גשרים, חומ"ס
              וכו').
            </li>
            <li>גיבוש תרחיש שעלול להתרחש וכתיבת תוכנית מענה. </li>
            <li>
              נוהל חירום ותוכניות היערכות הכוללים הכשרת עובדים, רכש ציוד,
              רענון, תרגול, הדרכות ועוד.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Risk;
