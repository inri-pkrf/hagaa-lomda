import React from "react";
import "../../Unit4/style/LegalState.css";

function LegalState() {
  return (
    <div className="LegalState-container">
      <h2 id="LegalState-headline"> מצב משפטי</h2>
      <p id="LegalState-sub-text"> מצב מיוחד בעורף </p>
      <p id="LegalState-text1">
        פרק זמן התלוי בהכרזה של הדרג המדיני.<br></br> וכולל רציפות - הנחיה רצופה בהתאם
        לאישור הדרג המדיני.<br></br> תיחום המרחב - גם כן נקבע על ידי הדרג המדיני.{" "}
        <br></br> וריתוק משקי - בסמכות שר העבודה להורות על ריתוק עובדים.
      </p>
      <p id="LegalState-text2">
        אחריות פיקוד ושליטה על האירוע היא של צה"ל - פיקוד העורף לאחר הכרזה של
        הממשלה - ישנה הפעלה אוטומטית של פרקי הזמן של מערך המל"ח (משק לשעת חירום)
        <div>
          המקנה בין היתר סמכות לצה"ל/פקע"ר לפרסם הנחיות התגוננות לאוכלוסייה
          ולמשק.
        </div>
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/icon-pkar.png`}
        id="icon-pkar-legal"
        alt="icon"
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/icon-legalState.webp`}
        id="LegalState-img"
        alt="icon"
      />
    </div>
  );
}

export default LegalState;
