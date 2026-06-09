import React, { useState, useEffect } from "react";
import "./Styles/InfoLomda.css";
import { useNavigate, useLocation } from "react-router-dom";

function InfoLomda() {
  const location = useLocation();
  const navigate = useNavigate();
  const TOTAL_STEPS = 5;

  const getStepFromPath = (path) => {
    if (path === "/info-lomda") return 0;
    if (path === "/info-lomda/2") return 1;
    if (path === "/info-lomda/3") return 2;
    if (path === "/info-lomda/4") return 3;
    if (path === "/info-lomda/5") return 4;

    return 0;
  };

  const [step, setStep] = useState(getStepFromPath(location.pathname));

  useEffect(() => {
    const handleNext = (e) => {
      const currentStep = getStepFromPath(location.pathname);
      if (currentStep < TOTAL_STEPS - 1) {
        e.preventDefault();
        const nextStep = currentStep + 1;
        const path =
          nextStep === 0 ? "/info-lomda" : `/info-lomda/${nextStep + 1}`;
        setStep(nextStep);
        navigate(path);
      }
    };

    const handlePrev = (e) => {
      const currentStep = getStepFromPath(location.pathname);
      if (currentStep > 0) {
        e.preventDefault();
        const prevStep = currentStep - 1;
        const path =
          prevStep === 0 ? "/info-lomda" : `/info-lomda/${prevStep + 1}`;
        setStep(prevStep);
        navigate(path);
      }
    };

    window.addEventListener("onNextNav", handleNext);
    window.addEventListener("onPrevNav", handlePrev);

    return () => {
      window.removeEventListener("onNextNav", handleNext);
      window.removeEventListener("onPrevNav", handlePrev);
    };
  }, [navigate, location.pathname]);

  return (
    <div className="InfoLomda">
      <div className="InfoLomdaCard">
        <h2 className="InfoLomda-title">
          ברוכים הבאים והבאות ללומדה להכשרת ממונה הג"א
        </h2>

        {/* צעד 1: פסקאות פתיחה */}
        {step === 0 && (
          <div className="step-content">
            <p className="InfoLomda-par1">
              מטרת הלומדה להכשיר אתכם ואתכן לתפקיד.<br /> הכשרה זו תסייע לך להיערך
              לאירוע חירום בארגון או במפעל,<br /> במטרה לשמור על רציפות תפקוד במצבי
              חירום. <br /> ההכשרה בנויה מ-4 יחידות לימוד ויש להשלים אותן לפי הסדר כדי
              להתקדם.
            </p>
            <p className="InfoLomda-par2 Pay-attention">
             <b>שימו לב!</b>
              <br />
             לומדה זו מיועדת לממונה הג"א (התגוננות אזרחית)
              במפעל חיוני / קיומי.<br /> עם זאת, כל ממונה הג"א בכל ארגון אחר (שאיננו
              מפעל חיוני) <br />יכול ללמוד מיחידה זו את הנושאים הרלוונטיים אליו.
            </p>
          </div>
        )}

        {/* צעד 2: התמצאות ומבדק */}
        {step === 1 && (
          <div className="step-content">
            <p className="InfoLomda-par3">
              <h3 style={{marginBottom: 0, marginTop: 0, fontSize: '3vmin'}}><b>כיצד תתמצאו בלומדה?</b></h3>
              <br />
              בחלק העליון של הלומדה, יוצגו פרקי הלימוד בתפריט, באופן שיאפשר לכם
              לשייך את תוכן הלימוד לפרק הרלוונטי, ולהתעדכן על סיומו. <br />
              תוכלו לעבור בין הפרקים שהושלמו על ידי לחיצה על הפרק הרצוי, <br />או
              לנווט באמצעות כפתורי החצים "הבא" / "הקודם".
            </p>
            <ul className="InfoLomda-ul">
              <li>זמן משוער לביצוע יחידה בלומדה: כ-20 דקות.</li>
              <li>
                יחידה זו כוללת שימוש בשמע, לכן מומלץ להצטייד באוזניות או רמקולים.
              </li>
            </ul>
            <p className="InfoLomda-par4 Pay-attention">
              <b>שימו לב!</b>
              <br />
              בסיום הלומדה יתבצע מבחן מסכם - ציון עובר במבחן הינו 70. <br /> עם ההצלחה במבחן תשלח באופן אוטומטי תעודת הסמכה אשר תקפה ל-5 שנים.
            </p>
          </div>
        )}

        {/* צעד 3: תוכן חדש */}
        {step === 2 && (
          <div className="step-content">
            <p className="InfoLomda-par3" id="pay-attention-step2">
              <h3 style={{marginBottom: 0, marginTop: 0, fontSize: '3vmin'}}><b>מי נדרש למנות ממונה הג"א?</b></h3>
              <br />
              <b >מתוקף חוק הג"א  ותקנות ההתגוננות האזרחית -</b> ציוד מפעלים
              מוסדות ואימון עובדיהם <br />(התשי"א - 1951, התשל"ג - 1973) <br/>נדרש למנות מנהלים / ות
              לענייני התגוננות אזרחית (ממונה הג"א) במקרים הבאים:
            </p>
            

            <ul className="InfoLomda-ul" id="pay-attention-step2"><b>"מפעל מוסדר" – </b>
              <li>
                 מפעל שבו מועסקים עשרה עובדים או יותר, ובמוסד חינוך או בבית
                חולים – אף אם מספר העובדים המועסקים הוא פחות מעשרה.
              </li>
              <li>
                 מפעל שבו מועסקים פחות מעשרה עובדים והוא נמנה עם סוג המפעלים
                ששר הביטחון, בהתחשב בחומרים או בציוד המוחזקים בהם, בפעולות
                המתנהלות בהם או במבנים שבהם הם מתנהלים, הכריז כי הוא מפעל רגיש.
              </li>
              <li> מפעל משותף.</li>
            </ul>

            <p className="InfoLomda-par2 Pay-attention" id="pay-attention-step2">
              <b>חובת מינוי מנהל / ת התגוננות אזרחית (ממונה הג״א) – </b>
              בעל מפעל מוסדר ימנה מבין עובדיו<br /> מנהל / ת או מנהלים / ות  לענייני התגוננות
              אזרחית במפעלו או בכל חלק ממנו,<br /> בהתאם להוראות מפקד הג״א מחוזי.
            </p>
          </div>
        )}

        {/* צעד 4: תוכן חדש */}
        {step === 3 && (
          <div className="step-content">
            <p className="InfoLomda-par3">
              <h3 style={{marginBottom: 0, marginTop: 0, fontSize: '3vmin'}}><b>מה החוק אומר לגבי היערכות מפעל / מוסד לחירום?</b></h3>
              <br />
              <b>תקנות ההתגוננות האזרחית -</b> ציוד מפעלים מוסדות ואימון עובדיהם (תשל״ג
              - 1973) קובעות הוראות לעניין ציוד במפעלים מוסדרים ומוסדות, אימון
              עובדי מפעל מוסדר והוצאות במפעלים משותפים.
            </p>

            <p className="InfoLomda-par3">
              בהתאם לקבוע בתקנות, על מפעלים מוסדרים להתאמן לצורכי התגוננות
              אזרחית. <br />מערך ההתגוננות האזרחית יתבסס על האמצעים ועל כוח-האדם של
              המפעל / מוסד.
            </p>

            <p className="InfoLomda-par3">
              מפקד הג״א מחוזי רשאי להשפיע על הרכב מערך ההתגוננות האזרחית במפעל
              מוסדר,<br /> וזאת בהתאם להוראות פרק ג׳ לתקנות.
              <br />
              <p className="InfoLomda-par3 Pay-attention">
                <b>שימו לב!</b>
                <br />
                היערכות מקדימה ותרגול של מערך החירום יבטיחו את המשך הרציפות
                התפקודית של המפעל המוסדר במצבי החירום השונים, כחלק מהמשק הלאומי
                החיוני.
              </p>
            </p>
          </div>
        )}
        {step === 4 && (
          <div className="step-content">
            <p className="InfoLomda-par3">
              <h3 style={{marginBottom: 0, marginTop: 0, fontSize: '3vmin'}}><b>תפקיד ממונה הג"א:</b></h3>
              <br />
              הממונה על ההתגוננות האזרחית במפעל ירכז את הטיפול בכלל נושאי
              ההתגוונות האזרחית, <br />בין תפקידיו:
              <br />
            </p>
            <ul className="InfoLomda-ul">
              <li>
                להוות גורם מקצועי ומיישם להוראות ההתגוננות על פי אופיו ומהותו
                הייחודי של המפעל.
              </li>
              <li>לתכנן מערכת התגוננות אזרחית במפעל / ארגון / מוסד.</li>
              <li>להכין נוהל חירום.</li>
              <li>להקים צוותי התגוננות מפעליים ולתאם הכשרתם ותרגולם.</li>
              <li>
                לשמש איש קשר בין המפעל לבין גורמי החירום וההצלה, <br />וביניהם קצין
                החומרים המסוכנים המחוזי בפיקוד העורף.
              </li>
              <li>להכיר את ציוד ההתגוננות האזרחית של המפעל.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoLomda;
