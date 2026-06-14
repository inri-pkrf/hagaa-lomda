import React, { useState, useEffect } from "react";
import "../../Unit4/style/GameLegalSituation.css";

function GameLegalSituation() {
  const correctAnswers = {
    attackHour: "answer2",
    specialSituation: "answer1",
  };

  const [placedAnswers, setPlacedAnswers] = useState({
    attackHour: null,
    specialSituation: null,
  });
  const [wrongAnswerId, setWrongAnswerId] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    if (placedAnswers.attackHour && placedAnswers.specialSituation) {
      setIsGameFinished(true);
    }
  }, [placedAnswers]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !isGameFinished }),
    );
  }, [isGameFinished]);

  useEffect(() => {
    if (isGameFinished) {
      const alreadyFinished =
        sessionStorage.getItem("unitFour-first") === "finished";
      if (!alreadyFinished) {
        sessionStorage.setItem("unitFour-first", "finished");
        window.dispatchEvent(new Event("updateNavbar"));
      }
    }
  }, [isGameFinished]);

  const onDragStart = (e, answerId, text) => {
    e.dataTransfer.setData("answerId", answerId);
    e.dataTransfer.setData("answerText", text);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, targetCategory) => {
    const answerId = e.dataTransfer.getData("answerId");
    const answerText = e.dataTransfer.getData("answerText");

    if (answerId === correctAnswers[targetCategory]) {
      setPlacedAnswers((prev) => ({ ...prev, [targetCategory]: answerText }));
    } else {
      setWrongAnswerId(answerId);
      setTimeout(() => setWrongAnswerId(null), 500);
    }
  };

  const answer1Text =
    'ח"א תקף לפנות בוקר יעדים באזור ברצועת עזה, ראש הממשלה הנחה את צה"ל והרשויות להיערך לסבב הסלמה.';
  const answer2Text =
    'לפנות בוקר נורו רקטות לעבר אשדוד ואשקלון. ח"א תקף יעדים באזור רצועת עזה.';

  return (
    <div className="GameLegalSituation-root">
      {/* Page headline above the table */}
      <h2 id="GameLegalSituation-headline">גררו את האירוע למצב המתאים:</h2>

      {/* ── TABLE ── */}
      <div className="GameLegalSituation-table">
        {/* Title row */}
        <span className="GameLegalSituation-table-title">סוג המצב</span>

        {/* Two-column row */}
        <div className="GameLegalSituation-table-row">
          {/* Right column — שעת התקפה */}
          <div
            className="GameLegalSituation-column"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "attackHour")}
          >
            <p className="GameLegalSituation-column-label">שעת התקפה</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/rockets-factState.webp`}
              className="GameLegalSituation-column-icon"
              alt="icon"
            />
            {placedAnswers.attackHour && (
              <div className="GameLegalSituation-answer stuck-right">
                {placedAnswers.attackHour}
              </div>
            )}
          </div>

          {/* Left column — מצב מיוחד בעורף */}
          <div
            className="GameLegalSituation-column"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "specialSituation")}
          >
            <p className="GameLegalSituation-column-label">מצב מיוחד בעורף</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/icon-legalState.webp`}
              className="GameLegalSituation-column-icon"
              alt="icon"
            />
            {placedAnswers.specialSituation && (
              <div className="GameLegalSituation-answer stuck-left">
                {placedAnswers.specialSituation}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ── END TABLE ── */}

      {/* Draggable answer cards below the table */}
      <div className="GameLegalSituation-answers-pool">
        {!placedAnswers.specialSituation && (
          <p
            id="GameLegalSituation-answer1"
            className={`GameLegalSituation-answer ${wrongAnswerId === "answer1" ? "shake" : ""}`}
            draggable
            onDragStart={(e) => onDragStart(e, "answer1", answer1Text)}
          >
            {answer1Text}
          </p>
        )}

        {!placedAnswers.attackHour && (
          <p
            id="GameLegalSituation-answer2"
            className={`GameLegalSituation-answer ${wrongAnswerId === "answer2" ? "shake" : ""}`}
            draggable
            onDragStart={(e) => onDragStart(e, "answer2", answer2Text)}
          >
            {answer2Text}
          </p>
        )}
      </div>

      {/* Finish message */}
      {isGameFinished && (
        <div className="finish-message">
          כל הכבוד! סיימת בהצלחה את התרגול 🎉
        </div>
      )}
    </div>
  );
}

export default GameLegalSituation;
