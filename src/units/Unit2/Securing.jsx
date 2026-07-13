import { React, useState, useEffect } from "react";
import "./style/HowPreper.css";


function Securing() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openedItems, setOpenedItems] = useState([]);


  const itemsData = [
    {
      id: 1,
      title: "חפצים כבדים",
      description: "הנחת חפצים כבדים במדפים נמוכים / על הרצפה",
      icon: "heavy-items-icon",
    },
    {
      id: 2,
      title: "ייצוב",
      description: "הצבת תמיכה יציבה למזגנים בלוני גז, מדחסים, אנטנות",
      icon: "gas-icon",
    },
    {
      id: 3,
      title: "חפצים שבירים",
      description: "אחסון חפצים שבירים בארונות סגורים",
      icon: "fragile-items-icon",
    },
    {
      id: 4,
      title: "עיגון",
      description: "קיבוע סככות, מרזבים",
      icon: "roof-icon",
    },
    {
      id: 5,
      title: "תמונות ומראות",
      description:
        "חיזוק תמונות ומראות לקירות בעזרת וַווים, והרחקתם ממקומות ישיבה",
      icon: "pictures-icon",
    },
    {
      id: 6,
      title: "חומרי הדברה",
      description:
        "מיקום חומרי הדברה וחומרים דליקים בארונות סגורים ובמדפים נמוכים",
      icon: "chemicals-icon",
    },
    {
      id: 7,
      title: "מדפים",
      description: "חיזוק מדפים לקירות משרדיים",
      icon: "shelves-icon",
    },
  ];


  // חסום כפתור קדימה בטעינה
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);


  // שחרר כשכל הפריטים נפתחו
  useEffect(() => {
    const allOpened = itemsData.every((item) => openedItems.includes(item.id));
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allOpened }),
    );
  }, [openedItems]);


  const handleOpenItem = (item) => {
    setSelectedItem(item);
    if (!openedItems.includes(item.id)) {
      setOpenedItems((prev) => [...prev, item.id]);
    }
  };


  const handleNextItem = () => {
    const unopenedItems = itemsData.filter(
      (item) => !openedItems.includes(item.id),
    );


    if (unopenedItems.length > 0) {
      const nextItem = unopenedItems[0];
      setSelectedItem(nextItem);
      setOpenedItems((prev) => [...prev, nextItem.id]);
    } else {
      setSelectedItem(null);
    }
  };


  const allItemsOpened = openedItems.length === itemsData.length;


  return (
    <div className="how-preper-page">
      <div className="header-container">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/icon-securing-objects.png"
          }
          alt="Securing"
          className="page-icon"
        />
        <h2 className="prep-title">קיבוע חפצים</h2>
      </div>


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
          באירוע רעידת אדמה נדרשות כמה פעולות היערכות. בעת לחיצה על האייקונים
          יתאפשר לגלות על אודותיהם.
        </h2>


        <div className="icons-grid">
          {itemsData.map((item) => (
            <div
              key={item.id}
              className="icon-wrapper"
              onClick={() => handleOpenItem(item)}
            >
              <img
                className="icon-securing"
                src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/${item.icon}.png`}
                alt={item.title}
              />
              {openedItems.includes(item.id) && (
                <div className="checkmark">✔</div>
              )}
            </div>
          ))}
        </div>
      </div>


      {selectedItem && (
        <div className="maintenance-popup-overlay">
          <div className="maintenance-popup-content maintenance-popup-content-securing custom-design">
            <button
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
                <h3>{selectedItem.title}</h3>
              </div>
              <p>{selectedItem.description}</p>
            </div>


            <div className="progress-section-custom">
              <div className="progress-bar-wrapper">
                <div
                  className="progress-bar-fill-custom"
                  style={{
                    width: `${(openedItems.length / itemsData.length) * 100}%`,
                  }}
                >
                  <span className="progress-number-tooltip">
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
                className="continue-btn-new continue-btn-new-securing"
                onClick={handleNextItem}
              >
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


export default Securing;



