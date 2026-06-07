import React, { useEffect } from "react";
import "./Styles/ElevatorButtons.css";

function ElevatorButtons({ unit, onUnitSelect, autoHover }) {
  const currentUnit = Number(unit.replace("unit", ""));
  const floors = [1, 2, 3, 4];

  const unitTitles = {
    1: "מבוא",
    2: "שגרה",
    3: "שגרה",
    4: "חירום",
  };
  const title = unitTitles[currentUnit] || "";

  const floorToUnitName = {
    1: "UnitOne",
    2: "UnitTwo",
    3: "UnitThree",
    4: "UnitFour",
  };

  const floorToPath = {
    1: "/unit-one-opening",
    2: "/unit-two-opening",
    3: "/unit-three-opening",
    4: "/unit-four-opening",
  };

  const handleFloorClick = (floor) => {
    if (floor <= currentUnit) {
      const unitName = floorToUnitName[floor];
      const targetPath = floorToPath[floor];
      sessionStorage.setItem("currentUnit", unitName);
      if (onUnitSelect) {
        onUnitSelect(unitName, targetPath);
      }
    }
  };

  // ← auto-trigger the click when autoHover becomes true
  useEffect(() => {
    if (autoHover) {
      handleFloorClick(currentUnit);
    }
  }, [autoHover]);

  return (
    <div className={`elevator-buttons-container ${unit}`}>
      <p id="buttons-title">יחידות</p>
      <div className="elevator-panel">
        {floors.map((floor) => {
          const isActive = floor === currentUnit;
          const isDisabled = floor !== currentUnit;

          return (
            <div key={floor} className="floor-item">
              <div
                className={`floor-button unit${floor}
                  ${isActive ? "active" : ""}
                  ${isDisabled ? "disabled" : ""}
                  ${isActive && autoHover ? "auto-hover" : ""}`}
                onClick={() => handleFloorClick(floor)}
              >
                {floor === currentUnit && (
                  <div className="elevator-title">{title}</div>
                )}
                {floor}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ElevatorButtons;