import React from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function InfoFire() {
  return (
    <InfoPageBase
      headline="מאפייני האיום"
      colorClass="green-box-InfoPage"
      boxes={[
        "שרֵפה היא התפשטות בלתי מבוקרת של בעֵרה, והיא מתרחשת כאשר יש מפגש בין ארבעת הגורמים הבאים:",
        <b>שרשרת תגובה כימית + חום + חומר בערה + חמצן</b>,
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-img1.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-img2.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-img3.jpeg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/fire/fire-img4.webp`,
      ]}
    />
  );
}
export default InfoFire;
