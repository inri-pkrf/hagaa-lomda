import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/SafeRoomExercise.css";

const correctMatches = {
  character1: "shelter2",
  character2: "shelter3",
  character3: "shelter6",
  character4: "shelter3",
};

function SafeRoomExercise() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [placedMatches, setPlacedMatches] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [hiddenCharacters, setHiddenCharacters] = useState({});

  const closePopup = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsExiting(false);
    }, 500);
  };

  // סימון המסגרת כבוצע וחזרה לדף ההורה
  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        // סימון מסגרת SafeRoomExercise כ-בוצע
        const clicked = JSON.parse(
          sessionStorage.getItem("clickedFrames") || "[]",
        );
        if (!clicked.includes(3)) {
          clicked.push(3);
          sessionStorage.setItem("clickedFrames", JSON.stringify(clicked));
        }
        const currentUnlock = parseInt(
          sessionStorage.getItem("unlockedStep"),
          10,
        );
        if (Number.isNaN(currentUnlock) || 4 > currentUnlock) {
          sessionStorage.setItem("unlockedStep", String(4));
        }
        navigate("/rockets");
      }, 2000);
    }
  }, [isCompleted, navigate]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("characterId", id);

    const element = document.getElementById(id);

    const clone = element.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    clone.style.left = "-1000px";

    document.body.appendChild(clone);

    e.dataTransfer.setDragImage(
      clone,
      element.offsetWidth / 2,
      element.offsetHeight / 2,
    );

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const handleDrop = (e, shelterId) => {
    const charId = e.dataTransfer.getData("characterId");

    const charElement = document.getElementById(charId);

    if (correctMatches[charId] === shelterId) {
      setFeedback((prev) => ({ ...prev, [shelterId]: "correct" }));

      // ✔ העלמה אמיתית מהמסך
      if (charElement) {
        charElement.style.display = "none";
      }

      setPlacedMatches((prev) => {
        const updated = { ...prev, [charId]: shelterId };

        const allCorrect = Object.keys(correctMatches).every(
          (key) => updated[key] === correctMatches[key],
        );

        if (allCorrect) {
          setIsCompleted(true);
          sessionStorage.setItem("SafeRoomExerciseComplete", "true");
        }
        return updated;
      });
    } else {
      setFeedback((prev) => ({ ...prev, [shelterId]: "wrong" }));
    }

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, [shelterId]: null }));
    }, 700);
  };

  return (
    <div
      className="game-wrapper"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/SafeRoomExerciseBackground.jpg`}
        id="SafeRoom-background"
      />

      {/* דמויות */}
      {!hiddenCharacters["character1"] && (
        <div
          id="character1"
          className="character"
          draggable
          onDragStart={(e) => handleDragStart(e, "character1")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/OfficeWorkers.png`}
            className="workers"
          />
          <p className="workers-text">עובדים בבניין משרדים</p>
        </div>
      )}

      {!hiddenCharacters["character2"] && (
        <div
          id="character2"
          className="character"
          draggable
          onDragStart={(e) => handleDragStart(e, "character2")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/OpenSpaceWorkers.png`}
            className="workers"
          />
          <p className="workers-text">עובדים בשטח פתוח</p>
        </div>
      )}

      {!hiddenCharacters["character3"] && (
        <div
          id="character3"
          className="character"
          draggable
          onDragStart={(e) => handleDragStart(e, "character3")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/ClinicWorkers.png`}
            className="workers"
          />
          <p className="workers-text">עובדים במרפאה</p>
        </div>
      )}

      {!hiddenCharacters["character4"] && (
        <div
          id="character4"
          className="character"
          draggable
          onDragStart={(e) => handleDragStart(e, "character4")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/WareHouseWorkers.png`}
            className="workers"
          />
          <p className="workers-text">עובדים במחסנים</p>
        </div>
      )}

      {/* מקלטים */}
      <p
        id="shelter1"
        className={`shelters ${feedback["shelter1"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter1")}
      >
        מחסנים - <span className="shelter-bold-text">אין מרחב מוגן במקום</span>
      </p>

      <p
        id="shelter2"
        className={`shelters ${feedback["shelter2"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter2")}
      >
        מבנה משרדים ללא מרחב מוגן,{" "}
        <span className="shelter-bold-text">קיים חדר מדרגות</span>
      </p>

      <p
        id="shelter3"
        className={`shelters ${feedback["shelter3"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter3")}
      >
        מבנה צוות כיבוי ומרפאה -{" "}
        <span className="shelter-bold-text">קיים ממ”ד</span>
      </p>

      <p
        id="shelter4"
        className={`shelters ${feedback["shelter4"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter4")}
      >
        סככות תפעול לוגיסטי -{" "}
        <span className="shelter-bold-text">אין מרחב מוגן במקום</span>
      </p>

      <p
        id="shelter5"
        className={`shelters ${feedback["shelter5"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter5")}
      >
        <span className="shelter-bold-text">מקלט</span>{" "}
      </p>

      <p
        id="shelter6"
        className={`shelters ${feedback["shelter6"] || ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "shelter6")}
      >
        אזור משרדים בניין בן 4 קומות - בקומה השנייה{" "}
        <span className="shelter-bold-text">קיים מרחב מוגן קומתי</span>
      </p>

      {/* פופאפ */}
      {isPopupOpen && (
        <div className="maintenance-popup-overlay">
          <div
            // id="pop-up-SafeRoomExercise"
            className="maintenance-popup-content custom-design"
          >
            <p id="headline-SafeRoomExercise">תרגול מרחבים מוגנים</p>
            <p id="close-SafeRoomExercise-pop-up" onClick={closePopup}>
              ✖
            </p>

            <p
              id="text-SafeRoomExercise"
              className="popup-text-container single-text"
            >
              לפניכם יוצג תרחיש שבו נמצאים כמה אנשים בשעת ירי טילים באזור
              עבודתם הסמוך לכפר סבא (זמן ההתרעה - 90 ש’). בסביבתם קיימים מרחבים
              מוגנים ומבנים אחרים. יש לגרור כל קבוצת אנשים אל המרחב המוגן הקרוב
              ביותר בהתחשב בזמן ההתרעה העומד לרשותם וזה שישמש להם כמרחב הבטוח ביותר.
            </p>

            <p id="text2-SafeRoomExercise">
              <span className="text2-SafeRoomExercise-bold">שימו לב: </span>
              יש להתחשב בזמני המרחק הנתונים בין המבנים.
            </p>
            <p id="text3-SafeRoomExercise">בהצלחה!</p>
            <p id="RocketsExercise-start-btn" onClick={closePopup}>
              {" "}
              להתחלה{" "}
            </p>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="maintenance-popup-overlay">
          <div id="completed-popup">
            <p>🎉 כל הכבוד!</p>
            <p>סיימת בהצלחה את התרגיל</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SafeRoomExercise;
