import React, { useState, useEffect } from "react";
import "./PopulationGame.css";
import { useNavigate } from 'react-router-dom';

const itemsData = [
  { id: 1, text: "לכידות, תמיכה חברתית, הפגה, מורל, תעסוקה", correct: "social" },
  { id: 2, text: "מידע שוטף, הכוונה והדרכה על דרכי התמודדות, איתור בני משפחה ודאגה לשלומם", correct: "info" },
  { id: 3, text: "חילוץ, הצלה, טיפול בנפגעים, צמצום נזקים, מרחב מוגן, ציוד בסיסי (מזון, מים)", correct: "physical" }
];

export default function PopulationGame() {
  const navigate = useNavigate();

  // טעינת מצב המשחק מה-sessionStorage
  const [placed, setPlaced] = useState(() => {
    const saved = sessionStorage.getItem("populationGamePlaced");
    return saved ? JSON.parse(saved) : {};
  });

  const [availableItems, setAvailableItems] = useState(() => {
    const saved = sessionStorage.getItem("populationGameAvailable");
    return saved ? JSON.parse(saved) : itemsData;
  });

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("itemId", id);
  };

  const handleDrop = (e, category) => {
    const id = Number(e.dataTransfer.getData("itemId"));
    const item = itemsData.find(i => i.id === id);
    
    if (item.correct === category) {
      const newPlaced = { ...placed, [category]: id };
      const newAvailable = availableItems.filter(i => i.id !== id);

      setPlaced(newPlaced);
      setAvailableItems(newAvailable);

      // שמירת ההתקדמות בסטורג'
      sessionStorage.setItem("populationGamePlaced", JSON.stringify(newPlaced));
      sessionStorage.setItem("populationGameAvailable", JSON.stringify(newAvailable));
    }
  };

  const isGameOver = availableItems.length === 0;

  useEffect(() => {
    // הפעלת חץ קדימה רק כאשר המשחק נגמר, חץ אחורה תמיד פעיל
    window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isGameOver }));
    if (isGameOver) {
      sessionStorage.setItem("populationGameFinished", "true");
    }
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
      window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));
    };
  }, [isGameOver]);

  return (
    <div className="gamePage">
      <button className="back-to-office-btn" onClick={() => navigate('/population')}>
        חזרה למשרד 🏠
      </button>
      
      <h1 className="gameTitle">
        בשעת חירום, כפי שלמדת, לאוכלוסיית המפעל משתבשת שגרת החיים.
        באיזה אופן הדבר בא לידי ביטוי?
      </h1>

      <p className="gameSub">
        המשפטים מטה מתארים סוגי צרכים שונים. יש לגרור את התיאור אל ההגדרה המתאימה.
      </p>

      <div className="game-containe-population">
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
                { id: 1, img: "BlueIconPopulation3.png" },
                { id: 2, img: "BlueIconPopulation.png" },
                { id: 3, img: "BlueIconPopulation2.png" }
              ].map((item, index) => (
                <div key={item.id} className="summary-row-wrapper">
                  <div className="summary-row-animate" style={{ animationDelay: `${index * 0.4}s` }}>
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
                </div>
              ))}
              {/* אין כפתור סיום - החץ קדימה יופעל אוטומטית */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}