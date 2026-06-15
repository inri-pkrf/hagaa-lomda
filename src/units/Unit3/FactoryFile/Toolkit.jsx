import React from "react";
import "../../Unit3/style/Toolkit.css";

function Toolkit() {
  // מערך המכיל את כל הטקסטים לפי הסדר
  const memoItems = [
    "מנחה להיערכות המפעל למצבי חירום  ",
    "עזרים",
    "דרכי תקשורת + קישורים",
    "רשימת מושגים",
    "קישור לחוק הג״א ולתקנות",
    'נוהל "מענה לילדי העובדים החיוניים"',
    "מנחה לאחזקת מקלטים",
    'קישור לסרטון "עזרה ראשונה נפשית"',
    "תקנות אחסנה של חומרים מסוכנים",
    "סדר פעולות",
    "קישור ללומדה מפעלים חיוניים – משרד העבודה",
    "תיק מפעל – למילוי (יופץ בהמשך)",
  ];

  return (
    <div className="toolkit-container">
      {/* שכבות הרקע לאנימציה */}
      <div className="background-shifter">
        <div className="bg-layer bg1"></div>
        <div className="bg-layer bg2"></div>
        <div className="bg-layer bg3"></div>
      </div>

      <div className="toolkit-content">
        <h2 id="toolkit-headline">ארגז כלים לממונה הג”א</h2>
        <p id="toolkit-text1">
          באפשרותך לגשת אל הנהלים והטפסים החשובים שנלמדו ביחידה זו, כל פתקית
          מהווה קישור:
        </p>

        <div className="toolkit-memo-container">
          {memoItems.map((text, index) => (
            <div className="memo-wrapper" key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/toolkit-memo.png`}
                className="toolkit-memo-img"
                alt="memo"
              />
              <p className="memo-inner-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Toolkit;
