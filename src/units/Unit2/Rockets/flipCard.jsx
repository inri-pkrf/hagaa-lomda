import React from "react";
import "./flipCard.css";


function FlipCard({ priority, title, description }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
       
        <div className="flip-card-front">
        </div>


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

