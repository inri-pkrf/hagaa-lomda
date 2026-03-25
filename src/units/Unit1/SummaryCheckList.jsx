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
        <>
            <img
      className="check-list"
      src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`}
      alt="checklist"
    />
                <img
      className="end-building"
      src={`${process.env.PUBLIC_URL}/assets/General/OpeningUnitPage/unitTwoStartBuilding.png`}
      alt="building"
    />
        <div className="finish-unit-section">
         <p className="congrats-msg">כל הכבוד! סיימתם את היחידה הראשונה בהצלחה.</p>
        <button className="finish-btn" onClick={handleFinishUnit}>
             למעלית - עולים ליחידה 2 🛗
        </button>
    </div>


    <div>
            <h2 className="checklist-text" id='checklist-text1'>למנות מנהל אחראי לצוות הכיבוי</h2>
            <h2 className="checklist-text" id='checklist-text2'>לסייע למנהל הצוות לסווג את כ”א ולהכשירו באמצעות כב”ה, לאמנו ולתרגול</h2>
            <h2 className="checklist-text" id='checklist-text3'>לדאוג לרכש ציודכיבוי במפעל על פי הגדרות התקן בחוק</h2>
            <h2 className="checklist-text" id='checklist-text4'>להדריך ולתרגל את העובדים במפעל בדבר התנהגות באירוע שריפה</h2>
    </div>


        </>
    );
}


export default SummaryCheckList;

