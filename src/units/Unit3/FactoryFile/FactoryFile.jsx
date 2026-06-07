import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FactoryFile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [clickedFrames, setClickedFrames] = useState(() => {
    const saved = sessionStorage.getItem("clickedFactoryFrames");
    return saved ? JSON.parse(saved) : [];
  });

  const [hasPlayedIntro] = useState(() => {
    return sessionStorage.getItem("factoryIntroPlayed") === "true";
  });

  const [startSequence, setStartSequence] = useState(hasPlayedIntro);

  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem("factoryUnlockedStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  // מפת תת-עמודים שצריך לעבור כדי לסמן כל frame כ-completed
  // frame 1 = UsesFactoryFile — דורש מעבר בכל 4 תת-עמודים הפנימיים
  // frame 2 = QuestionFactoryFile — מסומן מיידית עם כניסה (אין תת-עמודים)
  const frameCompletionKeys = useMemo(
    () => ({
      1: "factoryFrame1Completed", // נכתב כשחוזרים מ-UsesFactoryFile אחרי סיום כל 4 שלבים
      2: "factoryFrame2Completed",
    }),
    [],
  );

  // בדיקה אם frame 1 הושלם — כל 4 תת-עמודים נכנסו
  const isFrame1Done = () => {
    return sessionStorage.getItem("factoryFrame1Completed") === "true";
  };

  // עדכון clickedFrames לפי sessionStorage בכל כניסה לדף
  useEffect(() => {
    const updated = [];

    if (isFrame1Done()) updated.push(1);
    if (sessionStorage.getItem("factoryFrame2Completed") === "true")
      updated.push(2);

    if (
      updated.length !== clickedFrames.length ||
      updated.some((id) => !clickedFrames.includes(id))
    ) {
      setClickedFrames(updated);
      sessionStorage.setItem("clickedFactoryFrames", JSON.stringify(updated));
    }

    // עדכון unlockedStep לפי מה שהושלם
    const maxCompleted = updated.length > 0 ? Math.max(...updated) : 0;
    const newUnlocked = Math.max(maxCompleted + 1, 1);
    if (newUnlocked > unlockedStep) {
      setUnlockedStep(newUnlocked);
      sessionStorage.setItem("factoryUnlockedStep", String(newUnlocked));
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "תיק מפעל");

    if (!hasPlayedIntro) {
      const sequenceTimeout = setTimeout(() => {
        setStartSequence(true);
        sessionStorage.setItem("factoryIntroPlayed", "true");
      }, 500);
      return () => clearTimeout(sequenceTimeout);
    }
  }, [hasPlayedIntro]);

  const rocketFramesData = useMemo(
    () => [
      {
        id: 1,
        text: (
          <>
            {" "}
            מבוא
            <br />
          </>
        ),
        path: "/UsesFactoryFile",
      },
      {
        id: 2,
        text: (
          <>
            {" "}
            שאלת סיכום
            <br />
          </>
        ),
        path: "/QuestionFactoryFile",
      },
    ],
    [],
  );

  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      // frame 2 מסומן מיידית כי אין לו תת-עמודים
      if (frame.id === 2) {
        setClickedFrames((prev) => {
          if (!prev.includes(frame.id)) {
            const updated = [...prev, frame.id];
            sessionStorage.setItem(
              "clickedFactoryFrames",
              JSON.stringify(updated),
            );
            sessionStorage.setItem("factoryFrame2Completed", "true");
            sessionStorage.setItem(
              `FactoryFile-sub${frame.id}-finished`,
              "finished",
            );
            return updated;
          }
          return prev;
        });

        if (
          frame.id === unlockedStep &&
          unlockedStep < rocketFramesData.length
        ) {
          const nextStep = unlockedStep + 1;
          setUnlockedStep(nextStep);
          sessionStorage.setItem("factoryUnlockedStep", String(nextStep));
        }
      }
      // frame 1 לא מסומן כאן — יסומן רק בחזרה מ-UsesFactoryFile

      navigate(frame.path);
    }
  };

  useEffect(() => {
    const allClicked = rocketFramesData.every((frame) =>
      clickedFrames.includes(frame.id),
    );

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );

    if (allClicked) {
      sessionStorage.setItem("unitThree-fifth", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
    }

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [clickedFrames, rocketFramesData]);

  const containerClass = `rockets-container ${startSequence ? "sequence-active" : ""} ${hasPlayedIntro ? "no-animation" : ""}`;
  const showContent = startSequence;

  return (
    <div className={containerClass}>
      {!hasPlayedIntro && (
        <div
          className="rockets-background-layer"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitThreeImgs/bg-topics.webp)`,
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
                src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/frame${frame.id}.png`}
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

export default FactoryFile;
