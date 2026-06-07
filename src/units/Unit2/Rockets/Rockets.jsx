import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/Rockets.css";

const rocketFramesData = [
  {
    id: 1,
    text: (
      <>
        מאפייני
        <br />
        האיום
      </>
    ),
    path: "/info-rockets",
    completionKey: "rocketsFrame1Completed",
    subPages: ["/info-rockets"],
  },
  {
    id: 2,
    text: (
      <>
        היערכות
        <br />
        והתגוננות
      </>
    ),
    path: "/preparation",
    completionKey: "rocketsFrame2Completed",
    subPages: ["/preparation"],
  },
  {
    id: 3,
    text: (
      <>
        מרחבים
        <br />
        מוגנים
      </>
    ),
    path: "/TimeToEnterMamad1",
    completionKey: "rocketsFrame3Completed",
    subPages: ["/TimeToEnterMamad1"],
  },
  {
    id: 4,
    text: (
      <>
        מדיניות
        <br />
        התגוננות
      </>
    ),
    path: "/defense-policy/sub-one",
    completionKey: "rocketsFrame4Completed",
    subPages: ["/defense-policy/sub-one"],
  },
  {
    id: 5,
    text: <>סיכום</>,
    path: "/summary-checklist-unit2-sub1",
    completionKey: "rocketsFrame5Completed",
    subPages: ["/summary-checklist-unit2-sub1"],
  },
];

// רשימת כל תת-העמודים של rockets — משמשת לזיהוי חזרה
const allRocketSubPages = rocketFramesData
  .flatMap((f) => f.subPages)
  .concat([
    "/Alert",
    "/Alert/2",
    "/Alert/3",
    "/Alert/4",
    "/Defense",
    "/Defense/2",
    "/ChoosingSafeRoom",
    "/ChoosingSafeRoomImgs",
    "/ChoosingSafeRoomVideo",
    "/Wait10mins",
    "/BuildingMaintenance",
    "/ProtectedSpace",
    "/TimeToEnterMamad2",
    "/TimeToEnterMamad3",
    "/SafeRoomExercise",
    "/defense-policy/sub-two",
    "/defense-policy/sub-three",
  ]);

function getCompletedFrames() {
  return rocketFramesData
    .filter((f) => sessionStorage.getItem(f.completionKey) === "true")
    .map((f) => f.id);
}

function Rockets() {
  const navigate = useNavigate();
  const location = useLocation();

  const [clickedFrames, setClickedFrames] = useState(getCompletedFrames);

  const [hasPlayedIntro] = useState(() => {
    return sessionStorage.getItem("introPlayed") === "true";
  });

  const [startSequence, setStartSequence] = useState(hasPlayedIntro);

  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem("unlockedStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  // בכל כניסה ל-/rockets — בדוק אם חזרנו מתת-עמוד ועדכן completed
  useEffect(() => {
    const completed = getCompletedFrames();

    // כל frame שנכנסנו לתת-עמוד שלו — מסמן כ-completed בחזרה
    rocketFramesData.forEach((frame) => {
      if (sessionStorage.getItem(`rockets-visited-${frame.id}`) === "true") {
        sessionStorage.setItem(frame.completionKey, "true");
        sessionStorage.setItem(`rockets-sub${frame.id}-finished`, "finished");
      }
    });

    const updated = getCompletedFrames();
    setClickedFrames(updated);
    sessionStorage.setItem("clickedFrames", JSON.stringify(updated));

    const maxCompleted = updated.length > 0 ? Math.max(...updated) : 0;
    const newUnlocked = Math.max(maxCompleted + 1, 1);
    if (newUnlocked > unlockedStep) {
      setUnlockedStep(newUnlocked);
      sessionStorage.setItem("unlockedStep", String(newUnlocked));
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "ירי טילים");
    if (!hasPlayedIntro) {
      const sequenceTimeout = setTimeout(() => {
        setStartSequence(true);
        sessionStorage.setItem("introPlayed", "true");
      }, 500);
      return () => clearTimeout(sequenceTimeout);
    }
  }, [hasPlayedIntro]);

  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      // מסמנים שנכנסנו לתת-עמוד — הוי יופיע בחזרה
      sessionStorage.setItem(`rockets-visited-${frame.id}`, "true");

      if (frame.id === unlockedStep && unlockedStep < rocketFramesData.length) {
        const nextStep = unlockedStep + 1;
        setUnlockedStep(nextStep);
        sessionStorage.setItem("unlockedStep", String(nextStep));
      }

      navigate(frame.path);
    }
  };

  useEffect(() => {
    const allClicked = rocketFramesData.every((f) =>
      clickedFrames.includes(f.id),
    );
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );

    if (allClicked) {
      sessionStorage.setItem("unitTwo-first", "finished");
      setTimeout(() => {
        window.dispatchEvent(new Event("updateNavbar"));
      }, 100);
    }

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
        {rocketFramesData.map((frame) => {
          const isLocked = frame.id > unlockedStep;
          const isClicked = clickedFrames.includes(frame.id);
          return (
            <div
              key={frame.id}
              className={`rocket-frame-item ${isLocked ? "locked" : "unlocked"}${isClicked ? " clicked" : ""}`}
              onClick={() => handleFrameClick(frame)}
            >
              <div
                className={`rocket-frame-center-text${isLocked ? " blurred" : ""}`}
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

export default Rockets;
