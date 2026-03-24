import React from "react";
import "./InterfacePopUp.css";

function InterfacePopUp({ title, image, description, circleColor, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="popup-close" onClick={onClose}>✕</button>

        <h2 className="popup-title">{title}</h2>

        <div className="popup-content-wrapper">
          {/* צד ימין - טקסט */}
          <div className="popup-text-side">
            <p className="popup-description">{description}</p>
          </div>

          {/* צד שמאל - דמות ועיגול */}
          <div className="popup-image-side">
            <div className="image-container">
              {image && (
                <img src={image} alt={title} className="popup-character" />
              )}
              <div 
                className="popup-image-circle" 
                style={{ backgroundColor: circleColor }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterfacePopUp;