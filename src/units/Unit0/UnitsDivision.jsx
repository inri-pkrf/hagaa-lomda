import React, { useState, useEffect } from "react";
import "./Styles/UnitsDivision.css";
import { useNavigate } from "react-router-dom";


function UnitsDivision() {
  const units = [
    {
      id: 1,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit1-img.jpg`,
      text: "יחידה 1 - מבוא",
      dropdown: {
        title: 'רקע לתפקיד ממונה הג"א',
        items: [
          "תשתית נורמטיבית",
          "האיומים על העורף",
          "מצבי התפקוד השונים",
          "התנהגות אוכלוסייה",
        ],
      },
    },
    {
      id: 2,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit2-img.jpg`,
      text: "יחידה 2 - שגרה",
      dropdown: {
        title: "איומים על העורף",
        items: [
          "איומים על העורף",
          "ירי טילים",
          `רעא"ד וצונמי`,
          `חומ"ס`,
          `שריפה`,
        ],
      },
    },
    {
      id: 3,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit3-img.jpg`,
      text: "יחידה 3 - שגרה",
      dropdown: {
        title: "משימות משלימות בשגרה",
        items: [
          "הקמת צוותי חירום",
          "משאבים",
          "מגויסי חוץ",
          "הקמת מסגרות לילדי עובדים חיוניים",
          "הכנת תיק מפעל",
        ],
      },
    },
    {
      id: 4,
      img: `${process.env.PUBLIC_URL}/assets/UnitZeroImgs/unit4-img.jpg`,
      text: "יחידה 4 - חירום",
      dropdown: {
        title: `תפקיד במעמ"ל ובאירוע חירום`,
        items: ["מצבים משפטיים", "מעבר משגרה לחירום", `סד"פ אירוע חירום במפעל`],
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



