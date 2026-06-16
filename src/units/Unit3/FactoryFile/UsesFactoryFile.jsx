import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit3/style/UsesFactoryFile.css";

const STORAGE_KEY = "factoryCompleted";
const POPUP_SEEN_KEY = "factoryPopupSeen";

const steps = [
  { id: "1", text: "1/4", active: "item1" },
  { id: "2", text: "2/4", active: "item2" },
  { id: "3", text: "3/4", active: "item3" },
  { id: "4", text: "4/4", active: "item4" },
];

function UsesFactoryFile() {
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [showPopup, setShowPopup] = useState(() => {
    const seen = sessionStorage.getItem(POPUP_SEEN_KEY);
    return seen ? false : true;
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  // שליחת אירוע לכפתור קדימה + סימון frame 1 ב-FactoryFile כשהכל הושלם
  useEffect(() => {
    const allDone = completed.length === steps.length;
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allDone }),
    );

    if (allDone) {
      // סימון שframe 1 של FactoryFile הושלם — הוי יופיע בחזרה ל-FactoryFile
      sessionStorage.setItem("factoryFrame1Completed", "true");
      sessionStorage.setItem("FactoryFile-sub1-finished", "finished");
    }
  }, [completed]);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem(POPUP_SEEN_KEY, "true");
  };

  const items = [
    {
      id: "item1",
      img: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/factory-file.png`,
      top: "11%",
      left: "8%",
      width: "13vw",
      height: "24vh",
    },
    {
      id: "item2",
      img: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/factory-file.png`,
      top: "40%",
      left: "8%",
      width: "13vw",
      height: "24vh",
    },
    {
      id: "item3",
      img: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/factory-file.png`,
      top: "40%",
      left: "20.5%",
      width: "13vw",
      height: "24vh",
    },
    {
      id: "item4",
      img: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/factory-file.png`,
      top: "12%",
      left: "20.5%",
      width: "13vw",
      height: "24vh",
    },
  ];

  const activeIndex = completed.length;
  const activeStep = steps[activeIndex];

  const handleClick = (id) => {
    if (showPopup) return;

    const stepForItem = steps.find((s) => s.active === id);
    if (!stepForItem) return;

    if (completed.includes(stepForItem.id)) {
      navigate(`/unit3/factory/${stepForItem.id}`);
      return;
    }

    if (!activeStep || id !== activeStep.active) return;

    setCompleted((prev) => {
      const next = [...prev, activeStep.id];
      return Array.from(new Set(next));
    });
    navigate(`/unit3/factory/${activeStep.id}`);
  };

  return (
    <div className="UsesFactoryFile-main">
      {showPopup && (
        <div className="factory-popup-overlay">
          <div className="factory-popup-content">
            <h3>הנחיות </h3>
            <p>
              לפניכם מוצגים 4 שלבים ביצירת תיק מפעל. <br />
              עליכם לקרוא תחילה את המבוא ולאחר מכן ללחוץ על התיק המהבהב כדי
              ללמוד על השלב הרלוונטי בתיק המפעל. <br />
              בסיום כל פרק, התיק יסומן ב-✔ וייפתח הפרק הבא.
            </p>
            <button className="popup-close-btn" onClick={closePopup}>
              {" "}
              הבנתי{" "}
            </button>
          </div>
        </div>
      )}

      <h2 id="UsesFactoryFile-text1"> מבוא </h2>
      <p className="orange-box" id="UsesFactoryFile-text2">
        התיק משמש ככלי מסייע לתכנון, לארגון ולניהול של פעילות ההתגוננות במוסד
        ברגיעה ובחירום. התיק מאגד את כלל הנהלים ועקרונות ההפעלה בשעת חירום
        במפעל, ויכלול מידע ונתונים חיוניים לגבי רציפות התפקוד של המפעל, מערך
        הביטחון ותוכנית התגוננות.
      </p>
      <p className="orange-box" id="UsesFactoryFile-text3">
        אחת מהמשימות המרכזיות והמשמעותיות של ממוני הג"א הינה לכתוב את התיק בזמן
        שגרה, בהתאם לצרכי המפעל ולאשרו אצל המנהל.
      </p>

      {completed.length === 0 && (
        <p id="UsesFactoryFile-text4">
          יש ללחוץ על התיק המהבהב כדי להתחיל בפרק הראשון
        </p>
      )}

      <p id="UsesFactoryFile-finishText">
        {activeStep ? activeStep.text : "כל השלבים הושלמו!"}
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/factoryFile-bg.webp`}
        className="background"
        alt="background"
      />

      {items.map((item) => {
        const stepForItem = steps.find((s) => s.active === item.id);
        const isCompleted = stepForItem && completed.includes(stepForItem.id);
        const isActive = item.id === activeStep?.active;

        const className = isActive
          ? "overlay blinking"
          : isCompleted
            ? "overlay completed"
            : "overlay disabled";

        return (
          <div
            key={item.id}
            style={{ position: "absolute", top: item.top, left: item.left }}
          >
            <img
              src={item.img}
              className={className}
              style={{ width: item.width, height: item.height }}
              onClick={() => handleClick(item.id)}
              alt={item.id}
            />
            {isCompleted && <span className="checkmark">✔</span>}
          </div>
        );
      })}
    </div>
  );
}

export default UsesFactoryFile;
