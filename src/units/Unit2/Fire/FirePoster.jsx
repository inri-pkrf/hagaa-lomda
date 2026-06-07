import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/FireBehaviorIn.css";

function FirePoster() {
  const navigate = useNavigate();
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [viewed, setViewed] = useState(false);


  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
    setViewed(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-notebook-bg2.jpg`}
        alt="bg"
        id="FireBehaviorIn-bg"
      />
      <p id="FireBehaviorIn-subheadline">
        להגדלת התמונה, יש ללחוץ עליה. כדי להקטין אותה יש ללחוץ עליה פעם נוספת.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-rules.png`}
        alt="fire-rules"
        className={isEnlarged ? "enlarged" : "strinked-fire-poster"}
        onClick={handleClick}
        id="FirePoster-img"
      />
    </div>
  );
}

export default FirePoster;