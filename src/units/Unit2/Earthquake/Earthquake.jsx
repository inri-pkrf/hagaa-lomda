import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/Rockets.css";

const earthquakeFramesData = [
  {
    id: 1,
    text: (
      <>
        <br />
        מאפייני האיום
      </>
    ),
    path: "/earthquake/info-earthquake",
    completionKey: "earthquakeFrame1Completed",
  },
  {
    id: 2,
    text: (
      <>
        היערכות
        <br />
        והתנהגות
      </>
    ),
    path: "/preparation-earth",
    completionKey: "earthquakeFrame2Completed",
  },
  {
    id: 3,
    text: (
      <>
        תרגיל אירוע -<br />
        רעידת אדמה
      </>
    ),
    path: "/EarthquakeExercise",
    completionKey: "earthquakeFrame3Completed",
  },
  {
    id: 4,
    text: <>סיכום</>,
    path: "/summary-checklist-unit2-sub2",
    completionKey: "earthquakeFrame4Completed",
  },
];

function getCompletedFrames() {
  return earthquakeFramesData
    .filter((f) => sessionStorage.getItem(f.completionKey) === "true")
    .map((f) => f.id);
}

function Earthquake() {
  const navigate = useNavigate();
  const location = useLocation();

  const [clickedFrames, setClickedFrames] = useState(getCompletedFrames);

  const [hasPlayedIntro] = useState(() => {
    return sessionStorage.getItem("earthquake_introPlayed") === "true";
  });

  const [startSequence, setStartSequence] = useState(hasPlayedIntro);

  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem("earthquake_unlockedStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  // בכל כניסה — עדכן completed לפי visited
  useEffect(() => {
    earthquakeFramesData.forEach((frame) => {
      if (sessionStorage.getItem(`earthquake-visited-${frame.id}`) === "true") {
        sessionStorage.setItem(frame.completionKey, "true");
        sessionStorage.setItem(
          `earthquake-sub${frame.id}-finished`,
          "finished",
        );
      }
    });

    const updated = getCompletedFrames();
    setClickedFrames(updated);
    sessionStorage.setItem("earthquake_clickedFrames", JSON.stringify(updated));

    const maxCompleted = updated.length > 0 ? Math.max(...updated) : 0;
    const newUnlocked = Math.max(maxCompleted + 1, 1);
    if (newUnlocked > unlockedStep) {
      setUnlockedStep(newUnlocked);
      sessionStorage.setItem("earthquake_unlockedStep", String(newUnlocked));
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "רעידת אדמה");

    if (!hasPlayedIntro) {
      const sequenceTimeout = setTimeout(() => {
        setStartSequence(true);
        sessionStorage.setItem("earthquake_introPlayed", "true");
      }, 500);
      return () => clearTimeout(sequenceTimeout);
    }
  }, [hasPlayedIntro]);

  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      sessionStorage.setItem(`earthquake-visited-${frame.id}`, "true");

      if (
        frame.id === unlockedStep &&
        unlockedStep < earthquakeFramesData.length
      ) {
        setUnlockedStep(unlockedStep + 1);
        sessionStorage.setItem(
          "earthquake_unlockedStep",
          String(unlockedStep + 1),
        );
      }
      navigate(frame.path);
    }
  };

  useEffect(() => {
    const allClicked = earthquakeFramesData.every((f) =>
      clickedFrames.includes(f.id),
    );
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [clickedFrames]);

  const containerClass = `rockets-container ${startSequence ? "sequence-active" : ""} ${hasPlayedIntro ? "no-animation" : ""}`;
  const showContent = startSequence;

  return (
    <div className={containerClass}>
      {!hasPlayedIntro && (
        <div
          className="rockets-background-layer"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/rocketsOpeningBg.jpg)`,
          }}
        />
      )}

      {showContent && (
        <div
          className={`rockets-sub-header ${hasPlayedIntro ? "" : "fade-in-delayed"}`}
        >
          <h3 className="title-rockets">בפרק זה נלמד על:</h3>
        </div>
      )}

      <div className="rockets-frames-container">
        {earthquakeFramesData.map((frame) => {
          const isLocked = frame.id > unlockedStep;
          const isClicked = clickedFrames.includes(frame.id);
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? "locked" : "unlocked"}${isClicked ? " clicked" : ""}`}
              onClick={() => handleFrameClick(frame)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className={`rocket-frame-center-text${isLocked ? " blurred" : ""}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  zIndex: 5,
                  textAlign: "center",
                  pointerEvents: "none",
                  fontWeight: 700,
                  fontSize: "1.5vmin",
                  color: "#472E1A",
                  lineHeight: 1.2,
                }}
              >
                {frame.text}
              </div>

              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/frame${frame.id}.png`}
                className={`rocket-frame-img${isLocked ? " blurred" : ""}`}
                alt={`frame-${frame.id}`}
              />

              {isClicked && (
                <div className="rocket-frame-v">
                  <svg viewBox="0 0 24 24" width="3vw" height="4vh">
                    <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                    <polyline
                      points="20 6 9 17 4 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showContent && (
        <div
          className={`rockets-footer-hint ${hasPlayedIntro ? "" : "fade-in-delayed"}`}
        >
          <p>יש ללחוץ על המסגרת כדי להמשיך</p>
        </div>
      )}
    </div>
  );
}

export default Earthquake;
