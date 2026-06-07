import React from "react";
import "../../Unit2/style/Chemical.css";


const chemicalCauses = [
  { id: 1, title: "שריפה", icon: "fire", type: "routine" },
  { id: 2, title: "תקלות", icon: "problems", type: "routine" },
  { id: 3, title: "טעויות אנוש", icon: "mistakes", type: "routine" },
  {
    id: 4,
    title: "פגיעת טילים/ רקטות",
    icon: "emergencyAct",
    type: "emergency",
  },
  { id: 5, title: "פעילות חבלנית", icon: "emergencyAct2", type: "emergency" },
  { id: 6, title: "רעידת אדמה/ צונמי", icon: "earthquake", type: "emergency" },
];


function CausesChemical() {
  const renderCards = (type) => (
    <div className="chemical-cards-grid">
      {chemicalCauses
        .filter((c) => c.type === type)
        .map((item) => (
          <div key={item.id} className={`chemical-card-item chemical-${type}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/causes/${item.icon}.png`}
              alt={item.title}
            />
            <p>{item.title}</p>
          </div>
        ))}
    </div>
  );


  return (
    <div className="chemical-page-wrapper">
      <div className="video-text-container chemical-text-container">
        <h1 className="chemical-causes-title">גורמים</h1>
        <h2 className="chemical-subtitle">
          אירוע חומרים מסוכנים הוא דליפה של חומר מסוכן משטח המפעל למרחב. גורמי
          אירוע חומרים מסוכנים:{" "}
        </h2>
      </div>
      <div className="chemical-section-row">
        <div className="chemical-arrow-box">
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/causes/routine.png`}
            alt="routine"
          />
          <span className="chemical-arrow-text">בשגרה</span>
        </div>
        {renderCards("routine")}
      </div>


      <div className="chemical-section-row">
        <div className="chemical-arrow-box">
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/causes/emergency.png`}
            alt="emergency"
          />
          <span className="chemical-arrow-text">בחירום</span>
        </div>
        {renderCards("emergency")}
      </div>
    </div>
  );
}


export default CausesChemical;



