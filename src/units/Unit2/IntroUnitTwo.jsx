import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/IntroUnitTwo.css';

function IntroUnitTwo() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(`${process.env.PUBLIC_URL}/assets/General/Doors/Doors.png`);
  
  // Track which sign is being opened (door opening animation)
  const [openingSign, setOpeningSign] = useState(null);
  
  // Track which chapters are finished
  const [finishedChapters, setFinishedChapters] = useState({
    unitTwoFirst: false,
    unitTwoSecond: false,
    unitTwoThird: false,
    unitTwoFourth: false
  });

  useEffect(() => {
    sessionStorage.setItem('MainTitle', "יחידה 2");
    
    // Check currentChapter from sessionStorage
    const currentChapterStr = sessionStorage.getItem('currentChapter');
    if (currentChapterStr) {
      try {
        const currentChapter = JSON.parse(currentChapterStr);
        
        // If no chapter is set, set default
        if (!currentChapter.name) {
          sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-first', state: 'not started' }));
        }
      } catch (e) {
        sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-first', state: 'not started' }));
      }
    } else {
      sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-first', state: 'not started' }));
    }
    
    // Also check for individual finished chapters stored separately
    const finished1 = sessionStorage.getItem('unitTwo-first') === 'finished';
    const finished2 = sessionStorage.getItem('unitTwo-second') === 'finished';
    const finished3 = sessionStorage.getItem('unitTwo-third') === 'finished';
    const finished4 = sessionStorage.getItem('unitTwo-fourth') === 'finished';
    
    setFinishedChapters({
      unitTwoFirst: finished1,
      unitTwoSecond: finished2,
      unitTwoThird: finished3,
      unitTwoFourth: finished4
    });
  }, []);

  const handleSignOneClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.png`);
    setOpeningSign(1);
    setTimeout(() => {
      navigate('/rockets');
    }, 2000);
  };

  const handleSignTwoClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorTwoOpen.png`);
    setOpeningSign(2);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-second', state: 'not started' }));
    setTimeout(() => {
      navigate('/earthquakes');
    }, 2000);
  };

  const handleSignThreeClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorThreeOpen.png`);
    setOpeningSign(3);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-third', state: 'not started' }));
    setTimeout(() => {
      navigate('/fire');
    }, 2000);
  };

  const handleSignFourClick = () => {
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorFourOpen.png`);
    setOpeningSign(4);
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitTwo-fourth', state: 'not started' }));
    setTimeout(() => {
      navigate('/chemical');
    }, 2000);
  };

  return (
    <div className='IntroUnitTwo'>
      <img className='first-background' src={doorImage} alt="Intro Unit 2" />
      
      <div className='door-signs-UnitTwo'>
        {/* Sign 1 - היערכות לאיום */}
        {openingSign !== 1 && (
          <div 
            className='door-sign-UnitTwo-first' 
            onClick={handleSignOneClick} 
            style={{ cursor: 'pointer' }}
          >
            <p className='door-sign-UnitTwo-title-first'>טילים </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`} alt="Sign 1" />
          </div>
        )}

        {/* Sign 2 - מצבי תפקוד */}
        {openingSign !== 2 && (
          <div 
            className={`door-sign-UnitTwo-second ${!finishedChapters.unitTwoFirst ? 'disabled' : ''}`}
            onClick={finishedChapters.unitTwoFirst && !openingSign ? handleSignTwoClick : undefined}
            style={{ cursor: finishedChapters.unitTwoFirst && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitTwo-title-second'> רעידת אדמה</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`} alt="Sign 2" />
          </div>
        )}

        {/* Sign 3 - ממשקים */}
        {openingSign !== 3 && (
          <div 
            className={`door-sign-UnitTwo-third ${!finishedChapters.unitTwoSecond ? 'disabled' : ''}`}
            onClick={finishedChapters.unitTwoSecond && !openingSign ? handleSignThreeClick : undefined}
            style={{ cursor: finishedChapters.unitTwoSecond && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitTwo-title-third'>שריפה </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`} alt="Sign 3" />
          </div>
        )}

        {/* Sign 4 - אוכלוסיה */}
        {openingSign !== 4 && (
          <div 
            className={`door-sign-UnitTwo-fourth ${!finishedChapters.unitTwoThird ? 'disabled' : ''}`}
            onClick={finishedChapters.unitTwoThird && !openingSign ? handleSignFourClick : undefined}
            style={{ cursor: finishedChapters.unitTwoThird && !openingSign ? 'pointer' : 'default' }}
          >
            <p className='door-sign-UnitTwo-title-fourth'>חומ"ס </p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`} alt="Sign 4" />
          </div>
        )}
      </div>
      
      {/* Done images - shown when chapter is finished */}
      {finishedChapters.unitTwoFirst && (
        <img className='doorOneDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorOneDone.png`} alt="Door 1 Done" />
      )}
      
      {finishedChapters.unitTwoSecond && (
        <img className='doorTwoDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorTwoDone.png`} alt="Door 2 Done" />
      )}
      
      {finishedChapters.unitTwoThird && (
        <img className='doorThreeDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorThreeDone.png`} alt="Door 3 Done" />
      )}
      
      {finishedChapters.unitTwoFourth && (
        <img className='doorFourDone' src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsDone/DoorFourDone.png`} alt="Door 4 Done" />
      )}
    </div>
  );
}

export default IntroUnitTwo;

