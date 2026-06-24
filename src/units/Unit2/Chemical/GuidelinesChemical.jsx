import React, { useState, useEffect } from "react";
import "../../Unit2/style/GuidelinesChemical.css";

function GuidelinesChemical() {
  const behaviorData = [
    {
      id: "openField",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/open-field.jpg",
      title: "שטח פתוח",
      alt: "שטח פתוח",
      text: "יש להישאר בשטח פתוח ולהתרחק ממבנים או עצים",
    },
    {
      id: "building",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/building.jpg",
      title: "מבנה",
      alt: "בתוך מבנה ",
      text: "נכנסים לממ״ד, מקלט או חדר פנימי וסוגרים את החלונות, הדלת והמזגן",
    },
    {
      id: "vehicle",
      img:
        process.env.PUBLIC_URL + "/assets/UnitTwoImgs/earthquake/vehicle.jpg",
      title: "בכלי רכב",
      alt: "רכב",
      text: "יש לעצור בבטחה, לסגור את החלונות ולכבות את המזגן",
    },
  ];

  // 🔥 שמירת מה המשתמש עבר עליו
  const [hoveredItems, setHoveredItems] = useState(() => {
    const saved = sessionStorage.getItem("hoveredGuidelinesChemical");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔔 מצב פופ-אפ ייחודי לעמוד החומרים הכימיים
  const [showPopup, setShowPopup] = useState(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenChemicalPopup");
    return !hasSeenPopup; // יוצג רק אם המשתמש לא ראה אותו עדיין בסשן הנוכחי
  });

  // 🔥 סגירת הפופ-אפ ושמירה ב-sessionStorage עם מפתח ייחודי
  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenChemicalPopup", "true");
  };

  // 🔥 כאשר עוברים עם העכבר
  const handleHover = (id) => {
    setHoveredItems((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem(
          "hoveredGuidelinesChemical",
          JSON.stringify(updated),
        );
        return updated;
      }
      return prev;
    });
  };

  // 🔥 הפעלת/כיבוי כפתור NEXT
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
      {/* 🔔 פופ-אפ הסבר ייחודי לעמוד אירוע כימי */}
      {showPopup && (
        <div className="chemical-popup-overlay">
          <div className="chemical-popup-content">
            <h2 className="title"> הנחיות </h2>
            <p>
              עליכם לעבור עם העכבר מעל התמונות, על מנת לגלות על התנהגות נכונה
              בעת חשיפה לחומר מסוכן.
              <br />
              רק לאחר שתעברו על כל התמונות, <br></br>תוכלו להמשיך הלאה.
            </p>
            <button className="chemical-popup-btn" onClick={handleClosePopup}>
              הבנתי, בואו נתחיל
            </button>
          </div>
        </div>
      )}

      <div className="behavior-grid">
        {behaviorData.map((item) => (
          <div
            key={item.id}
            className="grid-item grid-item-chemical"
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
              <div className="completion-v-chemical">
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
        <div className="grid-item-chemical text-container">
          <p>
            לפניכם הנחיות עבור האוכלוסייה הקרובה. על המפעל לפעול על פי נוהל
            החירום אשר יאושר על ידי פיקוד העורף בזמן האירוע.
            <br />
            <strong> יש לעבור עם העכבר </strong>
            על כל אחת מהתמונות בכדי לחשוף את ההנחיות במקומות השונים.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuidelinesChemical;
