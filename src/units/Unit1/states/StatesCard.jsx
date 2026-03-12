import React from "react";
import "../style/StatesCard.css";

function StatesCard({ title, subTitle, description, tasks, color, onClose }) {
  return (
    <div className="states-overlay">
      <div
        className="states-card"
        style={{ backgroundColor: color || "#A8D5B5" }}
      >
        <button className="states-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="card-title">{title}</h2>

        {subTitle && <h3 className="card-subtitle">{subTitle}</h3>}

        {description && (
          <p className="card-description">{description}</p>
        )}

        {tasks && tasks.length > 0 && (
          <ul className="card-tasks">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StatesCard;