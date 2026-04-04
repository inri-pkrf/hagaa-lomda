import React, { useState } from 'react';
import './Styles/InfoLomda.css';
import { useNavigate } from 'react-router-dom';

function InfoLomda() {
    const navigate = useNavigate();
    // 0 = חלק ראשון, 1 = חלק שני
    const [step, setStep] = useState(0);

    return (
        <div className="InfoLomda">
            <div className='InfoLomdaCard'>
                {/* הכותרת נמצאת כאן - מחוץ לצעדים - ולכן תישאר תמיד */}
                <h2 className="InfoLomda-title">ברוכים וברוכות הבאים והבאות ללומדה להכשרת ממונה הג"א</h2>

                {/* --- צעד 1: פסקאות פתיחה --- */}
                {step === 0 && (
                    <div className="step-content">
                        <p className='InfoLomda-par1'>
                            מטרת הלומדה להכשיר אותכם ואתכן לתפקיד.
                            על מנת שתוכלו לתכנן את מערך ההתגוננות האזרחית במפעל ובכך להציל חיים ולסייע לשמירת על רציפות התפקוד של במצבי החירום.
                        </p>
                        <p className='InfoLomda-par2'>
                            <b>שימו לב:</b> לומדה זו מיועדת לממונה הג"א (התגוננות אזרחית) במפעל חיוני/קיומי.
                            עם זאת, כל ממונה הג"א בכל ארגון אחר (שאיננו מפעל חיוני) יכול ללמוד מיחידה זו את הנושאים הרלוונטיים אליו.
                        </p>
                    </div>
                )}

                {/* --- צעד 2: התמצאות ומבדק --- */}
                {step === 1 && (
                    <div className="step-content">
                        <p className='InfoLomda-par3'>
                            <b>כיצד תתמצאו בלומדה?</b><br />
                            בחלק העליון של הלומדה, יוצגו פרקי הלימוד בתפריט, באופן שיאפשר לכם לשייך את תוכן הלימוד לפרק הרלוונטי, ולהתעדכן על סיומו. <br />
                            תוכלו לעבור בין הפרקים שהושלמו על ידי לחיצה על הפרק הרצוי, או לנווט באמצעות כפתורי "הבא"/"הקודם".
                        </p>
                        <ul className='InfoLomda-ul'>
                            <li>זמן משוער לביצוע יחידה בלומדה: כ- 20 דקות.</li>
                            <li>יחידה זו מנוסחת בלשון זכר, אך פונה לשני המינים.</li>
                            <li>יחידה זו כוללת שימוש בסאונד, לכן מומלץ להצטייד באמצעי שמע.</li>
                        </ul>
                        <p className='InfoLomda-par4'>
                            <b>שימו לב!</b>
                            <br />
                            בסיום הלומדה יתבצע מבדק מסכם - ציון עובר במבדק הינו 70.
                        </p>
                    </div>
                )}

                {/* --- מערכת כפתורי הניווט (בתוך הקארד כדי שיהיה קל למקם) --- */}
                <div className="info-navigation-buttons">
                    {step === 1 && (
                        <button className="nav-btn-prev" onClick={() => setStep(0)}>
                            חזור
                        </button>
                    )}

                    {step === 0 ? (
                        <button className="start-button-InfoLomda" onClick={() => setStep(1)}>
                            הבא
                        </button>
                    ) : (
                        <button className="start-button-InfoLomda" onClick={() => navigate('/elevator')}>
                            התחל למידה
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InfoLomda;