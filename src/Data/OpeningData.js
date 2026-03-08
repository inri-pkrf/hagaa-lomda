 // OpeningData.js
const openingData = {
  UnitOne: {
    title: "בפרק הראשון",
    subtitle: `תכירו את הייעוד והמשימות כממוני הג"א`,
    image: "/assets/General/OpeningUnitPage/mainBuilding.png",
    text:<>
       <b>בסיום תדעו:</b>
         <ul>
            <li>
              מהו הבסיס החוקי למערך הג"א במפעל
              </li>
            <li>
             אילו איומים קיימים
              </li>
            <li>
לתאר את צרכי האוכלוסייה בארגון או המפעל שלך              
</li>
            <li>
מה המשמעות לגביהם בשעת חירום</li>
            <li>
לפרֵט מי הגופים המסייעים לך בביצוע משימתך</li>


         </ul>
    </>,

    buttonText: "התחל",
    navigateTo: "src/units/Unit1/IntroUnitOne.jsx"
  },
  Unit2: {
    title: "יחידה 1: מבוא",
    subtitle: "הכרת המערכת",
    image: "/assets/UnitOneImgs/intro.png",
    buttonText: "המשך",
    navigateTo: "/unit1/intro"
  },
  Unit3: {
    title: "יחידה 2: הכנה",
    subtitle: "הכנות למצבי חירום",
    image: "/assets/UnitTwoImgs/prep.png",
    buttonText: "התחל יחידה",
    navigateTo: "/unit2/explaining"
  },
  Unit4: {
    title: "יחידה 3: צוותי חירום",
    subtitle: "הכרת הצוותים",
    image: "/assets/UnitThreeImgs/teams.png",
    buttonText: "המשך",
    navigateTo: "/unit3/explaining"
  },
  
};

export default openingData;