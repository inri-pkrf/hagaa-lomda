// הוסיפי את useEffect לתוך הסוגריים המסולסלים
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import QuizEngine from '../../components/QuizEngine';
import questionsDataOne from '../../Data/QuestionsData/QuestionDataOne';
import './style/QuestionsEnd.css';

function QuestionsEnd() {
  const navigate = useNavigate();
  const [quizFinished, setQuizFinished] = useState(false);

  // עכשיו useEffect יעבוד ולא יזרוק שגיאה
  useEffect(() => {
    sessionStorage.setItem('MainTitle', "שאלות סיכום יחידה 1");
  }, []);

  const handleQuizCompletion = () => {
    setQuizFinished(true);
  };

  return (
    <div className="questions-end-page">
      <QuizEngine 
        data={questionsDataOne} 
        unitNumber={1} 
        onFinished={handleQuizCompletion} 
      />

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