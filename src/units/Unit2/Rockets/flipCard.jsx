import React from "react";
import "../../Unit2/style/flipCard.css";


function FlipCard({ priority, description, image }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* צד קדמי מעודכן: מציג את התמונה והכותרת */}
        <div className="flip-card-front">
          <div className="flip-card-front-content">
            {image && <img src={image} alt="place image" />}
          </div>
        </div>


        {/* צד אחורי: נשאר ללא שינוי */}
        <div className="flip-card-back">
          <div className="flip-card-back-content">
            <div className="flip-priority">{priority}</div>
            <div className="flip-description">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FlipCard;

