import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../style/Defense.css";

function Defense() {
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState(null);
  const [viewedImgs, setViewedImgs] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  let page = 1;
  if (location.pathname === "/Defense/2") page = 2;

  const allViewed =
    viewedImgs.img1 && viewedImgs.img2 && viewedImgs.img3 && viewedImgs.img4;

  useEffect(() => {
    if (page === 1) {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: true }),
      );
    }

    if (!document.getElementById("yt-api-script")) {
      const tag = document.createElement("script");
      tag.id = "yt-api-script";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    let player;
    const initPlayer = () => {
      if (document.getElementById("yt-player-defense")) {
        player = new window.YT.Player("yt-player-defense", {
          videoId: "9BMH_58WOEI",
          playerVars: { rel: 0 },
          events: {
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.ENDED)
                window.dispatchEvent(
                  new CustomEvent("setNextBtnDisabled", { detail: false }),
                );
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      player?.destroy();
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [page]);

  useEffect(() => {
    if (page !== 2) return;

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allViewed }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [allViewed, page]);

  const handleImgClick = (imgKey) => {
    setSelectedImg(selectedImg === imgKey ? null : imgKey);
    setViewedImgs((prev) => ({ ...prev, [imgKey]: true }));
  };

  return (
    <div
      className="defense-wrapper"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <h2 id="defense-headline">כיצד נתגונן</h2>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Defense.png`}
        alt="icon"
        id="defense-icon"
      />

      {/* עמוד 1 - וידאו */}
      <div style={{ display: page === 1 ? "block" : "none" }}>
        <h2 id="defense-dircations">צפו בסרטון, בסיום לחצו על החץ להמשך</h2>
        <div id="yt-player-defense"></div>
      </div>

      {/* עמוד 2 - 4 תמונות */}
      <div
        className="defense-next-step-content"
        style={{ display: page === 2 ? "block" : "none" }}
      >
        <p id="defense-pictures-text" className="subtitles">
          להגדלת כל תמונה, יש ללחוץ עליה. כדי להקטין אותה בחזרה יש ללחוץ עליה
          פעם נוספת.
        </p>

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/defense-img1.png`}
          alt="3"
          id="img3"
          className={
            selectedImg === "img3"
              ? "enlarged"
              : "shrinked-defense img-pos-3-defense"
          }
          onClick={() => handleImgClick("img3")}
        />
        {viewedImgs.img3 && selectedImg !== "img3" && (
          <div
            className="completion-v"
            style={{
              position: "absolute",
              left: "60%",
              top: "42vh",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/defense-img2.png`}
          alt="4"
          id="img4"
          className={
            selectedImg === "img4"
              ? "enlarged"
              : "shrinked-defense img-pos-4-defense"
          }
          onClick={() => handleImgClick("img4")}
        />
        {viewedImgs.img4 && selectedImg !== "img4" && (
          <div
            className="completion-v"
            style={{
              position: "absolute",
              left: "80%",
              top: "42vh",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/defense-img3.jpeg`}
          alt="2"
          id="img2"
          className={
            selectedImg === "img2"
              ? "enlarged"
              : "shrinked-defense img-pos-2-defense"
          }
          onClick={() => handleImgClick("img2")}
        />
        {viewedImgs.img2 && selectedImg !== "img2" && (
          <div
            className="completion-v"
            style={{
              position: "absolute",
              left: "40%",
              top: "42vh",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}

        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/defense-img4.jpeg`}
          alt="1"
          id="img1"
          className={
            selectedImg === "img1"
              ? "enlarged"
              : "shrinked-defense img-pos-1-defense"
          }
          onClick={() => handleImgClick("img1")}
        />
        {viewedImgs.img1 && selectedImg !== "img1" && (
          <div
            className="completion-v"
            style={{
              position: "absolute",
              left: "20%",
              top: "42vh",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Defense;
