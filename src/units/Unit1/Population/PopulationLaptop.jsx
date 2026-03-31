import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { populationDataLaptop } from '../../../Data/Unit1/PopulationDataLaptop';
import './PopulationLaptop.css';


function PopulationLaptop() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [visited, setVisited] = useState([]);
  const [completed, setCompleted] = useState([]);


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
      setCompleted([...completed, item.id]);
    }
  };


  const handleBackToLaptop = () => {
    if (completed.length === populationDataLaptop.length) {
      sessionStorage.setItem("populationLaptopFinished", "true");
      navigate('/population');
    } else {
      setCurrent(null);
    }
  };


  return (
    <div className="populationLaptop-container">


      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/populationComp.png`}
        className="populationLaptop-background visible"
        alt="laptop-background"
      />


      {!current && (
        <div className="cards-container">
          {populationDataLaptop.map(item => (
            <div key={item.id} className="card" onClick={() => handleCardClick(item)}>
              {completed.includes(item.id) && (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`}
                  className="completed-overlay-img-population"
                  alt="completed"
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

            {current.type === "text" && <p className="normal-text">{current.content}</p>}

            {current.type === "accordion" && (
              <div className="accordion-container">
                {current.content.map((item, i) => (
                  <div key={i} className={`accordion-item ${openIndex === i ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => handleAccordion(i)}>
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

          {(current.type === "text" || visited.length === (current.content?.length || 0)) && (
            <button className="back-btn side-btn" onClick={handleBackToLaptop}>
              {completed.length === populationDataLaptop.length ? "סיום ויציאה" : "חזרה למחשב"}
            </button>
          )}
        </>
      )}
    </div>
  );
}


export default PopulationLaptop;



