import React from "react";
import "../../Unit4/style/FactState.css";

function FactState() {
  return (
    <div className="FactState-container">
      <div>
        <h2 id="FactState-headline"> מצב עובדתי </h2>
        <p id="FactState-sub-text"> שעת התקפה </p>
        <p id="FactState-text1">
          פרק זמן בו מתרחשת התקפה, כמצב עובדתי, זמן זה מוגבל עד 24 שעות בכל פעם
          ובשלב זה מתקיימות פעולות התגוננות הנתונות נתון לשיקול דעת הגורמים
          המוסמכים.
        </p>
        <p id="FactState-text2">
          אחריות הפיקוד והשליטה על האירוע הוא של צה"ל או פיקוד העורף.
          <div>
            מצב זה מקנה סמכויות לצה"ל/פקע"ר להנחות אוכלוסייה להצלת חיים.
          </div>
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/icon-pkar.png`}
          id="icon-pkar-legal"
          alt="memo"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/rockets-factState.webp`}
          id="FactState-img"
          alt="icon"
        />
      </div>
    </div>
  );
}

export default FactState;
