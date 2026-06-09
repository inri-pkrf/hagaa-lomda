import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import QuizEngine from "./QuizEngine";

import questionsDataOne from "../Data/QuestionsData/QuestionDataOne";

import questionsDataTwo from "../Data/QuestionsData/QuestionDataTwo";

import questionsDataThree from "../Data/QuestionsData/QuestionDataThree";

import questionsDataFour from "../Data/QuestionsData/QuestionDataFour";

import questionsDataQuiz from "../Data/QuestionsData/QuestionDataQuiz";

import NavBarData from "../Data/NavBarData";

const questionsDataMap = {
  1: questionsDataOne,

  2: questionsDataTwo,

  3: questionsDataThree,

  4: questionsDataFour,

  5: questionsDataQuiz,
};

const summaryChecklistMap = {
  1: "/summary-checklist-unit1",

  2: "/summary-checklist-unit2",

  3: "/summary-checklist-unit3",

  4: "/summary-checklist-unit4",

  5: "/last-page",
};

const DEBUG_SCENARIOS = [
  { label: "100 – מושלם", score: 100, attempt: 1 },

  { label: "80 – עובר", score: 80, attempt: 1 },

  { label: "50 – נכשל פעם 1", score: 50, attempt: 1 },

  { label: "50 – נכשל פעם 2", score: 50, attempt: 2 },
];

function QuestionsEnd({ unitNumber: unitProp }) {
  const navigate = useNavigate();

  const { unit } = useParams();

  const unitNumber = unitProp || Number(unit) || 1;

  const [isModalOpen, setIsModalOpen] = useState(unitNumber !== 5);

  // ניהול מצב הפופ-אפ שלפני ההגשה הסופית

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [pendingScore, setPendingScore] = useState(null);

  const modalBorderColor =
    NavBarData[unitNumber > 4 ? 3 : unitNumber - 1]?.color || "#40d4ff";

  useEffect(() => {
    sessionStorage.setItem("MainTitle", `שאלות סיכום יחידה ${unitNumber}`);

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [unitNumber]);

  // מופעל אוטומטית מתוך QuizEngine רק כאשר המשתמש לוחץ על החץ הבא בשאלה 20 (האחרונה)

  const handleShowClearancePopup = (finalScore) => {
    setPendingScore(finalScore); // שומרים את הציון המחושב בצד

    setShowConfirmPopup(true); // מקפיצים את פופ-אפ האזהרה
  };

  // מופעל רק אם המשתמש לחץ "כן, הגש" בפופ-אפ

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);

    const scoreToSubmit = pendingScore;

    const unitKeys = {
      1: "unitOne-questions",

      2: "unitTwo-questions",

      3: "unitThree-questions",

      4: "unitFour-questions",
    };

    if (unitKeys[unitNumber]) {
      sessionStorage.setItem(unitKeys[unitNumber], "finished");
    }

    if (unitNumber === 5) {
      sessionStorage.setItem("finalQuizScore", scoreToSubmit);
    }

    window.dispatchEvent(new Event("updateNavbar"));

    setTimeout(() => {
      navigate(summaryChecklistMap[unitNumber] || "/");
    }, 500);
  };

  // מופעל אם המשתמש התחרט ולחץ "חזור לשאלות" - הפופ-אפ נסגר והוא נשאר בדיוק באותו מסך

  const handleCancelSubmit = () => {
    setShowConfirmPopup(false);

    setPendingScore(null);
  };

  const handleDebugScenario = (scenario) => {
    sessionStorage.setItem("finalQuizScore", scenario.score);

    sessionStorage.setItem("quiz_attempt_5", scenario.attempt);

    sessionStorage.setItem(
      "unit_5_questions",
      JSON.stringify(questionsDataQuiz),
    );

    sessionStorage.setItem(`unit_5_quiz_answers`, JSON.stringify({}));

    navigate("/last-page");
  };

  return (
    <div className="questions-end-page" style={{ position: "relative" }}>
      {/* כפתורי קיצור - רק ל-unit 5 */}

      {unitNumber === 5 && (
        <div
          style={{
            position: "fixed",

            top: "20vh",

            left: "10vw",

            display: "flex",

            flexDirection: "column",

            gap: "8px",

            zIndex: 9999,
          }}
        >
          {DEBUG_SCENARIOS.map((s) => (
            <button
              key={s.label}
              onClick={() => handleDebugScenario(s)}
              style={{
                padding: "8px 14px",

                background: "#1e1e2e",

                color: "#fff",

                border: "1px solid #555",

                borderRadius: "8px",

                cursor: "pointer",

                fontSize: "13px",

                opacity: 0.85,
              }}
            >
              🧪 {s.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`questions-end-content ${isModalOpen ? "questions-end-content-hidden" : ""}`}
      >
        <QuizEngine
          key={unitNumber}
          data={questionsDataMap[unitNumber]}
          unitNumber={unitNumber}
          /* כאן אנחנו מחליפים את הפונקציה הישנה בפונקציה שרק פותחת את הפופ-אפ */

          onFinished={handleShowClearancePopup}
        />
      </div>

      {/* הפופ-אפ החוסם - יופיע רק בלחיצה על החץ של שאלה 20 */}

      {showConfirmPopup && (
        <div
          style={{
            position: "fixed",

            top: 0,

            left: 0,

            width: "100vw",

            height: "100vh",

            backgroundColor: "rgba(0, 0, 0, 0.7)", // מעמעם את הרקע של השאלות מאחורה

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 10000,

            direction: "rtl",
          }}
        >
          <div
            style={{
              background: "#fff",

              padding: "6vh",

              borderRadius: "2vh",

              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",

              textAlign: "center",

              maxWidth: "50vh",

              width: "50vh",

              border: `0.5vh solid ${modalBorderColor}`,

              height: "30vh",
            }}
          >
            <h3
              style={{
                margin: "0 0 2vh 0",
                color: "#333",
                fontSize: "2vh",
                fontWeight: "bold",
              }}
            >
              רוצה להגיש את התשובות?
            </h3>

            <p
              style={{ margin: "0 0 25px 0", color: "#666", fontSize: "1.8vh" }}
            >
              לחיצה על "כן" תנעל את המענה ותחשב את הציון הסופי שלך.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1vw",
                direction: "ltr",
              }}
            >
              <button
                onClick={handleConfirmSubmit}
                style={{
                  padding: "1vh 2vh",

                  background: modalBorderColor,

                  color: "#fff",

                  border: "none",

                  borderRadius: "0.5vh",

                  cursor: "pointer",

                  fontWeight: "bold",

                  fontSize: "1.5vh",
                }}
              >
                כן, הגש
              </button>

              <button
                onClick={handleCancelSubmit}
                style={{
                  padding: "1vh 2vh",

                  background: "#f3f4f6",

                  color: "#4b5563",

                  border: "1px solid #d1d5db",

                  borderRadius: "0.5vh",

                  cursor: "pointer",

                  fontWeight: "bold",

                  fontSize: "1.5vh",
                }}
              >
                חזור לשאלות
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsEnd;
