import React from "react";
import "../../Unit2/style/FireBehaviorOut.css";


function FireBehaviorOut() {
  const items = [
    "יש להגיע לחדר מרוחק עם חלון",
    "לסגור את הדלת של החדר",
    "לחייג 102",
    "במקרה שהעשן מתחיל לחדור לחדר יש להשתמש בכיסוי בד לחסימת העשן",
    "להישאר צמוד לחלון פתוח כדי לסמן לכוחות החילוץ על מיקומך",
  ];


  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-notebook-bg2.jpg`}
        alt="bg"
        id="FireBehaviorOut-bg"
      />


      <h2 id="FireBehaviorOut-headline">
        כללי התנהגות בשריפה במצב שבו
        <span id="FireBehaviorOut-bold"> לא ניתן </span>
        לצאת מהמבנה
      </h2>


      <div id="FireBehaviorOut-list">
        {items.map((item, index) => (
          <div className="FireBehaviorOut-row" key={index}>
            <div className="FireBehaviorOut-icon">✓</div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default FireBehaviorOut;



