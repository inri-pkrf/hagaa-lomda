import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/TimeToEnterMamad.css";


function TimeToEnterMamad2() {
  const navigate = useNavigate();


  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);


  const handleVideoEnd = () => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: false }),
    );
  };


  return (
    <div className="time-to-enter-mamad-wrapper">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/background-timer.png`}
        alt="timer"
        id="background-timer"
      />
      <p id="frame3-text1">זמן כניסה למרחב המוגן-סרטון</p>
      <p id="center-subtitle-time2" className="subtitles">
        יש להפעיל את הסרטון ולצפות בו. בסיומו ניתן להמשיך על ידי לחיצה על החץ.
      </p>
      <video
        width="20%"
        controls
        id="video-time-to-enter-mamad"
        onEnded={handleVideoEnd}
      >
      <source
        src={`${process.env.PUBLIC_URL}/assets/videos/TimeToEnterMamad-slow.mp4`}
        type="video/mp4"
      />
        הדפדפן שלך לא תומך בסרטון
      </video>
    </div>
  );
}


export default TimeToEnterMamad2;



