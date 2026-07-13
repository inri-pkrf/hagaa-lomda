import React from "react";
import "./style/HowPreper.css";

function Tsunami() {
  return (
    <div className="how-preper-page">
      {/* כותרת הדף והאייקון */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-tsunami.png"
          }
          alt="Tsunami"
          className="page-icon"
        />
        <h2 className="prep-title">במקרה של צונמי</h2>
      </div>

      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח מחיק"
          className="whiteboard-image bottom"
        />
        <div className="simple-content-container">
          <p className="highlighted-paragraph tsunami">
            הכנת מתקנים ותשתיות השוכנים סמוך לחוף הים – הכנת נוהלי תפעול ומילוט,
            סימון דרכי מילוט ושטחי כינוס של העובדים במרחק של 1 ק"מ מהחוף.
          </p>
          <p className="tsunami-text-bottom">
            בשלב ניתוח הסיכונים, חשוב להבין אם לאור מיקום המתקן עליו להיערך
            לתרחיש צונמי. אם רלוונטי, על המתקן להיערך גם בהתאם להנחיות צונמי,
            המחייבות התרחקות מהאזור ועלייה לגובה. הנחיות אלו ייכללו בתוכנית
            המילוט של המתקן ובהדרכות לעובדים.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tsunami;
