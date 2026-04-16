import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/DefensePolicy.css";


function SubOneDefensePolicy() {
  const navigate = useNavigate();


  // כאן את מגדירה לאן הכפתור יעבור
  const handleNext = () => {
    navigate("/defense-policy/sub-two");
  };


  return (
    <div className="defense-policy-page">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CourtGavel.png`}
        className="gavel-background"
        alt=""
        aria-hidden="true"
      />


      <div className="policy-content-container">
        <h1 className="policy-main-title">מדיניות התגוננות - הסמכות החוקית</h1>


        <h2 className="policy-sub-title">לשון החוק - סעיף 9ד:</h2>


        <div className="quote-container">
          <span className="quote-icon-top">❝</span>
          <p className="quote-text">
            ...רשאים הרמטכ"ל, סגנו, ראש אגף המטה הכללי בצבא ההגנה לישראל, ראש
            הג"א או קצין בצבא הגנה לישראל שדרגתו אלוף המשמש בתפקיד אלוף פיקוד
            לגבי המרחב שעליו הוא ממונה לתת, ככל שהדבר דרוש, לכל אדם, לסוג בני
            אדם או לציבור כולו, כל הוראה הנדרשת לשמירתם או להצלתם של חיי אדם או
            של רכוש.
          </p>
          <span className="quote-icon-bottom">❞</span>
        </div>


        {/* הכפתור החדש */}
        <button className="policy-next-button" onClick={handleNext}>
          הבנתי, המשך
        </button>
      </div>
    </div>
  );
}


export default SubOneDefensePolicy;

