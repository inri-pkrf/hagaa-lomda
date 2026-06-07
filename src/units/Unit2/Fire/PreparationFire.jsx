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
    <div id="PreparationFire-body">
      <h2 id='PreparationFire-headline'>היערכות נכונה בשעת שריפה</h2>
      <p id='PreparationFire-text'>יש ללחוץ על הקלסרים כאשר יהיו מסומנים</p>

      <div
        className={`marked-folder ${canClick ? "active" : "disabled"}`}
        onClick={handleClick}
      />
    </div>
  );
}

export default PreparationFire;