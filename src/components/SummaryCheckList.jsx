import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/SummaryCheckList.css';



function SummaryCheckList({ checklist = [], onFinish, checklistImg, buildingImg, pinImg }) {
    const navigate = useNavigate();
    const image = pinImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Vector.png`;

    // --- לוגיקת החצים הכלליים ---
    useEffect(() => {
        const handleNext = (e) => {
            e.preventDefault();
            handleFinishUnit();
        };
        const handlePrev = (e) => {
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

    const handleFinishUnit = () => {
        if (onFinish) {
            onFinish();
        } else {
            // סימון היחידה הנוכחית כהושלמה (לפי currentUnit)
            const currentUnit = sessionStorage.getItem('currentUnit');
            if (currentUnit === 'UnitOne') {
                sessionStorage.setItem('unitOneStatus', 'completed');
                sessionStorage.setItem('currentUnit', 'UnitTwo');
            } else if (currentUnit === 'UnitTwo') {
                sessionStorage.setItem('unitTwoStatus', 'completed');
                sessionStorage.setItem('currentUnit', 'UnitThree');
            } else if (currentUnit === 'UnitThree') {
                sessionStorage.setItem('unitThreeStatus', 'completed');
                sessionStorage.setItem('currentUnit', 'UnitFour');
            } else if (currentUnit === 'UnitFour') {
                sessionStorage.setItem('unitFourStatus', 'completed');
            }
            // מעבר למעלית
            navigate('/elevator');
        }
    };

    return (
        <div className="OpeningPage">
            <img
                className="check-list"
                src={checklistImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`}
                alt="checklist"
            />
            <img
                className="end-building"
                src={buildingImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Group 494.png`}
                alt="building"
            />
            <div>
                {checklist.map((item, idx) => (
                    <h2 className="checklist-text" id={`checklist-text${idx+1}`} key={idx}>{item}</h2>
                ))}
            </div>
            <div>
                {checklist.map((_, idx) => (
                    <img className='checklist-pin' id={`checklist-pin${idx+1}`} src={image} alt="checklist pin" key={idx} />
                ))}
            </div>
        </div>
    );
}


export default SummaryCheckList;