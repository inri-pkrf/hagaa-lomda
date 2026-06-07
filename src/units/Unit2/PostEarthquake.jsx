import React from "react";
import "./style/PostEarthquake.css";


function PostEarthquake() {
  return (
    <div className="post-earthquake-wrapper">
      <h2 id="PostEarthquake-headline">לאחר רעידת אדמה</h2>
      <p id="PostEarthquake-text1">לאחר רעידת אדמה יש לנהוג באופן הבא:</p>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/arrows-Earthquake.png`}
        alt="arrows"
        id="earthquake-arrows"
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/circle-Earthquake.png`}
        alt="circle"
        id="earthquake-circle"
      />
      <p id="PostEarthquake-text2">
        סיוע ללכודים תחת הריסות - באחריות צוות החילוץ במפעל, עליו נפרט בפרק הבא.
        <br></br>
        סיוע לפצועים - באחריות צוות עזרה ראשונה במפעל, עליו נפרט בפרק הבא.
      </p>


      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/news.png`}
        alt="icon"
        id="earthquake-news"
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/buildings.png`}
        alt="icon"
        id="earthquake-buildings"
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/electricity.png`}
        alt="icon"
        id="earthquake-electricity"
      />
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/openSpace.png`}
        alt="icon"
        id="earthquake-openSpace"
      />
      <p id="PostEarthquake-text3">
        <div id="PostEarthquake-bold">להישאר </div>
        בשטח פתוח
      </p>
      <p id="PostEarthquake-text4">
        <div id="PostEarthquake-bold">לא לגשת </div>
        למבנים שניזוקו
      </p>
      <p id="PostEarthquake-text5">
        <div id="PostEarthquake-bold">לסגור </div>
        חשמל/גז ולא להדליק אש
      </p>
      <p id="PostEarthquake-text6">
        <div id="PostEarthquake-bold">להתעדכן </div>
        בהנחיות באמצעי התקשורת
      </p>
    </div>
  );
}


export default PostEarthquake;



