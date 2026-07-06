import React, { useEffect, useState, useRef } from "react";
import "../../style/Alert.css";
import { useLocation } from "react-router-dom";

// תוכן שלושת ההודעות בעמוד 5 (כל אחת עם עיצוב ההתראה שלה + תוכן הפאנל)
const PAGE5_MESSAGES = [
  {
    notifTitle: "פיקוד העורף",
    notifSubtitle: "עדכון",
    isAlert: false,
    intro: [
      "**במקרים בהם מתאפשר, פיקוד העורף מפיץ הנחיה מקדימה המאפשרת להיערך כמה דקות לפני קבלת ההתרעה:**"
      ],
    checklist: [
      "זמן ומידע נוסף לדריכות ומוכנות ",
      "זמן לשפר מיקום למיגון המיטבי ביותר",
      "שיפור תחושת הביטחון האישית",
    ],
  },
  {
    notifTitle: "פיקוד העורף",
    notifSubtitle: "עדכון",
    isAlert: false,
    intro: [
      "ההנחיה תתקבל באמצעות הודעה שתשלח ב-CB (cellular broadcast) וביישומון פיקוד העורף, בפורטל החירום הלאומי  ובערוצי הטלגרם של פיקוד העורף.",
      "ההנחיה המקדימה מופצת לאזורים נרחבים בהם קיים פוטנציאל איום כדי לאפשר זמן היערכות, בעוד שההתרעה (אזעקה) מופצת לאזורים בהם האיום מתממש.",
      "**לפיכך יישנם מקרים בהם תתקבל הנחיה מקדימה אך לא תתקבל לאחריה התרעה (אזעקה)**"
    ],
    checklist: null,
  },
  {
    notifTitle: "היכנסו למרחב מוגן",
    notifSubtitle: "ירי רקטות וטילים | באזורך",
    isAlert: true,
    intro: [
      "**בכל מקרה האזעקה היא הקובעת!**\nרק אם מתקבלת התרעה, יש להיכנס למרחב המוגן בהתאם לזמן ההתגוננות ולהישאר בו עד לקבלת הנחיה מפורשת."
    ],
    checklist: null,
  },
];

const RING_DURATION_MS = 5000;
const NEXT_NOTIF_DELAY_MS = 500;
const ASSET_BASE = `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/AlertPre-alarm`;

// מפרש טקסט עם **בולד** ו-\n לירידת שורה, ומחזיר JSX
function renderFormattedText(text) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const segments = line.split(/\*\*(.+?)\*\*/g);
    return (
      <React.Fragment key={lineIdx}>
        {segments.map((segment, segIdx) =>
          segIdx % 2 === 1 ? (
            <strong key={segIdx}>{segment}</strong>
          ) : (
            segment
          ),
        )}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

function Alert() {
  const location = useLocation();
  const videoRef = useRef(null);
  const ringAudioRef = useRef(null);
  const ringTimerRef = useRef(null);
  const nextNotifTimerRef = useRef(null);

  const [activeImage, setActiveImage] = useState(null);
  const [viewedImgs, setViewedImgs] = useState({ img1: false, img2: false });

  // --- state עבור עמוד 5 (הודעת "הנחיה מקדימה") ---
  const [page5Phase, setPage5Phase] = useState("ringing"); // "ringing" | "call-screen"
  const [arrivedCount, setArrivedCount] = useState(0); // כמה התראות כבר "הגיעו" ומוצגות בערימה
  const [openedMessage, setOpenedMessage] = useState(null); // איזו הודעה מוצגת כרגע בפאנל הימני
  const [messagesSeen, setMessagesSeen] = useState(
    Array(PAGE5_MESSAGES.length).fill(false),
  );

  let page = 1;
  if (location.pathname === "/Alert/1.5") page = 5;
  if (location.pathname === "/Alert/2") page = 2;
  if (location.pathname === "/Alert/3") page = 3;
  if (location.pathname === "/Alert/4") page = 4;

  useEffect(() => {
    if (page !== 1) return;
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [page]);

  useEffect(() => {
    if (page !== 4) return;
    const bothViewed = viewedImgs.img1 && viewedImgs.img2;
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !bothViewed }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [viewedImgs, page]);

  // --- אתחול רצף האנימציה של עמוד 5 בכל כניסה לעמוד ---
  useEffect(() => {
    if (page !== 5) return;

    setPage5Phase("ringing");
    setArrivedCount(0);
    setOpenedMessage(null);
    setMessagesSeen(Array(PAGE5_MESSAGES.length).fill(false));

    if (ringAudioRef.current) {
      ringAudioRef.current.currentTime = 3;
      ringAudioRef.current.play().catch(() => {});
    }

    ringTimerRef.current = setTimeout(() => {
      if (ringAudioRef.current) {
        ringAudioRef.current.pause();
        ringAudioRef.current.currentTime = 0;
      }
      setPage5Phase("call-screen");
      setArrivedCount(1); // ההתראה הראשונה "מגיעה" ברגע שנפתח מסך השיחה
    }, RING_DURATION_MS);

    return () => {
      clearTimeout(ringTimerRef.current);
      clearTimeout(nextNotifTimerRef.current);
    };
  }, [page]);

  // --- נעילת כפתור "הבא" עד שכל שלוש ההודעות נפתחו ---
  useEffect(() => {
    if (page !== 5) return;
    const allSeen = messagesSeen.every(Boolean);
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allSeen }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [messagesSeen, page]);

  const handleEnded = () => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: false }),
    );
  };

  const handleImgClick = (imgKey) => {
    setActiveImage(activeImage === imgKey ? null : imgKey);
    setViewedImgs((prev) => ({ ...prev, [imgKey]: true }));
  };

  const handleNotificationClick = (index) => {
    const wasUnseen = !messagesSeen[index];

    setOpenedMessage(index);
    setMessagesSeen((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });

    // רק אם זו ההתראה החדשה ביותר בערימה, וטרם נצפתה - מביאים את ההתראה הבאה בתור
    const isNewest = index === arrivedCount - 1;
    if (wasUnseen && isNewest && index < PAGE5_MESSAGES.length - 1) {
      nextNotifTimerRef.current = setTimeout(() => {
        setArrivedCount((c) => c + 1);
      }, NEXT_NOTIF_DELAY_MS);
    }
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
          <h2 id="protectedSpace-headline">
            יש לצפות בסרטון, בסיומו יש ללחוץ על החץ להמשך
          </h2>
          <video
            ref={videoRef}
            controls
            onEnded={handleEnded}
            controlsList="nodownload"
            id="yt-player-alert"
          >
            <source
              src={`${process.env.PUBLIC_URL}/assets/videos/Alert.mp4`}
              type="video/mp4"
            />
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
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Alert.png`}
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
            <div
              className="completion-v"
              style={{
                position: "absolute",
                top: "42vh",
                left: "30%",
                transform: "translateX(-50%)",
                zIndex: 999,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
              >
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
            <div
              className="completion-v"
              style={{
                position: "absolute",
                top: "42vh",
                left: "70%",
                transform: "translateX(-50%)",
                zIndex: 999,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
              >
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
            יש ללחוץ על התמונה על מנת להגדיל אותה. בלחיצה נוספת היא תחזור לגודלה
            המקורי
          </p>
        </div>
      )}
          {page === 5 && (
            <div id="alert-page2" className="page5-container">
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/icons/Alert.png`}
                alt="Siren"
                id="alert-icon"
              />
              <h2 id="headline-icon">הנחיה מקדימה – זמן להיערך</h2>
              <p id="alert-sub-text2">מהי הנחיה מקדימה?</p>


          {/* שלב 1: הטלפון מצלצל (phoneInHend.png זז מצד לצד + סאונד אזעקה) */}
          {page5Phase === "ringing" && (
            <>
              <div className="recorded-sound-notice">
                <span>⚠️ שימו לב: אזעקה מוקלטת ברקע</span>
              </div>

              <div className="phone-ring-wrapper">
                <img src={`${ASSET_BASE}/phoneInHend.png`} alt="טלפון מצלצל" />
                <audio ref={ringAudioRef} autoPlay loop>
                  <source src={`${ASSET_BASE}/alarm-sound.mp3`} type="audio/mpeg" />
                </audio>
              </div>
            </>
          )}

          {/* שלב 2: מסך שיחה - phone.png + ערימת התראות שמצטברת */}
          {page5Phase === "call-screen" && (
            <div className="phone-screen-wrapper">
              <img src={`${ASSET_BASE}/phone.png`} alt="טלפון" />

              <div className="phone-notifications-list">
                {PAGE5_MESSAGES.slice(0, arrivedCount).map((msg, i) => {
                  const seen = messagesSeen[i];
                  const isActiveHint = !seen && i === arrivedCount - 1;
                  return (
                    <div key={i} className="notif-row">
                      {isActiveHint && (
                        <div className="notif-pointer-arrow">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 12H4M4 12L10 6M4 12L10 18"
                              stroke="#f5b400"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}

                      <div
                        className={`phone-notification${seen ? " seen" : " unseen"}${
                          msg.isAlert ? " is-alert" : ""
                        }${isActiveHint ? " active-hint" : ""}`}
                        onClick={() => handleNotificationClick(i)}
                      >
                        <div className="notif-icon-wrap">
                          <img
                            src={`${ASSET_BASE}/logo-message.png`}
                            alt="פיקוד העורף"
                            className="notif-main-icon"
                          />
                        </div>

                        <div className="notif-text">
                          <span className="notif-title">{msg.notifTitle}</span>
                          <span className="notif-sub">{msg.notifSubtitle}</span>
                        </div>

                        <div className="notif-left">
                          {seen ? (
                            <span className="notif-checkmark">✔</span>
                          ) : msg.isAlert ? (
                            <img
                              src={`${ASSET_BASE}/alert-icon.png`}
                              alt="התרעה"
                              className="notif-left-alert-icon"
                            />
                          ) : (
                            <span className="notif-time">כעת</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* הפאנל הימני עם תוכן ההודעה שנפתחה */}
          {openedMessage !== null && (
            <div
              className={`message-panel${
                PAGE5_MESSAGES[openedMessage].isAlert ? " final-alert" : ""
              }`}
              key={openedMessage}
            >
              <img
                src={`${ASSET_BASE}/logo.png`}
                alt="פיקוד העורף"
                className="message-icon"
              />

              <div className="message-content">
                <div className="message-body">
                  {PAGE5_MESSAGES[openedMessage].intro.map((paragraph, idx) => (
                    <p key={idx}>{renderFormattedText(paragraph)}</p>
                  ))}
                </div>

                {PAGE5_MESSAGES[openedMessage].checklist && (
                  <ul className="message-checklist">
                    {PAGE5_MESSAGES[openedMessage].checklist.map((item, idx) => (
                      <li key={idx}>
                        <span className="check-mark">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <span className="message-time">06:07</span>
              </div>
            </div>
          )}

          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`}
            alt="Siren"
            className="alert-background"
          />
        </div>
      )}
    </div>
  );
}

export default Alert;