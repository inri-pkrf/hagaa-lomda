import React from 'react';
import "../components/Styles/ProgressBar.css";
import NavBarData from "../Data/NavBarData";

const chapterSessionKeys = {
  "פתיחה_1": 'unitone-opening',
  "היערכות לאיומים": 'unitOne-first',
  "מצבי תפקוד": 'unitOne-second',
  "ממשקים": 'unitOne-third',
  "אוכלוסיה": 'unitOne-fourth',
  "שאלות סיכום_1": 'unitOne-questions',
  "סיכום פרק_1": 'unitOne-checklist',
  "פתיחה_2": 'unittwo-opening',
  "ירי טילים": 'unitTwo-first',
  "רעידת אדמה וצונאמי": 'unitTwo-second',
  "שריפה": 'unitTwo-third',
  "חומרים מסוכנים": 'unitTwo-fourth',
  "שאלות סיכום_2": 'unitTwo-questions',
  "סיכום פרק_2": 'unitTwo-checklist',
  "פתיחה_3": 'unitthree-opening',
  "צוותי חירום": 'unitThree-first',
  " שמרטפיה": 'unitThree-second',
  "משאבים": 'unitThree-third',
  "מגויסי חוץ ": 'unitThree-fourth',
  " תיק מפעל": 'unitThree-fifth',
  "שאלות סיכום_3": 'unitThree-questions',
  "סיכום פרק_3": 'unitThree-checklist',
  "פתיחה_4": 'unitfour-opening',
  "מצבים משפטיים": 'unitFour-first',
  " מעבר משגרה לחירום": 'unitFour-second',
  "אירוע חירום": 'unitFour-third',
  "שאלות סיכום_4": 'unitFour-questions',
  "סיכום פרק_4": 'unitFour-checklist',
};

const isChapterFinished = (chapterTitle, unitNum) => {
  const duplicateTitles = ["פתיחה", "שאלות סיכום", "סיכום פרק"];
  const key = duplicateTitles.includes(chapterTitle) ? `${chapterTitle}_${unitNum}` : chapterTitle;
  const sessionKey = chapterSessionKeys[key];
  if (!sessionKey) return false;
  return sessionStorage.getItem(sessionKey) === 'finished';
};

const calculateUnitProgress = (unitData, unitNum) => {
  if (!unitData?.chapters) return 0;
  const total = unitData.chapters.length;
  if (total === 0) return 0;
  const finished = unitData.chapters.filter(ch => isChapterFinished(ch.title, unitNum)).length;
  return finished / total;
};

const ProgressBar = ({ unitInfo }) => {
  const currentStep = unitInfo?.unitNumber || 1;

  const percentage = Math.round(
    NavBarData.reduce((acc, unit, index) => {
      return acc + calculateUnitProgress(unit, index + 1) * 25;
    }, 0)
  );

  return (
    <div className="pg-container">
      <div className="pg-text-section">
        <span className="pg-percentage">{percentage}%</span>
        <span className="pg-label">התקדמות</span>
      </div>

      <div className="pg-vertical-divider"></div>

      <div className="pg-steps-section">
        {NavBarData.map((unit, index) => {
          const step = index + 1;
          const isUnitComplete = calculateUnitProgress(unit, step) === 1;
          const isCurrentUnit = step === currentStep;

          return (
            <React.Fragment key={step}>
              <div className="pg-step-wrapper">
                <div
                  className="pg-circle"
                  style={{
                    backgroundColor: isUnitComplete ? '#1a4b70' : 'white',
                    border: isCurrentUnit || isUnitComplete
                      ? '0.15vw solid #1a4b70'
                      : '0.15vw solid #1a4b7067',
                    color: isUnitComplete
                      ? 'white'
                      : isCurrentUnit
                        ? '#1a4b70'
                        : '#1a4b7067',
                    boxSizing: 'border-box',
                  }}
                >
                  {step}
                </div>
              </div>

              {index < NavBarData.length - 1 && (
                <div
                  className="pg-line"
                  style={{
                    backgroundColor: isUnitComplete ? '#1a4b70' : '#1a4b7067'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;