import React from "react";
import "../style/InterfacePopUp.css";

function InterfacePopUp({ title, image, description, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="popup-title">{title}</h2>

        <div className="popup-content">

          <p className="popup-description">{description}</p>

          {image && (
            <img
              src={image}
              alt={title}
              className="popup-character"
            />
          )}

        </div>

      </div>
    </div>
  );
}

export default InterfacePopUp;