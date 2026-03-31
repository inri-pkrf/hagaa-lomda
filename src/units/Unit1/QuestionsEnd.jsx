import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import QuizEngine from '../../components/QuizEngine';
import questionsDataOne from '../../Data/QuestionsData/QuestionDataOne';
import './style/QuestionsEnd.css';

function QuestionsEnd() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "שאלות סיכום יחידה 1");
  }, []);

  const handleQuizCompletion = () => {
    // 1. סימון שהשאלות הסתיימו (בשביל ה-V בסיידבר)
    sessionStorage.setItem('unitOne-questions', 'finished');
    
    // 2. עדכון ה-Sidebar בזמן אמת
    window.dispatchEvent(new Event('updateNavbar'));
    
    // 3. ניווט ישיר לדף הסיכום (במקום להציג כפתור נוסף)
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