import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/QuizEngine.css';
import { narrationMap } from '../Data/NarrationData';

const QuizEngine = ({ data, unitNumber, onFinished }) => {
  const navigate = useNavigate();

  const answersKey = `unit_${unitNumber}_quiz_answers`;
  const indexKey = `unit_${unitNumber}_quiz_index`;

  const isSummaryQuiz = unitNumber === 5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [highlightedAnswer, setHighlightedAnswer] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = data[currentIndex];

  // ✅ מנקה הכל בטעינה ראשונית
  useEffect(() => {
    sessionStorage.removeItem(answersKey);
    sessionStorage.removeItem(indexKey);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHighlightedAnswer(null);
    setLocked(false);
    setScore(0);
  }, [unitNumber]);

  useEffect(() => {
  const allSrcs = narrationMap[`/questions-end/${unitNumber}`];
  if (allSrcs && allSrcs[currentIndex]) {
    window.dispatchEvent(new CustomEvent('setNarration', {
      detail: [allSrcs[currentIndex]]
    }));
  }
}, [currentIndex, unitNumber]);

  const getSavedAnswer = (index) => {
    const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
    return savedAnswers[index] ?? null;
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    nextQuestion();
  };

  useEffect(() => {
    if (!isSummaryQuiz) return;
    const saved = getSavedAnswer(currentIndex);
    window.dispatchEvent(
      new CustomEvent('setNextBtnDisabled', { detail: saved === null })
    );
  }, [currentIndex, isSummaryQuiz]);

  useEffect(() => {
    const handleNext = () => {
      nextQuestion();
    };
    window.addEventListener('quizNext', handleNext);
    return () => {
      window.removeEventListener('quizNext', handleNext);
    };
  }, [currentIndex, data]);

  useEffect(() => {
    sessionStorage.setItem(indexKey, currentIndex);
  }, [currentIndex, indexKey]);

  useEffect(() => {
    sessionStorage.setItem('unit_5_questions', JSON.stringify(data));
  }, [data]);

useEffect(() => {
  const handlePrevNav = (e) => {
    if (currentIndex > 0) {
      e.preventDefault();
      const prev = currentIndex - 1;

      if (!isSummaryQuiz) {
        // ✅ יחידות 1–4: מחיקת תשובות
        const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
        delete savedAnswers[currentIndex];
        delete savedAnswers[prev];
        sessionStorage.setItem(answersKey, JSON.stringify(savedAnswers));

        setCurrentIndex(prev);
        setSelectedAnswer(null);
        setHighlightedAnswer(null);
        setLocked(false);
      } else {
        // ✅ יחידה 5: טוען תשובה שמורה
        const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
        const savedAnswer = savedAnswers[prev] ?? null;

        setCurrentIndex(prev);
        setSelectedAnswer(savedAnswer);
        setHighlightedAnswer(savedAnswer);
        setLocked(false);
      }
    }
  };

  window.addEventListener('onPrevNav', handlePrevNav);
  return () => window.removeEventListener('onPrevNav', handlePrevNav);
}, [currentIndex, answersKey, isSummaryQuiz]);

  useEffect(() => {
    if (!isSummaryQuiz) return;
    window.dispatchEvent(
      new CustomEvent('setPrevBtnDisabled', { detail: currentIndex === 0 })
    );
  }, [currentIndex, isSummaryQuiz]);

const nextQuestion = () => {
  if (currentIndex < data.length - 1) {
    const next = currentIndex + 1;
    const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};

    if (!isSummaryQuiz) {
      // ✅ יחידות 1–4: מחק תשובה ישנה
      delete savedAnswers[next];
      sessionStorage.setItem(answersKey, JSON.stringify(savedAnswers));
      setSelectedAnswer(null);
      setHighlightedAnswer(null);
    } else {
      // ✅ יחידה 5: טוען תשובה שמורה אם קיימת
      const savedAnswer = savedAnswers[next] ?? null;
      setSelectedAnswer(savedAnswer);
      setHighlightedAnswer(savedAnswer);
    }

    setCurrentIndex(next);
    setLocked(false);
  } else {
      const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};

      let correctCount = 0;
      data.forEach((q, i) => {
        if (savedAnswers[i] === q.correctAnswer) {
          correctCount++;
        }
      });

      const finalScore = Math.round((correctCount / data.length) * 100);

      const unitKeys = {
        1: 'unitOne-questions',
        2: 'unitTwo-questions',
        3: 'unitThree-questions',
        4: 'unitFour-questions',
        5: 'unitFive-questions'
      };

      sessionStorage.setItem(unitKeys[unitNumber], 'finished');

      if (isSummaryQuiz) {
        onFinished(finalScore);
      }

      window.dispatchEvent(
        new CustomEvent('setNextBtnDisabled', { detail: false })
      );
    }
  };

  const handleAnswerClick = (index) => {
    if (locked) return;

    setSelectedAnswer(index);
    setHighlightedAnswer(index);

    const isCorrect = index === currentQuestion.correctAnswer;

    const savedAnswers = JSON.parse(sessionStorage.getItem(answersKey)) || {};
    savedAnswers[currentIndex] = index;
    sessionStorage.setItem(answersKey, JSON.stringify(savedAnswers));

    // =========================
    // 🟦 יחידות 1–4
    // =========================
    if (!isSummaryQuiz) {
      setLocked(true);

      if (isCorrect) {
        setTimeout(() => {
          setScore((prev) => prev + 1);
          nextQuestion();
        }, 1000);
      } else {
        setTimeout(() => {
          setHighlightedAnswer(null);
          setSelectedAnswer(null);
          setLocked(false);
        }, 1500);
      }
    }

    // =========================
    // 🟨 יחידה 5
    // =========================
    else {
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      window.dispatchEvent(
        new CustomEvent('setNextBtnDisabled', { detail: false })
      );
    }
  };

  return (
    <div className="quiz-engine-container">
      <main className="quiz-engine-main">

        <div className="question-counter">
          שאלה {currentIndex + 1} מתוך {data.length}
        </div>

        <h2 className="quiz-question-text">
          {currentQuestion.question}
        </h2>

        <div className="quiz-answers-list">
          {currentQuestion.answers.map((answer, index) => {
            let className = 'quiz-answer-button';

            if (!isSummaryQuiz && highlightedAnswer === index) {
              className +=
                index === currentQuestion.correctAnswer
                  ? ' correct-choice'
                  : ' wrong-choice';
            }

            if (isSummaryQuiz && highlightedAnswer === index) {
              className += ' selected-blue';
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswerClick(index)}
                disabled={locked && isSummaryQuiz}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {!isSummaryQuiz && highlightedAnswer !== null && (
          <div className="quiz-feedback-box">
            {highlightedAnswer === currentQuestion.correctAnswer ? (
              <p className="feedback-msg success">תשובה נכונה!</p>
            ) : (
              <p className="feedback-msg error">נסו שוב</p>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default QuizEngine;