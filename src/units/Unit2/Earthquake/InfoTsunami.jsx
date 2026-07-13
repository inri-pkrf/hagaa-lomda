import React from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function InfoTsunami() {
  return (
    <InfoPageBase
      headline="מאפייני האיום"
      colorClass="green-box-InfoPage"
      boxes={[
        "צונמי (נחשול רעש) הוא תופעה של גלי ים גדולים המתפרצים בעוצמה רבה אל תוך חופי הים. בישראל ייתכן צונמי כתוצאה מרעידת אדמה בלב-ים או כתוצאה מרעידת אדמה בפנים הארץ.",
        "בצונמי נגרמים נזקים עצומים הן מגלי הים והן מהשלכותיהם:",
        "בנזקים ישירים: הצפות הרסניות, סחיפת מבנים, כלי רכב ותשתיות, פגיעה בנפש ובסביבה.",
        "בנזקי משנה: זיהום מקורות מים, פגיעה במערכות חשמל ותקשורת, דליפת חומרים מסוכנים והתפרצות שרפות.",
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami1.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami2.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami3.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami4.jpg`,
      ]}
    />
  );
}
export default InfoTsunami;
