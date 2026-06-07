import React from "react";
import "./style/HowPreper.css";


function Emergency() {
  return (
    <div className="how-preper-page">
      {/* כותרת הדף והאייקון */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-emergency-kit.png"
          }
          alt="Escape"
          className="page-icon"
        />
        <h2 className="prep-title">הכנת ציוד חירום</h2>
      </div>


      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="הכנת ציוד חירום"
          className="whiteboard-image bottom"
        />
        <div className="simple-content-container">
          <p className="highlighted-paragraph">
            הכנת ציוד לשעת חירום במקום נגיש אשר יאפשר להסתדר 72 שעות עד להגעת
            הסיוע - יפורט ביחידה הבאה
          </p>
        </div>
      </div>
    </div>
  );
}


export default Emergency;



