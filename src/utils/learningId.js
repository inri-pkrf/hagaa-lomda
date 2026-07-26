// ⭐ קובץ עזר משותף - קריאה נכונה של learningId מהכתובת
//
// הבעיה שהייתה: כל קובץ קרא את learningId רק מתוך window.location.hash
// (כלומר מה שמופיע אחרי ה-# בכתובת, כמו ב-HashRouter: #/some-page?learningId=123).
// בפועל, הצד שמטמיע אותנו (Umbraco) מעביר את learningId כפרמטר query רגיל,
// *לפני* ה-#, כלומר בתוך window.location.search:
//   https://inri-qa.orc.org.il/.../?learningId=10562#/
// ולכן ה-hash היה ריק, ו-learningId יצא תמיד NaN, והאפליקציה חשבה
// שהיא ב-"DEV MODE" ולא שלחה כלום לשרת.
//
// הפתרון: לקרוא קודם מ-window.location.search (המקרה האמיתי בסביבה שלהם),
// ורק אם הוא ריק - ליפול חזרה (fallback) לקריאה מתוך ה-hash (למקרה שמישהו
// כן יעביר את זה ככה בעתיד, או בסביבת פיתוח מקומית).
//
// בנוסף: אנחנו שומרים את learningId פעם אחת ב-sessionStorage. כך גם אם
// HashRouter "יבלע" את ה-query string בניווטים פנימיים בהמשך, לכל קומפוננטה
// תמיד תהיה גישה ל-learningId הנכון, בלי לקרוא שוב את ה-URL כל פעם.

const STORAGE_KEY = "APP_LEARNING_ID";

function readFromLocation() {
  // 1) query string רגיל - לפני ה-# (המקרה האמיתי אצל המטמיע)
  const topLevelParams = new URLSearchParams(window.location.search);
  let raw = topLevelParams.get("learningId");
  let key = topLevelParams.get("key");

  // 2) fallback - query string בתוך ה-hash
  if (!raw) {
    const hash = window.location.hash || "";
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const hashParams = new URLSearchParams(queryString);
    raw = hashParams.get("learningId");
    key = key || hashParams.get("key");
  }

  return { raw, key };
}

export function getUrlParams() {
  const { raw, key } = readFromLocation();
  let learningId = parseInt(raw, 10);

  if (!Number.isNaN(learningId)) {
    // נמצא בכתובת -> נשמור אותו ל-sessionStorage לשימוש עתידי
    sessionStorage.setItem(STORAGE_KEY, String(learningId));
  } else {
    // לא נמצא בכתובת הנוכחית -> ננסה לשלוף מה-sessionStorage
    // (למשל אם המשתמש כבר ניווט הלאה ואיבד את ה-query string)
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      learningId = parseInt(stored, 10);
    }
  }

  console.log("🔍 [learningId.js] window.location.search:", window.location.search);
  console.log("🔍 [learningId.js] window.location.hash:", window.location.hash);
  console.log("🔍 [learningId.js] learningId:", learningId);

  return { learningId, key };
}