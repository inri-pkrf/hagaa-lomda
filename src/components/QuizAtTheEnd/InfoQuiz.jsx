import React from "react";
import "./InfoQuiz.css";
import { useNavigate } from "react-router-dom";

function InfoQuiz() {
  const navigate = useNavigate();
  return (
    <div
      className="InfoQuiz"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/General/mainBackground.jpg)`,
      }}
    >
      <div id="content-info-quiz">
        <h2 id="Title1-InfoQuiz">
          ברכות! סיימתם את התוכן הלימודי של השיעור הדיגיטלי להסמכת ממונה הג"א
          במפעל / מוסד
        </h2>
        <p className="Title2-InfoQuiz" id="Title2-InfoQuiz-1">
          לסיכום ההכשרה, יש לעבור את מבחן ההסמכה שלפניכם
        </p>
        <p className="Title2-InfoQuiz" id="Title2-InfoQuiz-2">
          בציון 70 לפחות
        </p>
        <p className="Title2-InfoQuiz" id="Title2-InfoQuiz-3">
          לאחר שתעברו את המבחן בהצלחה, תישלח אליכם למייל תעודת הסמכה לממונה
          הג"א, שתישאר זמינה עבורכם גם כאן, בדף השיעור הדיגיטלי באתר
          המכללה.{" "}
        </p>
        <h2 id="Title1-InfoQuiz">בהצלחה!</h2>
      </div>

      <div id="person-div">
        <img
          src={`${process.env.PUBLIC_URL}/assets/General/Quiz/man.webp`}
          alt="man"
          className="person"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/General/Quiz/woman.webp`}
          alt="woman"
          className="person"
        />
      </div>
    </div>
  );
}

export default InfoQuiz;
