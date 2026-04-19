import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Unit2/style/TimeToEnterMamad.css";


function TimeToEnterMamad3() {
      const [currentCityIndex, setCurrentCityIndex] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState(null);
      const [feedback, setFeedback] = useState(null);
      const [gameComplete, setGameComplete] = useState(false);
   
      const navigate = useNavigate();
   
   
      const cities = [
        { name: "חדרה", correct: "01:30", options: ["00:30", "00:45", "01:30", "00:15"] },
        { name: "באר שבע", correct: "00:30", options: ["00:45", "01:30", "00:30", "00:15"] },
        { name: "פתח תקווה", correct: "01:30", options: ["01:30", "01:00", "00:45", "00:15"] },
        { name: "חיפה", correct: "01:00", options: ["00:30", "00:45", "01:00", "00:15"] }
      ];
   
   
      const currentCity = cities[currentCityIndex];
   
   
      const handleBack2Click = () => {
        navigate('/TimeToEnterMamad2');
      };
   
      const handleToGameClick = () => {
        navigate('/SafeRoomExercise');
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
      };


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
       <button id='alert-game-button' onClick={handleToGameClick}>next</button>
    </div>
  );
}


export default TimeToEnterMamad3;

