import React from "react";
import "./style/HowPreper.css";

function Escape() {
  // 4 האייקונים החדשים של תוכנית המילוט
  const escapeItems = [
    {
      id: "route",
      title: "איתור וסימון מקומות בטוחים ומסוכנים בעת רעידת אדמה",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/location.png",
    },
    {
      id: "meeting",
      title: "סימון צירי התנועה והיציאה מהמבנה דרך פתחי חירום לשטחים פתוחים",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/signExit.png",
    },
    {
      id: "assembly",
      title: "הגדרת שטחי היערכות מחוץ למבנים",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/outdoor.png",
    },
    {
      id: "drill",
      title: "הגדרת שטחי כינוס מחוץ לשטח המפעל",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/outsideFactory.png",
    },
  ];

  return (
    <div className="how-preper-page">
      {/* כותרת הדף והאייקון */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-escape-plan.png"
          }
          alt="Escape"
          className="page-icon"
        />
        <h2 className="prep-title">הכנת תוכנית מילוט</h2>
      </div>

      {/* הלוח המחיק */}
      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח למידה"
          className="whiteboard-image bottom"
        />

        <div className="escape-bold-text-top">
          כחלק מהיערכות המפעל לרעידת אדמה יש דרישה להכין תוכנית מילוט מהמבנים
          לשטחים פתוחים. תוכנית זו תכלול:
        </div>

        {/* 4 האייקונים מסודרים בשורה על הלוח */}
        <div className="escape-items-container">
          {escapeItems.map((item) => (
            <div key={item.id} className="escape-item">
              <img src={item.img} alt={item.title} className="escape-icon" />
              <p className="escape-text">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="escape-bold-text-bottom">
          יש לשלט את דרכי המילוט בתוך המבנים במפעל כדי להכווין את העובדים וכן את
          האורחים המזדמנים
        </div>
      </div>
    </div>
  );
}

export default Escape;
