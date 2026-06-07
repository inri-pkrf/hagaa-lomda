import React, { useState, useEffect } from "react";
import "../../style/Wait10mins.css";
import { useLocation } from "react-router-dom";

function Wait10mins() {
  const location = useLocation();
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [viewed, setViewed] = useState(false);

  let page = 1;
  if (location.pathname === "/Wait10mins/2") page = 2;

  useEffect(() => {
    if (page !== 2) return;
    window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: !viewed }));
    return () => {
      window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: false }));
    };
  }, [viewed, page]);

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
    setViewed(true);
  };

  return (
    <div className="wait10min-wrapper">
      {page === 1 && (
        <div>
          <h2 id="wait10min-headline">?למה חשוב להמתין להנחיה מפורשת</h2>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Wait10mins.png`}
            alt="icon"
            id="wait10min-icon"
          />
          <p id="wait10min-text1">סכנה לנפילת שברי יירוט</p>
          <p id="wait10min-text2">מטח הרקטות יכול להימשך</p>
          <p id="wait10min-text3">שיפור ההגנה לאזרח</p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/image-removebg-preview (49) 1.png`}
            alt="Siren"
            id="wait10min-img1"
          />
        </div>
      )}

      {page === 2 && (
        <div style={{ position: "relative" }}>
          <h2 id="wait10min-headline">?למה חשוב להמתין להנחיה מפורשת</h2>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Wait10mins.png`}
            alt="icon"
            id="wait10min-icon"
          />
          <p id="wait10min-dircations">
            להגדלת התמונה, יש ללחוץ עליה. כדי להקטין אותה יש ללחוץ עליה פעם נוספת.
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