import React from 'react';
import './Styles/TopicCircle.css';


const TopicCircle = ({
  id,
  title,
  icon,
  bgColor,
  isCompleted,
  hasInfo,
  hasPlay,
  onClick
}) => {
  return (
    <div className="topic-circle-wrapper" onClick={() => onClick(id)}>
      <div
        className="main-circle"
        style={{ backgroundColor: bgColor }}
      >
        {/* ה-V הירוק של ההשלמה */}
        {isCompleted && (
          <div className="completion-v">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
       
        {/* שימי לב לנתיב כאן: assets/UnitTwoImgs/ */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${icon}`}
          alt={title}
          className="main-topic-icon"
        />


        {/* האייקונים הקטנים למטה */}
        <div className="small-icons-container">
          {hasInfo && <div className="small-action-icon info-btn">i</div>}
          {hasPlay && (
            <div className="small-action-icon play-btn">
              <span className="play-arrow">▶</span>
            </div>
          )}
        </div>
      </div>
     
      <h4 className="topic-title" style={{ color: bgColor }}>
        {title}
      </h4>
    </div>
  );
};


export default TopicCircle;

