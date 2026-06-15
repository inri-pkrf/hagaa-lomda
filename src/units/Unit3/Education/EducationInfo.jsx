import React from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function EducationInfo() {
  return (
    <InfoPageBase
      headline="מה זה בדיוק?"
      colorClass="orange-box-InfoPage"
      sliderColor="#FFB356"
      boxes={[
        {
          type: "box",
          text: "מסגרת חינוכית לטיפול בילדי העובדים החיוניים עד גיל 12.",
        },
        { type: "headline", text: "למה זה חשוב?" },
        {
          type: "box",
          text: "הקמת מסגרות חינוכיות לילדי העובדים החיוניים במפעל או במוסד תאפשר בזמן חירום רציפות והמשכיות של העובדים החיוניים במפעל.",
        },
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/gallery01.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/gallery02.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/gallery03.webp`,
        `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Education/gallery04.webp`,
      ]}
    />
  );
}
export default EducationInfo;
