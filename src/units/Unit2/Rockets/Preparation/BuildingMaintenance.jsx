import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/BuildingMaintenance.css";

const outsideSteps = [
  {
    id: "entranceDoor",
    text: "וידוא תקינותם של הדלתות והחלונות, וידוא הימצאות גומי אטימה סביב המשקופים \nוכן, שלא קיימת חלודה במסגרות.",
    top: "54%",
    left: "52%",
    zIndex: 1,
  },
  {
    id: "lamp",
    text: "וידוא תקינות תאורת הפנים והחוץ.",
    top: "14%",
    left: "52%",
    zIndex: 1,
  },
  {
    id: "road",
    text: "וידוא דרכי גישה פנויות ממכשולים והדבקת פסי דריכה על מדרגות למניעת החלקות.",
    top: "91%",
    left: "52%",
    zIndex: 2,
  },

  {
    id: "sign",
    text: "הצבת שלט הכוונה למרחב המוגן.",
    top: "45%",
    left: "52%",
    zIndex: 8,
  },
];

const insideSteps = [
  {
    id: "toilet",
    text: "פתרון תברואתי - שירותים. \nכמו כן, יש לבדוק את תקינות הברזים.",
    top: "49%",
    left: "40%",
    zIndex: 5,
  },
  { id: "tin", text: "שקים לאיסוף אשפה.", top: "64%", left: "50%", zIndex: 5 },
  {
    id: "waterbottles",
    text: "בקבוקי מים.",
    top: "66%",
    left: "57%",
    zIndex: 6,
  },
  {
    id: "waterTank",
    text: `בנוסף לבקבוקי המים או במקומם:
מְכל מים (5 ליטרים ל-1 מטר מרובע). \nכמו כן, יש להקפיד על ניקיון המיכלים אחת לחודש.`,
    top: "59%",
    left: "62%",
    zIndex: 6,
  },
  {
    id: "firstAidKit",
    text: "תיק עזרה ראשונה.",
    top: "80%",
    left: "92%",
    zIndex: 7,
  },
  {
    id: "fireExtinguisher",
    text: "מטפה לכיבוי אש.",
    top: "72%",
    left: "90%",
    zIndex: 5,
  },
  {
    id: "ladder",
    text: "יש לוודא את תקינות הסולמות לפתחי יציאת החירום.",
    top: "52%",
    left: "27%",
    zIndex: 8,
  },
  {
    id: "ventilationSystem",
    text: "מערכת אוורור וסינון - יש לוודא נקיון ותחזוקה בהתאם להוראות יצרן. \nיש לוודא שלט עם הנחיות הפעלה. \nכמו כן, יש לוודא שהמזגנים לא מותקנים על הקירות החיצוניים של המיגון.",
    top: "28%",
    left: "21%",
    zIndex: 5,
  },
  {
    id: "tv-plazma",
    text: "דרכי תקשורת ובדיקת תקינות אמצעים אלה (טלפון קווי, אינטרנט וטלוויזיה).",
    top: "41.5%",
    left: "57%",
    zIndex: 5,
  },
  {
    id: "glowing-electricity",
    text: "שילוט המפסקים והשקעים בצבע זוהר בחושך.",
    top: "46%",
    left: "20%",
    zIndex: 5,
  },
  {
    id: "emergencyLighting",
    text: "תאורת חירום.",
    top: "27%",
    left: "40%",
    zIndex: 5,
  },
  {
    id: "light",
    text: "פנסים וסוללות רזרביות.",
    top: "85%",
    left: "18%",
    zIndex: 6,
  },
];

function BuildingMaintenance() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isInside, setIsInside] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isIntro, setIsIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickedSteps, setClickedSteps] = useState([]);
  const [showPoster, setShowPoster] = useState(false);

  // State חדש שמנהל את הופעת הפופ-אפ הבונוס בסוף
  const [isFinalExtraPopup, setIsFinalExtraPopup] = useState(false);

  const markBuildingMaintenanceComplete = () => {
    const saved = sessionStorage.getItem("clickedTopics");
    const clicked = saved ? JSON.parse(saved) : [];
    if (!clicked.includes("BuildingMaintenance")) {
      sessionStorage.setItem(
        "clickedTopics",
        JSON.stringify([...clicked, "BuildingMaintenance"]),
      );
    }
  };

  const currentSteps = isInside ? insideSteps : outsideSteps;
  const currentBg = isInside
    ? "insideSafeRoomBg-new.webp"
    : "outsideSafeRoomBg.webp";

  const handleElementClick = (index) => {
    // אם אנחנו כבר בפופ-אפ הסופי, לא נאפשר לחיצות נוספות
    if (isFinalExtraPopup) return;

    if (index === activeStep) {
      setIsIntro(false);
      setShowPopup(true);
      setClickedSteps((prev) =>
        prev.includes(index) ? prev : [...prev, index],
      );
    }
  };

  const handleClose = () => {
    setShowPopup(false);

    if (isFinalExtraPopup) {
      markBuildingMaintenanceComplete();
      navigate("/preparation");
      return;
    }

    if (!isIntro) {
      if (activeStep < currentSteps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else if (!isInside) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsInside(true);
          setActiveStep(0);
          setClickedSteps([]);
          setIsTransitioning(false);
        }, 1200);
      } else {
        // הגענו לסוף האלמנט האחרון בפנים!
        // במקום לנווט, אנחנו מפעילים את מצב ה"פופ-אפ הנוסף" ופותחים אותו שוב
        setIsFinalExtraPopup(true);
        setShowPopup(true);
      }
    }
  };

  const getPopupContent = () => {
    if (isIntro) {
      return {
        text: "כממונה הג”א עליך לוודא שאחראי צוות אחזקת מבנים מבצע כמה בדיקות. \nיש ללחוץ על האלמנטים המהבהבים כדי ללמוד על הבדיקות השונות.",
        btn: "התחלה",
      };
    }

    if (isFinalExtraPopup) {
      return {
        title: "בדיקה נוספת:",
        text: "יש לוודא שלא מותקנים חיפויים מסַכנים על קירות המיגון והתקרות (קרמיקה, מראות, הנמכת תקרה) ולדרוש פירוקם אם קיימים.",
        btn: "סיום",
        showPosterBtn: true, // סימון להצגת הכפתור
      };
    }

    // כאן זה נקי בלי התנאי המיותר
    return { text: currentSteps[activeStep].text, btn: "המשך" };
  };

  const popupContent = getPopupContent();

  return (
    <div
      className={`maintenance-game-container ${isTransitioning ? "zoom-active" : ""}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${currentBg}`}
        className="maintenance-bg"
        alt="bg"
      />

      <div className="dim-overlay" />

      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/equipment-icon.png`}
        alt="icon"
        id="equipment-icon-BM"
      />

      <div className="steps-counter">
        {clickedSteps.length}/{currentSteps.length}
      </div>

      <div className="hotspots-layer">
        {currentSteps.map((step, index) => {
          const isActive = index === activeStep;
          const isClicked = clickedSteps.includes(index);

          return (
            <div
              key={step.id}
              className={`hotspot ${step.id} ${
                isActive ? "active-glow" : "dimmed-hotspot"
              } ${isClicked ? "clicked-hotspot" : ""}`}
              style={{ top: step.top, left: step.left, zIndex: step.zIndex }}
              onClick={() => handleElementClick(index)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${step.id}.png`}
                alt={step.id}
              />
            </div>
          );
        })}

        {currentSteps.map((step, index) => {
          if (clickedSteps.includes(index)) {
            return (
              <div
                key={`v-${step.id}`}
                className={`v-container-fixed ${step.id === "ventilationSystem" ? "ventilationSystem-v" : ""}`}
                style={{ top: step.top, left: step.left }}
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
          }
          return null;
        })}
      </div>
      {showPopup && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content custom-design">
            <button className="close-x-circle" onClick={handleClose}>
              ✕
            </button>

            <div className="popup-text-container single-text">
              {popupContent.title && <h1>{popupContent.title}</h1>}
              <h2 style={{ whiteSpace: "pre-line" }}>{popupContent.text}</h2>

              {popupContent.showPosterBtn && (
                <div
                  className="image-hint-wrapper"
                  style={{ marginTop: "15px", textAlign: "center" }}
                >
                  <img
                    className="thumbnail-img"
                    src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/choosing-img2.jpg`}
                    alt="Preview"
                    style={{
                      width: "120px",
                      cursor: "pointer",
                      border: "2px solid #ccc",
                      borderRadius: "8px",
                    }}
                    onClick={() => setShowPoster(true)}
                  />
                  <p
                    style={{
                      fontSize: "1.1rem",
                      marginTop: "5px",
                    }}
                  >
                    יש ללחוץ על התמונה בכדי להגדילה{" "}
                  </p>
                </div>
              )}
            </div>

            <div className="popup-footer">
              <button className="continue-btn-new" onClick={handleClose}>
                {popupContent.btn}
              </button>
            </div>
          </div>

          {/* הפוסטר המוגדל - נמצא בתוך ה-Overlay של הפופאפ */}
          {showPoster && (
            <>
              <div
                className="alert-image-overlay"
                onClick={() => setShowPoster(false)}
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/choosing-img2.jpg`}
                alt="Poster"
                className="enlarged"
                onClick={() => setShowPoster(false)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BuildingMaintenance;
