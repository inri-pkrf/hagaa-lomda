import React, { useState, useEffect } from 'react';
import "../components/Styles/ProgressBar.css";
import NavBarData from "../Data/NavBarData";
import { calculateUnitProgress, calculateOverallProgress } from "./Progressunits";

const ProgressBar = ({ unitInfo }) => {
  const currentStep = unitInfo?.unitNumber || 1;

  // ⭐ state במקום חישוב ישיר — כדי שיתעדכן דינמית
  const [percentage, setPercentage] = useState(calculateOverallProgress());
  const [unitProgresses, setUnitProgresses] = useState(
    NavBarData.map((unit, index) => calculateUnitProgress(unit, index + 1))
  );

  // ⭐ פונקציה שמחשבת מחדש את כל הנתונים
  const recalculate = () => {
    setPercentage(calculateOverallProgress());
    setUnitProgresses(
      NavBarData.map((unit, index) => calculateUnitProgress(unit, index + 1))
    );
  };

  useEffect(() => {
    // ⭐ מאזין לאירועים שמסמנים שינוי בהתקדמות
    window.addEventListener('updateNavbar', recalculate);
    window.addEventListener('updateTotalProgress', recalculate);

    // ⭐ גם מחשב מחדש בכל שינוי ב-unitInfo (כלומר בכל ניווט)
    recalculate();

    return () => {
      window.removeEventListener('updateNavbar', recalculate);
      window.removeEventListener('updateTotalProgress', recalculate);
    };
  }, [unitInfo]);

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
          const isUnitComplete = unitProgresses[index] === 1;
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