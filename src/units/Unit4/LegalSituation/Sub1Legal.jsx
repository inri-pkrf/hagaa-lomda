import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Unit4/style/Sub1Legal.css';

function Sub1Legal() {
    const navigate = useNavigate();

    const [showAnimation, setShowAnimation] = useState(false);
    const [factClicked, setFactClicked] = useState(() => 
        sessionStorage.getItem("factClicked") === "finished"
    );
    const [legalClicked, setLegalClicked] = useState(() => 
        sessionStorage.getItem("legalClicked") === "finished"
    );

    // אנימציה פעם ראשונה
useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("unitFour-first-seen");
    if (!hasSeenAnimation) {
        setShowAnimation(true);
        sessionStorage.setItem('unitFour-first-seen', 'true'); // רק שראה
    }
}, []);

// ⭐ הסימון רק בלחיצת הבא
useEffect(() => {
    const bothClicked = factClicked && legalClicked;
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !bothClicked }));

    const handleNext = (e) => {
        if (bothClicked) {
            e.preventDefault();
            sessionStorage.setItem('unitFour-first', 'finished'); // ⭐ רק כאן
            window.dispatchEvent(new Event('updateNavbar'));
            navigate('/Sub2Legal');
        }
    };

    window.addEventListener('onNextNav', handleNext);
    return () => window.removeEventListener('onNextNav', handleNext);
}, [factClicked, legalClicked]);

    return (
        <div className='sub1-legal-container'>

            {showAnimation && <div className="zoom-bg"></div>}

            <div className={`sub1-legal-content ${showAnimation ? "with-anim" : "no-anim"}`}>

                <h2 id='sub1legal-headline'>
                    מצבי יסוד משפטיים משגרה לחירום/ באירוע חירום
                </h2>

                <p id='sub1legal-text1'>
                    בלחיצה על אחד מהשקים תוכלו ללמוד עוד על אחד מהמצבים:
                </p>

                {/* מצב עובדתי */}
                <p
                    id='sub1legal-scale1'
                    className={`scale-text ${factClicked ? "clicked" : ""}`}
                    onClick={() => {
                        sessionStorage.setItem("factClicked", "finished");
                        setFactClicked(true);
                        navigate('/FactState');
                    }}
                >
                    מצב עובדתי {factClicked && "✔"}
                </p>

                {/* מצב משפטי */}
                <p
                    id='sub1legal-scale2'
                    className={`scale-text ${legalClicked ? "clicked" : ""}`}
                    onClick={() => {
                        sessionStorage.setItem("legalClicked", "finished");
                        setLegalClicked(true);
                        navigate('/LegalState');
                    }}
                >
                    מצב משפטי {legalClicked && "✔"}
                </p>

                <img
                    src={`${process.env.PUBLIC_URL}/assets/UnitFourImgs/LegalSituation/scales.webp`}
                    className="final-normal-image"
                    alt="Final context"
                />
            </div>
        </div>
    );
}

export default Sub1Legal;