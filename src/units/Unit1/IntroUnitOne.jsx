import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UnitOneSidebar from "./UnitOneSidebar";
import "./style/IntroUnitOne.css";
import { narrationMap } from "../../Data/NarrationData";

function IntroUnitOne() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(
    `${process.env.PUBLIC_URL}/assets/General/Doors/Doors.jpg`,
  );
  const [openingSign, setOpeningSign] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const modalBorderColor = "#3FC6F3";

  const [finishedChapters, setFinishedChapters] = useState({
    unitOneFirst: false,
    unitOneSecond: false,
    unitOneThird: false,
    unitOneFourth: false,
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
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allDoorsFinished }),
    );
    window.dispatchEvent(
      new CustomEvent("setPrevBtnDisabled", { detail: false }),
    );
  }, [finishedChapters]);

  useEffect(() => {
    if (allDoorsFinished) {
      const srcs = ["recordings/01 - unit1/007 - intro-unit-one.mp3"];
      sessionStorage.setItem("narrationOverride", JSON.stringify(srcs));
      window.dispatchEvent(new CustomEvent("setNarration", { detail: srcs }));
    }
  }, [allDoorsFinished]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "יחידה 1");
    const updateFinished = () => {
      setFinishedChapters({
        unitOneFirst: sessionStorage.getItem("unitOne-first") === "finished",
        unitOneSecond: sessionStorage.getItem("unitOne-second") === "finished",
        unitOneThird: sessionStorage.getItem("unitOne-third") === "finished",
        unitOneFourth: sessionStorage.getItem("unitOne-fourth") === "finished",
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

      if (!finishedChapters.unitOneFirst) {
        handleSignOneClick();
      } else if (!finishedChapters.unitOneSecond) {
        handleSignTwoClick();
      } else if (!finishedChapters.unitOneThird) {
        handleSignThreeClick();
      } else if (!finishedChapters.unitOneFourth) {
        handleSignFourClick();
      } else {
        navigate("/questions-end/1");
      }
    };

    window.addEventListener("onNextNav", handleNext);
    return () => window.removeEventListener("onNextNav", handleNext);
  }, [finishedChapters, openingSign]);

  const handleSignOneClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.jpg`,
    );
    setOpeningSign(1);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-first", state: "not started" }),
    );
    setTimeout(() => navigate("/threats"), 800);
  };

  const handleSignTwoClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorTwoOpen.jpg`,
    );
    setOpeningSign(2);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-second", state: "not started" }),
    );
    setTimeout(() => navigate("/states"), 800);
  };

  const handleSignThreeClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorThreeOpen.jpg`,
    );
    setOpeningSign(3);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-third", state: "not started" }),
    );
    setTimeout(() => navigate("/interfaces"), 800);
  };

  const handleSignFourClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorFourOpen.jpg`,
    );
    setOpeningSign(4);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-fourth", state: "not started" }),
    );
    setTimeout(() => navigate("/population"), 800);
  };

  const canEnterSecond = finishedChapters.unitOneFirst;
  const canEnterThird = finishedChapters.unitOneSecond;
  const canEnterFourth = finishedChapters.unitOneThird;

  return (
    <div
      className="IntroUnitOne"
      style={{ backgroundImage: `url(${doorImage})` }}
    >
      <UnitOneSidebar />

      <div className="subtext-IntroUnit">
        יחידה זו בנויה מ-4 תתי-נושאים, בלחיצה על כל דלת יפתח תת-נושא חדש
      </div>

      {/* הסרנו את <img className='first-background'> */}

      <div className="door-signs-UnitOne">
        {openingSign !== 1 && (
          <div
            className="door-sign-UnitOne-first"
            onClick={!openingSign ? handleSignOneClick : undefined}
            style={{ cursor: "pointer" }}
          >
            <p className="door-sign-UnitOne-title-first">היערכות לאיומים</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`}
              alt="Sign 1"
              className="title-img"
            />
          </div>
        )}
        {openingSign !== 2 && (
          <div
            className={`door-sign-UnitOne-second ${!canEnterSecond ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterSecond ? handleSignTwoClick : undefined
            }
          >
            <p className="door-sign-UnitOne-title-second">מצבי תפקוד</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`}
              alt="Sign 2"
              className="title-img"
            />
          </div>
        )}
        {openingSign !== 3 && (
          <div
            className={`door-sign-UnitOne-third ${!canEnterThird ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterThird ? handleSignThreeClick : undefined
            }
          >
            <p className="door-sign-UnitOne-title-third">ממשקים</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`}
              alt="Sign 3"
              className="title-img"
            />
          </div>
        )}
        {openingSign !== 4 && (
          <div
            className={`door-sign-UnitOne-fourth ${!canEnterFourth ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterFourth ? handleSignFourClick : undefined
            }
          >
            <p className="door-sign-UnitOne-title-fourth">אוכלוסייה</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`}
              alt="Sign 4"
              className="title-img"
            />
          </div>
        )}
      </div>

      {finishedChapters.unitOneFirst && (
        <img
          className="doorOneDone UnitOneDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`}
          alt="1"
        />
      )}
      {finishedChapters.unitOneSecond && (
        <img
          className="doorTwoDone UnitOneDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`}
          alt="2"
        />
      )}
      {finishedChapters.unitOneThird && (
        <img
          className="doorThreeDone UnitOneDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
          alt="3"
        />
      )}
      {finishedChapters.unitOneFourth && (
        <img
          className="doorFourDone UnitOneDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`}
          alt="4"
        />
      )}

      <button
        className="ShortcutButton"
        id="ShortcutButton1-one"
        onClick={() => {
          sessionStorage.setItem("unitOne-first", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitOneFirst: true }));
        }}
      >
        כפתור קיצור- דלת 1
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton2-one"
        onClick={() => {
          sessionStorage.setItem("unitOne-second", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitOneSecond: true }));
        }}
      >
        כפתור קיצור- דלת 2
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton3-one"
        onClick={() => {
          sessionStorage.setItem("unitOne-third", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitOneThird: true }));
        }}
      >
        כפתור קיצור- דלת 3
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton4-one"
        onClick={() => {
          sessionStorage.setItem("unitOne-fourth", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitOneFourth: true }));
        }}
      >
        כפתור קיצור- דלת 4
      </button>

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
              הגעתם לסוף היחידה, כעת נעבור על מספר שאלות כדי לוודא הבנה
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntroUnitOne;
