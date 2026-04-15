import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/BuildingMaintenance.css";


// רשימת אלמנטים מחוץ למקלט (ללא שינוי)
const outsideSteps = [
  {
    id: "entranceDoor",
    text: "וידוא תקינותם של הדלתות והחלונות, וידוא הימצאות גומי אטימה סביב המשקופים וכן, שלא קיימת חלודה במסגרת",
    top: "54.5%",
    left: "50%",
    zIndex: 1,
  },
  {
    id: "lamp",
    text: "ווידוא תאורה תקינה",
    top: "15%",
    left: "50%",
    zIndex: 1,
  },
  {
    id: "road",
    text: "וידוא דרכי גישה פנויות ממכשולים והדבקת פסי דריכה על מדרגות למניעת החלקות",
    top: "93%",
    left: "50%",
    zIndex: 2,
  },
  { id: "sign", text: "הצבת שלט למקלט", top: "45%", left: "50%", zIndex: 8 },
];


// רשימת אלמנטים בתוך המקלט (ללא שינוי)
const insideSteps = [
  {
    id: "toilet",
    text: "טקסט הסבר על מערכת האוורור והסינון...",
    top: "49.5%",
    left: "40%",
    zIndex: 5,
  },
  { id: "tin", text: "שקים לאיסוף אשפה", top: "60%", left: "30%", zIndex: 5 },
  {
    id: "waterbottles",
    text: "בקבוקי מים",
    top: "67%",
    left: "48%",
    zIndex: 6,
  },
  {
    id: "waterTank",
    text: "בנוסף לבקבוקי המים או במקומם: מכל מים (5 ליטרים ל1 מטר מרובע)",
    top: "58%",
    left: "52%",
    zIndex: 6,
  },
  {
    id: "firstAidKit",
    text: "תיק עזרה ראשונה",
    top: "83%",
    left: "10%",
    zIndex: 5,
  },
  {
    id: "fireExtinguisher",
    text: "מטפה לכיבוי אש",
    top: "36%",
    left: "62%",
    zIndex: 5,
  },
  {
    id: "ventilationSystem",
    text: "מערכת אוורור וסינון- אחזקה בהתאם להוראות יצרן. לוודא שלט עם הנחיות הפעלה",
    top: "36%",
    left: "6%",
    zIndex: 5,
  },
  { id: "television", text: "דרכי תקשורת", top: "38%", left: "55%", zIndex: 5 },
  {
    id: "emergencyLighting",
    text: "תאורת חירום",
    top: "25%",
    left: "40%",
    zIndex: 5,
  },
  {
    id: "light",
    text: "פנסים וסוללות רזרביות",
    top: "87%",
    left: "7%",
    zIndex: 6,
  },
];


function BuildingMaintenance() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isInside, setIsInside] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isIntro, setIsIntro] = useState(true);
  const [showFinalChecks, setShowFinalChecks] = useState(false); // מצב חדש לצ'ק ליסט הסופי
  const [isTransitioning, setIsTransitioning] = useState(false);


  const currentSteps = isInside ? insideSteps : outsideSteps;
  const currentBg = isInside ? "insideSafeRoomBg.png" : "outsideSafeRoomBg.png";


  const handleElementClick = (index) => {
    if (index === activeStep) {
      setIsIntro(false);
      setShowPopup(true);
    }
  };


  const handleClose = () => {
    setShowPopup(false);


    if (!isIntro) {
      if (activeStep < currentSteps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else if (!isInside) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsInside(true);
          setActiveStep(0);
          setIsTransitioning(false);
        }, 1200);
      } else {
        // סיום כל האלמנטים בפנים - הצגת צ'ק ליסט סופי
        setShowFinalChecks(true);
      }
    }
  };


  const popupContent = isIntro
    ? {
        text: "כממונה הג”א עלייך לוודא שאחראי צוות אחזקת מבנים מבצע מספר בדיקות. יש ללחוץ על המקומות המסומנים כדי ללמוד עליהם!",
        btn: "התחלה",
      }
    : { text: currentSteps[activeStep].text, btn: "המשך" };


  return (
    <div
      className={`maintenance-game-container ${isTransitioning ? "zoom-active" : ""}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${currentBg}`}
        className="maintenance-bg"
        alt="bg"
      />


      <div className="hotspots-layer">
        {currentSteps.map((step, index) => (
          <div
            key={step.id}
            className={`hotspot ${step.id} ${index === activeStep ? "active-glow" : "normal-state"}`}
            style={{ top: step.top, left: step.left, zIndex: step.zIndex }}
            onClick={() => handleElementClick(index)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${step.id}.png`}
              alt={step.id}
            />
          </div>
        ))}
      </div>


      {/* פופ-אפ רגיל (הוראות או תוכן אלמנט) */}
      {showPopup && !showFinalChecks && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content custom-design">
            <button className="close-x-circle" onClick={handleClose}>
              ✕
            </button>
            <div className="popup-text-container single-text">
              <h2>{popupContent.text}</h2>
            </div>
            <div className="popup-footer">
              <button className="continue-btn-new" onClick={handleClose}>
                {popupContent.btn}
              </button>
              <div className="bottom-icon-circle">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/equipment-icon.png`}
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}


      {/* פופ-אפ בדיקות כלליות סופיות */}
      {showFinalChecks && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content custom-design final-checks-popup">
            <button
              className="close-x-circle"
              onClick={() => setShowFinalChecks(false)}
            >
              ✕
            </button>


            <div className="final-checks-container">
              <h3>בדיקות כלליות נוספות:</h3>
              <ul className="checks-list">
                <li>
                  תקינות הברזים <span>✓</span>
                </li>
                <li>
                  תקינות התאורה <span>✓</span>
                </li>
                <li>
                  שילוט המפסקים והשקעים בצבע זוהר בחושך <span>✓</span>
                </li>
                <li>
                  מיכלי המים ווידוא נקיונם אחת לחודש <span>✓</span>
                </li>
                <li>
                  תקינות אמצעי תקשורת (טלפון קווי, אינטרנט וטלוויזיה){" "}
                  <span>✓</span>
                </li>
              </ul>
            </div>


            <div className="popup-footer">
              <button
                className="continue-btn-new"
              >
                סיום
              </button>
              <div className="bottom-icon-circle">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/equipment-icon.png`}
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default BuildingMaintenance;

