import React from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function ResourcesInfo() {
  return (
    <InfoPageBase
      headline="מה זה בדיוק?"
      colorClass="orange-box-InfoPage"
      sliderColor="#FFB356"
      boxes={[
        { type: "box", text: "שמירה על רציפות התפקוד במצב חירום מחייבת היערכות משקית ותחבורתית." },
        { type: "headline", text: "למה זה חשוב?" },
        { type: "box", text: "יכולת המפעל לשמור על רציפות תפקודית במצב חירום מחייבת היערכות משקית ותחבורתית הכוללת את המשאבים הנדרשים." },
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery01.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery02.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery03.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery04.webp`,
      ]}
    />
  );
}
export default ResourcesInfo;