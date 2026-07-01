import React from "react";
import InfoPageBase from "../../../components/InfoPageBase";

function InfoChemical() {
  return (
    <InfoPageBase
      headline="מאפייני האיום"
      colorClass="green-box-InfoPage"
      boxes={[
        `אירוע חומרים מסוכנים הוא התרחשות בלתי מבוקרת או תאונה המערבת חומר מסוכן.`,
        `אירוע חומ"ס יכול להתרחש בין היתר בעקבות לחימה ומהווה סיכון לחיי אדם ולבריאות האוכלוסייה שבסביבתו. `,
        `החומר המסוכן עלול לגרום לנזק סביבתי כגון זיהום אוויר, בשטח מגורים, בשטחי חקלאות ובמקורות מים. `,
        `אירוע חומ"ס עלול להשפיע על שטח המפעל או בהשפעה רחבה על האוכלוסייה (בשכונות מגורים סמוכות ולכן הן יסווגו\n כ"מסוכנות לאוכלוסייה").`,
      ]}
      sliderImages={[
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/Chemical1.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/Chemical2.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/Chemical3.jpg`,
        `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/chemical/Chemical4.jpg`,
      ]}
    />
  );
}
export default InfoChemical;
