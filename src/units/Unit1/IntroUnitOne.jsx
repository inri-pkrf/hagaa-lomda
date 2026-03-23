import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    sessionStorage.setItem('MainTitle', "יחידה 1");
    
    const currentChapterStr = sessionStorage.getItem('currentChapter');
    if (currentChapterStr) {
      try {
        const currentChapter = JSON.parse(currentChapterStr);
        
        if (!currentChapter.name) {
          sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
        }
      } catch (e) {
        sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
      }
    } else {
      sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
    }
    
    const finished1 = sessionStorage.getItem('unitOne-first') === 'finished';
    const finished2 = sessionStorage.getItem('unitOne-second') === 'finished';
    const finished3 = sessionStorage.getItem('unitOne-third') === 'finished';
    const finished4 = sessionStorage.getItem('unitOne-fourth') === 'finished';
    
    setFinishedChapters({
      unitOneFirst: finished1,
      unitOneSecond: finished2,
      unitOneThird: finished3,
      unitOneFourth: finished4
    });
  }, []);

// 1. Determine the furthest point the user has reached
const reachedSecond = finishedChapters.unitOneFirst;
const reachedThird = finishedChapters.unitOneSecond;
const reachedFourth = finishedChapters.unitOneThird;

// 2. A door is clickable if:
//    - It is the first door
//    - OR the previous door is finished
//    - OR the door itself was already finished (revisiting)
const canEnterFirst = true;
const canEnterSecond = reachedSecond || finishedChapters.unitOneSecond;
const canEnterThird = reachedThird || finishedChapters.unitOneThird;
const canEnterFourth = reachedFourth || finishedChapters.unitOneFourth;

  const handleSignOneClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.png`);
    setOpeningSign(1);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' })); // קטן אבל חשוב
    setTimeout(() => {
      navigate('/threats');
    }, 2000);
  };

  const handleSignTwoClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorTwoOpen.png`);
    setOpeningSign(2);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'not started' }));
    setTimeout(() => {
      navigate('/states');
    }, 2000);
  };

  const handleSignThreeClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorThreeOpen.png`);
    setOpeningSign(3);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-third', state: 'not started' }));
    setTimeout(() => {
      navigate('/interfaces');
    }, 2000);
  };

  const handleSignFourClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorFourOpen.png`);
    setOpeningSign(4);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-fourth', state: 'not started' }));
    setTimeout(() => {
      navigate('/population');
    }, 2000);
  };

  return (
    <div className='IntroUnitOne'>
      <img className='first-background' src={doorImage} alt="Intro Unit 1" />
      
      <div className='door-signs-UnitOne'>
        
        {/* Sign 1 */}
        {openingSign !== 1 && (
          <div 
            className='door-sign-UnitOne-first' 
            onClick={!openingSign && canEnterFirst ? handleSignOneClick : undefined}
            style={{ cursor: !openingSign && canEnterFirst ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-first'>היערכות לאיומים</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`} alt="Sign 1" />
          </div>
        )}

        {/* Sign 2 */}
        {openingSign !== 2 && (
          <div 
            className={`door-sign-UnitOne-second ${!canEnterSecond ? 'disabled' : ''}`}
            onClick={!openingSign && canEnterSecond ? handleSignTwoClick : undefined}
            style={{ cursor: !openingSign && canEnterSecond ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-second'>מצבי תפקוד</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`} alt="Sign 2" />
          </div>
        )}

        {/* Sign 3 */}
        {openingSign !== 3 && (
          <div 
            className={`door-sign-UnitOne-third ${!canEnterThird ? 'disabled' : ''}`}
            onClick={!openingSign && canEnterThird ? handleSignThreeClick : undefined}
            style={{ cursor: !openingSign && canEnterThird ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-third'>ממשקים </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`} alt="Sign 3" />
          </div>
        )}

        {/* Sign 4 */}
        {openingSign !== 4 && (
          <div 
            className={`door-sign-UnitOne-fourth ${!canEnterFourth ? 'disabled' : ''}`}
            onClick={!openingSign && canEnterFourth ? handleSignFourClick : undefined}
            style={{ cursor: !openingSign && canEnterFourth ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-fourth'>אוכלוסיה </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`} alt="Sign 4" />
          </div>
        )}
      </div>
      
      {finishedChapters.unitOneFirst && (
        <img className='doorOneDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`} alt="Door 1 Done" />
      )}
      
      {finishedChapters.unitOneSecond && (
        <img className='doorTwoDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`} alt="Door 2 Done" />
      )}
      
      {finishedChapters.unitOneThird && (
        <img className='doorThreeDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`} alt="Door 3 Done" />
      )}
      
      {finishedChapters.unitOneFourth && (
        <img className='doorFourDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`} alt="Door 4 Done" />
      )}
    </div>
  );
}

export default IntroUnitOne;