import React, { useState, useEffect } from "react";


function ChoosingSafeRoomImgs() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [viewedImgs, setViewedImgs] = useState({ img1: false, img2: false });


  const handleImgClick = (imgKey) => {
    setSelectedImg(selectedImg === imgKey ? null : imgKey);
    setViewedImgs((prev) => ({ ...prev, [imgKey]: true }));
  };


  const bothViewed = viewedImgs.img1 && viewedImgs.img2;


  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !bothViewed }),
    );


    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [bothViewed]);


  return (
    <div
      className="choosing-safe-room-wrapper"
      style={{ position: "relative" }}
    >
      <h2 id="choosingSafeRoom-headline"> בחירת מרחב מוגן </h2>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/ChoosingSafeRoom.png`}
        alt="icon"
        id="choosingSafeRoom-icon"
      />
      <p id="choosingSafeRoomImgs-pictures-text" className="subtitles">
        להגדלת כל תמונה, יש ללחוץ עליה. כדי להקטין אותה בחזרה יש ללחוץ עליה פעם
        נוספת או ללחוץ על התמונה השנייה.
      </p>


      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/choosing-img1.jpg`}
        alt="defense-img1"
        id="choosing-img1"
        className={selectedImg === "img1" ? "enlarged" : "shrinked"}
        onClick={() => handleImgClick("img1")}
      />
      {viewedImgs.img1 && (
        <div
          className="completion-v-choosing-img"
          style={{ left: "29%", top: "30vh" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}


      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/choosing-img2.jpg`}
        alt="defense-img2"
        id="choosing-img2"
        className={selectedImg === "img2" ? "enlarged" : "shrinked"}
        onClick={() => handleImgClick("img2")}
      />
      {viewedImgs.img2 && (
        <div
          className="completion-v-choosing-img"
          style={{ left: "70%", top: "30vh" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </div>
  );
}


export default ChoosingSafeRoomImgs;





