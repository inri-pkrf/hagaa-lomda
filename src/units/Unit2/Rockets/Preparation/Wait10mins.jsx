import React, { useState } from 'react';
import '../../style/Wait10mins.css';


function Wait10mins() {
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
        <h2 id='wait10min-headline'> למה חשוב להמתין 10 דקות </h2>
        <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/timer10.png`} alt="Siren" id='wait10min-icon'/>
        <p id='wait10min-text1'>סכנה לנפילת שברי יירוט</p>
        <p id='wait10min-text2'>מטח הרקטות יכול להימשך</p>
        <p id='wait10min-text3'>שיפור ההגנה לאזרח</p>
        <button id='alert-next-button' onClick={handleNextClick}>next</button>
      </div>
    )}
    {currentPage === 2 && (
      <div>
        <h2>סרטון</h2>
        <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
      </div>
    )}


   
    </>
  );
}


export default Wait10mins;



