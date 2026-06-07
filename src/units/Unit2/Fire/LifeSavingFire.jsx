import React, { useState, useEffect, useRef } from "react";
import "../../Unit2/style/LifeSavingFire.css";

function LifeSavingFire() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  const handleEnded = () => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
  };

  // השהה את הסרטון כשהמודל נסגר
  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    setIsOpen(false);
  };

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-notebook-bg2.jpg`}
        alt="bg"
        id="LifeSavingFire-bg"
      />

      <p id="LifeSavingFire-headline">מה עושים בזמן שריפה?</p>

      <p id="LifeSavingFire-text">
        יש ללחוץ על האייקון על מנת לצפות בסרטון וללמוד עוד על התנהלות נכונה
        בעת התמודדות עם שריפה:
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/LifeSavingFire-icon.jpg`}
        alt="play"
        id="LifeSavingFire-icon"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="lifesaving-overlay">
          <div className="lifesaving-video-container">
            <button onClick={handleClose} className="lifesaving-close-btn">✖</button>
            <video
              ref={videoRef}
              style={{ width: "100%", height: "100%", borderRadius: "1vw" }}
              controls
              autoPlay
              onEnded={handleEnded}
              controlsList="nodownload"
            >
              <source src={`${process.env.PUBLIC_URL}/assets/videos/LifeSavingFire.mp4`} type="video/mp4" />
              הדפדפן שלך אינו תומך בהפעלת וידאו.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default LifeSavingFire;