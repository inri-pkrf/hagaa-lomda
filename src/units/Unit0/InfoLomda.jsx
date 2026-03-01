import React from 'react';
import './Styles/InfoLomda.css';
import { useNavigate } from 'react-router-dom';

function InfoLomda() {
    const navigate = useNavigate();
  return (
    <div className="InfoLomda">
      <div className='InfoLomdaCard'>
      <h2 className="InfoLomda-title">ברוכים וברוכות הבאים והבאות ללומדה להכשרת ממונה הג"א</h2>
      <p className='InfoLomda-par1'>מטרת הלומדה להכשיר אותכם ואתכן לתפקיד.
  על מנת שתוכלו  לתכנן את מערך ההתגוננות האזרחית במפעל ובכך להציל חיים ולסייע לשמירת על רציפות התפקוד של במצבי החירום.</p>
      <p className='InfoLomda-par2'> 
        שימו לב: לומדה זו מיועדת לממונה הג"א (התגוננות אזרחית) במפעל חיוני/קיומי
     עם זאת, כל ממונה הג"א בכל ארגון אחר (שאיננו מפעל חיוני) יכול ללמוד מיחידה זו את הנושאים הרלוונטיים אליו)
      <br/>
      </p>
      <p className='InfoLomda-par3'> 
       <b>כיצד תתמצאו בלומדה?</b><br/>
       בחלק העליון של הלומדה, יוצגו פרקי הלימוד בתפריט, באופן שיאפשר לכם לשייך את תוכן הלימוד לפרק הרלוונטי, ולהתעדכן על סיומו. <br />
       תוכל לעבור בין הפרקים שהושלמו על ידי לחיצה על הפרק הרצוי,  או לנווט באמצעות כפתורי "הבא"/"הקודם". 
      </p>
      <ul className='InfoLomda-ul'>
        <li>זמן משוער לביצוע יחידה בלומדה: כ- 20 דקות.</li>
        <li>יחידה זו מנוסחת בלשון זכר, אך פונה לשני המינים.</li>
        <li>יחידה זו כוללת שימוש בסאונד, לכן מומלץ להצטייד באמצעי שמע.</li>
      </ul>
      <p className='InfoLomda-par4'>
        <b>שימו לב !</b>
        בסיום הלומדה יתבצע מבדק מסכם- ציון עובר במבדק הינו 70.
      </p>
      </div>
       <button className="start-button-InfoLomda" onClick={() => navigate('/elevator')}>
כפתור המשך לבינתיים           </button>
    </div>
  );
}

export default InfoLomda;

