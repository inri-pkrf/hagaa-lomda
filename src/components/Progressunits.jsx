import NavBarData from "../Data/NavBarData";

// ⭐ מיפוי בין כותרת פרק למפתח ה-sessionStorage שמסמן שהפרק הושלם
export const chapterSessionKeys = {
  "פתיחה_1": 'unitone-opening',
  "היערכות לאיומים": 'unitOne-first',
  "מצבי תפקוד": 'unitOne-second',
  "ממשקים": 'unitOne-third',
  "אוכלוסיה": 'unitOne-fourth',
  "שאלות סיכום_1": 'unitOne-questions',
  "סיכום פרק_1": 'unitOne-checklist',
  "פתיחה_2": 'unittwo-opening',
  "ירי טילים": 'unitTwo-first',
  "רעידת אדמה וצונאמי": 'unitTwo-second',
  "שריפה": 'unitTwo-third',
  "חומרים מסוכנים": 'unitTwo-fourth',
  "שאלות סיכום_2": 'unitTwo-questions',
  "סיכום פרק_2": 'unitTwo-checklist',
  "פתיחה_3": 'unitthree-opening',
  "צוותי חירום": 'unitThree-first',
  " שמרטפיה": 'unitThree-second',
  "משאבים": 'unitThree-third',
  "מגויסי חוץ ": 'unitThree-fourth',
  " תיק מפעל": 'unitThree-fifth',
  "שאלות סיכום_3": 'unitThree-questions',
  "סיכום פרק_3": 'unitThree-checklist',
  "פתיחה_4": 'unitfour-opening',
  "מצבים משפטיים": 'unitFour-first',
  " מעבר משגרה לחירום": 'unitFour-second',
  "אירוע חירום": 'unitFour-third',
  "שאלות סיכום_4": 'unitFour-questions',
  "סיכום פרק_4": 'unitFour-checklist',
};

export const isChapterFinished = (chapterTitle, unitNum) => {
  const duplicateTitles = ["פתיחה", "שאלות סיכום", "סיכום פרק"];
  const key = duplicateTitles.includes(chapterTitle) ? `${chapterTitle}_${unitNum}` : chapterTitle;
  const sessionKey = chapterSessionKeys[key];
  if (!sessionKey) return false;
  return sessionStorage.getItem(sessionKey) === 'finished';
};

export const calculateUnitProgress = (unitData, unitNum) => {
  if (!unitData?.chapters) return 0;
  const total = unitData.chapters.length;
  if (total === 0) return 0;
  const finished = unitData.chapters.filter(ch => isChapterFinished(ch.title, unitNum)).length;
  return finished / total;
};

// ⭐ אחוז ההתקדמות הכולל (0-100), מבוסס על כל היחידות ב-NavBarData.
// משמש גם ב-ProgressBar (תצוגה) וגם בשמירת ה-state לשרת (Buttons, LastPage).
export const calculateOverallProgress = () => {
  return Math.round(
    NavBarData.reduce((acc, unit, index) => {
      return acc + calculateUnitProgress(unit, index + 1) * 25;
    }, 0)
  );
};

// ⭐ סדר מפתחות ה-sessionStorage שמסמנים שיחידה שלמה הסתיימה
const unitFinishedKeys = [
  "unitOne-finished",
  "unitTwo-finished",
  "unitThree-finished",
  "unitFour-finished",
];

const TOTAL_UNITS = unitFinishedKeys.length;

// ⭐ היחידה הנוכחית בפורמט "X/4":
// אם currentUnit הוא UnitZero (טרם נכנס ליחידה כלשהי) - מחזיר "0/4".
// אחרת, היחידה הראשונה שעדיין לא "finished".
// אם כל היחידות סומנו כ-finished, מחזיר את היחידה האחרונה (4/4).
export const getCurrentUnit = () => {
  const currentUnit = sessionStorage.getItem("currentUnit") || "UnitZero";
  if (currentUnit === "UnitZero") {
    return `0/${TOTAL_UNITS}`;
  }

  for (let i = 0; i < unitFinishedKeys.length; i++) {
    if (sessionStorage.getItem(unitFinishedKeys[i]) !== "finished") {
      return `${i + 1}/${TOTAL_UNITS}`;
    }
  }
  return `${TOTAL_UNITS}/${TOTAL_UNITS}`;
};