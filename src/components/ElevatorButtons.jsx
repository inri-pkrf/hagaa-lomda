import React from "react";
import "./Styles/ElevatorButtons.css";

function ElevatorButtons({ unit, onUnitSelect }) {
  const currentUnit = Number(unit.replace("unit", ""));
  const floors = [1, 2, 3, 4];

  // כותרת לפי היחידה
  const unitTitles = {
    1: "מבוא",
    2: "יחידה 2",
    3: "שגרה",
    4: "חירום",
  };
  const title = unitTitles[currentUnit] || "";

  // מיפוי קומות לשמות יחידות
  const floorToUnit = {
    1: "UnitOne",
    2: "UnitTwo",
    3: "UnitThree",
    4: "UnitFour",
  };

  const handleFloorClick = (floor) => {
    if (floor <= currentUnit) {
      const unitName = floorToUnit[floor];
      sessionStorage.setItem('currentUnit', unitName);
      if (onUnitSelect) {
        onUnitSelect(unitName);
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