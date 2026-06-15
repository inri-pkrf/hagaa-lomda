import React from "react";
import "../../Unit3/style/ExternalInfo.css";

function ExternalInfo() {
  const openInPopup = (e) => {
    e.preventDefault(); // מונע את פתיחת הטאב הרגיל
    const url =
      "https://www.gov.il/he/departments/topics/emergency-manpower/govil-landing-page";
    const windowFeatures =
      "width=1200,height=800,top=100,left=200,resizable=yes,scrollbars=yes";
    window.open(url, "EmergencyInfoPopup", windowFeatures);
  };

  return (
    <div className="ExternalInfo">
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/ExternalRecruits/ExternalInfo-bg.webp`}
        className="ExternalInfo-left-half-bg"
        alt="bg"
      />
      <h2 className="subtitles-ExternalInfo">
        מדובר בעובדים המתגברים את המפעל בזמן חירום בשל הפער שנוצר מגיוס
        <br></br>עובדים קבועים במפעל למילואים
      </h2>

      <p id="ExternalInfo-text1" className="orange-box">
        מגויסי חוץ אינם עובדים במפעל בשגרה
      </p>

      <p id="ExternalInfo-text2" className="orange-box">
        ניתן להזמינם בשגרה ולשלבם בהכנות לחירום, לאימון או הכשרה לתפקיד בחירום-
        בתיאום מראש עם מפקח רשות כ”א לחירום במשרד העבודה ובאישורו.
      </p>

      <p id="ExternalInfo-text3" className="orange-box">
        מגויסי חוץ יופעלו בשעת חירום באמצעות צווים אישיים על פי דרישות המפעל.
      </p>
      <p id="ExternalInfo-text4" className="orange-box">
        להרחבה ראה : &nbsp;
        <a
          className="ExternalInfo-link"
          href="https://www.gov.il/he/departments/topics/emergency-manpower/govil-landing-page"
          rel="noopener noreferrer"
          onClick={openInPopup}
        >
          אתר משרד העבודה
        </a>
      </p>
    </div>
  );
}

export default ExternalInfo;
