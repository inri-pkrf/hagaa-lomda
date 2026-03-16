import React, { useState } from "react";
import "../style/PopulationGame.css";
import { useNavigate } from 'react-router-dom';


const itemsData = [
  {
    id: 1,
    text: "לכידות, תמיכה חברתית, הפגה, מורל, תעסוקה",
    correct: "social"
  },
  {
    id: 2,
    text: "מידע שוטף, הכוונה והדרכה על דרכי התמודדות, איתור בני משפחה ודאגה לשלומם",
    correct: "info"
  },
  {
    id: 3,
    text: "חילוץ, הצלה, טיפול בנפגעים, צמצום נזקים, מרחב מוגן, ציוד בסיסי (מזון, מים)",
    correct: "physical"
  }
];


export default function PopulationGame() {
  const navigate = useNavigate();


  const [placed, setPlaced] = useState({});
  const [availableItems, setAvailableItems] = useState(itemsData);


  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("itemId", id);
  };


  const handleDrop = (e, category) => {


    const id = Number(e.dataTransfer.getData("itemId"));
    const item = itemsData.find(i => i.id === id);


    // בדיקה אם נכון
    if (item.correct === category) {


      setPlaced(prev => ({
        ...prev,
        [category]: id
      }));


      // הסרה מהצד השמאלי
      setAvailableItems(prev =>
        prev.filter(i => i.id !== id)
      );


    }
  };


  return (
    <div className="gamePage">


      <h1 className="gameTitle">
        בשעת חירום, כפי שלמדת, לאוכלוסיית המפעל משתבשת שגרת החיים.
        באיזה אופן הדבר בא לידי ביטוי?
      </h1>


      <p className="gameSub">
        המשפטים מטה מתארים סוגי צרכים שונים. יש לגרור את התיאור
        אל ההגדרה המתאימה.
      </p>


      <div className="game-container">


        {/* צד ימין */}
        <div className="targetsWrapper">


          <div className="targetsHeader">
            סוגי צרכים
          </div>


          <div className="targetsBody">


            <div
              className="target"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "physical")}
            >
              <h3>פיזיים קיומיים</h3>


              {placed.physical && (
                <p>{itemsData.find(i => i.id === placed.physical).text}</p>
              )}


            </div>


            <div
              className="target"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "social")}
            >
              <h3>חברתיים - פסיכולוגיים</h3>


              {placed.social && (
                <p>{itemsData.find(i => i.id === placed.social).text}</p>
              )}


            </div>


            <div
              className="target"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "info")}
            >
              <h3>מידע</h3>


              {placed.info && (
                <p>{itemsData.find(i => i.id === placed.info).text}</p>
              )}


            </div>


          </div>
        </div>


        {/* צד שמאל */}
        <div className="items">


          {availableItems.map(item => (
            <div
              key={item.id}
              className="draggable"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.text}
            </div>
          ))}


        </div>


      </div>
      {availableItems.length === 0 && (
        <button
          className="gameButton"
          onClick={() => {
            sessionStorage.setItem("currentUnit", "UnitTwo");
            navigate("/elevator");
          }}
        >
          ליחידה הבאה
        </button>
      )}
    </div>
  );
}

