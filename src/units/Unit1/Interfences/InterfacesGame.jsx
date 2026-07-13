import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InterfacesGame.css";
import InterfencesData from "../../../Data/Unit1/InterfencesData.js";

function InterfacesGame() {
  sessionStorage.setItem("MainTitle", "ממשקים - תרגול");

  const [isGameFinished, setIsGameFinished] = useState(
    sessionStorage.getItem("unitOne-third") === "finished",
  );

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // ✅ טעינה מ-sessionStorage
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(sessionStorage.getItem("interfaces-answers")) || {};
  });

  const [lockedSteps, setLockedSteps] = useState({});

  const navigate = useNavigate();

  const questions = [
    {
      question: "חסר ציוד לתפעול שוטף במפעל - למי יש לפנות?",
      correctId: 3,
      options: [2, 4, 3],
    },
    {
      question: "פרצה שרֵפה במחסן החומרים - למי יש לפנות?",
      correctId: 9,
      options: [1, 8, 9],
    },
    {
      question: "מי קובע את הנחיות המיגון לעובדים בזמן חירום?",
      correctId: 2,
      options: [8, 5, 2],
    },
  ];

  const activeQuestion = questions[currentStep];
  const selectedAnswer = answers[currentStep];
  const isLocked = lockedSteps[currentStep];

  const allLocked = Object.keys(lockedSteps).length === questions.length;

  const handlePhoneClick = () => setIsChatOpen(true);

  // ✅ שמירה אוטומטית של תשובות
  useEffect(() => {
    sessionStorage.setItem("interfaces-answers", JSON.stringify(answers));
  }, [answers]);

  // NAVBAR
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", {
        detail: !isGameFinished,
      }),
    );

    const handleNext = (e) => {
      if (isGameFinished) {
        e.preventDefault();

        sessionStorage.setItem("unitOne-third", "finished");
        sessionStorage.setItem(
          "currentChapter",
          JSON.stringify({
            name: "unitOne-third",
            state: "finished",
          }),
        );

        window.dispatchEvent(new Event("updateNavbar"));
        navigate("/intro-unit-one");
      } else {
        e.preventDefault();
      }
    };

    window.addEventListener("onNextNav", handleNext);
    return () => window.removeEventListener("onNextNav", handleNext);
  }, [isGameFinished, navigate]);

  // סיום
  useEffect(() => {
    if (allLocked && !isGameFinished) {
      setTimeout(() => {
        setIsGameFinished(true);

        sessionStorage.setItem("unitOne-third", "finished");
        sessionStorage.setItem(
          "currentChapter",
          JSON.stringify({
            name: "unitOne-third",
            state: "finished",
          }),
        );

        window.dispatchEvent(new Event("updateNavbar"));
      }, 600);
    }
  }, [allLocked]);

  // תשובה
  const handleAnswerClick = (id) => {
    if (isGameFinished) return;
    if (isLocked) return;

    setAnswers((prev) => ({
      ...prev,
      [currentStep]: id,
    }));

    if (id === activeQuestion.correctId) {
      setLockedSteps((prev) => ({
        ...prev,
        [currentStep]: true,
      }));
    }
  };

  // ניווט
  const handleNextQuestion = () => {
    if (!lockedSteps[currentStep]) return;

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const phoneAudioRef = React.useRef(null);

  useEffect(() => {
    const audio = new Audio(
      process.env.PUBLIC_URL + "/assets/audios/phoneCall.mp3",
    );
    audio.loop = true;
    phoneAudioRef.current = audio;

    if (!isGameFinished) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (isChatOpen && phoneAudioRef.current) {
      phoneAudioRef.current.pause();
      phoneAudioRef.current.currentTime = 0;
    }
  }, [isChatOpen]);

  return (
    <div className="game-container">
      {!isChatOpen && (
        <div className="subtitles subtext-threats-interfaces">
          יש ללחוץ על הטלפון המצלצל
        </div>
      )}

      <img
        src={
          process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/office.jpg"
        }
        className="background-image"
        alt=""
        style={{
          filter: isChatOpen ? "brightness(0.5)" : "none",
        }}
      />

      {!isChatOpen ? (
        <div className="phone-wrapper" onClick={handlePhoneClick}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/assets/UnitOneImgs/Interfences/ringingPhone.png"
            }
            className="ringing-phone"
            alt=""
          />
        </div>
      ) : (
        <div className="chat-overlay">
          <div className="phone-display-container">
            {isGameFinished && (
              <div className="finish-instruction">
                כל הכבוד!{" "}
                <>
                  <br />
                </>
                סיימת את התרגול
              </div>
            )}

            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/UnitOneImgs/Interfences/Phone.png"
              }
              className="phone-bg-img"
              alt=""
            />

            <div className="phone-header-group">
              <div className="phone-header-title">
                שאלה {currentStep + 1} מתוך {questions.length}
              </div>
            </div>

            <div className="chat-content-area">
              <div className="question-bubble-wrapper">
                <p className="question-text-InterfencesGame">
                  {activeQuestion.question}
                </p>
              </div>

              <div className="options-vertical-list">
                {activeQuestion.options.map((id) => {
                  const data = InterfencesData[id];
                  const isCorrect = id === activeQuestion.correctId;
                  const isSelected = selectedAnswer === id;

                  return (
                    <button
                      key={id}
                      className={`answer-option-btn ${
                        isSelected ? (isCorrect ? "correct" : "wrong") : ""
                      }`}
                      onClick={() => handleAnswerClick(id)}
                      disabled={isLocked}
                    >
                      <span>{data.name}</span>
                      <img src={data.image} alt={data.name} />
                    </button>
                  );
                })}
              </div>

              {/* חצים */}
              <div className="question-navigation-InterfencesGame">
                {/* אחורה תמיד מוצג */}
                <button
                  className="nav-arrow-InterfencesGame prev"
                  onClick={handlePrevQuestion}
                  disabled={currentStep === 0}
                >
                  ❯
                </button>

                {/* קדימה רק אם ננעל */}
                {currentStep < questions.length - 1 && (
                  <button
                    className="nav-arrow-InterfencesGame next"
                    onClick={handleNextQuestion}
                    disabled={!lockedSteps[currentStep]}
                  >
                    ❮
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterfacesGame;
