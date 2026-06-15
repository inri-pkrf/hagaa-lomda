import React, { useState, useEffect, useRef } from "react";
import "../../Unit4/style/RoutineToEmergency.css";

function ExplainationRTE() {
  // ניהול המצב: שגרה, חירום, או הצגת תוכן
  const [step, setStep] = useState("routine");
  const [activePopup, setActivePopup] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const listRef = useRef(null);

  // כותרת ראשית לסינכרון עם שאר הלומדה
  sessionStorage.setItem("MainTitle", "מעבר משגרה לחירום");

  useEffect(() => {
    // מעבר למסך חירום (הבהוב) אחרי שנייה אחת
    const emergencyTimer = setTimeout(() => {
      setStep("emergency");
    }, 3000);

    // מעבר למסך התוכן הסופי אחרי 4 שניות סה"כ
    const contentTimer = setTimeout(() => {
      setStep("content");
    }, 6000);

    return () => {
      clearTimeout(emergencyTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // בדיקה האם הרשימה בפופאפ ארוכה מדי ומצריכה גלילה
  useEffect(() => {
    if (activePopup && listRef.current) {
      const { scrollHeight, clientHeight } = listRef.current;
      setIsScrollable(scrollHeight > clientHeight);
    }
  }, [activePopup]);

  // נתוני התוכן עבור הפופאפים
  const popupData = {
    infrastructure: {
      title: "ציוד ותשתיות",
      img: `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency/card1.jpg`,
      actions: [
        "הכנת המרחבים המוגנים",
        "בדיקת ציוד צוותי חירום",
        "וידוא שלטי צירי תנועה",
        "בדיקת מערכות כריזה/ התראה",
        "נטרול והקטנת מלאי חומרים מסוכנים- בהתאם להנחיות מקצועיות",
        "בדיקת ציוד לרציפות תפקודית (מים, מזון, דלק וכו’)",
        "בחינת הצורך לקדם רכש אמצעים",
        "בדיקת מוכנות להפעלת מסגרות לילדי העובדים",
      ],
    },
    hr: {
      title: "כוח אדם",
      img: `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency/card2.jpg`,
      actions: [
        "תדרוך ותרגול העובדים",
        "תדרוך ותרגול הצוותים",
        "פרסום הנחיות התנהגות לעובדים",
        "היערכות להפעלת ריתוק משקי/ חוזים נצורים",
      ],
    },
    external: {
      title: "גורמי חוץ",
      img: `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency/card3.jpg`,
      actions: [
        'חבירה לגורמי החירום (משטרת ישראל, מד"א, כבאות והצלה, פיקוד העורף)',
        "חבירה למפעלים סמוכים",
      ],
    },
  };

  const routineImg = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency/routine-bg.jpg`;
  const emergencyImg = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency/emergency-bg.jpg`;

  const [selectedCards, setSelectedCards] = useState([]);

  // ✔ קודם מחשבים את זה
  const allCardsClicked =
    selectedCards.length === Object.keys(popupData).length;

  const handleCardClick = (key) => {
    setActivePopup(popupData[key]);

    if (!selectedCards.includes(key)) {
      setSelectedCards([...selectedCards, key]);
    }
  };

  // ✔ ורק אז useEffect
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", {
        detail: !allCardsClicked,
      }),
    );
  }, [allCardsClicked]);

  // שלב התוכן הסופי (אחרי האנימציה)
  if (step === "content") {
    return (
      <div className="final-content-screen">
        <div className="header-section">
          <h1 className="rte-title">תיאור מקרה</h1>
          <div className="description-text">
            <p>
              על רקע תקיפות חיל האוויר ברצועת עזה לפנות בוקר בהמשך לירי רקטות,
              החליט שר הביטחון להכריז על מצב מיוחד בעורף עד לטווח 40 ק”מ.{" "}
              <br></br>
              <strong>יש ללחוץ </strong>על האיורים לצפייה בפעולות שעליכם לקדם
              כחלק ממוכנות המפעל.
            </p>
          </div>
        </div>

        <div className="cards-row">
          {[
            { key: "infrastructure", label: "ציוד ותשתיות" },
            { key: "hr", label: "כוח אדם" },
            { key: "external", label: "גורמי חוץ" },
          ].map((item) => (
            <div
              key={item.key}
              className="action-card"
              onClick={() => handleCardClick(item.key)}
            >
              <img src={popupData[item.key].img} alt={item.label} />

              <span>{item.label}</span>

              {/* וי נשאר אחרי לחיצה */}
              {selectedCards.includes(item.key) && (
                <div
                  className="completion-v "
                  id={`completion-v-ExplainationRTE`}
                >
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

        {/* מנגנון הפופאפ והחשכת הרקע */}
        {activePopup && (
          <div className="modal-overlay" onClick={() => setActivePopup(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                id="close-ExplainationRTE"
                className="continue-btn-new"
                onClick={() => setActivePopup(null)}
              >
                סגור
              </button>

              <div className="modal-header">
                <img src={activePopup.img} alt="icon" className="modal-icon" />
                <div className="title-area">
                  <h2 className="modal-title">{activePopup.title}</h2>
                  {isScrollable && (
                    <span className="scroll-hint">יש לגלול מטה להמשך</span>
                  )}
                </div>
              </div>

              <ul className="modal-list" ref={listRef}>
                {activePopup.actions.map((action, index) => (
                  <li key={index}>
                    <span className="bullet-icon">💡</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  // רנדור שלבי המעבר (שגרה וחירום עם הבהוב)
  return (
    <div
      className={`routine-container ${step === "emergency" ? "flash-red" : ""}`}
      style={{
        backgroundImage: `url(${step === "emergency" ? emergencyImg : routineImg})`,
      }}
    />
  );
}

export default ExplainationRTE;
