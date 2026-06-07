import React, { useEffect } from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function InfoEarthquake() {
  useEffect(() => {
    sessionStorage.setItem("MainTitle", "רעידת אדמה וצונאמי");
  }, []);

  return (
    <InfoPageBase
      headline="מאפייני האיום"
      colorClass="green-box-InfoPage"
      boxes={[
        "רעידת אדמה היא תופעת טבע שכיחה בכדור הארץ. באזורים מיושבים ובנויים גורמת רעידת האדמה לרוב לנזק רב בנפש וברכוש, בהתאם לעוצמת הרעש, המרחק ממוקד הרעש, איכות הבנייה וסוג הסלע שעליו המבנה ניצב.",
        "ברעידת אדמה נגרמים נזקים ישירים ועקיפים: נזקים ישירים: קריסת מבנים, פגיעה בתשתיות (כבישים, גשרים, חשמל, מים, רשתות תקשורת) ופגיעה בנפש (הרוגים, פצועים, לכודים, נעדרים, חסרי קורת גג).",
        "נזקי משנה: שריפות, דליפות גז או חומרים מסוכנים, הצפה מצינורות שהתבקעו, מפולות וסחף קרקע, פגיעה בשרשרת אספקה ושיבוש שגרת החיים.",
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake1.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake2.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake3.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake4.webp`,
      ]}
    />
  );
}
export default InfoEarthquake;
