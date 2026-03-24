import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizEngine from '../../components/QuizEngine';
import questionsDataOne from '../../Data/QuestionsData/QuestionDataOne';
import './style/QuestionsEnd.css';

function QuestionsEnd() {
  const navigate = useNavigate();
  const [quizFinished, setQuizFinished] = useState(false);

  // הפונקציה שתופעל כשהמנוע יסיים את כל השאלות
  const handleQuizCompletion = () => {
    setQuizFinished(true);
  };

  return (
    <div className="questions-end-page">
      {/* אנחנו מעבירים את הפונקציה handleQuizCompletion למנוע.
        כשהמנוע יסיים, הוא יפעיל אותה וזה ישנה את quizFinished ל-true
      */}
      <QuizEngine 
        data={questionsDataOne} 
        unitNumber={1} 
        onFinished={handleQuizCompletion} 
      />

      {/* הכפתור הזה מופיע מחוץ למנוע, רק כשהשאלון הסתיים */}
      {quizFinished && (
        <div className="summary-navigation-container">
            <button
                className="quiz-nav-btn summary-btn highlight-btn"
                onClick={() => navigate('/summary-checklist')}
            >
                לסיכום יחידה 1 🏁
            </button>
        </div>
      )}
    </div>
  );
}

export default QuestionsEnd;