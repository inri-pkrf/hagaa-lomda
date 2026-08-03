// ⭐ קובץ עזר משותף - בונה את גוף הבקשה בדיוק לפי הפורמט הסופי שסוכם עם
// צוות האתר (learningId, stateJson, progressData, status - כולם באותיות
// קטנות, status כמספר 1/2/3, progressData ברמה העליונה ולא בתוך stateJson):
//
// {
//   "learningId": 123,
//   "stateJson": "{...}",
//   "progressData": { percent, percentPicId, currentChapter, totalChapters, title, subText, titleIconId },
//   "status": 1 // 1 = טרם התחיל, 2 = בתהליך, 3 = הסתיים
// }
//
// גם השמירה בפועל (Buttons.jsx, LastPage.jsx) וגם "הורד JSON לבדיקה"
// (App.jsx, LastPage.jsx) משתמשים באותה פונקציה בדיוק, כדי שלא יהיה
// סיכוי לסטייה בין מה שנשלח לשרת למה שמוצג בקובץ שמורידים.

import { getProgressData } from "../components/Progressunits";

// ⭐ 1 = טרם התחיל, 2 = בתהליך (ברירת מחדל כשלא מציינים סטטוס אחר)
export const getStatusForPath = (path) => (path === "/" ? 1 : 2);

/**
 * בונה את גוף הבקשה שנשלח ל-POST /umbraco/surface/learning/SetIframeLearning
 *
 * @param {number} learningId
 * @param {string} path - הנתיב הנוכחי (יישמר בתוך stateJson כ-lastPath)
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

  // ⭐ progressData נשארת ברמה העליונה של הבקשה (לא בתוך stateJson) -
  // בדיוק לפי הפורמט הסופי שסוכם.
  const progressData = getProgressData(numericStatus);

  // ⭐ stateJson מכיל את כל שאר המידע שצריך לשחזור: sessionState, lastPath,
  // step מספרי, והציון (score אין לו שדה נפרד ברמה העליונה בפורמט הסופי,
  // ולכן הוא משולב כאן בפנים).
  const stateJson = JSON.stringify({
    sessionState,
    lastPath: path,
    ...(stepIndex !== null ? { step: stepIndex } : {}),
    score,
  });

  return {
    learningId,
    stateJson,
    progressData,
    status: numericStatus,
  };
}