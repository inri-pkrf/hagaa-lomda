import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Interfaces.css';

function Interfaces() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    sessionStorage.setItem('unitOne-third', 'finished');
    sessionStorage.setItem(
      'currentChapter',
      JSON.stringify({ name: 'unitOne-third', state: 'finished' })
    );

    setCompleted(true);

    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 500);
  };

  return (
    <div className="interfaces-container">

      <h2 className="interfaces-title">
        במסגרת תפקידך, עליך לעבוד בשיתוף פעולה עם הגופים השונים. לחצו על הכרטיסיות שעל השולחן כדי ללמוד על הממשקים עם הגופים השונים:
      </h2>

      <div className="tringle t1">
        <p className="tringle-name">משולש 1</p>
      </div>

      <div className="tringle t2">
        <p className="tringle-name">משולש 2</p>
      </div>

      <div className="tringle t3">
        <p className="tringle-name">משולש 3</p>
      </div>

      <div className="tringle t4">
        <p className="tringle-name">משולש 4</p>
      </div>

      <div className="tringle t5">
        <p className="tringle-name">משולש 5</p>
      </div>

      <div className="tringle t6">
        <p className="tringle-name">משולש 6</p>
      </div>

      <div className="tringle t7">
        <p className="tringle-name">משולש 7</p>
      </div>

      <div className="tringle t8">
        <p className="tringle-name">משולש 8</p>
      </div>

      <div className="tringle t9">
        <p className="tringle-name">משולש 9</p>
      </div>

      {!completed && (
        <button className="complete-button" onClick={handleComplete}>
          סיים וחזור
        </button>
      )}

      {completed && (
        <p className="completed-text">
          הפרק הושלם! מעבר לדף הראשי...
        </p>
      )}

    </div>
  );
}

export default Interfaces;