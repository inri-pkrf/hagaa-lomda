import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ExternalRecruits() {
  const navigate = useNavigate();
  const location = useLocation();

  const rocketFramesData = useMemo(
    () => [
      {
        id: 1,
        text: (
          <>
            {" "}
            מבוא למגויסי חוץ
            <br />
          </>
        ),
        path: "/ExternalInfo",
        completionKey: "externalFrame1Completed",
      },
      {
        id: 2,
        text: (
          <>
            {" "}
            כוח אדם <br />
          </>
        ),
        path: "/ManPower",
        completionKey: "externalFrame2Completed",
      },
      {
        id: 3,
        text: (
          <>
            {" "}
            שאלת סיכום
            <br />
          </>
        ),
        path: "/ExternalRecruitsQuestion",
        completionKey: "externalFrame3Completed",
      },
      {
        id: 4,
        text: (
          <>
            סיכום
            <br />
          </>
        ),
        path: "/summary-checklist-unit3-sub4",
        completionKey: "externalFrame4Completed",
      },
    ],
    [],
  );

  const getCompletedFrames = () =>
    rocketFramesData
      .filter((f) => sessionStorage.getItem(f.completionKey) === "true")
      .map((f) => f.id);

  const [clickedFrames, setClickedFrames] = useState(getCompletedFrames);
  const [hasPlayedIntro] = useState(
    () => sessionStorage.getItem("externalRecruitsIntroPlayed") === "true",
  );
  const [startSequence, setStartSequence] = useState(hasPlayedIntro);
  const [unlockedStep, setUnlockedStep] = useState(() => {
    const savedStep = sessionStorage.getItem("externalRecruitsUnlockedStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  useEffect(() => {
    rocketFramesData.forEach((frame) => {
      if (sessionStorage.getItem(`external-visited-${frame.id}`) === "true") {
        sessionStorage.setItem(frame.completionKey, "true");
        sessionStorage.setItem(
          `ExternalRecruits-sub${frame.id}-finished`,
          "finished",
        );
      }
    });

    const updated = getCompletedFrames();
    setClickedFrames(updated);
    sessionStorage.setItem(
      "clickedExternalRecruitsFrames",
      JSON.stringify(updated),
    );

    const maxCompleted = updated.length > 0 ? Math.max(...updated) : 0;
    const newUnlocked = Math.max(maxCompleted + 1, 1);
    if (newUnlocked > unlockedStep) {
      setUnlockedStep(newUnlocked);
      sessionStorage.setItem(
        "externalRecruitsUnlockedStep",
        String(newUnlocked),
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "מגויסי חוץ");
    if (!hasPlayedIntro) {
      const t = setTimeout(() => {
        setStartSequence(true);
        sessionStorage.setItem("externalRecruitsIntroPlayed", "true");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [hasPlayedIntro]);

  const handleFrameClick = (frame) => {
    if (frame.id <= unlockedStep) {
      sessionStorage.setItem(`external-visited-${frame.id}`, "true");
      if (frame.id === unlockedStep && unlockedStep < rocketFramesData.length) {
        const next = unlockedStep + 1;
        setUnlockedStep(next);
        sessionStorage.setItem("externalRecruitsUnlockedStep", String(next));
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
      sessionStorage.setItem("unitThree-fourth", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
    }
    return () =>
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
  }, [clickedFrames, rocketFramesData]);

  const containerClass = `rockets-container ${startSequence ? "sequence-active" : ""} ${hasPlayedIntro ? "no-animation" : ""}`;

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
      {startSequence && (
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
      {startSequence && (
        <div
          className={`rockets-footer-hint ${hasPlayedIntro ? "" : "fade-in-delayed"}`}
        >
          <p>יש ללחוץ על המסגרת כדי להמשיך</p>
        </div>
      )}
    </div>
  );
}

export default ExternalRecruits;
