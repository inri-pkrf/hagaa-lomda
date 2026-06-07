import React, { useState, useEffect, useRef } from "react";
import "../../Unit4/style/ExplainEmergency.css";


function ExplainEmergency() {
  const [stage, setStage] = useState(0);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);


  const scrollRef = useRef(null);
  const audioRef = useRef(null);


  // תמונות
  const lobbyImg = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/emergency/lobby_no_tv.jpg`;
  const tvUnitImg = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/emergency/tv_unit.webp`;
  const soldierWithTvImg = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/emergency/soldier_with_tv.jpg`;


  const steps = [
    { text: "הגעה למקום האירוע ביצוע סריקות וגיבוש תמונת מצב.", v: true },
    { text: "העברת דיווח והקפצת ארגוני חירום.", v: true },
    { text: "ניתוק תשתיות, חשמל, גז, מים.", v: true },
    { text: "מתן מענה מיידי באמצעות צוותי חירום.", v: true },
    { text: "קביעת שטחי כינוס והכוונת כוחות החירום לאירוע.", v: true },
    {
      text: "בניית תמונת מצב, איסוף מידע מהשטח לרבות מידע על הבניין שנפגע (מי היה במבנה בזמן התרחשות האירוע), מי חשוד כלכוד (נעדר).",
      v: true,
    },
    {
      text: "הכנת תיק מבנה באירוע הרס (תיאור הנדסי של המבנה לפני שהמבנה קרס / תוכניות מבנה, וכל מידע רלוונטי נוסף).",
      v: true,
    },
    {
      text: 'העברת מקל לארגוני החירום והשתלבות בחפ"ק אחוד לנקודה שבה יתכנסו נציגים מכלל ארגוני החירום לניהול ושליטה באירוע.',
      v: true,
    },
    { text: "קשר עם הנהלת המתקן.", v: true },
  ];


  const getBackgroundImage = () => {
    if (stage === 0) return lobbyImg;
    if (stage === 1) return tvUnitImg;
    return soldierWithTvImg;
  };


  // ✅ בדיקת גלילה משופרת (כולל תמיכה במסכים שונים ועיגול מספרים)
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;


    const isAtBottom =
      Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 5;


    if (isAtBottom && !isScrolledToEnd) {
      setIsScrolledToEnd(true);
      sessionStorage.setItem("unitFour-third", "finished");
    }
  };


  // ✅ שליטה בכפתור הבא הגלובלי
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", {
        detail: !isScrolledToEnd,
      }),
    );
  }, [isScrolledToEnd]);


  // ✅ שחזור מצב אם חוזרים למסך
  useEffect(() => {
    if (stage !== 2) {
      setIsScrolledToEnd(false);
      return;
    }


    const saved = sessionStorage.getItem("unitFour-third");
    if (saved === "finished") {
      setIsScrolledToEnd(true);
    }
  }, [stage]);


  // ✅ ניהול סאונד נקי (טעינה פעם אחת, עצירה מסודרת ב-unmount)
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        `${process.env.PUBLIC_URL}/assets/unitFourImgs/emergency/ivan_luzan-breaking-news-intro-logo-154189.mp3`,
      );
    }


    if (stage === 0) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log("Audio play error", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }


    // פונקציית ניקוי (Cleanup) למקרה שהמשתמש עובר דף לגמרי
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [stage]);


  return (
    <div className={`emergency-wrapper stage-${stage}`}>
      <h2 className="ExplainEmergency-main-title">
        סדר פעולות לטיפול באירוע חירום במפעל / מוסד
      </h2>


      {stage === 0 && (
        <p className="ExplainEmergency-title subtitles">
          יש ללחוץ על הטלוויזיה לצפייה בהנחיות
        </p>
      )}


      <div className="scene-viewport">
        <img
          src={getBackgroundImage()}
          className="bg-img"
          alt="background"
          key={stage}
        />


        {/* שלב 0: לחיצה על הטלוויזיה */}
        {stage === 0 && (
          <div
            className="active-glow-tv tv-hotspot"
            onClick={() => setStage(1)}
          >
            <img src={tvUnitImg} className="tv-standalone-img" alt="tv" />
            <div className="glow-effect"></div>
          </div>
        )}


        {/* שלב 1: לחיצה על הנציגה/חיילת */}
        {stage === 1 && (
          <div className="soldier-hotspot" onClick={() => setStage(2)}>
            <div className="pulse-circle"></div>
            <span className="click-hint">לחצו על הנציגה להסבר</span>
          </div>
        )}


        {/* שלב 2: הצגת הטקסט והגלילה */}
        <div className={`tv-content-container ${stage === 2 ? "visible" : ""}`}>
          {stage === 2 && (
            <>
              <div className="tv-red-header">
                <h3 className="tv-title">
                  במצב חירום עליכם כממוני הג”א לפעול באופן הבא:
                </h3>
              </div>


              {/* חץ גלילה שנעלם ברגע שהמשתמש גלל עד הסוף */}
              {!isScrolledToEnd && (
                <div className="scroll-hint">
                  <span>יש לגלול מטה</span>
                  <div className="arrow-down"></div>
                </div>
              )}


              <div
                className="scroll-area-peach"
                ref={scrollRef}
                onScroll={handleScroll}
              >
                {steps.map((s, i) => (
                  <div key={i} className="step-item">
                    <span className="v-mark">{s.v ? "✓" : ""}</span>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default ExplainEmergency;



