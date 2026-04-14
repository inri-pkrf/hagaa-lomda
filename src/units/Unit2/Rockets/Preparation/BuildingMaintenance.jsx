import React, { useState } from 'react';
import '../../style/BuildingMaintenance.css';


// רשימת אלמנטים מחוץ למקלט
const outsideSteps = [
  { id: 'entranceDoor', label: 'דלת המקלט', text: 'וידוא תקינותם של הדלתות והחלונות, וידוא הימצאות גומי אטימה סביב המשקופים וכן, שלא קיימת חלודה במסגרת', top: '54.5%', left: '50%', zIndex: 1 },
  { id: 'lamp', label: 'תאורה', text: 'ווידוא תאורה תקינה', top: '15%', left: '50%', zIndex: 1 },
  { id: 'road', label: 'דרכי גישה', text: 'וידוא דרכי גישה פנויות ממכשולים והדבקת פסי דריכה על מדרגות למניעת החלקות', top: '93%', left: '50%', zIndex: 2 },
  { id: 'sign', label: 'שלט הכוונה', text: 'הצבת שלט למקלט', top: '45%', left: '50%', zIndex: 8 },
];


// רשימת אלמנטים בתוך המקלט)
const insideSteps = [
  { id: 'toilet', label: 'שירותים', text: 'טקסט הסבר על מערכת האוורור והסינון...', top: '49.5%', left: '40%', zIndex: 5 },
  { id: 'light', label: 'תאורה', text: 'ווידוא תאורה תקינה', top: '85%', left: '10%', zIndex: 6 },
  { id: 'waterbottles', label: 'בקבוקי מים', text: 'ווידוא תאורה תקינה', top: '65%', left: '51%', zIndex: 6 },
  { id: 'firstAidKit', label: 'ערכת חירום', text: 'וידוא קיום מים, מזון ותאורת חירום...', top: '83%', left: '6%', zIndex: 5 },
];


function BuildingMaintenance() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInside, setIsInside] = useState(false); // מצב מעבר לבפנים
  const [showPopup, setShowPopup] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);


  // בחירת הרשימה והרקע הנוכחיים
  const currentSteps = isInside ? insideSteps : outsideSteps;
  const currentBg = isInside ? 'insideSafeRoomBg.png' : 'outsideSafeRoomBg.png';


  const handleElementClick = (index) => {
    if (index === activeStep) {
      setShowPopup(true);
    }
  };


  const closePopup = () => {
    setShowPopup(false);
   
    if (activeStep < currentSteps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else if (!isInside) {
      // אם סיימנו את הבחוץ - מתחילים זום ועוברים לבפנים
      setIsTransitioning(true);
      setTimeout(() => {
        setIsInside(true);
        setActiveStep(0);
        setIsTransitioning(false);
      }, 1200);
    } else {
      console.log("סיום כל שלבי התחזוקה");
    }
  };


  return (
    <div className={`maintenance-game-container ${isTransitioning ? 'zoom-active' : ''}`}>
      {/* תמונת רקע דינמית */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${currentBg}`}
        className="maintenance-bg"
        alt="background"
      />


      {/* שכבת האלמנטים - מרונדרת תמיד */}
      <div className="hotspots-layer">
        {currentSteps.map((step, index) => (
          <div
            key={step.id}
            className={`hotspot ${step.id} ${index === activeStep ? 'active-glow' : 'normal-state'}`}
            style={{
              top: step.top,
              left: step.left,
              zIndex: step.zIndex
            }}
            onClick={() => handleElementClick(index)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${step.id}.png`}
              alt={step.label}
            />
          </div>
        ))}
      </div>


      {/* פופ-אפים */}
      {showIntro && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content intro">
            <button className="close-x" onClick={() => setShowIntro(false)}>X</button>
            <div className="popup-icon">ℹ️</div>
            <h3>תחזוקת המבנה - הוראות</h3>
            <p>עליכם ללחוץ על האלמנטים הזוהרים כדי ללמוד על תחזוקתם התקינה.</p>
            <button className="start-btn" onClick={() => setShowIntro(false)}>התחלה</button>
          </div>
        </div>
      )}


      {showPopup && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content">
            <button className="close-x" onClick={closePopup}>X</button>
            <div className="popup-icon">🛠️</div>
            <h3>{currentSteps[activeStep].label}</h3>
            <p>{currentSteps[activeStep].text}</p>
            <button className="continue-btn" onClick={closePopup}>המשך</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default BuildingMaintenance;

