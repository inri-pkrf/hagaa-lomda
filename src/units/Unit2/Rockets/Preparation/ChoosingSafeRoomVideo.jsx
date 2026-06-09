import React, { useEffect, useRef } from "react";

function ChoosingSafeRoomVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    // ⭐ בכניסה לדף — נעל את כפתור הקדימה
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );

    const handleVideoEnded = () => {
      // ⭐ בסיום הסרטון — שחרר את כפתור הקדימה
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
      // ⭐ ניקוי — שחרר את הכפתור ביציאה מהדף
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);

  return (
    <div>
      <div className="choosing-safe-room-wrapper">
        <h2 id="choosingSafeRoom-headline"> בחירת מרחב מוגן </h2>
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/ChoosingSafeRoom.png`}
          alt="icon"
          id="choosingSafeRoom-icon"
        />
      </div>

      <h2 id="protectedSpace-headline">
        יש לצפות בסרטון, בסיומו יש ללחוץ על החץ להמשך
      </h2>

      <video
        ref={videoRef}
        id="yt-player-alert"
        width="640"
        height="360"
        controls
        src={`${process.env.PUBLIC_URL}/assets/videos/choosingSafeRoomVideo.mp4`}
      >
        הדפדפן שלך אינו תומך בווידאו.
      </video>
    </div>
  );
}

export default ChoosingSafeRoomVideo;
