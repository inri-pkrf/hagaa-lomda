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
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery01.png`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery02.png`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery03.png`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/gallery04.png`,
      ]}
    />
  );
}
export default ResourcesInfo;