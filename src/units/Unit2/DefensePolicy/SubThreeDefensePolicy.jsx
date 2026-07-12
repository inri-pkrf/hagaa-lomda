import React from "react";
import "../style/DefensePolicy.css";

function SubThreeDefensePolicy() {
  return (
    <div className="defense-policy-page">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CourtGavel.webp`}
        className="gavel-background"
        alt=""
        aria-hidden="true"
      />

      <p id="defense-tasks-sub">משימותיך כממונה הג"א - מדיניות התגוננות</p>
      <ol id="defense-tasks-list">
        <li>בזמן חירום יש להכיר את מדיניות ההתגוננות שבו נמצא המפעל</li>
        <li>
          במפעל חיוני- גזירת מדיניות ההתגוננות מתבצעת על ידי ממונה הג"א מול
          הרשות הייעודית
        </li>
        <li>במתקנים אחרים- יש לגזור את המשמעויות בהתאם למדיניות שהופצה</li>
        <li>
          על ממונה ההג"א לתווך את ההנחיות לעובדים ולייעץ למנהל המתקן כיצד לפעול
          בהתאם להנחיות הרשמיות
        </li>
      </ol>
    </div>
  );
}

export default SubThreeDefensePolicy;
