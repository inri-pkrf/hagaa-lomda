import React, { useEffect, useState, useRef } from "react";
import "../../style/Alert.css";
import { useLocation } from "react-router-dom";

function Alert() {
  const location = useLocation();
  const videoRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [viewedImgs, setViewedImgs] = useState({ img1: false, img2: false });

  let page = 1;
  if (location.pathname === "/Alert/2") page = 2;
  if (location.pathname === "/Alert/3") page = 3;
  if (location.pathname === "/Alert/4") page = 4;

  useEffect(() => {
    if (page !== 1) return;
    window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: false }));
    };
  }, [page]);

  useEffect(() => {
    if (page !== 4) return;
    const bothViewed = viewedImgs.img1 && viewedImgs.img2;
    window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: !bothViewed }));
    return () => {
      window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: false }));
    };
  }, [viewedImgs, page]);

  const handleEnded = () => {
    window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: false }));
  };

  const handleImgClick = (imgKey) => {
    setActiveImage(activeImage === imgKey ? null : imgKey);
    setViewedImgs(prev => ({ ...prev, [imgKey]: true }));
  };

  return (
    <div className="alert-wrapper">
      {page === 1 && (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Alert.png`}
            alt="Siren"
            id="alert-icon"
          />
          <h2 id="headline-icon">התרעה</h2>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`}
            alt="Siren"
            className="alert-background"
          />
          <h1 id="alert-headline">צפו בסרטון, בסיום הסרטון לחצו על המשך</h1>
          {/* page 1 - תקן את ה-video */}
          <video
            ref={videoRef}
            controls
            onEnded={handleEnded}
            controlsList="nodownload"
            id="yt-player-alert"
          >
            <source src={`${process.env.PUBLIC_URL}/assets/videos/Alert.mp4`} type="video/mp4" />
            הדפדפן שלך אינו תומך בהפעלת וידאו.
          </video>
        </div>
      )}
      {page === 2 && (
        <div id="alert-page1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Alert.png`}
            alt="Siren"
            id="alert-icon"
          />
          <h2 id="headline-icon">התרעה</h2>
          <p id="alert-text">
            כממונה הג"א באחריותך לוודא שמותקן צופר במפעל / קבוצת מפעלים, אשר
            ישמש כאמצעי התרעה לעובדים.
          </p>
          <p id="alert-sub-text">החברות בהסכם עם משרד הביטחון להתקנת צופר:</p>
          <ul id="alert-list">
            <li>אלפם</li>
            <li>שמרד</li>
            <li>מוטורלה - התקנת מערכת ״נופרית״ לצופר הקיים</li>
          </ul>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`}
            alt="Siren"
            className="alert-background"
          />
        </div>
      )}
      {page === 3 && (
        <div id="alert-page2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs: icons/Alert.png`}
            alt="Siren"
            id="alert-icon"
          />
          <h2 id="headline-icon">התרעה</h2>
          <h2 id="alert-text2">עליך לוודא כי ההתרעה נשמעת בכל שטח המפעל</h2>
          <p id="alert-sub-text2">משימתך כממונה הג"א - בדיקת כיסוי</p>
          <ol id="alert-list2">
            <li>יש לוודא כיסוי ההתרעה בכל שטח המפעל</li>
            <li>אם נדרש, יש לתכנן אמצעי התרעה משלימה</li>
            <li>בעת הפעלת ההתרעה / צפירה – יש לבחון כיסוי מלא</li>
            <li>באזורי רעש גבוה יש לסכם כיצד מועברת ההתרעה</li>
          </ol>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`}
            alt="Siren"
            className="alert-background"
          />
        </div>
      )}
      {page === 4 && (
        <div id="alert-page2" style={{ position: "relative" }}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Alert.png`}
            alt="Siren"
            id="alert-icon"
          />
          <h2 id="headline-icon">התרעה</h2>

          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-img1.jpg`}
            alt="Enlargable 1"
            id="alert-hover-img"
            className={activeImage === "img1" ? "enlarged" : ""}
            onClick={() => handleImgClick("img1")}
          />
          {viewedImgs.img1 && (
            <div className="completion-v" style={{ position: "absolute", top: "42vh", left: "30%", transform: "translateX(-50%)", zIndex: 999 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-img2.png`}
            alt="Enlargable 2"
            id="alert-hover-img2"
            className={activeImage === "img2" ? "enlarged" : ""}
            onClick={() => handleImgClick("img2")}
          />
          {viewedImgs.img2 && (
            <div className="completion-v" style={{ position: "absolute", top: "42vh", left: "70%", transform: "translateX(-50%)", zIndex: 999 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`}
            alt="Siren"
            className="alert-background"
          />
          <p id="alert-text3">
            <b>שימו לב:</b> יש ללחוץ על התמונה על מנת להגדיל אותה. בלחיצה נוספת היא תחזור לגודלה המקורי
          </p>
        </div>
      )}
    </div>
  );
}

export default Alert;