import React, { useEffect, useRef } from "react";
import "../../style/ProtectedSpace.css";

function ProtectedSpace() {
  const videoRef = useRef(null);

  useEffect(() => {
    // בתחילת הקומפוננטה - נעל כפתור
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );

    const videoElement = videoRef.current;

    // פונקציה שנקראת כשהסרטון מסתיים
    const handleVideoEnd = () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // ניקוי בעת יציאה מהקומפוננטה
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);
  return (
    <div className="protected-space-wrapper">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/ProtectedSpace.png`}
        alt="icon"
        id="protectedSpace-icon"
      />
      <h2 id="headline-icon-protectedSpace">כיצד המרחב המוגן שומר עלינו?</h2>
      <h2 id="protectedSpace-headline">
        יש לצפות בסרטון, בסיומו יש ללחוץ על החץ להמשך
      </h2>
      <video
        id="yt-player-protectedspace" // ה-ID הזה מושך את העיצוב מה-CSS
        ref={videoRef}
        controls
        controlsList="nodownload"
      >
        <source
          src={`${process.env.PUBLIC_URL}/assets/videos/protectedSpace.mp4`}
          type="video/mp4"
        />
        הדפדפן שלך לא תומך בנגן הוידאו.
      </video>
    </div>
  );
}

export default ProtectedSpace;
