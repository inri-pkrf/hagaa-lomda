import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UnitFourSidebar from "./UnitFourSidebar";
import "./style/IntroUnitFour.css";
import { narrationMap } from "../../Data/NarrationData";

function IntroUnitFour() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(
    `${process.env.PUBLIC_URL}/assets/General/Doors/unit4/bg-doors.jpg`,
  );
  const [openingSign, setOpeningSign] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const modalBorderColor = "#E2787A";

  const [finishedChapters, setFinishedChapters] = useState({
    unitFourFirst: false,
    unitFourSecond: false,
    unitFourThird: false,
  });

  const allDoorsFinished = Object.values(finishedChapters).every(
    (val) => val === true,
  );

  useEffect(() => {
    if (allDoorsFinished) {
      setShowEndModal(true);
    }
  }, [allDoorsFinished]);

  useEffect(() => {
    const allDone = Object.values(finishedChapters).every(
      (val) => val === true,
    );
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allDone }),
    );
    window.dispatchEvent(
      new CustomEvent("setPrevBtnDisabled", { detail: false }),
    );
  }, [finishedChapters]);

  useEffect(() => {
    if (allDoorsFinished) {
      const srcs = ["recordings/04 - unit4/050 - intro-unit-four.mp3"];
      sessionStorage.setItem("narrationOverride", JSON.stringify(srcs));
      window.dispatchEvent(new CustomEvent("setNarration", { detail: srcs }));
    }
  }, [allDoorsFinished]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "יחידה 4");
    const updateFinished = () => {
      setFinishedChapters({
        unitFourFirst: sessionStorage.getItem("unitFour-first") === "finished",
        unitFourSecond:
          sessionStorage.getItem("unitFour-second") === "finished",
        unitFourThird: sessionStorage.getItem("unitFour-third") === "finished",
      });
    };
    updateFinished();
    window.addEventListener("focus", updateFinished);
    document.addEventListener("visibilitychange", updateFinished);
    return () => {
      window.removeEventListener("focus", updateFinished);
      document.removeEventListener("visibilitychange", updateFinished);
    };
  }, []);

  useEffect(() => {
    const handleNext = (e) => {
      if (openingSign) return;
      e.preventDefault();

      if (!finishedChapters.unitFourFirst) {
        handleSignOneClick();
      } else if (!finishedChapters.unitFourSecond) {
        handleSignTwoClick();
      } else if (!finishedChapters.unitFourThird) {
        handleSignThreeClick();
      } else {
        navigate("/questions-end/4");
      }
    };

    window.addEventListener("onNextNav", handleNext);
    return () => window.removeEventListener("onNextNav", handleNext);
  }, [finishedChapters, openingSign]);

  const handleSignOneClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit4/bg-doors-1opened.jpg`,
    );
    setOpeningSign(1);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitFour-first", state: "not started" }),
    );
    setTimeout(() => navigate("/Sub1Legal"), 800);
  };

  const handleSignTwoClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit4/bg-doors-2opened.jpg`,
    );
    setOpeningSign(2);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitFour-second", state: "not started" }),
    );
    setTimeout(() => navigate("/ExplainationRTE"), 800);
  };

  const handleSignThreeClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit4/bg-doors-3opened.jpg`,
    );
    setOpeningSign(3);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitFour-third", state: "not started" }),
    );
    setTimeout(() => navigate("/ExplainEmergency"), 800);
  };

  const canEnterSecond = finishedChapters.unitFourFirst;
  const canEnterThird = finishedChapters.unitFourSecond;

  return (
    <div className="IntroUnitFour">
      <UnitFourSidebar />

      <div className="subtext-IntroUnit">
        יחידה זו בנויה מ-3 תתי-נושאים, בלחיצה על כל דלת יפתח תת-נושא חדש
      </div>

      <img className="first-background" src={doorImage} alt="Intro Unit 4" />

      <div className="door-signs-UnitFour">
        {openingSign !== 1 && (
          <div
            className="door-sign-UnitFour-first"
            onClick={!openingSign ? handleSignOneClick : undefined}
            style={{ cursor: "pointer" }}
          >
            <p className="door-sign-UnitFour-title-first">מצבים משפטיים</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`}
              alt="Sign 1"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 2 && (
          <div
            className={`door-sign-UnitFour-second ${!canEnterSecond ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterSecond ? handleSignTwoClick : undefined
            }
          >
            <p className="door-sign-UnitFour-title-second">מעבר משגרה לחירום</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`}
              alt="Sign 2"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 3 && (
          <div
            className={`door-sign-UnitFour-third ${!canEnterThird ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterThird ? handleSignThreeClick : undefined
            }
          >
            <p className="door-sign-UnitFour-title-third">אירוע חירום</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`}
              alt="Sign 3"
              class="title-img"
            />
          </div>
        )}
      </div>

      {/* תמונות ה-V */}
      {finishedChapters.unitFourFirst && (
        <img
          className="doorOneDone IntroUnitFour"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`}
          alt="1"
        />
      )}
      {finishedChapters.unitFourSecond && (
        <img
          className="doorTwoDone IntroUnitFour"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`}
          alt="2"
        />
      )}
      {finishedChapters.unitFourThird && (
        <img
          className="doorThreeDone IntroUnitFour"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
          alt="3"
        />
      )}

      {/* כפתורי קיצור - למחוק אחר כך */}
      <button
        className="ShortcutButton"
        id="ShortcutButton1-four"
        onClick={() => {
          sessionStorage.setItem("unitFour-first", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitFourFirst: true }));
        }}
      >
        כפתור קיצור- דלת 1
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton2-four"
        onClick={() => {
          sessionStorage.setItem("unitFour-second", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitFourSecond: true }));
        }}
      >
        כפתור קיצור- דלת 2
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton3-four"
        onClick={() => {
          sessionStorage.setItem("unitFour-third", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitFourThird: true }));
        }}
      >
        כפתור קיצור- דלת 3
      </button>

      {/* מודל סיום */}
      {showEndModal && (
        <div className="questions-end-overlay">
          <div
            className="questions-end-modal"
            style={{ borderColor: modalBorderColor }}
          >
            <span className="sticker sticker-star s1">⭐</span>
            <span className="sticker sticker-star s2">✨</span>
            <span className="sticker sticker-star s3">⭐</span>
            <span className="sticker sticker-star s4">✨</span>
            <p id="questions-end-page-headline">
              הגעתם לסוף היחידה, כעת נעבור על כמה שאלות כדי לוודא הבנה
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntroUnitFour;
