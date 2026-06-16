import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/TimeToEnterMamad.css";

function TimeToEnterMamad3() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const navigate = useNavigate();

  const cities = [
    {
      name: "חדרה",
      correct: "01:30",
      options: ["00:30", "00:45", "01:30", "00:15"],
    },
    {
      name: "באר שבע",
      correct: "00:30",
      options: ["00:45", "00:30", "01:30", "00:15"],
    },
    {
      name: "פתח תקווה",
      correct: "01:30",
      options: ["01:30", "01:00", "00:45", "00:15"],
    },
    {
      name: "חיפה",
      correct: "01:30",
      options: ["00:30", "00:45", "01:30", "00:15"],
    },
  ];

  const currentCity = cities[currentCityIndex];

  // פתיחת פופאפ קטן
  const openOrefPopup = () => {
    window.open(
      "https://www.oref.org.il/heb",
      "popupWindow",
      "width=1200,height=800,top=100,left=200,resizable=yes,scrollbars=yes",
    );
  };

  const handleClockClick = (time, index) => {
    // אם כבר נבחרה תשובה נכונה - לא מאפשרים עוד לחיצות
    if (feedback === "correct") return;

    setSelectedAnswer(index);

    const isCorrect = time === currentCity.correct;
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setTimeout(() => {
        if (currentCityIndex < cities.length - 1) {
          setCurrentCityIndex(currentCityIndex + 1);
          setSelectedAnswer(null);
          setFeedback(null);
        } else {
          setGameComplete(true);
          sessionStorage.setItem("TimeToEnterMamad3Complete", "true");
        }
      }, 1500);
    }
  };

  if (gameComplete) {
    return (
      <div className="time-to-enter-mamad-wrapper">
        <div className={`time-to-enter-mamad-wrapper ${feedback}`}>
          <div className="frame3-game-header">
            <p id="frame3-game-headline">עיר: {currentCity.name}</p>

            <p id="frame3-text6">
              לאחר שלמדנו את עקרונות ההיערכות לירי טילים נתרגל את נושא זמן
              ההתרעה ותכנון המרחבים המוגנים במפעל. בכל פעם יופיע מיקום המפעל
              ובהתאם למיקום יש לבחור בזמן ההתרעה הנכון העומד לרשות העובדים.
              <div>
                <span
                  id="website-link-frame3"
                  onClick={openOrefPopup}
                  style={{ cursor: "pointer" }}
                >
                  לשימושכם, יישומון פיקוד העורף או אתר פיקוד העורף
                </span>
              </div>
            </p>
          </div>

          <div className="frame3-game-container">
            {currentCity.options.map((time, index) => (
              <div
                key={index}
                className={`game-clock-wrapper ${
                  selectedAnswer === index
                    ? feedback === "correct"
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                style={{
                  pointerEvents: "none",
                  opacity: 0.6,
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/game-clock.png`}
                  alt="timer"
                  className="game-clocks"
                />

                <p className="game-time">{time}</p>
              </div>
            ))}
          </div>

          <div className="frame3-progress">
            <p>
              עיר {currentCityIndex + 1} מתוך {cities.length}
            </p>
          </div>

          <p id="win">כל הכבוד!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`time-to-enter-mamad-wrapper game`}>
      <div className="frame3-game-header">
        <p id="frame3-game-headline">עיר: {currentCity.name}</p>

        <p id="frame3-text6">
          לאחר שלמדנו את עקרונות ההיערכות לירי טילים נתרגל את נושא זמן ההתרעה
          ותכנון המרחבים המוגנים במפעל. בכל פעם יופיע מיקום המפעל ובהתאם למיקום
          יש לבחור בזמן ההתרעה הנכון העומד לרשות העובדים.
          <div>
            <span
              id="website-link-frame3"
              onClick={openOrefPopup}
              style={{ cursor: "pointer" }}
            >
              לשימושכם, יישומון פיקוד העורף או אתר פיקוד העורף
            </span>
          </div>
        </p>
      </div>

      <div className="frame3-game-container">
        {currentCity.options.map((time, index) => (
          <div
            key={index}
            className={`game-clock-wrapper ${
              selectedAnswer === index
                ? feedback === "correct"
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleClockClick(time, index)}
            style={{
              pointerEvents: feedback === "correct" ? "none" : "auto",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/game-clock.png`}
              alt="timer"
              className="game-clocks"
            />

            <p className="game-time">{time}</p>
          </div>
        ))}
      </div>

      <div className="frame3-progress">
        <p>
          עיר {currentCityIndex + 1} מתוך {cities.length}
        </p>
      </div>
    </div>
  );
}

export default TimeToEnterMamad3;
