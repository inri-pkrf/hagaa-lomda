import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Population.css";


function Population() {
  const navigate = useNavigate();
  const location = useLocation();


  const backgroundImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationBackground.webp`;
  const laptopImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/populationComp.webp`;
  const foldersImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationFolders.webp`;
  const lampImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/lamp.png`;


  const [isLaptopDone, setIsLaptopDone] = useState(false);
  const [isFoldersDone, setIsFoldersDone] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);
  const [activeGlow, setActiveGlow] = useState("laptop"); // 'laptop' | 'folders' | 'lamp' | null


  const allStepsFinished = isLaptopDone && isFoldersDone && isGameDone;


  // Cycle the yellow glow to the next incomplete step
  useEffect(() => {
    if (allStepsFinished) {
      setActiveGlow(null);
      return;
    }


    if (!isLaptopDone) {
      setActiveGlow("laptop");
      return;
    }
    if (!isFoldersDone) {
      setActiveGlow("folders");
      return;
    }
    if (!isGameDone) {
      setActiveGlow("lamp");
      return;
    }
  }, [isLaptopDone, isFoldersDone, isGameDone, allStepsFinished]);


  useEffect(() => {
    sessionStorage.setItem("MainTitle", "אוכלוסייה");


    const laptopStatus =
      sessionStorage.getItem("populationLaptopFinished") === "true" ||
      location.state?.laptopFinished;
    const foldersStatus =
      sessionStorage.getItem("populationFoldersFinished") === "true" ||
      location.state?.foldersFinished;
    const gameStatus =
      sessionStorage.getItem("populationGameFinished") === "true" ||
      location.state?.gameFinished;


    if (laptopStatus) setIsLaptopDone(true);
    if (foldersStatus) setIsFoldersDone(true);
    if (gameStatus) setIsGameDone(true);
  }, [location]);


  useEffect(() => {
    if (!allStepsFinished) {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: true }),
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    }


    const handleNext = (e) => {
      if (allStepsFinished) {
        e.preventDefault();
        handleFinalComplete();
      }
    };


    const handlePrev = (e) => {
      e.preventDefault();
      navigate("/intro-unit-one");
    };


    window.addEventListener("onNextNav", handleNext);
    window.addEventListener("onPrevNav", handlePrev);


    return () => {
      window.removeEventListener("onNextNav", handleNext);
      window.removeEventListener("onPrevNav", handlePrev);
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [allStepsFinished, navigate]);


  const handleFinalComplete = () => {
    sessionStorage.setItem("unitOne-fourth", "finished");
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-fourth", state: "finished" }),
    );
    window.dispatchEvent(new Event("updateNavbar"));
    navigate("/intro-unit-one");
  };


  return (
    <div className="population-container">
      <div className="subtitles subtext-population">
        {!isLaptopDone && "יש ללחוץ על המחשב המהבהב"}
        {isLaptopDone && !isFoldersDone && "המשיכו לקלסרים (ניתן לחזור למחשב)"}
        {isFoldersDone &&
          !isGameDone &&
          "יש ללחוץ על המנורה למשחק (ניתן לחזור לקלסרים ולמחשב)"}
        {isGameDone && "סיימתם! כעת עברו לשאלות הסיכום של היחידה"}
      </div>


      <img
        className="room-background-population"
        src={backgroundImg}
        alt="Office Background"
      />


      {/* מחשב - תמיד מוצג */}
      <img
        className={`click-laptop ${activeGlow === "laptop" ? "glow-yellow" : ""} ${isLaptopDone ? "item-done" : ""}`}
        src={laptopImg}
        alt="laptop"
        onClick={() => navigate("/PopulationInfo")}
      />


      {/* קלסרים - תמיד מוצג */}
      <img
        className={`click-folder ${activeGlow === "folders" ? "glow-yellow" : ""} ${isFoldersDone ? "item-done" : ""} ${!isLaptopDone ? "item-locked" : ""}`}
        src={foldersImg}
        alt="folders"
        onClick={() => isLaptopDone && navigate("/population-parts")}
      />


      {/* מנורה - תמיד מוצגת */}
      <img
        className={`click-lamp ${activeGlow === "lamp" ? "glow-yellow" : ""} ${isGameDone ? "item-done" : ""} ${!isFoldersDone ? "item-locked" : ""}`}
        src={lampImg}
        alt="lamp"
        onClick={() => isFoldersDone && navigate("/PopulationGame")}
      />


      {/* וי מחשב */}
      {isLaptopDone && (
        <div className="completion-v check-laptop-pos">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}


      {/* וי קלסרים */}
      {isFoldersDone && (
        <div className="completion-v check-folder-pos">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}


      {/* וי מנורה */}
      {isGameDone && (
        <div className="completion-v check-light-pos">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}


export default Population;



