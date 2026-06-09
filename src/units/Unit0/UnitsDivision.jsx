import React, { useEffect } from "react";
import "./Styles/UnitsDivision.css";

function UnitsDivision() {
  const units = [
    {
      id: 1,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit1-img.jpg`,
      text: "יחידה 1 - מבוא",
      dropdown: {
        title: 'רקע לתפקיד ממונה הג"א',
        items: ["היערכות לאיומים", "מצבי תפקוד", "ממשקים", "אוכלוסייה"],
      },
    },
    {
      id: 2,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit2-img.jpg`,
      text: "יחידה 2 - שגרה",
      dropdown: {
        title: "איומים על העורף",
        items: ["ירי טילים", `רעידת אדמה וצונמי`, `חומרים מסוכנים`, `שריפה`],
      },
    },
    {
      id: 3,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit3-img.jpg`,
      text: "יחידה 3 - שגרה",
      dropdown: {
        title: "משימות משלימות בשגרה",
        items: [
          "צוותי חירום",
          "מסגרות חינוכיות לילדי העובדים החיוניים",
          "משאבים",
          "מגויסי חוץ",
          "תיק מפעל",
        ],
      },
    },
    {
      id: 4,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit4-img.jpg`,
      text: "יחידה 4 - חירום",
      dropdown: {
        title: `תפקיד במעמ"ל ובאירוע חירום`,
        items: ["מצבים משפטיים", "מעבר משגרה לחירום", "אירוע חירום"],
      },
    },
  ];

  // כפתור קדימה תמיד פעיל בעמוד זה
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: false }),
    );
  }, []);

  return (
    <div className="UnitsDivision">
      <div className="unit-imgs-div">
        {units.map((unit) => (
          <div key={unit.id} className="unit-item">
            <div className="unit-img">
              <img src={unit.img} alt="" />
              <div className="unit-overlay-text">{unit.text}</div>
            </div>

            {/* תמיד מוצג */}
            <div className="unit-dropdown">
              <h3 id="unit-title">{unit.dropdown.title}</h3>
              <ul className="unit-list">
                {unit.dropdown.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnitsDivision;
