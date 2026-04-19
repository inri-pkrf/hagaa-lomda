import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Unit2/style/TimeToEnterMamad.css";


function TimeToEnterMamad1() {
  const navigate = useNavigate();


  const handleNextClick = () => {
    navigate('/TimeToEnterMamad2');
  };


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


export default TimeToEnterMamad1;

