import React, { useState } from "react";
import "../../Unit4/style/QuestionRTE.css";
import { useEffect } from "react";


function QuestionRTE() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // התשובה הנכונה שנבחרה
  const [wrongAnswers, setWrongAnswers] = useState([]); // רשימת הטעויות שנלחצו


  const imgPath = `${process.env.PUBLIC_URL}/assets/UnitFourImgs/RoutineToEmergency`;
  const bgImageUrl = `${imgPath}/emergency-question-bg.webp`;
  const womanImageUrl = `${imgPath}/women.webp`;
  const clipboardImg = `${imgPath}/clipboard.webp`;


  const correctAnswer = "קידום משימות להגברת מוכנות המפעל לאירוע חירום";


  const handleAnswerClick = (answer) => {
    // אם המשתמש כבר צדק, לא עושים כלום
    if (selectedAnswer === correctAnswer) return;


    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      // אם זו טעות, נוסיף אותה לרשימת הטעויות (אם היא עוד לא שם)
      if (!wrongAnswers.includes(answer)) {
        setWrongAnswers([...wrongAnswers, answer]);
      }
    }
  };
  const isCorrect = selectedAnswer === correctAnswer;
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", {
        detail: !isCorrect,
      }),
    );
    sessionStorage.setItem("unitFour-second", "finished");
  }, [isCorrect]);


  if (isClicked) {
    return (
      <div className="question-page-full no-bg">
        <p className="subtitles">
          יש לקרוא את השאלה שלפניך, ולבחור בתשובה הנכונה ביותר:
        </p>


        <div className="clipboard-wrapper">
          <img
            src={clipboardImg}
            alt="clipboard"
            className="clipboard-bg-img"
          />


          {isCorrect && <div className="clipboard-success-overlay" />}


          <div className="content-on-clipboard">
            <p className="question-overlay">
              <strong>משמעות שלב מעבר משגרה לחירום הינו...</strong>
            </p>
            <div className="answers-overlay">
              {[
                "קידום משימות להגברת מוכנות המפעל לאירוע חירום",
                "לאפשר יכולת לשר הביטחון להכריז מצב מיוחד בעורף",
                "להקנות סמכויות פקע”ר לתת הנחיות מצילות חיים",
                "להיערך לפתיחת מסגרות החינוך לילדי העובדים החיוניים במפעל",
              ].map((answer, index) => {
                // קביעת הקלאס לפי המצב
                let statusClass = "";
                if (answer === selectedAnswer) statusClass = "correct";
                else if (wrongAnswers.includes(answer)) statusClass = "wrong";


                return (
                  <button
                    key={index}
                    className={`answer-option-QuestionRTE ${statusClass}`}
                    onClick={() => handleAnswerClick(answer)}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <img src={womanImageUrl} alt="women" className="woman-static" />
      </div>
    );
  }


  return (
    <div
      className="question-time-container"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <p id="rte-question-click" className="subtitles">
        יש ללחוץ על האישה המהבהבת כדי לעבור לשאלת הסיכום של הנושא
      </p>
      <img
        src={womanImageUrl}
        alt="women"
        className="glowing-woman cursor-pointer"
        onClick={() => setIsClicked(true)}
      />
    </div>
  );
}


export default QuestionRTE;





