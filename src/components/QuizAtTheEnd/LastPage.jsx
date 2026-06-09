import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./LastPage.css";
import { STATE_KEYS } from "../../Data/Statekeys"; // ⭐ ייבוא משותף (תקן את הנתיב לפי מבנה הפרויקט שלך)

function LastPage() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const score = Number(sessionStorage.getItem("finalQuizScore")) || 0;
  const answersKey = "unit_5_quiz_answers";
  const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
  const questions = JSON.parse(
    sessionStorage.getItem("unit_5_questions") || "[]",
  );

  const [openReview, setOpenReview] = useState(false);
  const attempts = Number(sessionStorage.getItem("quiz_attempt_5")) || 1;

  const isPerfect = score === 100;
  const isPass = score >= 70 && score < 100;
  const isFail = score < 70;
  const isFirstTry = attempts < 2;
  const isSecondTry = attempts >= 2;

  const [showConfetti, setShowConfetti] = useState(false);

  // ⭐ שמירה לשרת כולל כל sessionStorage
  useEffect(() => {
    const saveToServer = async () => {
      try {
        const sessionState = {};
        STATE_KEYS.forEach((key) => {
          const val = sessionStorage.getItem(key);
          if (val !== null) sessionState[key] = val;
        });

        const res = await fetch("/umbraco/surface/learning/SetIframeLearning", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastPath: "/last-page",
            score,
            pass: score >= 70,
            sessionState,
          }),
        });

        if (!res.ok) {
          console.error("שגיאת שרת בשמירת ציון:", res.status);
        }
      } catch (e) {
        console.error("שגיאה בשמירת ציון:", e);
      }
    };

    saveToServer();
  }, []);

  // ⭐ הורדה למחשב לבדיקה
  const downloadReport = () => {
    const sessionState = {};
    STATE_KEYS.forEach((key) => {
      const val = sessionStorage.getItem(key);
      if (val !== null) sessionState[key] = val;
    });

    const report = {
      lastPath: "/last-page",
      score,
      pass: score >= 70,
      sessionState,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "learning-report.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (score >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [score]);

  return (
    <div className="lastPage">
      <button className="lastPage_button" onClick={downloadReport}>
        הורד JSON לבדיקה
      </button>

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={score === 100 ? 600 : 300}
          recycle={false}
        />
      )}

      <div className="lastPage__center">
        <p className="lastPage__score">ציונך:</p>
        <p
          className={`lastPage_score ${isFail ? "lastPage_score--fail" : "lastPage_score--pass"}`}
        >
          {score}/100
        </p>

        {(isPerfect || isPass) && (
          <h1 className="lastPage__title">כל הכבוד!</h1>
        )}

        {isPerfect && (
          <h2 className="lastPage__subtitle">
            סיימת את הקורס בהצלחה מלאה🎉
            <br />
            התעודה תחכה לך באזור האישי
          </h2>
        )}

        {isPass && (
          <>
            <h2 className="lastPage__subtitle">
              הציון עבר את הרף הנדרש לצורך קבלת תעודה, התעודה תחכה לך באיזור
              האישי
            </h2>
            <button
              className="lastPage__button"
              onClick={() => setOpenReview(true)}
            >
              איפה טעיתי
            </button>
          </>
        )}

        {isFail && (
          <>
            <h1 className="lastPage__subtitle">
              לא עברת את הרף הנדרש לצורך קבלת תעודה
            </h1>

            {isFirstTry && (
              <>
                <h2 className="lastPage__subtitle_restart">
                  שימו לב: יש לבצע את המבחן פעם נוספת, אך אם גם בפעם הזו לא
                  תעברו אותו, תצטרכו לעבור את כל הלומדה מחדש.{" "}
                </h2>
                <button
                  className="lastPage__button"
                  onClick={() => setOpenReview(true)}
                >
                  איפה טעיתי
                </button>
                <button
                  className="lastPage__button"
                  onClick={() => {
                    sessionStorage.setItem("quiz_attempt_5", attempts + 1);
                    sessionStorage.removeItem("unit_5_quiz_answers");
                    sessionStorage.removeItem("unit_5_quiz_index");
                    navigate("/questions-end/5");
                  }}
                >
                  נסו שוב
                </button>
              </>
            )}

            {isSecondTry && (
              <>
                <h2 className="lastPage__subtitle_restart">
                  שימו לב: עליכם לעבור עוד פעם את הקורס על מנת לגשת שוב למבחן
                  קבלת הסמכה
                </h2>
                <button
                  className="lastPage__button lastPage__button--danger"
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                  }}
                >
                  התחלת הלומדה מחדש
                </button>
              </>
            )}
          </>
        )}

        <div className="lastPage__aboutWrapper">
          <span className="lastPage__aboutHint">שווה להציץ 👀</span>
          <button
            className="about-us-btn"
            onClick={() => navigate("/CreditPage")}
          >
            אודות
          </button>
          <button
            className="about-us-btn"
            onClick={() => navigate("/CreditPage")}
          >
            משוב
          </button>
        </div>
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/assets/General/Quiz/building.webp`}
        alt="building"
        className="lastPage__building"
      />

      {openReview && (
        <div className="modalOverlay" onClick={() => setOpenReview(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <button
                className="modalCloseBtn"
                onClick={() => setOpenReview(false)}
              >
                ✕
              </button>
              <h2 className="modalTitle-center">סקירת טעויות</h2>

            </div>
            <div className="reviewList">
              
              {questions.map((q, i) => {
                const userAnswer = savedAnswers[i];
                const correct = q.correctAnswer;
                if (userAnswer === correct) return null;
                return (
                  <div key={i} className="reviewItem">
                    <p className="reviewQuestion">
                      {i + 1}. {q.question}
                    </p>
                    <p className="reviewUser">
                      תשובתך: {q.answers?.[userAnswer] || "לא נענה"}
                    </p>
                    <p className="reviewCorrect">
                      תשובה נכונה: {q.answers?.[correct]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LastPage;
