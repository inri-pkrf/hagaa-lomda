import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Unit2/style/PreparationFire.css";

// ⭐ סדר שלבי תמונת הרקע - כל שלב הוא שכבה נפרדת ב-DOM, והמעבר ביניהן
// חלק (crossfade) דרך opacity ב-CSS, לא קפיצה מיידית.
const BG_LAYERS = [
  { key: 'bg1', src: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg1.png` },
  { key: 'bg2', src: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg2.png` },
  { key: 'bg2marked', src: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-bg2-marked.png` },
];

function PreparationFire() {
  const navigate = useNavigate();
  const [canClick, setCanClick] = useState(false);
  const [clicked, setClicked] = useState(false);

  // ⭐ שלב תמונת הרקע הנוכחי - מתחיל ב-bg1, עובר ל-bg2 ואז ל-bg2marked
  const [bgStage, setBgStage] = useState('bg1');

  // חסום כפתור קדימה בטעינה
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  // ⭐ מחליף בין שלבי תמונת הרקע דרך JS (setTimeout) - השכבה החדשה
  // "עולה" ב-opacity בעוד הישנה "יורדת" (מוגדר ב-CSS ע"י transition),
  // וכך נוצר מעבר חלק (fade) במקום קפיצה מיידית בין תמונות.
  useEffect(() => {
    const toBg2 = setTimeout(() => setBgStage('bg2'), 1000);
    const toBg2Marked = setTimeout(() => setBgStage('bg2marked'), 2000);

    return () => {
      clearTimeout(toBg2);
      clearTimeout(toBg2Marked);
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
      {/* ⭐ שכבות תמונת הרקע - כולן קיימות תמיד ב-DOM, רק ה-opacity
          משתנה, כדי שה-transition ב-CSS יעבוד (crossfade חלק) */}
      {BG_LAYERS.map((layer) => (
        <div
          key={layer.key}
          className={`fire-bg-layer ${bgStage === layer.key ? "active" : ""}`}
          style={{ backgroundImage: `url(${layer.src})` }}
        />
      ))}

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