import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/actionsChemical.css";

function ChemicalPoster() {
  const navigate = useNavigate();
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [viewed, setViewed] = useState(false);

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
    setViewed(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <h1 id="ChemicalPoster-headline">כללי התנהגות באירוע חומרים מסוכנים:</h1>
      <p id="ChemicalPoster-subheadline">
        להגדלת התמונה, יש ללחוץ עליה. כדי להקטין אותה יש ללחוץ עליה פעם נוספת.
      </p>
      <img
        src="/hagaa-lomda/assets/UnitTwoImgs/chemical/actions/actions-guidlines.png"
        alt="Chemical-rules"
        className={isEnlarged ? "enlarged-chemical" : "shrinked"}
        onClick={handleClick}
        id="ChemicalPoster-img"
      />
    </div>
  );
}

export default ChemicalPoster;