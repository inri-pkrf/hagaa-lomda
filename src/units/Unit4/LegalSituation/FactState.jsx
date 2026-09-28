import React from "react";
import "../../Unit4/style/FactState.css";

function FactState() {
  return (
    <div className="FactState-container">
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/rockets-attack-background1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 id="FactState-headline">מצב עובדתי</h2>

        <p id="FactState-sub-text">שעת התקפה</p>

        <p id="FactState-text1">
          פרק זמן בו מתרחשת התקפה, כמצב עובדתי, זמן זה מוגבל עד 24 שעות בכל פעם
          ובשלב זה מתקיימות פעולות התגוננות הנתונות לשיקול דעת הגורמים
          המוסמכים.
        </p>

        <p id="FactState-text2">
          אחריות הפיקוד והשליטה על האירוע היא של צה"ל - פיקוד העורף.
          <div>
            מצב זה מקנה סמכויות לצה"ל/פקע"ר להנחות אוכלוסייה להצלת חיים.
          </div>
        </p>

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/icon-pkar.png`}
          id="icon-pkar-legal"
          alt="memo"
        />
      </div>
    </div>
  );
}

export default FactState;
