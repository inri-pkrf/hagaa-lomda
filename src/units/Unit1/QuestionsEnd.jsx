import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import QuizEngine from '../../components/QuizEngine';
import questionsDataOne from '../../Data/QuestionsData/QuestionDataOne';
import './style/QuestionsEnd.css';

function QuestionsEnd() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "שאלות סיכום יחידה 1");

    // מוחקים מכאן את ה-handlePrev! 
    // ה-QuizEngine שבתוך ה-return ינהל את זה בעצמו.
    
    return () => {
      // מוודאים שביציאה מהדף הכפתור חוזר להיות פעיל
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  const handleQuizCompletion = () => {
    sessionStorage.setItem('unitOne-questions', 'finished');
    window.dispatchEvent(new Event('updateNavbar'));
    
    // ניווט לדף הסיכום
    navigate('/summary-checklist');
  };

  return (
    <div className="questions-end-page">
      <QuizEngine 
        data={questionsDataOne} 
        unitNumber={1} 
        onFinished={handleQuizCompletion} 
      />
    </div>
  );
}

export default QuestionsEnd;