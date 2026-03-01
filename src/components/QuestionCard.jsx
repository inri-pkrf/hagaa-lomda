import React, { useEffect, useState } from 'react';
import '../components/Styles/QuestionCard.css';

const QuestionCard = ({
  question,
  isActive,
  backgroundColor,
  zIndex,
  questionNumber,
  totalQuestions,
  selectedAnswer: selectedAnswerProp = null,
  onAnswerSelect,
  showCorrectAnswer = false,      // כבר ערך שמגיע מהאב, מציין אם להציג תשובה נכונה
  onShowCorrectAnswer,            // callback לשינוי המצב אצל האב
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswerProp);
  const [showResult, setShowResult] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setSelectedAnswer(selectedAnswerProp);
    setShowResult(!!selectedAnswerProp);
    setIsLocked(selectedAnswerProp === question.correct_answer);
  }, [question, selectedAnswerProp]);

  const handleAnswerClick = (answer) => {
    if (isLocked) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (onAnswerSelect) onAnswerSelect(answer);

    if (answer === question.correct_answer) {
      setIsLocked(true);
    }
  };

  const handleShowCorrectAnswerClick = () => {
    if (onShowCorrectAnswer) onShowCorrectAnswer(true); // מעדכן אצל האב את מצב הצגת התשובה הנכונה
    if (onAnswerSelect) onAnswerSelect(question.correct_answer);
  };

  return (
    <div
  className={`question-card ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
      style={{ backgroundColor, zIndex }}
    >
      <div className="question-counter">
         {questionNumber}/{totalQuestions}
      </div>

      <p className="question-name">{question.question}</p>

      {question.type === 'multiple_choice' && question.answers?.length > 0 && (
        <>
          <div className="answers-grid">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                className={`answer-button ${
                  selectedAnswer === answer
                    ? answer === question.correct_answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerClick(answer)}
                disabled={isLocked}
              >
                {answer}
              </button>
            ))}
          </div>


        </>
      )}

      {question.type === 'open' && (
        <>
          {!showCorrectAnswer &&(<button className="show-right-btn" onClick={handleShowCorrectAnswerClick}>
            הצגת תשובה נכונה
          </button>)}
          {showCorrectAnswer && (
            <div className="correct-answer">
              <span className="correct-text">{question.correct_answer}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionCard;