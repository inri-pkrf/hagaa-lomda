import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit3/style/EducationGame.css";

function EducationGame() {
  const navigate = useNavigate();

  const getInitialState = () => {
    const saved = sessionStorage.getItem("educationGameState");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      activeStep: 0,
      showPopup: true,
      isIntro: true,
      showFinalChecks: false,
      clickedSteps: [],
      stepCompleted: false,
    };
  };

  const initial = getInitialState();

  const [activeStep, setActiveStep] = useState(initial.activeStep);
  const [showPopup, setShowPopup] = useState(initial.showPopup);
  const [isIntro, setIsIntro] = useState(initial.isIntro);
  const [showFinalChecks, setShowFinalChecks] = useState(
    initial.showFinalChecks,
  );
  const [clickedSteps, setClickedSteps] = useState(initial.clickedSteps);
  const [stepCompleted, setStepCompleted] = useState(initial.stepCompleted);

  const steps = [
    {
      id: "clipboard",
      img: "clipboard.png",
      text: `הכנת נוהל/תוכנית להפעלת מסגרת להפעלת ילדי העובדים הכוללת מקום ממוגן, כ"א, אמצעים ועוד.`,
      top: "36%",
      left: "18%",
      zIndex: 5,
    },
    {
      id: "bottels",
      img: "bottels.png",
      text: `לכל מסגרת נדרש להכין בשגרה ציוד לפי נוהל מענה לילדי עובדים חיוניים בשע"ח - 2023.`,
      top: "41%",
      left: "48%",
      zIndex: 5,
    },
    {
      id: "anotherPlace",
      img: "anotherPlace.png",
      text: `אם המתקן קטן ונדרש מענה למספר קטן של ילדים, ניתן לבחון שילובם במסגרת משותפת עם מתקן קרוב  אחר, או מתקן של הרשות המקומית (התיאומים מבוצעים בשגרה ומאפשרים היערכות מתאימה).`,
      top: "90%",
      left: "45%",
      zIndex: 5,
    },
    {
      id: "clock",
      img: "clock.webp",
      text: "מסגרות החינוך יופעלו למשך כל תקופת החירום שהוגדרה ובמהלך כל היום (שעות ההפעלה ייקבעו על ידי המפעל).",
      top: "25%",
      left: "53%",
      zIndex: 6,
    },
    {
      id: "nanny",
      img: "educationNaany.webp",
      text: 'בכל מסגרת חינוך יוגדר מנהל אחראי מטעם המפעל. \nכוח אדם להפעלת המסגרת חינוך ייקבע ע"י המפעל בתיאום עם הרשות המקומית/ מפעלים סמוכים, כל זאת בהתאם לתצורה שתיקבע.',
      top: "69%",
      left: "85%",
      zIndex: 6,
    },
    {
      id: "name",
      img: "educationName.png",
      text: `המסגרת עשויה להיפתח ב-3 תצורות:
בשטח המפעל ובתנאי שיש מענה מיגוני,
ברשות המקומית שבה שוכן המפעל,
או במפעל סמוך- מסגרת חינוך אחודה.




התצורה תיקבע ע"י המפעל בהתאם לכמות הילדים ויכולות של המפעל לספק את כל הצרכים המפורטים.`,
      top: "35%",
      left: "34.3%",
      zIndex: 5,
    },
  ];

  useEffect(() => {
    sessionStorage.setItem("MainTitle", "משחק שמרטפיה");
  }, []);

  useEffect(() => {
    const state = {
      activeStep,
      showPopup,
      isIntro,
      showFinalChecks,
      clickedSteps,
      stepCompleted,
    };
    sessionStorage.setItem("educationGameState", JSON.stringify(state));
  }, [
    activeStep,
    showPopup,
    isIntro,
    showFinalChecks,
    clickedSteps,
    stepCompleted,
  ]);

  const handleElementClick = (index) => {
    if (index === activeStep) {
      setIsIntro(false);
      setShowPopup(true);
      setStepCompleted(true);
      setClickedSteps((prev) =>
        prev.includes(index) ? prev : [...prev, index],
      );
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    if (!stepCompleted && !isIntro) return;

    if (isIntro) {
      setIsIntro(false);
      return;
    }

    // ניווט ישיר ל-Education כשיוצאים מהשלב האחרון
    if (activeStep === steps.length - 1) {
      sessionStorage.removeItem("educationGameState");
      navigate("/Education");
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      setStepCompleted(false);
    }
  };

  const isLastStep = activeStep === steps.length - 1;
  const popupContent = isIntro
    ? {
        text: "יש ללחוץ בכל פעם על האלמנט המהבהב כדי לחשוף מידע על אודות מסגרות חינוכיות להפעלת ילדי העובדים",
        btn: "התחלה",
      }
    : {
        text: steps[activeStep].text,
        btn: isLastStep ? "סיום" : "המשך",
      };

  return (
    <div className="education-game-container">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/EducationBackground.webp`}
        className="education-bg"
        alt="bg"
      />

      <div className="dim-overlay" />

      <div className="steps-counter">
        {clickedSteps.length}/{steps.length}
      </div>

      <div className="hotspots-layer">
        {steps.map((step, index) => {
          const isActive = index === activeStep;

          return (
            <div
              key={step.id}
              className={`hotspot ${step.id} ${
                isActive ? "active-glow" : "dimmed-hotspot"
              }`}
              style={{ top: step.top, left: step.left, zIndex: step.zIndex }}
              onClick={() => handleElementClick(index)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/${step.img}`}
                alt={step.id}
              />
            </div>
          );
        })}

        {/* ✅ וי על מה שנלחץ */}
        {steps.map((step, index) => {
          if (!clickedSteps.includes(index)) return null;
          return (
            <div
              key={`v-${step.id}`}
              className="v-container-fixed"
              style={{
                top: step.top,
                left: step.left,
                zIndex: step.zIndex + 1,
              }}
            >
              <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                <polyline
                  points="20 6 9 17 4 12"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <div className="education-popup-overlay">
          <div className="education-popup-content custom-design">
            <button className="education-close-x-circle" onClick={handleClose}>
              ✕
            </button>
            <div className="popup-text-container">
              <h2>{popupContent.text}</h2>
            </div>
            <div className="popup-footer">
              <button
                className="education-continue-btn-new"
                onClick={handleClose}
              >
                {popupContent.btn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/*
      {showFinalChecks && (
        <div className="education-popup-overlay">
          <div className="education-popup-content custom-design">
            <h2>כל הכבוד סיימת את המשחק לחצו על החץ הבא על מנת להמשיך</h2>
            <button
              className="education-continue-btn-new"
              onClick={() => {
                sessionStorage.removeItem("educationGameState");
                navigate("/Education");
              }}
            >
              סיום
            </button>
          </div>
        </div>
      )}
      */}
    </div>
  );
}

export default EducationGame;
