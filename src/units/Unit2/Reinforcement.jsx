import { React, useState, useEffect } from "react";
import "./style/HowPreper.css";

function Reinforcement() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openedItems, setOpenedItems] = useState([]);

  // חסום כפתור קדימה בטעינה
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  // שחרר כשכל הפריטים נפתחו
  useEffect(() => {
    const allOpened = itemsData.every((item) => openedItems.includes(item.id));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !allOpened }));
  }, [openedItems]);


  const itemsData = [
    {
      id: 1,
      title: "חשמל וגז",
      description:
        "מומלץ לבדוק עם מהנדס מבנים בעל הכשרה מתאימה אם הבניין עונה לדרישות התקן הישראלי לעמידות במבנים ברעידת אדמה (ולתקן הרלוונטי למתקן ולתשתית הקיימת בו - שאינם מבנים סטנדרטיים – מכלים, צינורות, תחנות שונות וכדומה). אם לא – לפעול לחיזוק בהקדם האפשרי.",
      icon: "check-icon",
    },
    {
      id: 2,
      title: "חומרים מסוכנים",
      description: "מיגון מיכלים עם חומרים מסוכנים, תשתיות חשמל וגז",
      icon: "hazmat-icon-red",
    },
    {
      id: 3,
      title: "צנרת",
      description: "התקנת צינורות גז ומים גמישים העמידים יותר בפני שבירה",
      icon: "pipes-icon-red",
    },
    {
      id: 4,
      title: "חשמל וגז",
      description:
        "תיקון וחיזוק חיווטי חשמל וחיבורי גז המהווים מקור סיכון לשריפות",
      icon: "electrical-gas-icon-red",
    },
  ];


  const handleOpenItem = (item) => {
    setSelectedItem(item);
    if (!openedItems.includes(item.id)) {
      setOpenedItems((prev) => [...prev, item.id]);
    }
  };


  const handleNextItem = () => {
    // מוצאים את כל הפריטים שעדיין לא נפתחו
    const unopenedItems = itemsData.filter(
      (item) => !openedItems.includes(item.id),
    );


    if (unopenedItems.length > 0) {
      // אם יש כאלו, עוברים לראשון מביניהם (לא משנה איפה הוא במערך)
      const nextItem = unopenedItems[0];
      setSelectedItem(nextItem);


      // מוסיפים אותו לרשימת הפתוחים
      setOpenedItems((prev) => [...prev, nextItem.id]);
    } else {
      // אם כולם נפתחו, סוגרים את הפופאפ
      setSelectedItem(null);
    }
  };


  return (
    <div className="how-preper-page">
      {/* כותרת הדף והאייקון */}
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-reinforcement.png"
          }
          alt="Reinforcement"
          className="page-icon"
        />


        <h2 className="prep-title">חיזוק המבנה</h2>
      </div>


      {/* הלוח */}
      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח למידה"
          className="whiteboard-image bottom"
        />


        <h2 className="grid-instruction-title">
          באירוע רעידת אדמה נדרשות מספר פעולות היערכות. בעת לחיצה על האייקונים
          יתאפשר לגלות אודותיהם.
        </h2>


        <div className="icons-grid-red icons-grid">
          {itemsData.map((item) => (
            <div
              key={item.id}
              className="icon-wrapper-red icon-wrapper"
              onClick={() => handleOpenItem(item)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/${item.icon}.png`}
                alt={item.title}
              />


              {/* וי אחרי פתיחה */}
              {openedItems.includes(item.id) && (
                <div className="checkmark">✔</div>
              )}
            </div>
          ))}
        </div>
      </div>


      {selectedItem && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content maintenance-popup-content-securing custom-design maintenance-popup-content-securing-red">
            <button
              id="red-x"
              className="popup-close-x-securing"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>
            <div className="popup-text-container">
              <div className="popup-header-securing popup-header-row-securing">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/${selectedItem.icon}.png`}
                  alt={selectedItem.title}
                  className="popup-icon-securing"
                />
              </div>


              <p>{selectedItem.description}</p>
            </div>


            <div className="progress-section-custom">
              <div className="progress-bar-wrapper">
                <div
                  id="red-progress-bar"
                  className="progress-bar-fill-custom"
                  style={{
                    width: `${(openedItems.length / itemsData.length) * 100}%`,
                  }}
                >
                  {/* בועית קטנה עם המספר שזזה יחד עם הפס (אופציונלי) */}
                  <span
                    id="red-progress-number"
                    className="progress-number-tooltip"
                  >
                    {openedItems.length}
                  </span>
                </div>
              </div>
              <div className="progress-label-custom">
                מתוך {itemsData.length} פעולות
              </div>
            </div>


            <div className="popup-footer">
              <button
                className="continue-btn-new continue-btn-new-securing continue-btn-new-securing-red"
                onClick={handleNextItem}
              >
                {/* אם זה הפריט האחרון שנותר לפתוח, נכתוב "סיום" */}
                {openedItems.length === itemsData.length
                  ? "סיום"
                  : "לפעולה הבאה"}
              </button>


              <div className="bottom-icon-circle"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Reinforcement;



