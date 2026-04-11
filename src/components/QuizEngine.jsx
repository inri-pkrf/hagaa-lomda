import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/QuizEngine.css';

const QuizEngine = ({ data, unitNumber, onFinished }) => {
  const navigate = useNavigate();
  
  // מפתחות ייחודיים לסטורג'
  const answersKey = `unit_${unitNumber}_quiz_answers`;
  const indexKey = `unit_${unitNumber}_quiz_index`;

  // טעינת האינדקס האחרון שהמשתמש היה בו (ברירת מחדל 0)
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem(indexKey);
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState(null);

  // --- הוספת לוגיקת החצים בלבד (בלי לשנות עיצוב) ---
// --- לוגיקת החצים המעודכנת ---
  useEffect(() => {
    // שליטה על כפתור "הבא" הכללי - פעיל רק אם ענו נכון
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: status !== 'correct' }));

    const handleNext = (e) => {
      if (status === 'correct') {
        e.preventDefault();
        handleNextLogic();
      }
    };

    const handlePrev = (e) => {
      // עצירת הניווט האוטומטי של הלומדה בכל מקרה!
      e.preventDefault();
      
      if (currentIndex === 0) {
        // אם אנחנו בשאלה הראשונה (0) - חוזרים למסדרון
        navigate('/intro-unit-one');
      } else {
        // אם אנחנו בשאלה 1 ומעלה - פשוט חוזרים שאלה אחת אחורה
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev);
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [currentIndex, status, navigate]); 
  // ----------------------------------------------

  // אפקט לטעינת תשובות שמורות בכל פעם שהאינדקס משתנה
  useEffect(() => {
    const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
    
    if (savedAnswers[currentIndex] !== undefined) {
      setSelectedAnswer(savedAnswers[currentIndex]);
      setStatus('correct');
    } else {
      setSelectedAnswer(null);
      setStatus(null);
    }
    
    // שמירת האינדקס הנוכחי בסטורג' כדי שאם יחזרו לסיידבר זה יישמר
    sessionStorage.setItem(indexKey, currentIndex.toString());
  }, [currentIndex, answersKey, indexKey]);

  const currentQuestion = data[currentIndex];

  const handleAnswerClick = (index) => {
    if (status === 'correct') return;

    setSelectedAnswer(index);

    if (index === currentQuestion.correctAnswer) {
      setStatus('correct');
      
      // שמירת התשובה הנכונה
      const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
      savedAnswers[currentIndex] = index;
      sessionStorage.setItem(answersKey, JSON.stringify(savedAnswers));
    } else {
      setStatus('wrong');
    }
  };

  const handleNextLogic = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onFinished) {
        onFinished();
      }
    }
  };

  return (
    <div className="quiz-engine-container">
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
                disabled={status === 'correct' && selectedAnswer !== index}
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

      {/* הכפתורים המקוריים בהערה - הניווט עובר לחצים הכלליים */}
      {/* <footer className="quiz-engine-footer">
        <div className="nav-controls">
          {currentIndex > 0 && (
            <button className="quiz-nav-btn prev-btn" onClick={() => setCurrentIndex(prev => prev - 1)}>
              ⬅ שאלה קודמת
            </button>
          )}

          <button 
            className="quiz-nav-btn next-btn" 
            disabled={status !== 'correct'}
            onClick={handleNextLogic}
          >
            {currentIndex === data.length - 1 ? "סיום שאלון" : "לשאלה הבאה ↪"}
          </button>
        </div>
      </footer> 
      */}
    </div>
  );
};

export default QuizEngine;