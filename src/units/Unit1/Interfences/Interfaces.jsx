import React, { useState, useEffect } from 'react';//סופר קריטי שתשימו פה את הUSEFFECT בהתחלה 
import { useNavigate } from 'react-router-dom';
import '../style/Interfaces.css';
import InterfencesData from '../../../Data/Unit1/InterfencesData.js';
import InterfacePopUp from './InterfacePopUp';


function Interfaces() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('interfacesVisited');
    if (saved) {
      setVisited(JSON.parse(saved));
    }
    sessionStorage.setItem('MainTitle', "ממשקים");
  }, []);//כשמשנים כותרת להכניס לUSEFFECT שזה יקרה עם טעינת העמוד

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

  const handleTriangleClick = (key, item) => {
    setSelectedItem(item);

    if (!visited.includes(key)) {
      const newVisited = [...visited, key];
      setVisited(newVisited);
      sessionStorage.setItem('interfacesVisited', JSON.stringify(newVisited));
    }
  };

  const handleClosePopUp = () => {
    setSelectedItem(null);
  };

  const totalItems = Object.keys(InterfencesData).length;

  return (
    <div className="interfaces-container">
      <h2 className="interfaces-title">
        במסגרת תפקידך, עליך לעבוד בשיתוף פעולה עם הגופים השונים. לחצו על הכרטיסיות שעל השולחן כדי ללמוד על הממשקים עם הגופים השונים:
      </h2>

      {Object.keys(InterfencesData).map((key) => {
        const item = InterfencesData[key];
        return (
          <div
            key={key}
            className={`tringle t${key} ${visited.includes(key) ? "visited" : ""}`}
            onClick={() => handleTriangleClick(key, item)}
          >
            <p className="tringle-name">{item.name}</p>
          </div>
        );
      })}
      {visited.length === totalItems && !completed && (
        <button className="complete-button-Interfaces" onClick={handleComplete}>
          סיים וחזור
        </button>
      )}

      {completed && (
        <p className="completed-text">
          הפרק הושלם! מעבר לדף הראשי...
        </p>
      )}

      {selectedItem && (
        <InterfacePopUp
          title={selectedItem.name}
          description={selectedItem.description}
          image={selectedItem.image}
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
}

export default Interfaces;

