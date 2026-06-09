import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { populationDataLaptop } from "../../../Data/Unit1/PopulationDataLaptop";
import "./PopulationLaptop.css";
import { ArrowLeft } from "lucide-react";

function PopulationLaptop() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [visited, setVisited] = useState([]);

  const [completed, setCompleted] = useState(() => {
    const saved = sessionStorage.getItem("populationLaptopCompletedCards");
    return saved ? JSON.parse(saved) : [];
  });

  // חסום Next בטעינה ראשונית אם לא הושלם
  useEffect(() => {
    const isFinished = completed.length === populationDataLaptop.length;
    if (!isFinished) {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: true }),
      );
    }
  }, []);

  const handleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
    if (!visited.includes(index)) {
      setVisited([...visited, index]);
    }
  };

  const handleCardClick = (item) => {
    setCurrent(item);
    setOpenIndex(null);
    setVisited([]);

    if (!completed.includes(item.id)) {
      const newCompleted = [...completed, item.id];
      setCompleted(newCompleted);
      sessionStorage.setItem(
        "populationLaptopCompletedCards",
        JSON.stringify(newCompleted),
      );
    }
  };

  const handleBackToLaptop = () => {
    const isFinished = completed.length === populationDataLaptop.length;

    if (isFinished) {
      sessionStorage.setItem("populationLaptopFinished", "true");
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    }

    setCurrent(null);
  };

  useEffect(() => {
    const blockNav = (e) => {
      if (completed.length === populationDataLaptop.length) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const handlePrev = (e) => {
      e.preventDefault();
      navigate("/population");
    };

    window.addEventListener("onNextNav", blockNav);
    window.addEventListener("onPrevNav", handlePrev);

    return () => {
      window.removeEventListener("onNextNav", blockNav);
      window.removeEventListener("onPrevNav", handlePrev);
    };
  }, [navigate, completed]);

  return (
    <div className="populationLaptop-container">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/populationComp.webp`}
        className="populationLaptop-background visible"
        alt="laptop-background"
      />
      <div className="title-ET-population-computer">
        בחירום אנו עלולים להיתקל בהתנהגויות ובתגובות שונות של בני האדם למצבי
        חירום, הנובעות מתחושת האיום, שיבוש שגרת החיים, הנזקים הנראים ועוד.
      </div>
      {!current && (
        <div id="copmuter-instruction" className="subtitles">
          יש ללחוץ על כל אחת מהכרטיסיות בכדי לחשוף את המידע
        </div>
      )}
      {!current && (
        <div className="cards-container">
          {populationDataLaptop.map((item) => (
            <div
              key={item.id}
              className={`card ${completed.includes(item.id) ? "completed" : ""}`}
              onClick={() => handleCardClick(item)}
            >
              {completed.includes(item.id) && (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Interfences/doneSign.png`}
                  alt="completed"
                  className="completed done-img-population"
                />
              )}
              <h3>{item.title}</h3>
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/populotion${item.id}.png`}
                className="card-main-img"
                alt=""
              />
            </div>
          ))}
        </div>
      )}

{current && (
  <>
    <div className="content-screen">

      <div className="header-with-image">
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/populotion${current.id}.png`}
          className="header-main-img"
          alt=""
        />
        <h2>{current.title}</h2>
      </div>

      {/* ⭐ הוראה חדשה של הטאב */}
      <div className="tab-instruction">
        יש ללחוץ על הסעיפים כדי לחשוף מידע
      </div>

            {current.type === "accordion" && (
              <div className="accordion-container">
                {current.content.map((item, i) => (
                  <div
                    key={i}
                    className={`accordion-item ${openIndex === i ? "active" : ""}`}
                  >
                    <div
                      className="accordion-header"
                      onClick={() => handleAccordion(i)}
                    >
                      <span className="accordion-title">{item.title}</span>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/arrow.png`}
                        className="accordion-icon"
                        alt="arrow"
                      />
                    </div>
                    {openIndex === i && (
                      <div className="accordion-content">
                        <p>{item.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {current.footerNote && (
              <div className="special-footer-note">
                <p>{current.footerNote}</p>
              </div>
            )}
          </div>

          {(current.type === "text" ||
            visited.length === (current.content?.length || 0)) && (
            <button className="back-btn" onClick={handleBackToLaptop}>
              <ArrowLeft style={{ width: "2vw", height: "2vw" }} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PopulationLaptop;
