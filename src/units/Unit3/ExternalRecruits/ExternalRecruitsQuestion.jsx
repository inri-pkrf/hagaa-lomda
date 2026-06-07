import React, { useState, useEffect } from "react";
import "../../Unit3/style/ExternalRecruitsQuestion.css";

function ExternalRecruitsQuestion() {
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  const handleSelection = (selectedAnswer) => {
    if (isSolved) return;

    const correctAnswer = true;
    const isCorrect = selectedAnswer === correctAnswer;

    setFeedback({ show: true, isCorrect });

    if (isCorrect) {
      setIsSolved(true);
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    }
  };

  return (
    <div id="ExternalRecruitsQuestion-body">

      {/* ✅ overlay על כל המסך */}
      {isSolved && <div className="signs-overlay" />}

      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/ExternalRecruits/ExternalInfo-bg.webp`}
        className="ExternalInfo-left-half-bg"
        alt=""
      />

      <h2 className="manpower-main-title">שאלת סיכום</h2>

      <p className="subtitles manpower-subtitle">
        יש לקרוא את ההיגד שלפניך, ולקבוע האם הוא נכון או לא נכון על ידי לחיצה על
        השלט המתאים : <br />
        <span className="statement-line">
          "לכל מפעל קיים קו תקן עובדים בחירום, ואיושו מתבסס על שני סוגי עובדים"
        </span>
      </p>

      <div className={`signs-section ${isSolved ? 'signs-solved' : ''}`}>
        <div className="sign-btn" onClick={() => handleSelection(true)}>
          <span className="sign-label">נכון</span>
          <div className="sign-circle green">✓</div>
          <div className="sign-stick"></div>
        </div>

        <div className="sign-btn" onClick={() => handleSelection(false)}>
          <span className="sign-label">לא נכון</span>
          <div className="sign-circle red">✕</div>
          <div className="sign-stick"></div>
        </div>
      </div>

      {feedback.show && (
        <div className={`quiz-feedback ${feedback.isCorrect ? "correct" : "wrong"}`}>
          {feedback.isCorrect ? "כל הכבוד! תשובה נכונה." : "לא מדויק, נסה שוב."}
        </div>
      )}

    </div>
  );
}

export default ExternalRecruitsQuestion;