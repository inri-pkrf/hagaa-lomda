import React, { useState } from 'react';
import '../../style/Alert.css';


function Alert() {
  const [currentPage, setCurrentPage] = useState(1);


  const handleNextClick = () => {
    setCurrentPage(2);
  };


  const handleBackClick = () => {
    setCurrentPage(1);
  };


  return (
    <>
      {currentPage === 1 && (
        <div id='alert-page1'>
          <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/siren.png`} alt="Siren" id='alert-siren-icon'/>
          <h2 id='headline-icon'>התרעה</h2>
          <p id='alert-text'>כממונה הג"א עליך לוודא שמותקן צופר במפעל / קבוצת מפעלים, אשר ישמש כאמצעי התרעה לעובדים.</p>
          <p id='alert-sub-text'>החברות בהסכם עם משרד הביטחון להתקנת צופר:</p>
          <ul id='alert-list'>
            <li>אלפם</li>
            <li>שמרד</li>
            <li>מוטורלה - התקנת מערכת ״נופרית״ לצופר הקיים</li>
          </ul>
          <button id='alert-next-button' onClick={handleNextClick}>next</button>
        </div>
      )}
      {currentPage === 2 && (
        <div id='alert-page2'>
          <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/siren.png`} alt="Siren" id='alert-siren-icon'/>
          <h2 id='headline-icon'>התרעה</h2>
          <h2 id='alert-text2'>עליך לוודא כי ההתרעה נשמעת בכל שטח המפעל</h2>
          <p id='alert-sub-text2'>משימתך כממונה הג"א - בדיקת כיסוי</p>
          <ol id='alert-list2'>
            <li>יש לוודא כיסוי ההתרעה בכל שטח המפעל</li>
            <li>אם נדרש יש לתכנן אמצעי התרעה משלימה</li>
            <li>בעת הפעלת ההתרעה / צפירה – יש לבחון כיסוי מלא</li>
            <li>באזורי רעש גבוה יש לסכם כיצד מועברת ההתרעה</li>
          </ol>
          <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
        </div>
      )}
    </>
  );
}


export default Alert;

