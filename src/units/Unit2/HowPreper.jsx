import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/HowPreper.css";




function HowPreper() {
  const navigate = useNavigate();




  // שמירת מה נלחץ
  const [clickedItems, setClickedItems] = useState(() => {
    const saved = sessionStorage.getItem("clickedHowPreper");
    return saved ? JSON.parse(saved) : [];
  });




  const handleClick = (id) => {
    setClickedItems((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem("clickedHowPreper", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });




    navigate(`/${id}`);
  };




  useEffect(() => {
    const allClicked = prepItems.every((item) =>
      clickedItems.includes(item.id),
    );




    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );




    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [clickedItems]);




  // נתוני המגנטים על הלוח
  const prepItems = [
    {
      id: "reinforcement",
      title: "חיזוק המבנה",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-reinforcement.png",
      top: "15%",
      left: "20%",
    },
    {
      id: "Training",
      title: "הדרכת עובדים",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-training.png",
      top: "15%",
      left: "40%",
    },
    {
      id: "Tsunami",
      title: "במקרה של צונמי",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-tsunami.png",
      top: "15%",
      left: "60%",
    },
    {
      id: "securing",
      title: "קיבוע חפצים",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-securing-objects.png",
      top: "15%",
      left: "80%",
    },
    {
      id: "Risk",
      title: "ניתוח סיכונים במתקן",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-risk-assessment.png",
      top: "55%",
      left: "30%",
    },
    {
      id: "Escape",
      title: "הכנת תוכנית מילוט",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-escape-plan.png",
      top: "55%",
      left: "50%",
    },
    {
      id: "Emergency",
      title: "הכנת ציוד חירום",
      img:
        process.env.PUBLIC_URL +
        "/assets/UnitTwoImgs/earthquake/icon-emergency-kit.png",
      top: "55%",
      left: "70%",
    },
  ];




  return (
    <div className="how-preper-page">
      <div className="whiteboard-wrapper">
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/UnitTwoImgs/earthquake/whiteboard-bg.png"
          }
          alt="לוח למידה"
          className="whiteboard-image"
        />




        {prepItems.map((item) => {
          const isClicked = clickedItems.includes(item.id);




          return (
            <button
              key={item.id}
              className="magnet-button"
              onClick={() => handleClick(item.id)}
              style={{ top: item.top, left: item.left }}
            >
              <img src={item.img} alt={item.title} className="magnet-icon" />
              <span className="magnet-title">{item.title}</span>




              {/* ✔ אם נלחץ */}
              {isClicked && (
                <div className="completion-v">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}




export default HowPreper;













