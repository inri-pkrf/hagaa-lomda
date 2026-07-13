import React, { useState } from "react";
import "../../Unit2/style/ExposureChemical.css";

const exposureCards = [
  { id: 1, title: "ספיגה בעור", icon: "skin" },
  { id: 2, title: "עיניים", icon: "eyes" },
  { id: 3, title: "בליעה", icon: "swallow" },
  { id: 4, title: "שאיפה", icon: "inhalation" },
];

function ExposureChemical() {
  const [hoveredCards, setHoveredCards] = useState([]);

  const handleMouseEnter = (id) => {
    if (!hoveredCards.includes(id)) {
      const updated = [...hoveredCards, id];
      setHoveredCards(updated);

      const allHovered = exposureCards.every((card) =>
        updated.includes(card.id),
      );
      if (allHovered) {
        window.dispatchEvent(
          new CustomEvent("setNextBtnDisabled", { detail: false }),
        );
      }
    }
  };

  // חסום כפתור אחורה בטעינה
  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);

  return (
    <div className="exposure-wrapper">
      <div className="exposure-header-section">
        <h1>דרכי חשיפה</h1>
        <p>
          אירוע חומרים מסוכנים אינו בהכרח מורגש או נראה לעין ולכן בהתרחש אירוע
          כזה, נדרשות פעולות ניטור וזיהוי.{" "}
          <strong>
            <br></br>יש לעבור עם העכבר
          </strong>{" "}
          מעל כל כרטיסייה כדי לגלות באיזו פעולה מדובר.
        </p>
      </div>
      <div className="exposure-grid">
        {exposureCards.map((card) => {
          const isHovered = hoveredCards.includes(card.id);
          return (
            <div
              key={card.id}
              className="exposure-card"
              onMouseEnter={() => handleMouseEnter(card.id)}
            >
              <div className="exposure-card-inner">
                {isHovered && (
                  <div className="exposure-done-check">
                    <svg viewBox="0 0 24 24" width="3vw" height="4vh">
                      <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                      <polyline
                        points="20 6 9 17 4 12"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                )}
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/exposure/${card.icon}.png`}
                  alt={card.title}
                  className="exposure-icon"
                />
                <p className="exposure-title">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExposureChemical;
