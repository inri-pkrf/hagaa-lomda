import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit2/style/FireBehaviorIn.css";

function FireBehaviorIn() {
  const items = [
    "אם השריפה קטנה, כבו אותה",
    "אם לא ניתן לכבות - יש להתפנות מהמבנה",
    "יש לחייג 102",
    "לסגור את הדלת, אך לא לנעול",
    "לעדכן את דיירי המבנה על הסכנה",
    "עד להגעת לוחמי האש, יש למנוע מאחרים להיכנס לבניין",
    "יש להישאר במקום כדי למסור מידע ללוחמי האש לרבות לגבי לכודים",
  ];

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-notebook-bg2.jpg`}
        alt="bg"
        id="FireBehaviorIn-bg"
      />

      <h2 id="FireBehaviorIn-headline">
        כללי התנהגות בשריפה במצב שבו
        <span id="FireBehaviorIn-bold"> ניתן </span>
        לצאת מהמבנה
      </h2>

      <div id="FireBehaviorIn-list">
        {items.map((item, index) => (
          <div className="FireBehaviorIn-row" key={index}>
            <div className="FireBehaviorIn-icon">✓</div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FireBehaviorIn;
