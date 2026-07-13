import React, { useState } from "react";
import "../Unit2/style/EarthquakeExercise.css";

const CORRECT_MATCHES = {
  character1: "shelter7",
  character2: "shelter7",
  character3: "shelter6",
  character4: "shelter7",
};

const CHARACTERS = [
  { id: "character1", img: "OfficeWorkers.png", text: "עובדים בבניין משרדים" },
  { id: "character2", img: "OpenSpaceWorkers.png", text: "עובדים בשטח פתוח" },
  { id: "character3", img: "ClinicWorkers.png", text: "עובדים במרפאה" },
  { id: "character4", img: "WareHouseWorkers.png", text: "עובדים במחסנים" },
];

const SHELTERS = [
  { id: "shelter1", text: "מבנה ישן" },
  { id: "shelter3", text: "אזור פתוח - ליד מבנים ועמודי חשמל" },
  { id: "shelter4", text: "שטח פתוח ליד עצים" },
  { id: "shelter5", text: "מקלט" },
  { id: "shelter6", text: "שטח פתוח" },
  { id: "shelter7", text: "שטח כינוס" },
];

function EarthquakeExercise() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [placedMatches, setPlacedMatches] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [hiddenCharacters, setHiddenCharacters] = useState({});

  const playPopSound = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/pop.mp3`);
    audio.play().catch((err) => console.log("Audio play blocked"));
  };

  const closePopup = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsExiting(false);
    }, 500);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("characterId", id);
    const element = document.getElementById(`EarthquakeExercise-${id}`);
    if (element) {
      const clone = element.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.top = "-1000px";
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(
        clone,
        element.offsetWidth / 2,
        element.offsetHeight / 2,
      );
      setTimeout(() => document.body.removeChild(clone), 0);
    }
  };

  const handleDrop = (e, shelterId) => {
    const charId = e.dataTransfer.getData("characterId");

    if (CORRECT_MATCHES[charId] === shelterId) {
      playPopSound();
      setFeedback((prev) => ({ ...prev, [shelterId]: "correct" }));
      setHiddenCharacters((prev) => ({ ...prev, [charId]: true }));

      const updatedMatches = { ...placedMatches, [charId]: shelterId };
      setPlacedMatches(updatedMatches);

      if (Object.keys(CORRECT_MATCHES).every((key) => updatedMatches[key])) {
        setIsCompleted(true);
        sessionStorage.setItem("EarthquakeExerciseComplete", "true");
      }
    } else {
      setFeedback((prev) => ({ ...prev, [shelterId]: "wrong" }));
    }

    setTimeout(
      () => setFeedback((prev) => ({ ...prev, [shelterId]: null })),
      700,
    );
  };

  return (
    <div
      className="EarthquakeExercise-game-wrapper"
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/EarthquakeExercise-bg.webp`}
        id="EarthquakeExercise-background"
        alt="background"
      />

      <div className="EarthquakeExercise-characters-container">
        {CHARACTERS.map(
          (char) =>
            !hiddenCharacters[char.id] && (
              <div
                key={char.id}
                id={`EarthquakeExercise-${char.id}`}
                className="EarthquakeExercise-character"
                draggable
                onDragStart={(e) => handleDragStart(e, char.id)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${char.img}`}
                  className="EarthquakeExercise-workers-img"
                  alt={char.text}
                />
                <p className="EarthquakeExercise-workers-text">{char.text}</p>
              </div>
            ),
        )}
      </div>

      {SHELTERS.map((shelter) => (
        <p
          key={shelter.id}
          id={`EarthquakeExercise-${shelter.id}`}
          className={`EarthquakeExercise-shelters ${feedback[shelter.id] || ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, shelter.id)}
        >
          {shelter.text}
        </p>
      ))}

      {isPopupOpen && (
        <div className="maintenance-popup-overlay">
          <div
            id="EarthquakeExercise-pop-up"
            className={isExiting ? "EarthquakeExercise-popup-exit" : ""}
          >
            <p id="EarthquakeExercise-headline">תרגול רעידת אדמה</p>
            <p id="close-SafeRoomExercise-pop-up" onClick={closePopup}>
              ✖{" "}
            </p>
            <p className="EarthquakeExercise-text">
              לפניכם יוצג תרחיש שבו נמצאים כמה אנשים בשעת רעידת אדמה באזור
              עבודתם. <br></br>יש לגרור כל קבוצת אנשים אל השטח הפתוח הקרוב
              והבטוח ביותר.
            </p>
            <p id="EarthquakeExercise-start-btn" onClick={closePopup}>
              {" "}
              להתחלה{" "}
            </p>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="maintenance-popup-overlay">
          <div id="brown-completed-popup">
            <p>🎉 כל הכבוד!</p>
            <p>סיימת בהצלחה את התרגיל</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EarthquakeExercise;
