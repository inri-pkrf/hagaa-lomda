import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UnitOneSidebar from './UnitOneSidebar';
import './style/IntroUnitOne.css';

function IntroUnitOne() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(`${process.env.PUBLIC_URL}/assets/General/Doors/Doors.png`);
  const [openingSign, setOpeningSign] = useState(null);

  const [finishedChapters, setFinishedChapters] = useState({
    unitOneFirst: false,
    unitOneSecond: false,
    unitOneThird: false,
    unitOneFourth: false
  });

  useEffect(() => {
    // הפעלת חץ קדימה רק כאשר כל הדלתות גמורות, חץ אחורה תמיד פעיל
    const allDone = Object.values(finishedChapters).every(val => val === true);
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !allDone }));
    window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));
    // אין צורך להחזיר cleanup שמבטל את החצים, כדי שלא יגרום להבהוב/באגים
  }, [finishedChapters]);

  // עדכון סטטוס דלתות בכל הופעה/פוקוס של הדף
  useEffect(() => {
    sessionStorage.setItem('MainTitle', "יחידה 1");
    const updateFinished = () => {
      setFinishedChapters({
        unitOneFirst: sessionStorage.getItem('unitOne-first') === 'finished',
        unitOneSecond: sessionStorage.getItem('unitOne-second') === 'finished',
        unitOneThird: sessionStorage.getItem('unitOne-third') === 'finished',
        unitOneFourth: sessionStorage.getItem('unitOne-fourth') === 'finished'
      });
    };
    updateFinished();
    window.addEventListener('focus', updateFinished);
    document.addEventListener('visibilitychange', updateFinished);
    return () => {
      window.removeEventListener('focus', updateFinished);
      document.removeEventListener('visibilitychange', updateFinished);
    };
  }, []);

  // --- לוגיקת החצים הכלליים ---
  useEffect(() => {
    const handleNext = (e) => {
      // אם כבר יש אנימציה של דלת נפתחת, אל תעשה כלום
      if (openingSign) return;

      e.preventDefault(); // עוצר את הניווט האוטומטי של Buttons.js לפרק הבא במסדרון

      // החלטה איזו דלת לפתוח לפי סדר ההתקדמות
      if (!finishedChapters.unitOneFirst) {
        handleSignOneClick();
      } else if (!finishedChapters.unitOneSecond) {
        handleSignTwoClick();
      } else if (!finishedChapters.unitOneThird) {
        handleSignThreeClick();
      } else if (!finishedChapters.unitOneFourth) {
        handleSignFourClick();
      } else {
        // אם הכל גמור, החץ יעביר לשאלות הסיכום
        navigate('/questions-end');
      }
    };

    window.addEventListener('onNextNav', handleNext);
    return () => window.removeEventListener('onNextNav', handleNext);
  }, [finishedChapters, openingSign]);

  const allDoorsFinished = Object.values(finishedChapters).every(val => val === true);

  // פונקציות פתיחת הדלתות
  const handleSignOneClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.png`);
    setOpeningSign(1);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
    setTimeout(() => navigate('/threats'), 2000);
  };

  const handleSignTwoClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorTwoOpen.png`);
    setOpeningSign(2);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'not started' }));
    setTimeout(() => navigate('/states'), 2000);
  };

  const handleSignThreeClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorThreeOpen.png`);
    setOpeningSign(3);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-third', state: 'not started' }));
    setTimeout(() => navigate('/interfaces'), 2000);
  };

  const handleSignFourClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorFourOpen.png`);
    setOpeningSign(4);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-fourth', state: 'not started' }));
    setTimeout(() => navigate('/population'), 2000);
  };

  const canEnterSecond = finishedChapters.unitOneFirst;
  const canEnterThird = finishedChapters.unitOneSecond;
  const canEnterFourth = finishedChapters.unitOneThird;

  return (
    <div className='IntroUnitOne'>
      <UnitOneSidebar />

      <div className='subtext-IntroUnitOne'>
      יחידה זו  בנויה מ - 4 תתי-נושאים, בלחיצה על כל דלת יפתח תת-נושא חדש
      </div>

      <img className='first-background' src={doorImage} alt="Intro Unit 1" />
      
      <div className='door-signs-UnitOne'>
        {openingSign !== 1 && (
          <div className='door-sign-UnitOne-first' onClick={!openingSign ? handleSignOneClick : undefined} style={{ cursor: 'pointer' }}>
            <p className='door-sign-UnitOne-title-first'>היערכות לאיומים</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`} alt="Sign 1" />
          </div>
        )}
        {openingSign !== 2 && (
          <div className={`door-sign-UnitOne-second ${!canEnterSecond ? 'disabled' : ''}`} onClick={!openingSign && canEnterSecond ? handleSignTwoClick : undefined}>
            <p className='door-sign-UnitOne-title-second'>מצבי תפקוד</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`} alt="Sign 2" />
          </div>
        )}
        {openingSign !== 3 && (
          <div className={`door-sign-UnitOne-third ${!canEnterThird ? 'disabled' : ''}`} onClick={!openingSign && canEnterThird ? handleSignThreeClick : undefined}>
            <p className='door-sign-UnitOne-title-third'>ממשקים </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`} alt="Sign 3" />
          </div>
        )}
        {openingSign !== 4 && (
          <div className={`door-sign-UnitOne-fourth ${!canEnterFourth ? 'disabled' : ''}`} onClick={!openingSign && canEnterFourth ? handleSignFourClick : undefined}>
            <p className='door-sign-UnitOne-title-fourth'>אוכלוסיה </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`} alt="Sign 4" />
          </div>
        )}
      </div>
      
      {/* תמונות ה-V */}
      {finishedChapters.unitOneFirst && <img className='doorOneDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`} alt="1" />}
      {finishedChapters.unitOneSecond && <img className='doorTwoDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`} alt="2" />}
      {finishedChapters.unitOneThird && <img className='doorThreeDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`} alt="3" />}
      {finishedChapters.unitOneFourth && <img className='doorFourDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`} alt="4" />}

    </div>
  );
}

export default IntroUnitOne;