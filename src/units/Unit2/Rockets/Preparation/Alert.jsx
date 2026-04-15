import React, { useState } from 'react';
import '../../style/Alert.css';








function Alert() {
  const [currentPage, setCurrentPage] = useState(1);


  const handleNextClick = () => {
    setCurrentPage(2);
  };


  const handleNext2Click = () => {
    setCurrentPage(3);
  };


    const handleBackClick = () => {
    setCurrentPage(1);
  };


      const handleBack2Click = () => {
    setCurrentPage(2);
  };


  return (
    <>
      {currentPage === 1 && (
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-icon.png`} alt="Siren" id='alert-siren-icon'/>
          <h2 id='headline-icon'>התרעה</h2>
          <button id='alert-next-button' onClick={handleNextClick}>next</button>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`} alt="Siren" className='alert-background'/>
          <h1 id='alert-headline'>צפו בסרטון, בסיום הסרטון לחצו על המשך</h1>
          <iframe
            width="1025"
            height="575"
            src="https://www.youtube.com/embed/DXIS78vRaQ4"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            id='video-alert'
          ></iframe>
        </div>
      )}




      {currentPage === 2 && (
        <div id='alert-page1'>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/siren.png`} alt="Siren" id='alert-siren-icon'/>
          <h2 id='headline-icon'>התרעה</h2>
          <p id='alert-text'>כממונה הג"א עליך לוודא שמותקן צופר במפעל / קבוצת מפעלים, אשר ישמש כאמצעי התרעה לעובדים.</p>
          <p id='alert-sub-text'>החברות בהסכם עם משרד הביטחון להתקנת צופר:</p>
          <ul id='alert-list'>
            <li>אלפם</li>
            <li>שמרד</li>
            <li>מוטורלה - התקנת מערכת ״נופרית״ לצופר הקיים</li>
          </ul>
          <button id='alert-next-button' onClick={handleNext2Click}>next</button>
          <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`} alt="Siren" className='alert-background'/>
        </div>
      )}
      {currentPage === 3 && (
        <div id='alert-page2'>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/siren.png`} alt="Siren" id='alert-siren-icon'/>
          <h2 id='headline-icon'>התרעה</h2>
          <h2 id='alert-text2'>עליך לוודא כי ההתרעה נשמעת בכל שטח המפעל</h2>
          <p id='alert-sub-text2'>משימתך כממונה הג"א - בדיקת כיסוי</p>
          <ol id='alert-list2'>
            <li>יש לוודא כיסוי ההתרעה בכל שטח המפעל</li>
            <li>אם נדרש יש לתכנן אמצעי התרעה משלימה</li>
            <li>בעת הפעלת ההתרעה / צפירה – יש לבחון כיסוי מלא</li>
            <li>באזורי רעש גבוה יש לסכם כיצד מועברת ההתרעה</li>
          </ol>
          <button id='alert-back-button' onClick={handleBack2Click}>חזור</button>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/alert-background.png`} alt="Siren" className='alert-background'/>
        </div>
      )}
    </>
  );
}








export default Alert;

