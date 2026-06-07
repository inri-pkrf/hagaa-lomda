import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UnitThreeSidebar from "./UnitThreeSidebar";
import "./style/IntroUnitThree.css";
import { narrationMap } from "../../Data/NarrationData";

function IntroUnitThree() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(
    `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors.jpg`,
  );
  const [openingSign, setOpeningSign] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const modalBorderColor = "#FFB356";

  const [finishedChapters, setFinishedChapters] = useState({
    unitThreeFirst: false,
    unitThreeSecond: false,
    unitThreeThird: false,
    unitThreeFourth: false,
    unitThreeFifth: false,
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
      const srcs = ["recordings/03 - unit3/035 - intro-unit-three.mp3"];
      sessionStorage.setItem("narrationOverride", JSON.stringify(srcs));
      window.dispatchEvent(new CustomEvent("setNarration", { detail: srcs }));
    }
  }, [allDoorsFinished]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "יחידה 3");
    const updateFinished = () => {
      setFinishedChapters({
        unitThreeFirst:
          sessionStorage.getItem("unitThree-first") === "finished",
        unitThreeSecond:
          sessionStorage.getItem("unitThree-second") === "finished",
        unitThreeThird:
          sessionStorage.getItem("unitThree-third") === "finished",
        unitThreeFourth:
          sessionStorage.getItem("unitThree-fourth") === "finished",
        unitThreeFifth:
          sessionStorage.getItem("unitThree-fifth") === "finished",
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

      if (!finishedChapters.unitThreeFirst) {
        handleSignOneClick();
      } else if (!finishedChapters.unitThreeSecond) {
        handleSignTwoClick();
      } else if (!finishedChapters.unitThreeThird) {
        handleSignThreeClick();
      } else if (!finishedChapters.unitThreeFourth) {
        handleSignFourClick();
      } else if (!finishedChapters.unitThreeFifth) {
        handleSignFiveClick();
      } else {
        navigate("/questions-end/3");
      }
    };

    window.addEventListener("onNextNav", handleNext);
    return () => window.removeEventListener("onNextNav", handleNext);
  }, [finishedChapters, openingSign]);

  const handleSignOneClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors-1opened.jpg`,
    );
    setOpeningSign(1);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitThree-first", state: "not started" }),
    );
    setTimeout(() => navigate("/EmergencyTeams"), 800);
  };

  const handleSignTwoClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors-2opened.jpg`,
    );
    setOpeningSign(2);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitThree-second", state: "not started" }),
    );
    setTimeout(() => navigate("/Education"), 800);
  };

  const handleSignThreeClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors-3opened.jpg`,
    );
    setOpeningSign(3);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitThree-third", state: "not started" }),
    );
    setTimeout(() => navigate("/Resources"), 800);
  };

  const handleSignFourClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors-4opened.jpg`,
    );
    setOpeningSign(4);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitThree-fourth", state: "not started" }),
    );
    setTimeout(() => navigate("/ExternalRecruits"), 800);
  };

  const handleSignFiveClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/unit3/bg-doors-5opened.jpg`,
    );
    setOpeningSign(5);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitThree-fifth", state: "not started" }),
    );
    setTimeout(() => navigate("/FactoryFile"), 800);
  };

  const canEnterSecond = finishedChapters.unitThreeFirst;
  const canEnterThird = finishedChapters.unitThreeSecond;
  const canEnterFourth = finishedChapters.unitThreeThird;
  const canEnterFifth = finishedChapters.unitThreeFourth;

  return (
    <div className="IntroUnitThree">
      <UnitThreeSidebar />

      <div className="subtext-IntroUnit">
        יחידה זו בנויה מ - 5 תתי-נושאים, בלחיצה על כל דלת יפתח תת-נושא חדש
      </div>

      <img className="first-background" src={doorImage} alt="Intro Unit 3" />

      <div className="door-signs-UnitThree">
        {openingSign !== 1 && (
          <div
            className="door-sign-UnitThree-first"
            onClick={!openingSign ? handleSignOneClick : undefined}
            style={{ cursor: "pointer" }}
          >
            <p className="door-sign-UnitThree-title-first">צוותי חירום</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`}
              alt="Sign 1"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 2 && (
          <div
            className={`door-sign-UnitThree-second ${!canEnterSecond ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterSecond ? handleSignTwoClick : undefined
            }
          >
            <p className="door-sign-UnitThree-title-second">מפ"ל</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`}
              alt="Sign 2"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 3 && (
          <div
            className={`door-sign-UnitThree-third ${!canEnterThird ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterThird ? handleSignThreeClick : undefined
            }
          >
            <p className="door-sign-UnitThree-title-third">משאבים</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`}
              alt="Sign 3"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 4 && (
          <div
            className={`door-sign-UnitThree-fourth ${!canEnterFourth ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterFourth ? handleSignFourClick : undefined
            }
          >
            <p className="door-sign-UnitThree-title-fourth">מגויסי חוץ</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`}
              alt="Sign 4"
              class="title-img"
            />
          </div>
        )}
        {openingSign !== 5 && (
          <div
            className={`door-sign-UnitThree-fifth ${!canEnterFifth ? "disabled" : ""}`}
            onClick={
              !openingSign && canEnterFifth ? handleSignFiveClick : undefined
            }
          >
            <p className="door-sign-UnitThree-title-fifth">תיק מפעל</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`}
              alt="Sign 5"
              class="title-img"
            />
          </div>
        )}
      </div>

      {/* תמונות ה-V */}
      {finishedChapters.unitThreeFirst && (
        <img
          className="doorOneDone UnitThreeDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`}
          alt="1"
        />
      )}
      {finishedChapters.unitThreeSecond && (
        <img
          className="doorTwoDone UnitThreeDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`}
          alt="2"
        />
      )}
      {finishedChapters.unitThreeThird && (
        <img
          className="doorThreeDone UnitThreeDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
          alt="3"
        />
      )}
      {finishedChapters.unitThreeFourth && (
        <img
          className="doorFourDone UnitThreeDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
          alt="4"
        />
      )}
      {finishedChapters.unitThreeFifth && (
        <img
          className="doorFiveDone UnitThreeDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`}
          alt="5"
        />
      )}

      {/* כפתורי קיצור - למחוק אחר כך */}
      <button
        className="ShortcutButton"
        id="ShortcutButton1-three"
        onClick={() => {
          sessionStorage.setItem("unitThree-first", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitThreeFirst: true }));
        }}
      >
        כפתור קיצור- דלת 1
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton2-three"
        onClick={() => {
          sessionStorage.setItem("unitThree-second", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitThreeSecond: true }));
        }}
      >
        כפתור קיצור- דלת 2
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton3-three"
        onClick={() => {
          sessionStorage.setItem("unitThree-third", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitThreeThird: true }));
        }}
      >
        כפתור קיצור- דלת 3
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton4-three"
        onClick={() => {
          sessionStorage.setItem("unitThree-fourth", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitThreeFourth: true }));
        }}
      >
        כפתור קיצור- דלת 4
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton5-three"
        onClick={() => {
          sessionStorage.setItem("unitThree-fifth", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitThreeFifth: true }));
        }}
      >
        כפתור קיצור- דלת 5
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
              הגעתם לסוף היחידה, כעת נעבור על מספר שאלות כדי לוודא הבנה
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntroUnitThree;
