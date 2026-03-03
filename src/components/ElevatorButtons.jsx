import React from "react";
import "./Styles/ElevatorButtons.css";

function ElevatorButtons({ unit }) {
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