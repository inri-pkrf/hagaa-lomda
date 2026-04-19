import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/SummaryCheckList.css';

function SummaryCheckList({ checklist = {}, onFinish, pinImg }) {
    const navigate = useNavigate();
    const location = useLocation();

    const image = pinImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Vector.png`;
    const items = checklist.items || [];

    const buildingImg = checklist.image || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Group 494.png`;
    const checklistImg = checklist.checklistImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`;

    const isSingleItem = items.length === 1;

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
    }, [navigate, location.pathname]);

    const handleFinishUnit = () => {
        if (onFinish) {
            onFinish();
            return;
        }

        const path = location.pathname;

        // ✅ סוף יחידה 1
        if (path === '/summary-checklist-unit1') {
            sessionStorage.setItem('unitOneStatus', 'completed');
            sessionStorage.setItem('currentUnit', 'UnitTwo');
            navigate('/elevator');
            return;
        }

        // ✅ תתי יחידה 2
        if (path.startsWith('/summary-checklist-unit2-sub')) {
            navigate('/rockets');
            return;
        }
    };

    return (
        <div className="OpeningPage">
            <div className="summary-row">

                {/* checklist */}
                <div className="checklist-wrapper">
                    <img
                        className="check-list"
                        src={checklistImg}
                        alt="checklist"
                    />

                    <div className="checklist-center-content">
                        {items.map((item, idx) => (
                            <div className="checklist-row" key={idx}>
                                <img
                                    className={`checklist-pin ${isSingleItem ? 'single' : ''}`}
                                    src={image}
                                    alt="pin"
                                />
                                <h2 className={`checklist-text ${isSingleItem ? 'single' : ''}`}>
                                    {item}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* building */}
                <img
                    className="end-building"
                    src={buildingImg}
                    alt="building"
                />

            </div>
        </div>
    );
}

export default SummaryCheckList;