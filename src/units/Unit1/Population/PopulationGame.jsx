import React, { useState, useEffect } from "react";
import "./PopulationGame.css";

const itemsData = [
  {
    id: 1,
    text: "שמירה על לכידות, תמיכה חברתית, מורל, תעסוקה, דאגה וטיפול בילדי העובדים ובאוכלוסיות עם מוגבלויות",
    correct: "social",
    summary: "על ידי בניית צוותים והכנת ציוד",
    icon: `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/iconGame1.png`,
  },
  {
    id: 2,
    text: "מידע שוטף, הכוונה והדרכה על דרכי התמודדות, איתור בני משפחה ודאגה לשלומם",
    correct: "info",
    summary: "על ידי הקמת מסגרות חינוכיות לטיפול בילדי העובדים",
    icon: `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/iconGame2.png`,
  },
  {
    id: 3,
    text: "חילוץ, הצלה, טיפול בנפגעים, צמצום נזקים, מרחב מוגן, ציוד בסיסי (כמו מזון ומים)",
    correct: "physical",
    summary: "על ידי הקמת צוות טיפול במשפחות העובדים וילדיהם",
    icon: `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/iconGame3.png`,
  },
];

const categories = [
  { key: "physical", label: "פיזיים קיומיים" },
  { key: "social", label: "חברתיים - פסיכולוגיים" },
  { key: "info", label: "מידע" },
];

export default function PopulationGame() {
  const [placed, setPlaced] = useState({});
  const [availableItems, setAvailableItems] = useState(itemsData);
  const [wrongMessage, setWrongMessage] = useState(false);
  const [wrongBox, setWrongBox] = useState(null);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("itemId", id);
  };

  const handleDrop = (e, category) => {
    const id = Number(e.dataTransfer.getData("itemId"));
    const item = itemsData.find((i) => i.id === id);
    if (!item) return;

    if (item.correct !== category) {
      setWrongMessage(true);
      setWrongBox(category);
      setTimeout(() => {
        setWrongMessage(false);
        setWrongBox(null);
      }, 1000);
      return;
    }

    setPlaced((prev) => ({ ...prev, [category]: id }));
    setAvailableItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isGameOver = placed.physical && placed.social && placed.info;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !isGameOver }),
    );
    if (isGameOver) sessionStorage.setItem("populationGameFinished", "true");
    sessionStorage.setItem("unitOne-fourth", "finished");
    sessionStorage.setItem(
      "currentChapter",
      JSON.stringify({ name: "unitOne-fourth", state: "finished" }),
    );
    window.dispatchEvent(new Event("updateNavbar"));
  }, [isGameOver]);

  return (
    <div className="gamePage">
      {wrongMessage && (
        <div className="wrong-popup-bottom">לא נכון - נסו שוב</div>
      )}

      <h1 className="gameTitle">
        בשעת חירום, כפי שלמדתם, לאוכלוסיית המפעל משתבשת שגרת החיים. באיזה אופן
        הדבר בא לידי ביטוי?
      </h1>
      <p className="gameSub">
        המשפטים להלן מתארים סוגי צרכים שונים. יש לגרור את התיאור אל ההגדרה
        המתאימה.
      </p>

      <div className="targets-wrapper">
        <div className="targets-body">
          {/* צד שמאל — summary תמיד, משפטים עד סיום */}
          <div className="drag-items-row">
            <h3 className="side-header">
              {!isGameOver ? "סוגי צרכים" : "איך עושים את זה?"}
            </h3>
            {!isGameOver
              ? availableItems.map((item) => (
                  <div
                    key={item.id}
                    className="drag-item-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                  >
                    {item.text}
                  </div>
                ))
              : itemsData.map((item, index) => (
                  <div
                    key={item.id}
                    className="summary-left-card"
                    style={{ animationDelay: `${index * 0.25}s` }}
                  >
                    <div className="summary-left-text">{item.summary}</div>
                    <div className="summary-left-icon">
                      <img src={item.icon} alt="" />
                    </div>
                  </div>
                ))}
          </div>

          {/* חצים — מוצגים רק אחרי סיום */}
          {isGameOver && (
            <div className="arrows-col">
              {itemsData.map((_, index) => (
                <div
                  key={index}
                  className="game-arrow"
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  ←
                </div>
              ))}
            </div>
          )}

          {/* צד ימין — קטגוריות */}
          <div className="categories-side">
            <h3 className="side-header">סוגי צרכים</h3>

            {categories.map((cat, index) => (
              <div className="category-group" key={cat.key}>
                <h3 className="category-label">{cat.label}</h3>

                <div
                  className={`target-box
                    ${placed[cat.key] ? "filled" : ""}
                    ${wrongBox === cat.key ? "wrong-flash" : ""}
                    ${isGameOver ? "game-over-box" : ""}
                  `}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => !isGameOver && handleDrop(e, cat.key)}
                >
                  {/* לפני סיום — טקסט שגורר */}
                  {!isGameOver && placed[cat.key] && (
                    <p>
                      {itemsData.find((i) => i.id === placed[cat.key]).text}
                    </p>
                  )}

                  {/* אחרי סיום — טקסט המשפט המקורי */}
                  {isGameOver && (
                    <div
                      className="summary-right-content"
                      style={{ animationDelay: `${index * 0.25}s` }}
                    >
                      <p>{itemsData.find((i) => i.correct === cat.key).text}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
