import React, { useState, useEffect } from "react";
import "./style/RightBehavior.css";

function RightBehavior() {
  const behaviorData = [
    {
      id: "openField",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/open-field.jpg",
      title: "שטח פתוח",
      alt: "שטח פתוח",
      text: "יש להישאר בשטח פתוח ולהתרחק ממבנים, עצים או עמודי חשמל",
    },
    {
      id: "building",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/building.jpg",
      title: "מבנה",
      alt: "בתוך מבנה ",
      text: 'יש לפעול לפי סדר העדיפויות הבא:\n1. לצאת לשטח פתוח\n2. להיכנס לממ"ד/ממ"ק\n3. לצאת לחדר מדרגות\n4. רק אם לא ניתן לפעול כך, לתפוס מחסה תחת רהיט כבד או בפינה פנימית של החדר',
    },
    {
      id: "vehicle",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/vehicle.jpg",
      title: "בכלי רכב",
      alt: "רכב",
      text: "יש לעצור ולחכות בתוך כלי הרכב",
    },
    {
      id: "beach",
      img: process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/beach.jpg",
      title: "חוף הים",
      alt: "חוף ים",
      text: "יש להתרחק מהחוף ככל האפשר.\n במצבים שלא ניתן להתרחק קילומטר מהחוף, יש לעלות למבנה קרוב בין 4 קומות לפחות",
    },
  ];

  const centralText = "איך פועלים בשעת חירום?";
  const [hoveredItems, setHoveredItems] = useState(() => {
    const saved = sessionStorage.getItem("hoveredRightBehavior");
    return saved ? JSON.parse(saved) : [];
  });

  const [showPopup, setShowPopup] = useState(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenBehaviorPopup");
    return !hasSeenPopup; // אם לא ראה - יחזיר true ויוצג
  });

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenBehaviorPopup", "true");
  };

  const handleHover = (id) => {
    setHoveredItems((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem("hoveredRightBehavior", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  useEffect(() => {
    const allHovered = behaviorData.every((item) =>
      hoveredItems.includes(item.id),
    );

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allHovered }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [hoveredItems]);

  return (
    <div className="behavior-page-wrapper">
      {/* 🔔 פופ-אפ הסבר בתחילת העמוד */}
      {showPopup && (
        <div className="RightBehavior-popup-overlay">
          <div className="RightBehavior-popup-content custom-design">
            {/* מיכל הטקסט של הפופ-אפ */}
            <div className="popup-text-container">
              <h2>הנחיות</h2>
              <p>
                עליכם לעבור עם העכבר מעל התמונות על מנת לגלות על התנהגות נכונה
                בעת רעידת אדמה.
                רק לאחר שתעברו על כל התמונות, תוכלו להמשיך&nbsp;הלאה.{" "}
              </p>
            </div>

            {/* תחתית הפופ-אפ שמחזיקה את כפתור ההמשך מעוצב בפינה השמאלית */}
            <div className="popup-footer">
              <button className="continue-btn-new" onClick={handleClosePopup}>
                הבנתי, בואו נתחיל
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="behavior-grid">
        {behaviorData.map((item) => (
          <div
            key={item.id}
            className="grid-item"
            onMouseEnter={() => handleHover(item.id)}
          >
            <img src={item.img} alt={item.title} className="behavior-image" />

            <div className="hover-overlay">
              <div className="hover-text-box">
                <h3 className="hover-title">{item.title}</h3>
                <p className="hover-text">{item.text}</p>
              </div>
            </div>

            {/* ✅ וי אם עברו על הפריט */}
            {hoveredItems.includes(item.id) && (
              <div className="completion-v">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </div>
        ))}

        <div className="central-static-box">
          <div className="central-title">{centralText}</div>
          <div className="central-disclaimer">
            על המפעל לפעול על פי נוהל החירום אשר יאושר על ידי פיקוד העורף באירוע
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBehavior;
