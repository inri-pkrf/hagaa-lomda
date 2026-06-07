import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/IntroUnitTwo.css";
import UnitTwoSidebar from "./UnitTwoSidebar";
import { narrationMap } from "../../Data/NarrationData";

function IntroUnitTwo() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(
    `${process.env.PUBLIC_URL}/assets/General/Doors/Doors.jpg`,
  );
  const [openingSign, setOpeningSign] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const modalBorderColor = "#56C3A9";

  const [finishedChapters, setFinishedChapters] = useState({
    unitTwoFirst: false,
    unitTwoSecond: false,
    unitTwoThird: false,
    unitTwoFourth: false,
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
      const srcs = ["recordings/02 - unit2/026 - intro-unit-two.mp3"];
      sessionStorage.setItem("narrationOverride", JSON.stringify(srcs));
      window.dispatchEvent(new CustomEvent("setNarration", { detail: srcs }));
    }
  }, [allDoorsFinished]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "יחידה 2");
    const updateFinished = () => {
      setFinishedChapters({
        unitTwoFirst: sessionStorage.getItem("unitTwo-first") === "finished",
        unitTwoSecond: sessionStorage.getItem("unitTwo-second") === "finished",
        unitTwoThird: sessionStorage.getItem("unitTwo-third") === "finished",
        unitTwoFourth: sessionStorage.getItem("unitTwo-fourth") === "finished",
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
    sessionStorage.setItem("MainTitle", "יחידה 2");

    const currentChapterStr = sessionStorage.getItem("currentChapter");
    if (currentChapterStr) {
      try {
        const currentChapter = JSON.parse(currentChapterStr);
        if (!currentChapter.name) {
          sessionStorage.setItem(
            "currentChapter",
            JSON.stringify({ name: "unitTwo-first", state: "not started" }),
          );
        }
      } catch (e) {
        sessionStorage.setItem(
          "currentChapter",
          JSON.stringify({ name: "unitTwo-first", state: "not started" }),
        );
      }
    } else {
      sessionStorage.setItem(
        "currentChapter",
        JSON.stringify({ name: "unitTwo-first", state: "not started" }),
      );
    }

    const finished1 = sessionStorage.getItem("unitTwo-first") === "finished";
    const finished2 = sessionStorage.getItem("unitTwo-second") === "finished";
    const finished3 = sessionStorage.getItem("unitTwo-third") === "finished";
    const finished4 = sessionStorage.getItem("unitTwo-fourth") === "finished";

    setFinishedChapters({
      unitTwoFirst: finished1,
      unitTwoSecond: finished2,
      unitTwoThird: finished3,
      unitTwoFourth: finished4,
    });
  }, []);

  useEffect(() => {
    const handleNext = (e) => {
      if (openingSign) return;
      e.preventDefault();

      if (!finishedChapters.unitTwoFirst) {
        handleSignOneClick();
      } else if (!finishedChapters.unitTwoSecond) {
        handleSignTwoClick();
      } else if (!finishedChapters.unitTwoThird) {
        handleSignThreeClick();
      } else if (!finishedChapters.unitTwoFourth) {
        handleSignFourClick();
      } else {
        navigate("/questions-end/2");
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
    setTimeout(() => navigate("/rockets"), 800);
  };

  const handleSignTwoClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorTwoOpen.jpg`,
    );
    setOpeningSign(2);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitTwo-second", state: "not started" }),
    );
    setTimeout(() => navigate("/earthquake"), 800);
  };

  const handleSignThreeClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorThreeOpen.jpg`,
    );
    setOpeningSign(3);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitTwo-third", state: "not started" }),
    );
    setTimeout(() => navigate("/fire"), 800);
  };

  const handleSignFourClick = () => {
    setDoorImage(
      `${process.env.PUBLIC_URL}/assets/General/Doors/DoorFourOpen.jpg`,
    );
    setOpeningSign(4);
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitTwo-fourth", state: "not started" }),
    );
    setTimeout(() => navigate("/chemical"), 800);
  };

  return (
    <div className="IntroUnitTwo">
      <UnitTwoSidebar />
      <div className="subtext-IntroUnit">
        יחידה זו בנויה מ - 4 תתי-נושאים, בלחיצה על כל דלת יפתח תת-נושא חדש
      </div>
      <img className="first-background" src={doorImage} alt="Intro Unit 2" />

      <div className="door-signs-UnitTwo">
        {openingSign !== 1 && (
          <div
            className="door-sign-UnitTwo-first"
            onClick={handleSignOneClick}
            style={{ cursor: "pointer" }}
          >
            <p className="door-sign-UnitTwo-title-first">טילים</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`}
              alt="Sign 1"
              class="title-img"
            />
          </div>
        )}

        {openingSign !== 2 && (
          <div
            className={`door-sign-UnitTwo-second ${!finishedChapters.unitTwoFirst ? "disabled" : ""}`}
            onClick={
              finishedChapters.unitTwoFirst && !openingSign
                ? handleSignTwoClick
                : undefined
            }
            style={{
              cursor:
                finishedChapters.unitTwoFirst && !openingSign
                  ? "pointer"
                  : "default",
            }}
          >
            <p className="door-sign-UnitTwo-title-second">רעידת אדמה</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`}
              alt="Sign 2"
              class="title-img"
            />
          </div>
        )}

        {openingSign !== 3 && (
          <div
            className={`door-sign-UnitTwo-third ${!finishedChapters.unitTwoSecond ? "disabled" : ""}`}
            onClick={
              finishedChapters.unitTwoSecond && !openingSign
                ? handleSignThreeClick
                : undefined
            }
            style={{
              cursor:
                finishedChapters.unitTwoSecond && !openingSign
                  ? "pointer"
                  : "default",
            }}
          >
            <p className="door-sign-UnitTwo-title-third">שריפה</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`}
              alt="Sign 3"
              class="title-img"
            />
          </div>
        )}

        {openingSign !== 4 && (
          <div
            className={`door-sign-UnitTwo-fourth ${!finishedChapters.unitTwoThird ? "disabled" : ""}`}
            onClick={
              finishedChapters.unitTwoThird && !openingSign
                ? handleSignFourClick
                : undefined
            }
            style={{
              cursor:
                finishedChapters.unitTwoThird && !openingSign
                  ? "pointer"
                  : "default",
            }}
          >
            <p className="door-sign-UnitTwo-title-fourth">חומ"ס</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`}
              alt="Sign 4"
              class="title-img"
            />
          </div>
        )}
      </div>

      {finishedChapters.unitTwoFirst && (
        <img
          className="doorOneDone UnitTwoDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`}
          alt="Door 1 Done"
        />
      )}
      {finishedChapters.unitTwoSecond && (
        <img
          className="doorTwoDone UnitTwoDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`}
          alt="Door 2 Done"
        />
      )}
      {finishedChapters.unitTwoThird && (
        <img
          className="doorThreeDone UnitTwoDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
          alt="Door 3 Done"
        />
      )}
      {finishedChapters.unitTwoFourth && (
        <img
          className="doorFourDone UnitTwoDoors"
          src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`}
          alt="Door 4 Done"
        />
      )}

      {/* כפתורי קיצור - למחוק אחר כך */}
      <button
        className="ShortcutButton"
        id="ShortcutButton1-two"
        onClick={() => {
          sessionStorage.setItem("unitTwo-first", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitTwoFirst: true }));
        }}
      >
        כפתור קיצור- דלת 1
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton2-two"
        onClick={() => {
          sessionStorage.setItem("unitTwo-second", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitTwoSecond: true }));
        }}
      >
        כפתור קיצור- דלת 2
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton3-two"
        onClick={() => {
          sessionStorage.setItem("unitTwo-third", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitTwoThird: true }));
        }}
      >
        כפתור קיצור- דלת 3
      </button>
      <button
        className="ShortcutButton"
        id="ShortcutButton4-two"
        onClick={() => {
          sessionStorage.setItem("unitTwo-fourth", "finished");
          setFinishedChapters((prev) => ({ ...prev, unitTwoFourth: true }));
        }}
      >
        כפתור קיצור- דלת 4
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

export default IntroUnitTwo;
