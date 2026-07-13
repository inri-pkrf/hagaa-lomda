import React from "react";
import "../../Unit2/style/FireRightBehavior.css";

function FireRightBehavior() {
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-notebook-bg.jpg`}
        alt="bg"
        id="FireRightBehavior-bg"
      />
      <h2 id="FireRightBehavior-headline">היערכות נכונה בשעת שרפה</h2>
      <p id="FireRightBehavior-text1">
        היערכות מראש לשרפות, כוללת אפשרות לגילוי מוקדם, לצד היכולת לכבות את האש
        מיד עם התפרצותה.
      </p>
      <p id="FireRightBehavior-text2">
        כמו כן,
        <strong> חשוב </strong>
        להכיר את הנחיות ההתנהגות במקרה שרפה ולתרגל אותן מראש.
      </p>

      <p id="FireRightBehavior-text3">
        עלייך להכיר את עמדות הכיבוי ואת ציוד הכיבוי שבמבנה כמו:
      </p>
      <ul id="FireRightBehavior-list">
        <li>מנעול פרפר</li>
        <li>מתזים</li>
        <li>מטף</li>
        <li>ברזי שרפה/זרנוק</li>
        <li>מערכות לגילוי אש ועשן</li>
      </ul>
    </div>
  );
}

export default FireRightBehavior;