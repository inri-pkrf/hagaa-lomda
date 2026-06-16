// OpeningData.js
const openingData = {
  UnitOne: {
    title: "הפרק הראשון",
    subtitle: `תכירו את הייעוד והמשימות כממוני הג"א`,
    image: "/assets/General/OpeningUnitPage/unitOneStartBuilding.webp",
    mainTitle: "יחידה 1: מבוא",
    text: (
      <>
        <ul>
          <b>בסיום תדעו:</b>
          <li>מהו הבסיס החוקי למערך הג"א במפעל</li>
          <li>אילו איומים קיימים</li>
          <li>לתאר את צרכי האוכלוסייה בארגון או המפעל</li>
          <li>מה המשמעות לגביהם בשעת חירום</li>
          <li>לפרט מי הגופים המסייעים לך בביצוע משימתך</li>
        </ul>
      </>
    ),

    colors: {
      main: "#92c1e4ff",
      layer1: "#bedceb",
      layer2: "#a3cae6",
      text: "#004162",
    },
  },
  UnitTwo: {
    title: "הפרק השני",
    subtitle: `בפרק השני תכיר את האיומים על העורף ותבין מהי תוכנית התגוננות `,
    image: "/assets/General/OpeningUnitPage/unitTwoStartBuilding.webp",
    mainTitle: "יחידה 2: הכנה",
    text: (
      <>
        <ul>
          <b>בסיום תדעו:</b>
          <li>להסביר את מאפייני האיום והשלכותיו</li>
          <li>להבין את משימות ממונה הג"א בהיערכות מול האיום</li>
          <li>
            לגבש תוכנית התגוננות המותאמת למפעל או לארגון להתמודדות עם האיומים
            השונים
          </li>
        </ul>
      </>
    ),
    navigateTo: "/goals",
    colors: {
      main: "#73ac9e",
      layer1: "#CCEEE6",
      layer2: "#b4e2d7",
      text: "#153f35",
    },
  },
  UnitThree: {
    title: "הפרק השלישי",
    subtitle: `נתמקד במשימותיכם עכשיו, בזמן שגרה`,
    image: "/assets/General/OpeningUnitPage/unitThreeStartBuilding.webp",
    mainTitle: "יחידה 3: צוותי חירום",
    text: (
      <>
        <ul>
          <b>בסיום תדעו:</b>
          <li>אילו צוותים עליכם להקים אצלכם במפעל</li>
          <li>איך לתכנן מסגרות להפעלת ילדי העובדים החיוניים</li>
          <li>תכנון משאבים לרציפות תפקודית</li>
          <li>תכנון כוח אדם ומגויסי חוץ</li>
          <li>לבנות תיק מפעל שירכז מידע חשוב לשעת חירום</li>
        </ul>
      </>
    ),
    colors: {
      main: "#FFB356",
      layer1: "#fdd7a8",
      layer2: "#ffc884",
      text: "#7e501b",
    },
  },
  UnitFour: {
    title: "הפרק הרביעי",
    subtitle: `נעסוק במעבר משגרה לחירום ובאירוע חירום במפעל`,
    image: "/assets/General/OpeningUnitPage/unitFourStartBuilding.webp",
    mainTitle: "יחידה 4: סיכום",
    text: (
      <>
        <ul>
          <b>בסיום תדעו:</b>
          <li>
            להבחין בין המצבים המשפטיים "שעת התקפה" <br></br>ו- "מצב מיוחד בעורף"
          </li>
          <li>מה המשימות הנדרשות לקידום המוכנות במעבר משגרה לחירום</li>
          <li>לתאר את סדר הפעולות באירוע חירום במפעל, ארגון או מוסד</li>
        </ul>
      </>
    ),
    colors: {
      main: "#E2787A",
      layer1: "#f7bebf",
      layer2: "#ec9495",
      text: "#5a1c1d",
    },
  },
};

export default openingData;
