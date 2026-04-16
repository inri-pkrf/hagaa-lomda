// ChecklistData.js
// דוגמה למבנה דאטה עבור רשימות צ'קליסט לסוף יחידה/פרק

export const unitOneChecklist = {
    items: [
        'למנות מנהל אחראי לצוות הכיבוי',
        'לסייע למנהל הצוות לסווג את כ”א ולהכשירו באמצעות כב”ה, לאמנו ולתרגול',
        'לדאוג לרכש ציודכיבוי במפעל על פי הגדרות התקן בחוק',
        'להדריך ולתרגל את העובדים במפעל בדבר התנהגות באירוע שריפה',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Group 494.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`,
};

export const unitTwoChecklist = {
    items: [
        'למנות אחראי בטיחות ליחידה',
        'להכין תיק שטח מעודכן',
        'לתרגל פינוי חירום',
        'להדריך עובדים על נהלי בטיחות',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/Group 494.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CheckListEnd.png`,
};

// צ'קליסטים לתתי-יחידות של יחידה 2
export const unitTwoSub1Checklist = {
    items: [
        'בדיקת מערכות אזעקה',
        'הכנת מקלטים',
        'הדרכת עובדים על התנהגות בזמן אזעקה',
        'בדיקת ציוד חירום',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/Sub1.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CheckListEnd1.png`,
};
export const unitTwoSub2Checklist = {
    items: [
        'הכנת מסמכי פינוי',
        'תרגול פינוי בפועל',
        'בדיקת מסלולי פינוי',
        'הכנת רשימות עובדים',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/Sub2.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CheckListEnd2.png`,
};
export const unitTwoSub3Checklist = {
    items: [
        'בדיקת מערכות גילוי אש',
        'הדרכת עובדים על מניעת דליקות',
        'בדיקת ציוד כיבוי',
        'תרגול התמודדות עם שריפה',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/Sub3.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CheckListEnd3.png`,
};
export const unitTwoSub4Checklist = {
    items: [
        'הכנת ציוד עזרה ראשונה',
        'הדרכת עובדים על עזרה ראשונה',
        'בדיקת מלאי תרופות',
        'תרגול טיפול בפצועים',
    ],
    image: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/Sub4.png`,
    checklistImg: `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/CheckListEnd4.png`,
};

// אפשר להוסיף עוד רשימות לפי הצורך
