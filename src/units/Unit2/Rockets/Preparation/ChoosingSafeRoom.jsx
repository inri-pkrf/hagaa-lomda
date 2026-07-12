import React, { useState, useEffect } from "react";
import "../../style/ChoosingSafeRoom.css";
import FlipCard from "../flipCard";

const openWebsitePopup = () => {
  window.open(
    "https://www.oref.org.il/heb/articles/info/preparing-protected-space/1200",
    "popupWindow",
    "width=1200,height=800,top=100,left=200,resizable=yes,scrollbars=yes",
  );
};

function ChoosingSafeRoom() {
  const safeRoomPriorities = [
    {
      id: 1,
      priority: "1",
      title: "מרחב מוגן",
      description: `ממ"ד, ממ"ק או ממ"מ (מרחב מוגן דירתי, קומתי או מוסדי)`,
      image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/flipcard1.png`,
    },
    {
      id: 2,
      priority: "2",
      title: "מקלט",
      description: `מקלט (משותף או ציבורי)`,
      image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/flipcard2.png`,
    },
    {
      id: 3,
      priority: "3",
      title: "חדר מדרגות",
      description: `מקום טוב באמצע- חדר מדרגות פנימי ובהיעדרו חלל פנימי`,
      image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/flipcard3.png`,
    },
    {
      id: 4,
      priority: "4",
      title: "חדר פנימי",
      description: `בשטח פתוח בדרך- מיגונית ואם לא ניתן, לשכב על הקרקע ולהגן על הראש עם הידיים`,
      image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/flipcard4.png`,
    },
  ];

  // מה כבר נצפה
  const [hoveredCards, setHoveredCards] = useState(() => {
    const saved = sessionStorage.getItem("hoveredSafeRoom");
    return saved ? JSON.parse(saved) : [];
  });

  // כרטיסים שהוי מוצג עליהם
  const [showCheckmarks, setShowCheckmarks] = useState(() => {
    const saved = sessionStorage.getItem("hoveredSafeRoom");
    return saved ? JSON.parse(saved) : [];
  });

  const handleHover = (id) => {
    // אם כבר עברו עליו - לא לעשות שוב
    if (hoveredCards.includes(id)) return;

    // שומר שהכרטיס נצפה
    setHoveredCards((prev) => {
      const updated = [...prev, id];
      sessionStorage.setItem("hoveredSafeRoom", JSON.stringify(updated));
      return updated;
    });

    // דיליי של שנייה לפני הופעת הוי
    setTimeout(() => {
      setShowCheckmarks((prev) => [...prev, id]);
    }, 800);
  };

  // הפעלת NEXT רק אחרי שעברו על הכל
  useEffect(() => {
    const allHovered = safeRoomPriorities.every((item) =>
      hoveredCards.includes(item.id),
    );

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allHovered }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [hoveredCards]);

  return (
    <div className="choosing-safe-room-wrapper">
      <h2 id="choosingSafeRoom-headline"> בחירת מרחב מוגן </h2>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/ChoosingSafeRoom.png`}
        alt="icon"
        id="choosingSafeRoom-icon"
      />
      <p id="choosingSafeRoom-text1">
        בעת קבלת התרעה על ירי רקטות וטילים, יש להיכנס למרחב מוגן בזמן ההתגוננות
        העומד לרשותנו, בהתאם לסדר עדיפויות. <br></br> <strong>יש לעבור</strong>{" "}
        על הכרטיסיות עם העכבר על מנת לחשוף את סדר העדיפויות.
      </p>
      <p id="choosingSafeRoom-text2">
        תכנון קיבולת אדם למבנה: יש להקצות 1.25 מ"ר לאדם במרחב מוגן. במוסדות
        חינוך יש להקצות 0.5 מ"ר למרחב מוגן.
      </p>
      <p id="website-link" onClick={openWebsitePopup}>
        לחצו כאן להנחיות לבחירת המרחב המוגן
      </p>
      <div className="flip-cards-container">
        {safeRoomPriorities.map((priority) => (
          <div
            key={priority.id}
            onMouseEnter={() => handleHover(priority.id)}
            style={{ position: "relative" }}
          >
            <FlipCard
              priority={priority.priority}
              title={priority.title}
              description={priority.description}
              image={priority.image}
            />

            {/* ✔ וי */}
            {showCheckmarks.includes(priority.id) && (
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
      </div>
    </div>
  );
}

export default ChoosingSafeRoom;
