import React, { useState } from 'react';
import "../../Unit2/style/TimeToEnterMamad.css";


function Frame3() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);


  const cities = [
    { name: "חדרה", correct: "01:30", options: ["00:30", "00:45", "01:30", "00:15"] },
    { name: "באר שבע", correct: "00:30", options: ["00:45", "01:30", "00:30", "00:15"] },
    { name: "פתח תקווה", correct: "01:30", options: ["01:30", "01:00", "00:45", "00:15"] },
    { name: "חיפה", correct: "01:00", options: ["00:30", "00:45", "01:00", "00:15"] }
  ];


  const currentCity = cities[currentCityIndex];


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


  const handleClockClick = (time, index) => {
    setSelectedAnswer(index);
    const isCorrect = time === currentCity.correct;
    setFeedback(isCorrect ? 'correct' : 'incorrect');


    if (isCorrect) {
      setTimeout(() => {
        if (currentCityIndex < cities.length - 1) {
          setCurrentCityIndex(currentCityIndex + 1);
          setSelectedAnswer(null);
          setFeedback(null);
        } else {
          setGameComplete(true);
        }
      }, 1500);
    }
  };


  const handlePlayAgain = () => {
    setCurrentCityIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setGameComplete(false);
    setCurrentPage(3);
  };


  if (currentPage === 1) {
    return (
      <div className="frame3-container">
        <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/background-timer.png`} alt="timer" id='background-timer'/>
       
        <p id="frame3-text1">זמן כניסה למרחב מוגן</p>
        <p id="frame3-text2" > עליכם להכיר את  <span id="frame3-text2-bold"> זמן ההגעה למרחב המוגן במפעל </span>  
          , ולהיערך בהתאם כדי לוודא שכל העובדים מגיעים בזמן למרחב מוגן שניתן להגיע אליו בפרק זמן זה.</p>
        <p id="frame3-text3">לכל יישוב בישראל מוגדר זמן התגוננות – הזמן העומד לרשות השוהים לפעול ולהיכנס למרחב המוגן מרגע ההתרעה.</p>
        <p id="frame3-text4">זמן התגוננות זה משתנה בין יישוב ליישוב, בהתאם למרחק שלו מהגבול, ומוגדר על ידי פיקוד העורף.
          כדי לדעת את זמן ההתגוננות בארגון שלכם:
          <div>
            היכנסו <span>
              <a href="https://www.oref.org.il/heb" id='website-link-frame3'>
                ליישומון פיקוד העורף או לפורטל החירום הלאומי,      
              </a>
          </span>
          </div>
          <div>
            הזינו את שם היישוב (ובעיר מפוצלת – גם את הכתובת המדויקת).
          </div>
        </p>
        <button id='alert-next-button' onClick={handleNextClick}>next</button>
      </div>
    );
  }


  if (currentPage === 2) {
    return (
      <div>
        <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/background-timer.png`} alt="timer" id='background-timer'/>
        <button id='alert-next-button' onClick={handleNext2Click}>next</button>
        <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
        <p id='frame3-text1'>זמן כניסה למרחב המוגן-סרטון </p>
        <p id='frame3-text5'>צפו בסרטון ולאחר מכן תרגלו </p>
      </div>
    );
  }


  if (gameComplete) {
    return (
      <div className="frame3-game-complete">
           <div className={`frame3-game-wrapper ${feedback}`}>
      <div className="frame3-game-header">
        <p id="frame3-game-headline">עיר: {currentCity.name}</p>
        <p id="frame3-text6">
          לאחר שלמדנו את עקרונות ההיערכות לירי טילים נתרגל את נושא זמן ההתרעה ותכנון מרחבים מוגנים במפעל.
          כל פעם יופיע לך מיקום למפעל שלך ועלייך יהיה לבחור בזמן ההתרעה הנכון העומד לרשותך.
            <div>
                <a href="https://www.oref.org.il/heb" id='website-link-frame3'>
               לשימושך, ליישומון פיקוד העורף או לפורטל החירום הלאומי      
              </a>
            </div>
        </p>
      </div>


      <div className="frame3-game-container">
        {currentCity.options.map((time, index) => (
          <div
            key={index}
            className={`game-clock-wrapper ${selectedAnswer === index ? (feedback === 'correct' ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleClockClick(time, index)}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/game-clock.png`} alt="timer" className='game-clocks'/>
            <p className='game-time'>{time}</p>
          </div>
        ))}
      </div>


      <div className="frame3-progress">
        <p>עיר {currentCityIndex + 1} מתוך {cities.length}</p>
      </div>
    </div>
        <button id='alert-next-button' onClick={handlePlayAgain}>שחק שוב</button>
        <button id='alert-back-button' onClick={handleBack2Click}>חזור</button>
      </div>
    );
  }


  return (
    <div className={`frame3-game-wrapper ${feedback}`}>
      <div className="frame3-game-header">
        <p id="frame3-game-headline">עיר: {currentCity.name}</p>
        <p id="frame3-text6">
          לאחר שלמדנו את עקרונות ההיערכות לירי טילים נתרגל את נושא זמן ההתרעה ותכנון מרחבים מוגנים במפעל.
          כל פעם יופיע לך מיקום למפעל שלך ועלייך יהיה לבחור בזמן ההתרעה הנכון העומד לרשותך.
            <div>
                <a href="https://www.oref.org.il/heb" id='website-link-frame3'>
               לשימושך, ליישומון פיקוד העורף או לפורטל החירום הלאומי      
              </a>
            </div>
        </p>
      </div>


      <div className="frame3-game-container">
        {currentCity.options.map((time, index) => (
          <div
            key={index}
            className={`game-clock-wrapper ${selectedAnswer === index ? (feedback === 'correct' ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleClockClick(time, index)}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/game-clock.png`} alt="timer" className='game-clocks'/>
            <p className='game-time'>{time}</p>
          </div>
        ))}
      </div>


      <div className="frame3-progress">
        <p>עיר {currentCityIndex + 1} מתוך {cities.length}</p>
      </div>
      <button id='alert-back-button' onClick={handleBack2Click}>חזור</button>
    </div>
  );
}


export default Frame3;

