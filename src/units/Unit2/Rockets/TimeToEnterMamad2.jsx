import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Unit2/style/TimeToEnterMamad.css";


function TimeToEnterMamad2() {
    const navigate = useNavigate();


    const handleNext2Click = () => {
        navigate('/TimeToEnterMamad3');
    };


    const handleBackClick = () => {
        navigate('/TimeToEnterMamad1');
    };








    return(
    <div>
        <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/background-timer.png`} alt="timer" id='background-timer'/>
        <button id='alert-next-button' onClick={handleNext2Click}>next</button>
        <button id='alert-back-button' onClick={handleBackClick}>חזור</button>
        <p id='frame3-text1'>זמן כניסה למרחב המוגן-סרטון </p>
        <p id='frame3-text5'>צפו בסרטון ולאחר מכן תרגלו </p>
    </div>
    );
}


export default TimeToEnterMamad2;

