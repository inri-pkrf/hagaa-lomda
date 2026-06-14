import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../style/Defense.css";

const imagesConfig = [
  { id: "img1", src: "defense-img4.jpeg", pos: "img-pos-1-defense", top: "42vh", left: "30%" },
  { id: "img2", src: "defense-img3.jpeg", pos: "img-pos-2-defense", top: "42vh", left: "50%" },
  { id: "img4", src: "defense-img2.png", pos: "img-pos-4-defense", top: "42vh", left: "70%" },
];

function Defense() {
  const location = useLocation();
  const videoRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [viewedImgs, setViewedImgs] = useState({
    img1: false,
    img2: false,
    img4: false,
  });

  let page = location.pathname === "/Defense/2" ? 2 : 1;

  // בדיקה אם כל התמונות הקיימות נצפו
  const allViewed = Object.values(viewedImgs).every((val) => val === true);

  // ניהול ה-Next Button
  useEffect(() => {
    if (page === 1) {
      window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: true }));
      
      const handleEnded = () =>
        window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: false }));

      const videoElement = videoRef.current;
      videoElement?.addEventListener("ended", handleEnded);
      return () => videoElement?.removeEventListener("ended", handleEnded);
    } else {
      window.dispatchEvent(new CustomEvent("setNextBtnDisabled", { detail: !allViewed }));
    }
  }, [page, allViewed]);

  const handleImgClick = (imgKey) => {
    setSelectedImg(selectedImg === imgKey ? null : imgKey);
    setViewedImgs((prev) => ({ ...prev, [imgKey]: true }));
  };

  return (
    <div className="defense-wrapper" style={{ position: "relative", minHeight: "100vh" }}>
      <h2 id="defense-headline">כיצד נתגונן</h2>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Defense.png`}
        alt="icon"
        id="defense-icon"
      />

      {/* עמוד 1 - וידאו */}
      {page === 1 && (
        <div>
          <h2 id="protectedSpace-headline">יש לצפות בסרטון, בסיומו יש ללחוץ על החץ להמשך</h2>
          <video ref={videoRef} id="defense-video" width="640" height="360" controls src={`${process.env.PUBLIC_URL}/assets/videos/DefenseVideo.mp4`}>
            הדפדפן שלך אינו תומך בווידאו.
          </video>
        </div>
      )}

      {/* עמוד 2 - תמונות */}
      {page === 2 && (
        <div className="defense-next-step-content">
          <p id="defense-pictures-text" className="subtitles">
            יש ללחוץ על התמונה על מנת להגדיל אותה. בלחיצה נוספת היא תחזור לגודלה המקורי
          </p>

          {imagesConfig.map((img) => (
            <React.Fragment key={img.id}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/${img.src}`}
                alt={img.id}
                id={img.id}
                className={selectedImg === img.id ? "enlarged" : `shrinked-defense ${img.pos}`}
                onClick={() => handleImgClick(img.id)}
              />
              {viewedImgs[img.id] && selectedImg !== img.id && (
                <div
                  className="completion-v"
                  style={{ position: "absolute", left: img.left, top: img.top, transform: "translateX(-50%)", zIndex: 999 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" width="30" height="30">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Defense;