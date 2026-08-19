// ⭐ קובץ עזר משותף - בונה את גוף הבקשה בדיוק לפי הפורמט הסופי שסוכם עם
// צוות האתר (learningId, stateJson, progressData, status), ובנוסף - לפי
// בקשה מפורשת - score כשדה נפרד ברמה העליונה.
//
// {
//   "learningId": 123,
//   "stateJson": "{...}",
//   "progressData": { percent, percentPicId, currentChapter, totalChapters, title, subText, titleIconId },
//   "status": 1, // 1 = טרם התחיל, 2 = בתהליך, 3 = הסתיים
//   "score": 0   // ⭐ הרחבה מעבר לפורמט המקורי שסוכם - יש לוודא מול צוות
//                //    האתר שה-controller בשרת אכן קורא ושומר שדה זה.
// }
//
// לשם בטיחות, ה-score עדיין משולב גם בתוך stateJson - כך שגם אם צוות
// האתר עדיין לא קולט את השדה הנפרד, שום מידע לא הולך לאיבוד.
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
 *   אם לא מועבר - מחושב אוטומטית (ראו הלוגיקה למטה)
 */
export function buildUmbracoPayload({
  learningId,
  path,
  sessionState,
  stepIndex = null,
  score = 0,
  statusOverride = null,
}) {
  let numericStatus;

  if (statusOverride !== null) {
    // ⭐ סטטוס מפורש (למשל מ-LastPage.jsx) - תמיד מכבדים אותו כמו שהוא
    numericStatus = statusOverride;
  } else {
    // ⭐ אם המשתמש/ת כבר עברו את המבחן בעבר (ציון 70+ נשמר כבר
    // ב-sessionStorage), הסטטוס נשאר "הושלם" (3) - גם כשממשיכים לנווט
    // לעמודים אחרים אחרי הסיום (כמו "אודות"/CreditPage). בלי זה, כל
    // ניווט אחרי סיום מוצלח היה "דורס" את status:3 בחזרה ל-status:2.
    const alreadyPassedScore =
      Number(sessionStorage.getItem("finalQuizScore")) || 0;
    numericStatus =
      alreadyPassedScore >= 70 ? 3 : getStatusForPath(path);
  }

  // ⭐ progressData נשארת ברמה העליונה של הבקשה (לא בתוך stateJson) -
  // בדיוק לפי הפורמט הסופי שסוכם.
  const progressData = getProgressData(numericStatus);

  // ⭐ stateJson מכיל את כל שאר המידע שצריך לשחזור: sessionState, lastPath,
  // step מספרי, וה-score (גם כאן, לגיבוי - ראו הערה למעלה).
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
    score, // ⭐ score כשדה נפרד ברמה העליונה, לפי בקשה מפורשת
  };
}