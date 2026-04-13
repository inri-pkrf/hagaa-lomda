import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InterfacesGame.css";
import InterfencesData from "../../../Data/Unit1/InterfencesData.js";

function InterfacesGame() {
    sessionStorage.setItem("MainTitle", "ממשקים - תרגול");

    // טעינת מצב הסיום מהסשן - אם כבר סיים בעבר, שיתחיל במצב גמור
    const [isGameFinished, setIsGameFinished] = useState(
        sessionStorage.getItem('unitOne-third') === 'finished'
    );
    
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const navigate = useNavigate();

    const questions = [
        {
            question: "חסר ציוד ותפעול שוטף במפעל - למי יש לפנות?",
            correctId: 3,
            options: [3, 6, 2],
        },
        {
            question: "פרצה שריפה במחסן החומרים - מי הגוף האחראי?",
            correctId: 10,
            options: [1, 10, 9],
        },
        {
            question: "מי קובע את הנחיות המיגון לעובדים בזמן חירום?",
            correctId: 2,
            options: [8, 5, 2],
        },
    ];

    const activeQuestion = questions[currentStep];

    const handlePhoneClick = () => setIsChatOpen(true);

    // --- ניהול חצים חיצוניים (Navbar) ---
    useEffect(() => {
        // עדכון מצב הכפתור ב-Navbar - אם המשחק גמור, החץ פעיל
        window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isGameFinished }));
        window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));

        const handleNext = (e) => {
            if (isGameFinished) {
                // עצירת הניווט האוטומטי וניווט ידני למסדרון
                e.preventDefault();
                
                // הבטחה שהנתונים שמורים לפני היציאה
                sessionStorage.setItem("unitOne-third", "finished");
                sessionStorage.setItem(
                    'currentChapter',
                    JSON.stringify({ name: 'unitOne-third', state: 'finished' })
                );
                window.dispatchEvent(new Event("updateNavbar"));
                
                navigate("/intro-unit-one");
            } else {
                e.preventDefault();
            }
        };

        const handlePrev = (e) => {
            // חזרה רגילה לשולחן
        };

        window.addEventListener('onNextNav', handleNext);
        window.addEventListener('onPrevNav', handlePrev);

        return () => {
            window.removeEventListener('onNextNav', handleNext);
            window.removeEventListener('onPrevNav', handlePrev);
        };
    }, [isGameFinished, navigate]);

    const handleAnswerClick = (id) => {
        if (selectedAnswer !== null || isGameFinished) return;
        setSelectedAnswer(id);

        if (id === activeQuestion.correctId) {
            setTimeout(() => {
                if (currentStep < questions.length - 1) {
                    setCurrentStep((prev) => prev + 1);
                    setSelectedAnswer(null);
                } else {
                    // סיום המשחק בפעם הראשונה
                    setIsGameFinished(true);
                    sessionStorage.setItem("unitOne-third", "finished");
                    sessionStorage.setItem(
                        'currentChapter',
                        JSON.stringify({ name: 'unitOne-third', state: 'finished' })
                    );
                    window.dispatchEvent(new Event("updateNavbar"));
                    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
                }
            }, 1500);
        } else {
            setTimeout(() => setSelectedAnswer(null), 1000);
        }
    };

    return (
        <div className="game-container">
            {isGameFinished && (
                <div className="finish-instruction-overlay">
                    כל הכבוד! סיימת את התרגול. לחץ על חץ "הבא" כדי להמשיך.
                </div>
            )}

            {!isChatOpen && (
                <div className="subtext-threats-interfaces">
                    יש ללחוץ על הטלפון המצלצל
                </div>
            )}

            <img
                src={process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/office.png"}
                className="background-image"
                alt=""
                style={{ filter: isChatOpen ? "brightness(0.5)" : "none" }}
            />

            {!isChatOpen ? (
                <div className="phone-wrapper" onClick={handlePhoneClick}>
                    <img
                        src={process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/ringingPhone.png"}
                        className="ringing-phone"
                        alt=""
                    />
                </div>
            ) : (
                <div className="chat-overlay">
                    <div className="global-question-counter">
                        {isGameFinished 
                            ? "התרגול הושלם" 
                            : `שאלה ${currentStep + 1} מתוך ${questions.length}`}
                    </div>

                    <div className="phone-display-container">
                        <img
                            src={process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/Phone.png"}
                            className="phone-bg-img"
                            alt=""
                        />

                        <div className="phone-header-group">
                            <div className="phone-header-title">הודעה חדשה</div>
                            <img
                                src={process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/MessageIcon.png"}
                                className="status-bar-message-icon"
                                alt=""
                            />
                        </div>

                        <div className="chat-content-area">
                            <div className="question-bubble-wrapper">
                                <img
                                    src={process.env.PUBLIC_URL + "/assets/UnitOneImgs/Interfences/Message.png"}
                                    className="msg-bubble-img"
                                    alt=""
                                />
                                <div className="question-text-overlay">
                                    {isGameFinished ? "סיימת את כל השאלות בהצלחה!" : activeQuestion.question}
                                </div>
                            </div>

                            {!isGameFinished && (
                                <div className="options-vertical-list">
                                    {activeQuestion.options.map((id) => {
                                        const data = InterfencesData[id];
                                        const isCorrect = id === activeQuestion.correctId;
                                        const isSelected = selectedAnswer === id;

                                        return (
                                            <button
                                                key={id}
                                                className={`answer-option-btn ${isSelected ? (isCorrect ? "correct" : "wrong") : ""}`}
                                                onClick={() => handleAnswerClick(id)}
                                            >
                                                <span>{data.name}</span>
                                                <img src={data.image} alt={data.name} />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InterfacesGame;