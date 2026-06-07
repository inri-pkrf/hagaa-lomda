import React, { useState } from "react";
import "../../Unit2/style/actionsChemical.css";

const ActionsChemical = () => {
  const basePath = process.env.PUBLIC_URL;
  const imagesPath = `${basePath}/assets/UnitTwoImgs/chemical/actions`;

  const signs = [
    { text: "דיווח לרשות הארצית לכבאות והצלה", flip: true },
    {
      text: "דיווח למשרד להגנת הסביבה\n(לא יאוחר מ-15 דקות מהתרחשות האירוע)",
      flip: false,
    },
    { text: "התמגנות בהתאם לסיכוני החומר", flip: true },
    { text: "חבירה של צוות חירום לצוות כיבוי לצורך טיפול במוקד", flip: false },
  ];

  return (
    <div
      className="hazard-screen"
      style={{
        backgroundImage: `url('${imagesPath}/chemical-bottom-bg.webp')`,
      }}
    >
      <h1 id="chemical-actions-title" className="chemical-causes-title">
        סדר פעולות
      </h1>
      <p id="actions-instruction-text" className="chemical-second">
        לאחר קריאת הפעולות המוצגות, {""}
        <strong>ניתן לעבור עם העכבר </strong>
        על השלטים הצדדיים בתחתית המסך לקבלת מידע והרחבה נוספת. {""}
      </p>

      <div className="center-wrapper">
        <img src={`${imagesPath}/center-pole.png`} className="center-pole" />

        {signs.map((sign, index) => (
          <div className="sign-item" key={index}>
            <img
              src={`${imagesPath}/sign2.webp`}
              style={{ transform: sign.flip ? "scaleX(-1)" : "none" }}
            />
            <span className="sign-text">
              {sign.text.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < sign.text.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* שלט צד שמאל */}
      <div className="side-btn left">
        <div className="btn-header-wrapper">
          <span className="btn-icon">📖</span>
          <span className="btn-title">לעיון והרחבה</span>
        </div>
        <div className="speech-bubble">
          לעיונכם: ראו תקנות אחזקת חומרים מסוכנים. בכרטיסיות הסיכום של יחידה זו
          יופיעו מספרי הטלפון. מומלץ לשמור אותם לשעת חירום.
        </div>
        <img src={`${imagesPath}/sign-btn2.png`} alt="sign" />
      </div>

      {/* שלט צד ימין */}
      <div className="side-btn right">
        <div className="btn-header-wrapper">
          <span className="btn-icon">❓</span>
          <span className="btn-title">לעזרה ופורמטים</span>
        </div>
        <div className="speech-bubble">
          לא בטוחים לגבי סדר הפעולות? בקשו פורמט מפורט של נוהל חירום מקציני
          החומרים המסוכנים המחוזיים של פיקוד העורף.
        </div>
        <img src={`${imagesPath}/sign-btn2.png`} alt="sign" />
      </div>
    </div>
  );
};

export default ActionsChemical;
