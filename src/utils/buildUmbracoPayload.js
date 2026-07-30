// ⭐ קובץ עזר משותף - בונה את גוף הבקשה בדיוק כפי שנשלח ונשמר בשרת.
//
// למה זה קיים: כדי שה"הורד JSON לבדיקה" (App.jsx, LastPage.jsx) יציג
// בדיוק את אותו מבנה שבאמת נשלח ל-SetIframeLearning ונשמר בשרת -
// ולא מבנה ישן/דמה שכבר לא תואם את מה שבאמת קורה. יש מקור אמת אחד
// (הפונקציה הזו) שגם השמירה בפועל (Buttons.jsx, LastPage.jsx) וגם
// ההורדה לבדיקה משתמשים בו, כך שאין סיכוי שהם "יתפצלו" שוב בעתיד.

import { getProgressData } from "../components/Progressunits";
import { mapStatusToUmbracoStatus } from "./umbracoStatus";

// ⭐ 1 = טרם התחיל, 2 = בתהליך (אותה הגדרה כמו ב-Buttons.jsx)
export const getStatusForPath = (path) => (path === "/" ? 1 : 2);

/**
 * בונה את גוף הבקשה שנשלח ל-POST /umbraco/surface/learning/SetIframeLearning
 *
 * @param {number} learningId
 * @param {string} path - הנתיב הנוכחי (ישמש כ-lastPath)
 * @param {object} sessionState - תוכן ה-sessionStorage הרלוונטי
 * @param {number|null} stepIndex - מיקום מספרי בתוך routeOrder (אופציונלי)
 * @param {number} score - הציון הנוכחי (ברירת מחדל 0)
 * @param {number|null} statusOverride - סטטוס מספרי מפורש (למשל 3 בעמוד הסיום),
 *   אם לא מועבר - מחושב אוטומטית לפי הנתיב (getStatusForPath)
 */
export function buildUmbracoPayload({
  learningId,
  path,
  sessionState,
  stepIndex = null,
  score = 0,
  statusOverride = null,
}) {
  const numericStatus =
    statusOverride !== null ? statusOverride : getStatusForPath(path);
  const progressData = getProgressData(numericStatus);

  const stateData = JSON.stringify({
    sessionState,
    lastPath: path,
    ...(stepIndex !== null ? { step: stepIndex } : {}),
    progressData,
    score,
  });

  return {
    LearningId: learningId,
    StateData: stateData,
    Status: mapStatusToUmbracoStatus(numericStatus),
  };
}