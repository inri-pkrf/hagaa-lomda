import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Unit2/style/PreparationFire.css";

function PreparationFire() {
  const navigate = useNavigate();
  const [canClick, setCanClick] = useState(false);
  const [clicked, setClicked] = useState(false);

  // חסום כפתור קדימה בטעינה
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!canClick) return;

    setClicked(true);
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    navigate("../FireRightBehavior");
  };

  return (
    <div
      id="PreparationFire-body"
      style={{
        "--fire-bg1": `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg1.png)`,
        "--fire-bg2": `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg2.png)`,
        "--fire-bg2-marked": `url(${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg2-marked.png)`,
      }}
    >
      <h2 id='PreparationFire-headline'>היערכות נכונה בשעת שרפה</h2>
      <p id='PreparationFire-text'>יש ללחוץ על הקלסרים כאשר יהיו מסומנים</p>

      <div
        className={`marked-folder ${canClick ? "active" : "disabled"}`}
        onClick={handleClick}
      />
    </div>
  );
}

export default PreparationFire;