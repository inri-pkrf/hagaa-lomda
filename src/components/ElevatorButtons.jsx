import React from "react";
import "./Styles/ElevatorButtons.css";

function ElevatorButtons({ unit, onUnitSelect }) {
  const currentUnit = Number(unit.replace("unit", ""));
  const floors = [1, 2, 3, 4];

  // כותרת לפי היחידה
  const unitTitles = {
    1: "מבוא",
    2: "שגרה",
    3: "חירום",
    4: "סיכום",
  };
  const title = unitTitles[currentUnit] || "";

  // מיפוי קומות לשמות יחידות (בשביל ה-sessionStorage)
  const floorToUnitName = {
    1: "UnitOne",
    2: "UnitTwo",
    3: "UnitThree",
    4: "UnitFour",
  };

  // מיפוי קומות לנתיבי הפתיחה החדשים שהגדרת ב-App.js
  const floorToPath = {
    1: "/unit-one-opening",
    2: "/unit-two-opening",
    3: "/unit-three-opening",
    4: "/unit-four-opening",
  };

  const handleFloorClick = (floor) => {
    // מאפשר לחיצה רק על קומות שהמשתמש כבר הגיע אליהן
    if (floor <= currentUnit) {
      const unitName = floorToUnitName[floor];
      const targetPath = floorToPath[floor];

      // עדכון היחידה הנוכחית בזיכרון
      sessionStorage.setItem('currentUnit', unitName);
      
      // אם העברת פונקציית ניווט או לוגיקה מהעמוד האבא (Elevator.jsx)
      if (onUnitSelect) {
        onUnitSelect(unitName, targetPath); 
      }
    }
  };

  return (
    <div className={`elevator-buttons-container ${unit}`}>
      <h2 className="elevator-title">{title}</h2>
      <div className="elevator-panel">
        {floors.map((floor) => {
          const isActive = floor <= currentUnit;
          return (
            <div
              key={floor}
              className={`floor-button ${unit} ${isActive ? "active" : "disabled"}`}
              onClick={() => handleFloorClick(floor)}
            >
              {floor}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ElevatorButtons;