import React, { useState, useEffect } from 'react';
import './QuizEmergencyTeams.css';

function QuizEmergencyTeams() {
    const correctAnswerId = 2;

    const [isSolved, setIsSolved] = useState(() => {
        return sessionStorage.getItem('quiz_et_solved') === 'true';
    });
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // חסום כפתור קדימה בטעינה אם לא נפתר
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isSolved }));
        return () => {
            window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
        };
    }, [isSolved]);

    const handleAnswerClick = (id) => {
        if (isSolved) return;

        setSelectedAnswer(id);

        if (id === correctAnswerId) {
            setIsSolved(true);
            sessionStorage.setItem('quiz_et_solved', 'true');
        }
    };

    const getAnswerClass = (id) => {
        if (isSolved && id === correctAnswerId) return 'correct';
        if (selectedAnswer === id) {
            return id === correctAnswerId ? 'correct' : 'wrong';
        }
        return '';
    };

    return (
        <div className='quiz-container'>
            <div className='quiz-header'>
                <div className='title-quize-et'>שאלת סיכום</div>
                <div className='quiz-titles-wrapper'>
                    <div className='subText-ET-quize1'>יש לקרוא את השאלה שלפניך, ולבחור בתשובה הנכונה ביותר:</div>
                    <div className='subText-ET-quize2'>משימתם המרכזית של צוות חילוץ וכיבוי בזמן חירום היא...</div>
                </div>
            </div>

            <img src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/צוות-חירום-כללי.webp`} alt="EmergencyTeams" id='EmergencyTeams-img-quize' />

            <div className='answers-container'>
                {[
                    { id: 1, text: "לחלק את נטל המשימות בין כמה אנשים כדי לשלוט באירוע" },
                    { id: 2, text: "לתת מענה מיידי עד להגעת כוחות מ\"י, כב\"ה, מד\"א ופקע\"ר בחירום" },
                    { id: 3, text: "להקים מסגרת חינוכית לילדי העובדים" },
                    { id: 4, text: "לאפשר רציפות תפקודית ויכולת המשכיות" }
                ].map((answer) => (
                    <div
                        key={answer.id}
                        className={`item-quize ${getAnswerClass(answer.id)} ${isSolved ? 'disabled' : ''}`}
                        onClick={() => handleAnswerClick(answer.id)}
                    >
                        <div className='icon-wrapper-et'>
                            <img src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/EmergencyTeams/quize-et.png`} alt="Icon" className='quize-et' />
                        </div>
                        <span className='answer-text'>{answer.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default QuizEmergencyTeams;