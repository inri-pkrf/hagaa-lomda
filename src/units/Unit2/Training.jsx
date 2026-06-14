import React from "react";
import "./style/HowPreper.css";

const Training = () => {
  const cards = [
    {
      img: "/assets/UnitTwoImgs/earthquake/training1.png",
      text: "עדכון העובדים על צוותי חירום במפעל ומיקום אמצעי החירום",
    },
    {
      img: "/assets/UnitTwoImgs/earthquake/training2.png",
      text: "עדכון עובדים בתוכניות המילוט ושטחי כינוס",
    },
    {
      img: "/assets/UnitTwoImgs/earthquake/training3.png",
      text: "הדרכת עובדים לגבי הנחיות התנהגות ברעידת אדמה",
    },
  ];

  return (
    <div className="how-preper-page">
      {/* כותרת */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-training.png"
          }
          alt="Training Icon"
          className="page-icon"
        />
        <h2 className="prep-title">הדרכת עובדים</h2>
      </div>

      {/* לוח */}
      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח למידה"
          className="whiteboard-image bottom"
        />
        <div className="training-content">
          {/* כאן הפסקה במקום הרשימה */}
          <p className="training-paragraph">
            הדרכת עובדים על התנהגות נכונה באירוע, כולל – הנחיות גנריות להתנהגות
            ברעידת אדמה, הנחיות פרטניות במתקן, לרבות דרכי מילוט ושטחי כינוס,
            מידע על צוותי חירום במפעל ומיקום אמצעי החירום. נדרש לקיים הדרכה
            ותרגול אחת לתקופה.
            <br></br>
            הכרת כללי ההתנהגות הנכונה באירוע וידע בהגשת עזרה ראשונה הינם חלק
            משמעותי בהיערכות לרעידת אדמה.
          </p>

          {/* שורת 3 התמונות */}
          <div className="training-images-row">
            {cards.map((card, i) => (
              <div className="training-card" key={i}>
                {/* התמונה - היא הרקע של הקארד */}
                <img
                  src={process.env.PUBLIC_URL + card.img}
                  alt={card.text}
                  className="card-bg"
                />

                {/* הטקסט שמולבש על התמונה */}
                <div className="card-overlay-text">{card.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
