import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/SummaryCheckList.css';


function SummaryCheckList() {
    const navigate = useNavigate();
    
    // רשימת הנושאים שהמשתמש למד ביחידה 1
    const [tasks, setTasks] = useState([
        { id: 1, text: "היערכות לאיומים השונים", completed: false },
        { id: 2, text: "מצבי תפקוד בשגרה ובחירום", completed: false },
        { id: 3, text: "ממשקים עם גורמי חוץ ופנים", completed: false },
        { id: 4, text: "מענה לאוכלוסיית המפעל", completed: false }
    ]);

    useEffect(() => {
        sessionStorage.setItem('MainTitle', "סיכום יחידה 1");
    }, []);

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const allDone = tasks.every(task => task.completed);

    const handleFinishUnit = () => {
        // סימון יחידה 1 כמי שהושלמה במלואה
        sessionStorage.setItem('unitOneStatus', 'completed');
        sessionStorage.setItem('currentUnit', 'UnitTwo');
        // מעבר למעלית כדי לעלות ליחידה הבאה
        navigate('/elevator');
    };

    return (
        <div className="summary-checklist-container">
            <div className="checklist-card">
                <h2 className="checklist-title">סיכום והשלמת יחידה 1</h2>
                <p className="checklist-subtitle">לפני שנמשיך ליחידה הבאה, ודאו שעברתם על כל הנושאים:</p>
                
                <div className="tasks-list">
                    {tasks.map(task => (
                        <div 
                            key={task.id} 
                            className={`task-item ${task.completed ? 'task-done' : ''}`}
                            onClick={() => toggleTask(task.id)}
                        >
                            <div className="checkbox">
                                {task.completed && <span className="checkmark">✔</span>}
                            </div>
                            <span className="task-text">{task.text}</span>
                        </div>
                    ))}
                </div>

                {allDone && (
                    <div className="finish-unit-section">
                        <p className="congrats-msg">כל הכבוד! סיימתם את היחידה הראשונה בהצלחה.</p>
                        <button className="finish-btn" onClick={handleFinishUnit}>
                            למעלית - עולים ליחידה 2 🛗
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SummaryCheckList;