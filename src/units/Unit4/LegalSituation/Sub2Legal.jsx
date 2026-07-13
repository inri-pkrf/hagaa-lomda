import React, { useState, useEffect } from "react";
import "../../Unit4/style/Sub2Legal.css";

function Sub2Legal() {
  const [isDifference, setIsDifference] = useState(true);

  // ⭐ חדש — שמירה לכל כפתור
  const [similarityClicked, setSimilarityClicked] = useState(false);
  const [differenceClicked, setDifferenceClicked] = useState(true);

  // מיקומים
  const positions = {
    similarity: {
      btnSimilarityTop: "54vh",
      btnDifferenceTop: "46vh",
    },
    difference: {
      btnSimilarityTop: "47vh",
      btnDifferenceTop: "54vh",
    },
  };

  // שליטה על כפתור "הבא"
  useEffect(() => {
    const hasClicked = similarityClicked;

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", {
        detail: !hasClicked,
      }),
    );
  }, [similarityClicked, differenceClicked]);

  // נקה את ה-override כשעוזבים את הדף
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("narrationOverride");
    };
  }, []);

  return (
    <div className="Sub2Legal-container">
      <h2 id="Sub2Legal-headline"> השוני והדמיון בין המצבים </h2>

      <p id="Sub2Legal-text1">
        בלחיצה על אחת מכפות המאזניים תוכלו ללמוד עוד על
        <span
          id="Sub2Legal-pink"
          onClick={() => {
            setIsDifference(true);
            setDifferenceClicked(true);
          }}
          style={{ cursor: "pointer", color: "#FF2A63" }}
        >
          {" "}
          השוני{" "}
        </span>
        <span
          id="Sub2Legal-blue"
          onClick={() => {
            setIsDifference(false);
            setSimilarityClicked(true);
          }}
          style={{ cursor: "pointer", color: "#070e6e" }}
        >
          {" "}
          והדמיון:{" "}
        </span>
      </p>

      {/* מסגרת מרכזית */}
      <div
        className="Sub2Legal-content"
        style={{ borderColor: isDifference ? "#FF2A63" : "#070e6e" }}
      />

      <p id="Sub2Legal-subtext">
        {isDifference ? "השוני בין שני המצבים" : "הדמיון בין שני המצבים"}
      </p>

      <p id="Sub2Legal-text2">
        {isDifference
          ? "שעת התקפה הינו מצב עובדתי של התקפה שהאויב יזם המוגדר במסגרת זמן של 24 שעות."
          : " מוקנית סמכות לפיקוד העורף להגדיר מדיניות התגוננות ולתת הנחיות לאזרח."}
      </p>

      <p id="Sub2Legal-text3">
        {isDifference
          ? "מצב מיוחד בעורף הינו מצב של מתיחות והיערכות לאיום שהוכרז על ידי שר הביטחון במסגרת זמן של 48 שעות והממשלה במסגרת זמן של 5 ימים."
          : "פיקוד העורף אחראי על הפיקוד והשליטה בשטח."}
      </p>
      {/* כפתורי דמיון ושוני - עם סימון ✔ והפעלה של קובץ שמע ספציפי לכל אחד */}
      <p
        id="sub2legal-similarity"
        className={`scale-text ${similarityClicked ? "clicked-green" : ""}`}
        onClick={() => {
          setIsDifference(false);
          setSimilarityClicked(true);

          // ⭐ הפעל קובץ שמע ספציפי
          window.dispatchEvent(
            new CustomEvent("setNarration", {
              detail: ["recordings/04 - unit4/049 - Sub2Legal2.mp3"],
            }),
          );
          sessionStorage.setItem(
            "narrationOverride",
            JSON.stringify(["recordings/04 - unit4/048 - Sub2Legal1.mp3"]),
          );
        }}
        style={{
          cursor: "pointer",
          top: isDifference
            ? positions.difference.btnSimilarityTop
            : positions.similarity.btnSimilarityTop,
        }}
      >
        דמיון {similarityClicked && "✔"}
      </p>

      {/* שוני */}
      <p
        id="sub2legal-difference"
        className={`scale-text ${differenceClicked ? "clicked-green" : ""}`}
        onClick={() => {
          setIsDifference(true);
          setDifferenceClicked(true);

          // ⭐ הפעל קובץ שמע ספציפי
          window.dispatchEvent(
            new CustomEvent("setNarration", {
              detail: ["recordings/04 - unit4/048 - Sub2Legal1.mp3"],
            }),
          );
          sessionStorage.setItem(
            "narrationOverride",
            JSON.stringify(["recordings/04 - unit4/049 - Sub2Legal2.mp3"]),
          );
        }}
        style={{
          cursor: "pointer",
          top: isDifference
            ? positions.difference.btnDifferenceTop
            : positions.similarity.btnDifferenceTop,
        }}
      >
        שוני {differenceClicked && "✔"}
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/${isDifference ? "scales-left.webp" : "scales-right.webp"}`}
        id="scales-left"
        alt="Scales"
      />
    </div>
  );
}

export default Sub2Legal;
