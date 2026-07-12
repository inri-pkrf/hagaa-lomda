import React, { useState, useEffect } from "react";
import "../../style/Wait10mins.css";
import { useLocation } from "react-router-dom";

function Wait10mins() {
  const location = useLocation();
  const [isEnlarged, setIsEnlarged] = useState(false);
  // הסטייט viewed נשאר לשימוש פנימי אם תרצה להציג אייקון "וי" או משהו דומה,
  // אבל הוא לא יחסום יותר את המעבר.
  const [viewed, setViewed] = useState(false);

  let page = location.pathname === "/Wait10mins/2" ? 2 : 1;

  useEffect(() => {
    if (page !== 2) return;

    // הפכנו את ה-detail ל-false באופן קבוע כדי שהכפתור תמיד יהיה פעיל
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: false }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [page]); // הסרנו את viewed מהתלויות

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
    setViewed(true);
  };

  return (
    <div className="wait10min-wrapper">
      {page === 1 && (
        <div>
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
        </div>
      )}

      {page === 2 && (
        <div style={{ position: "relative" }}>
          <h2 id="wait10min-headline">למה חשוב להמתין להנחיה מפורשת?</h2>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Wait10mins.png`}
            alt="icon"
            id="wait10min-icon"
          />
          <p id="wait10min-dircations">
            יש ללחוץ על התמונה על מנת להגדיל אותה. בלחיצה נוספת היא תחזור לגודלה
            המקורי
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/wait10min-poster.png`}
            alt="wait10min-poster"
            id="wait10min-poster"
            className={isEnlarged ? "enlarged-chemical" : "shrinked"}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}

export default Wait10mins;
