// ⭐ קובץ עזר משותף - ממפה את הסטטוס המספרי הפנימי של האפליקציה (1/2/3)
// למחרוזת שהשרת (Umbraco) מצפה לה, לפי דוח צוות הפיתוח:
//   1 = טרם התחיל   -> "new"
//   2 = בתהליך       -> "inprogress"
//   3 = הושלם/עבר    -> "completed"
//
// חשוב: הסטטוס המספרי (1/2/3) עדיין משמש פנימית באפליקציה (למשל בשביל
// getProgressData ולוגיקת ה-UI), ולכן לא הסרנו אותו - רק ממירים אותו
// למחרוזת הנכונה בדיוק ברגע שליחת הבקשה לשרת.

export function mapStatusToUmbracoStatus(numericStatus) {
  switch (numericStatus) {
    case 3:
      return "completed";
    case 2:
      return "inprogress";
    case 1:
    default:
      return "new";
  }
}