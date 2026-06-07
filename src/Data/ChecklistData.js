// ChecklistData.js
// דוגמה למבנה דאטה עבור רשימות צ'קליסט לסוף יחידה/פרק

export const unitOneChecklist = {
  items: [
    '**כל הכבוד!** סיימתם את יחידת הלימוד הראשונה במסגרת הכשרתכם לתפקיד ממוני הג"א.  יחידות הלימוד הבאות יתמקדו בהכנת תוכנית חירום ומשימות משלימות שעליכם לבצע בשגרה, וכן יעמיקו בתפקידכם במעבר משגרה לחירום ובאירוע חירום במפעל. נאחל לכם המשך למידה מהנה ופורייה גם ביחידות הלימוד הבאות. בהצלחה! ',
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/BuildingUnit1.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit1.png`,
  color: "#21b2df",
};

export const unitTwoChecklist = {
  items: [
    '**כל הכבוד!** סיימתם את יחידת הלימוד השנייה במסגרת הכשרתכם לתפקיד ממוני הג"א. ביחידה זו למדתם להסביר את העקרונות לבניית תכנית התגוננות במפעל המותאמת לתרחיש הייחוס, והתנסיתם בהערכת כשירות המרחב המוגן במפעלכם. נאחל לכם המשך למידה מהנה ופורייה גם ביחידות הלימוד הבאות. בהצלחה!',
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/BuildingUnit2.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2.png`,
  color: "#56C3A9",
};

export const unitTwoSub1Checklist = {
  items: [
    "תוכנית התגוננות – תכנון מענה מיגוני לכל עובד וקהל (עמידה בזמן התראה)",
    'לוודא אחזקת מקלט ע"פ ההנחיות לרבות שילוט',
    "הצטיידות",
    "מינוי אחראי מקלט מרגע פתיחתו (מדווח)",
    "התרעה בתוך המבנים",
    "תדריך התנהגות באירוע לעובדים",
    "הקמת צוותי מענה לאירועים, אימונם תרגולם",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2.png`,
  color: "#56C3A9",
  doorTitle: "ירי טילים",
};

export const unitTwoSub2Checklist = {
  items: [
    "הכנת תוכנית מילוט",
    "סימון ושילוט דרכי מילוט",
    "סימון שטחים פתוחים לכינוס העובדים",
    "לחלק את מרחב המפעל לגזרות אחריות ולהגדיר מנהל בכל אזור",
    "לתרגל את עובדי המפעל בשגרה",
    "במפעלים או במוסדות הסמוכים לחוף יש לסמן ולהוסיף שילוט המפנה למבנים גבוהים לקראת אירוע צונמי",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2.png`,
  color: "#56C3A9",
  doorTitle: "רעידת אדמה וצונמי",
};

export const unitTwoSub3Checklist = {
  items: [
    "למנות מנהל אחראי לצוות חומרים מסוכנים",
    "לסייע למנהל הצוות לסווג כ״א, להכשירו, לאמנו ולתרגלו",
    "לטפל ברכש ציוד בשגרה למפעל שיצמצם את הפגיעה והתפשטות האירוע בזמן אמת",
    "לתדרך את העובדים במפעל כיצד להתנהג באירוע חומרים מסוכנים",
    "לוודא תרגול של נוהל חירום לחומרים מסוכנים",
    'לשלט את מצבור החומ"ס',
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2.png`,
  color: "#56C3A9",
  doorTitle: `חומ"ס`,
};

export const unitTwoSub4Checklist = {
  items: [
    "למנות מנהל אחראי לצוות הכיבוי",
    'לסייע למנהל הצוות לסווג את כוח האדם ולהכשירו באמצעות כב"ה, כולל אימונים ותירגולים',
    "לדאוג לציוד כיבוי במפעל ע״פ הגדרות התקן בחוק",
    "בדיקת התקינות של ציוד כיבוי האש בהתאם לתקני תחזוקה והחלפתו במקרה הצורך",
    "להדריך ולתרגל את העובדים במפעל בדבר התנהגות באירוע שריפה",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2.png`,
  color: "#56C3A9",
  doorTitle: "שריפה",
};

export const unitThreeChecklist = {
  items: [
    '**כל הכבוד!** סיימתם את יחידת הלימוד השלישית במסגרת הכשרתכם לתפקיד ממוני הג"א. ביחידה זו למדתם את העקרונות לגבש ולהכשיר את צוותי החירום במפעל, לתכנן מפ"ל ולהיערך למשאבים ולכוח אדם הדרוש בחירום. בנוסף, הכרתם את מבנה ותכולת תיק החירום, לצורך כתיבתו במסגרת תפקידכם. נאחל לכם המשך למידה מהנה. בהצלחה!',
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/BuildingUnit3.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3.png`,
  color: "#FFB356",
};

export const unitThreeSub1Checklist = {
  items: [
    "למפות אילו צוותים נדרשים במפעל, במוסד או בארגון שלכם",
    "לוודא מינוי מנהלי צוותים",
    "לסייע למנהלי הצוותים בגיוס כוח אדם לצוותים",
    "לתדרך את מנהלי הצוותים ולסייע להם בהכשרה, אימון ותרגול",
    "להכין תוכנית שנתית להכשרת הצוותים, אימונם ותרגולם",
    "לוודא רכישת ציוד עבור הצוותים ושמירת כשירותו",
    `גיבוש תוכנית עבודה לשמירת כשירות הצוותים: הכשרות, הדרכות אימונים ותרגילים`,
    `מעקב אחר תוקף הציוד והטיפול בו`,
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3.png`,
  color: "#56C3A9",
  doorTitle: "צוותי חירום",
};

export const unitThreeSub2Checklist = {
  items: [
    "כתיבת נוהל/ תוכנית להפעלת מסגרת פעילות לילדי עובדים חיוניים",
    "לקבוע את המקום (מיגון תקני בלבד)",
    "למנות אחראי למסגרת",
    "לשבץ כוח אדם להפעלת המסגרת",
    "לוודא הצטיידות לתפעול המסגרת",
    "לוודא מול אגף משאבי אנוש צורך בהתאם למספר הילדים בגילאים הרלוונטיים",
    "לסירוגין - ביצוע תיאום למסגרת במפעל שכן/ רשותי",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3.png`,
  color: "#56C3A9",
  doorTitle: `מפ"ל`,
};

export const unitThreeSub3Checklist = {
  items: [
    "למפות את המשאבים הנדרשים בהתאם לצורך",
    "לתכנן כמויות של אמצעים שהמפעל נדרש להחזיק ",
    "לדאוג לתקציב ורכש בשגרה",
    "לחתום על חוזים נצורים מול קבלני חוץ שיספקו מענה בחירום",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3.png`,
  color: "#56C3A9",
  doorTitle: "משאבים",
};

export const unitThreeSub4Checklist = {
  items: [
    'לוודא תקן כ"א מתאים לצורך בחירום',
    "לוודא קיומו של מיפוי פערי כוח אדם הצפויים בחירום",
    "לוודא קיומה של תוכנית להשלמת הפערים, המתאמות עם הגורמים הרלוונטיים",
    "תוכניות להפעלת פתרונות שיקלו על העובדים להגיע לעבודה כגון: הסעות ו/או מסגרות להפעלת ילדי העובדים החיוניים",
    "סיוע לעובדים בשגרה להכנת תוכנית חירום משפחתית",
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/Door-check-list.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3.png`,
  color: "#56C3A9",
  doorTitle: "מגויסי חוץ",
};

export const unitFourChecklist = {
  items: [
    '**כל הכבוד!** סיימתם את יחידת הלימוד הרביעית במסגרת הכשרתכם לתפקיד ממוני הג"א. ביחידה זו למדתם להבין בין "שעת התקפה" ל"מצב מיוחד בעורף". כמו כן, למדתם מהן הפעולות שאתם נדרשים לקדם במעבר לשגרת חירום ומהן הפעולות המיידיות שאתם נדרשים לבצע בהתרחש אירוע במפעל. ',
  ],
  image: `${process.env.PUBLIC_URL}/assets/General/check-list-data/BuildingUnit4.webp`,
  checklistImg: `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit4.png`,
  color: "#E2787A",
};
