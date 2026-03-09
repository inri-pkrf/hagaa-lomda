import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/IntroUnitOne.css';

function IntroUnitOne() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(`${process.env.PUBLIC_URL}/assets/General/Doors/Doors.png`);
  
  // Track which sign is being opened (door opening animation)
  const [openingSign, setOpeningSign] = useState(null);
  
  // Track which chapters are finished
  const [finishedChapters, setFinishedChapters] = useState({
    unitOneFirst: false,
    unitOneSecond: false,
    unitOneThird: false,
    unitOneFourth: false
  });

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "יחידה 1");
    
    // Check currentChapter from sessionStorage
    const currentChapterStr = sessionStorage.getItem('currentChapter');
    if (currentChapterStr) {
      try {
        const currentChapter = JSON.parse(currentChapterStr);
        
        // If no chapter is set, set default
        if (!currentChapter.name) {
          sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
        }
      } catch (e) {
        sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
      }
    } else {
      sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-first', state: 'not started' }));
    }
    
    // Also check for individual finished chapters stored separately
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

  const handleSignOneClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.png`);
    setOpeningSign(1);
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
        {/* Sign 1 - היערכות לאיום */}
        {openingSign !== 1 && (
          <div 
            className='door-sign-UnitOne-first' 
            onClick={handleSignOneClick} 
            style={{ cursor: 'pointer' }}
          >
            <p className='door-sign-UnitOne-title-first'>היערכות לאיומים</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`} alt="Sign 1" />
          </div>
        )}

        {/* Sign 2 - מצבי תפקוד */}
        {openingSign !== 2 && (
          <div 
            className={`door-sign-UnitOne-second ${!finishedChapters.unitOneFirst ? 'disabled' : ''}`}
            onClick={finishedChapters.unitOneFirst && !openingSign ? handleSignTwoClick : undefined}
            style={{ cursor: finishedChapters.unitOneFirst && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-second'>מצבי תפקוד</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`} alt="Sign 2" />
          </div>
        )}

        {/* Sign 3 - ממשקים */}
        {openingSign !== 3 && (
          <div 
            className={`door-sign-UnitOne-third ${!finishedChapters.unitOneSecond ? 'disabled' : ''}`}
            onClick={finishedChapters.unitOneSecond && !openingSign ? handleSignThreeClick : undefined}
            style={{ cursor: finishedChapters.unitOneSecond && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-third'>ממשקים </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`} alt="Sign 3" />
          </div>
        )}

        {/* Sign 4 - אוכלוסיה */}
        {openingSign !== 4 && (
          <div 
            className={`door-sign-UnitOne-fourth ${!finishedChapters.unitOneThird ? 'disabled' : ''}`}
            onClick={finishedChapters.unitOneThird && !openingSign ? handleSignFourClick : undefined}
            style={{ cursor: finishedChapters.unitOneThird && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitOne-title-fourth'>אוכלוסיה </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`} alt="Sign 4" />
          </div>
        )}
      </div>
      
      {/* Done images - shown when chapter is finished */}
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

