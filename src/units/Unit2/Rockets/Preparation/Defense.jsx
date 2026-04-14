import React, { useState } from 'react';
import '../../style/Defense.css';




function Defense() {
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
    <div>
      <h2 id='defense-headline'>כיצד נתגונן</h2>
      <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/questionIcon.png`} alt="Siren" id='alert-defense-icon'/>
      <p id='defense-text1'>סדר העדיפויות בכניסה למרחב מוגן</p>
      <p id='defense-text2'>נפעל בהתאם לזמן העומד לרשותנו ולפי סדר העדיפויות:</p>
      <div id='defense-list'>
        <p id='defense-text3'>
          <span id='defense-numbers1'>1.</span>
          מרחב מוגן
        </p>
        <p id='defense-text4'>
          <span id='defense-numbers2'>2.</span>
          מקלט
        </p>
        <p id='defense-text5'>
          <span id='defense-numbers3'>3.</span>
          חדר מדרגות פנימי
        </p>
        <p id='defense-text6'>
          <span id='defense-numbers4'>4.</span>
          חדר פנימי
        </p>
      </div>
      <p id='defense-text7'>תכנון קיבולת אדם למבנה</p>
      <p id='defense-text8'>
        יש להקצות 1.25 מ”ר לאדם במרחב מוגן.
        במוסדות חינוך יש להקצות 0.5 מ”ר למרחב מוגן.
      </p>
      <p id='defense-text9'>קומתי/דירתי</p>
      <p id='defense-text10'>משותף/ציבורי</p>
      <a href="https://www.oref.org.il/heb/life-saving-guidelines/rocket-and-missile-attacks
" target="_blank" rel="noopener noreferrer" id='website-link'>
         לחצו כאן להנחיות מצילות חיים        
      </a>
      <button id='alert-next-button' onClick={handleNextClick}>next</button>
    </div>
     )}
      {currentPage === 2 && (
        <div>
          <h2 id='defense-headline'>כיצד נתגונן</h2>
          <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/questionIcon.png`} alt="Siren" id='alert-defense-icon'/>
          <h2 id='defense-dircations'>צפו בסרטון, בסיום לחצו על החץ להמשך</h2>
            <iframe
            width="1025"
            height="575"
            src="https://www.youtube.com/embed/DXIS78vRaQ4"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            id='video-defense'
          ></iframe>
          <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
          </div>
   
      )}
   
   
    </>
  );
}








export default Defense;

