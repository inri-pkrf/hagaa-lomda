import React, { useState, useEffect } from "react";
import "../../Unit3/style/QuestionFactoryFile.css";


const QUESTIONS = [
  {
    id: 1,
    question: "מתי עלייך לכתוב את תיק המפעל?",
    answers: [
      "בשגרה",
      "בחירום",
      "על פי שיקול דעת מנהל המפעל",
      "כל התשובות נכונות",
    ],
    correctAnswer: 0, // הגדרנו כאינדקס 1 (לפי ה-logic המקורי שלך)
  },
];


function QuestionFactoryFile() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const correctIndex =
    currentQuestion.correctAnswer >= 1 &&
    currentQuestion.correctAnswer <= currentQuestion.answers.length
      ? currentQuestion.correctAnswer - 1
      : currentQuestion.correctAnswer;
  const isCorrect = selectedAnswer === correctIndex;


  useEffect(() => {
    const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
    const shouldDisable = !isCorrect || !isLastQuestion;
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: shouldDisable }),
    );
  }, [isCorrect, currentQuestionIndex]);


  const handleAnswerClick = (answerIndex) => {
    if (isCorrect) return;
    setSelectedAnswer(answerIndex);
  };


  const getAnswerClass = (answerIndex) => {
    if (selectedAnswer === null) return "QuestionFactoryFile-answer-text";
    if (selectedAnswer === correctIndex) {
      return answerIndex === correctIndex
        ? "QuestionFactoryFile-answer-text correct"
        : "QuestionFactoryFile-answer-text";
    }
    if (answerIndex === selectedAnswer)
      return "QuestionFactoryFile-answer-text wrong";
    return "QuestionFactoryFile-answer-text";
  };


  return (
    <div className="question-factory-container">
      {/* דיב לבן מופיע רק אחרי תשובה נכונה */}
      {isCorrect && <div className="question-white-cover" />}


      <div className="QuestionFactoryFile-question-text">
        {currentQuestion.question}
      </div>
      <div className="QuestionFactoryFile-folders-row">
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={index}
            className="QuestionFactoryFile-folder-option"
            onClick={() => handleAnswerClick(index)}
          >
            <div className="QuestionFactoryFile-answer-card">
              <div
                className={getAnswerClass(index)}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/folder.webp)`,
                }}
              >
                {answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default QuestionFactoryFile;



