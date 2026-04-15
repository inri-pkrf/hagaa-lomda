import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/SummaryCheckList.css';


function SummaryCheckList() {
    const navigate = useNavigate();
    const image = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Vector.png`;

    // --- לוגיקת החצים הכלליים ---
    useEffect(() => {
        const handleNext = (e) => {
            // חטיפת החץ קדימה לביצוע סיום היחידה
            e.preventDefault();
            handleFinishUnit();
        };

        const handlePrev = (e) => {
            // חטיפת החץ אחורה לחזרה לשאלה האחרונה בשאלון
            e.preventDefault();
            navigate('/questions-end');
        };

        window.addEventListener('onNextNav', handleNext);
        window.addEventListener('onPrevNav', handlePrev);

        return () => {
            window.removeEventListener('onNextNav', handleNext);
            window.removeEventListener('onPrevNav', handlePrev);
        };
    }, [navigate]);
    // ---------------------------

    const handleFinishUnit = () => {
        // סימון יחידה 1 כמי שהושלמה במלואה
        sessionStorage.setItem('unitOneStatus', 'completed');
        sessionStorage.setItem('currentUnit', 'UnitTwo');
        // מעבר למעלית כדי לעלות ליחידה הבאה
        navigate('/elevator');
    };


    return (
        // מעטפת ראשית עם הרקע
        <div className="OpeningPage">
 
          
            <img
                className="check-list"
                src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`}
                alt="checklist"
            />
            
            <img
                className="end-building"
                src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Group 494.png`}
                alt="building"
            />
            
            {/* <div className="finish-unit-section">
                <p className="congrats-msg">כל הכבוד! סיימתם את היחידה הראשונה בהצלחה.</p>
                <button className="finish-btn" onClick={handleFinishUnit}>
                    למעלית - עולים ליחידה 2 🛗
                </button>
            </div> */}


            <div>
                <h2 className="checklist-text" id='checklist-text1'>למנות מנהל אחראי לצוות הכיבוי</h2>
                <h2 className="checklist-text" id='checklist-text2'>לסייע למנהל הצוות לסווג את כ”א ולהכשירו באמצעות כב”ה, לאמנו ולתרגול</h2>
                <h2 className="checklist-text" id='checklist-text3'>לדאוג לרכש ציודכיבוי במפעל על פי הגדרות התקן בחוק</h2>
                <h2 className="checklist-text" id='checklist-text4'>להדריך ולתרגל את העובדים במפעל בדבר התנהגות באירוע שריפה</h2>
            </div>


            <div>
                <img className='checklist-pin' id="checklist-pin1" src={image} alt="checklist pin" />
                <img className='checklist-pin' id="checklist-pin2" src={image} alt="checklist pin" />
                <img className='checklist-pin' id="checklist-pin3" src={image} alt="checklist pin" />
                <img className='checklist-pin' id="checklist-pin4" src={image} alt="checklist pin" />
            </div>
        </div>
    );
}


export default SummaryCheckList;