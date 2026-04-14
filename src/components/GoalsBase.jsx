import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Goals.css';

function GoalsBase({ unitKey, data }) {
    const navigate = useNavigate();
    const [visibleGoals, setVisibleGoals] = useState([]);

    // Hook 1: עדכון כותרת ה-Header והסיידבר בכניסה
    useEffect(() => {
        if (data) {
            sessionStorage.setItem('MainTitle', data.title);
            window.dispatchEvent(new Event('updateNavbar'));
        }
    }, [data]);

    // Hook 2: אנימציה של המטרות
    useEffect(() => {
        if (data?.goals) {
            setVisibleGoals([]);
            data.goals.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleGoals(prev => [...prev, index]);
                }, 300 + (index * 500));
            });
        }
    }, [data]);

    // Hook 3: האזנה לחצים הכלליים
    useEffect(() => {
        const handleNext = (e) => {
            e.preventDefault();
            // עדכון התקדמות דינמי (למשל: unitone-goals)
            sessionStorage.setItem(`${unitKey.toLowerCase()}-goals`, 'finished');
            window.dispatchEvent(new Event('updateNavbar'));

            if (data?.navigateTo) {
                navigate(data.navigateTo);
            }
        };

        window.addEventListener('onNextNav', handleNext);
        return () => window.removeEventListener('onNextNav', handleNext);
    }, [data, navigate, unitKey]);

    // החזרת null רק אחרי שכל ה-Hooks הוגדרו
    if (!data) return null;

    // הגנה על צבעים (לוקח מהדאטה או משתמש בברירת מחדל)
    const colors = data.colors || { main: '#3FC6F3', layer1: '#cfe7f3', layer2: '#a3c6df', text: '#000' };

    return (
        <div className="Goals" style={{
            '--main-color': colors.main,
            '--layer1-color': colors.layer1,
            '--layer2-color': colors.layer2,
            '--text-color': colors.text
        }}>
            <p className="goals-subtitle">{data.subtitle}</p>

            <div className="goals-list">
                {data.goals.map((goal, index) => (
                    <div
                        key={index}
                        className={`goal-item ${index >= 3 ? 'second-row' : 'first-row'} ${visibleGoals.includes(index) ? 'visible' : ''}`}
                    >
                        <div className="goal-cloud" style={{ borderColor: colors.main }} />
                        <span className="goal-text">{goal}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GoalsBase;