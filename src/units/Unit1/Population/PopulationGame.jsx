import React, { useState } from "react";
import "./PopulationGame.css";
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

    if (item.correct === category) {
      setPlaced(prev => ({
        ...prev,
        [category]: id
      }));
      setAvailableItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const isGameOver = availableItems.length === 0;

  return (
    <div className="gamePage">
      <h1 className="gameTitle">
        בשעת חירום, כפי שלמדת, לאוכלוסיית המפעל משתבשת שגרת החיים.
        באיזה אופן הדבר בא לידי ביטוי?
      </h1>

      <p className="gameSub">
        המשפטים מטה מתארים סוגי צרכים שונים. יש לגרור את התיאור אל ההגדרה המתאימה.
      </p>

      <div className="game-container">
        {/* צד ימין - המטרות (נשאר קבוע) */}
        <div className="targets-wrapper">
          <div className="targets-header">סוגי צרכים</div>
          <div className="targets-body">
            <div className="category-group">
              <h3 className="category-label">פיזיים קיומיים</h3>
              <div className={`target-box ${placed.physical ? "filled" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "physical")}>
                {placed.physical && <p>{itemsData.find(i => i.id === placed.physical).text}</p>}
              </div>
            </div>

            <div className="category-group">
              <h3 className="category-label">חברתיים - פסיכולוגיים</h3>
              <div className={`target-box ${placed.social ? "filled" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "social")}>
                {placed.social && <p>{itemsData.find(i => i.id === placed.social).text}</p>}
              </div>
            </div>

            <div className="category-group">
              <h3 className="category-label">מידע</h3>
              <div className={`target-box ${placed.info ? "filled" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "info")}>
                {placed.info && <p>{itemsData.find(i => i.id === placed.info).text}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* צד שמאל - פריטים נגררים או סיכום סופי */}
        {/* צד שמאל - פריטים נגררים או סיכום סופי */}
        <div className={`items-column ${isGameOver ? "items-column-final" : ""}`}>
          {!isGameOver ? (
            availableItems.map(item => (
              <div key={item.id} className="drag-item-card" draggable
                onDragStart={(e) => handleDragStart(e, item.id)}>
                {item.text}
              </div>
            ))
          ) : (
            <div className="final-summary-list">
              {[
                { id: 1, img: "BlueIconPopulation.png" },
                { id: 2, img: "BlueIconPopulation2.png" },
                { id: 3, img: "BlueIconPopulation3.png" }
              ].map((item, index) => (
                <div key={item.id} className="summary-row-animate" style={{ animationDelay: `${index * 0.4}s` }}>
                  <span className="arrow-icon">➔</span>
                  <div className="summary-blue-card">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/${item.img}`}
                      alt=""
                      className="summary-icon"
                    />
                    <p>מתן מענה לצרכים אלו יסייע בשמירה על החוסן ובחזרה לשגרה</p>
                  </div>
                </div>
              ))}
              <button className="finish-game-btn" onClick={() => navigate("/population")}>
                סיום תרגול
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}