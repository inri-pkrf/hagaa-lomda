import React, { useRef, useEffect } from "react";

function VideoPreperEarth() {
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

  return (
    <div className="defense-policy-page video-page-layout">
      <div className="video-text-container">
        <h2 className="policy-video-subtitle">
          צפו בסרטון ובסיומו לחצו על המשך
        </h2>
      </div>

      <div className="video-frame-container">
        <video
          ref={videoRef}
          className="responsive-iframe"
          controls
          onEnded={handleEnded}
          controlsList="nodownload"
        >
          <source src={`${process.env.PUBLIC_URL}/assets/videos/VideoPreperEarth.mp4`} type="video/mp4" />
          הדפדפן שלך אינו תומך בהפעלת וידאו.
        </video>
      </div>
    </div>
  );
}

export default VideoPreperEarth;