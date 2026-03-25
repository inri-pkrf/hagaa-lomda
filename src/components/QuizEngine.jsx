import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/QuizEngine.css';

const QuizEngine = ({ data, unitNumber, onFinished }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState(null);

  const currentQuestion = data[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / data.length) * 100);

  const handleAnswerClick = (index) => {
    if (status === 'correct') return;
    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswer) {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setStatus(null);
    } else {
      // במקום לנווט, אנחנו קוראים לפונקציה שהאבא הביא לנו
      if (onFinished) {
        onFinished();
      }
    }
  };

  return (
    <div className="quiz-engine-container">
      {/* <header className="quiz-engine-header">
        <div className="quiz-progress-wrapper">
          <span className="progress-text">{progressPercent}% התקדמות</span>
          <div className="progress-dots">
             {data.map((_, i) => (
               <div key={i} className={`dot ${i <= currentIndex ? 'filled' : ''}`}>
                 {i + 1}
               </div>
             ))}
          </div>
        </div>
        <h1 className="quiz-header-title">שאלות לסיכום</h1>
      </header> */}

      <main className="quiz-engine-main">
        <div className="question-counter">
          שאלת סיכום {currentIndex + 1} מתוך {data.length}
        </div>
        <p className="quiz-instruction">יש לקרוא את השאלה שלפניך, ולבחור בתשובה הנכונה ביותר:</p>
        
        <h2 className="quiz-question-text">{currentQuestion.question}</h2>

        <div className="quiz-answers-list">
          {currentQuestion.answers.map((answer, index) => {
            let stateClass = "";
            if (selectedAnswer === index) {
              stateClass = status === 'correct' ? "correct-choice" : "wrong-choice";
            }
            return (
              <button
                key={index}
                className={`quiz-answer-button ${stateClass}`}
                onClick={() => handleAnswerClick(index)}
              >
                {answer}
              </button>
            );
          })}
        </div>

        <div className="quiz-feedback-box">
          {status === 'correct' && <p className="feedback-msg success">תשובה נכונה!</p>}
          {status === 'wrong' && <p className="feedback-msg error">תשובה לא נכונה, נסה שוב.</p>}
        </div>
      </main>

      <footer className="quiz-engine-footer">
        <div className="nav-controls">
          <button 
            className="quiz-nav-btn next-btn" 
            disabled={status !== 'correct'}
            onClick={handleNext}
          >
            לשאלה הבאה ↪
          </button>
        </div>
      </footer>
      
    </div>
  );
};

export default QuizEngine;