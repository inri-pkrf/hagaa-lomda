import React, { useState, useEffect } from "react";
import "../../style/Wait10mins.css";

function Wait10mins() {
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [viewed, setViewed] = useState(false);

  return (
    <div className="wait10min-wrapper">
      <div style={{ position: "relative" }}>
        <h2 id="wait10min-headline">למה חשוב להמתין להנחיה מפורשת?</h2>
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Wait10mins.png`}
          alt="icon"
          id="wait10min-icon"
        />
        <p id="wait10min-text1">סכנה לנפילת שברי יירוט</p>
        <p id="wait10min-text2">מטח הרקטות יכול להימשך</p>
        <p id="wait10min-text3">וידוא סיום האיום</p>

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/image-removebg-preview (49) 1.png`}
          alt="Siren"
          id="wait10min-img1"
        />

        {/* כפתור להצגת התמונה - בדיוק כמו ב-Alert */}
        {!showPreviewImage && (
          <button
            className="alert-preview-btn"
            id="wait-pos-btn"
            onClick={() => {
              setShowPreviewImage(true);
              setActiveImage("poster");
            }}
          >
            🔍 להרחבה בנושא יש ללחוץ
          </button>
        )}

        {/* חלון מוגדל - המנגנון המשותף */}
        {showPreviewImage && (
          <>
            <div
              className="alert-image-overlay"
              onClick={() => {
                setShowPreviewImage(false);
                setActiveImage(null);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/wait10min-poster.png`}
              alt="דוגמת הנחיה"
              id="wait-pos-hover-img2"
              className="enlarged"
              onClick={() => {
                setShowPreviewImage(false);
                setActiveImage(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Wait10mins;
