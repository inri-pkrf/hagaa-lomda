import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/IntroUnitOne.css';
function IntroUnitOne() {
  const navigate = useNavigate();
  const [doorImage, setDoorImage] = useState(`${process.env.PUBLIC_URL}/assets/General/Doors/Doors.png`);
  const [hideFirstSign, setHideFirstSign] = useState(false);

  sessionStorage.setItem('MainTitle', "יחידה 1");
  sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'UnitOne-first', state: 'not started' }));

  const handleSignOneClick = () => {
    setHideFirstSign(true);
    setDoorImage(`${process.env.PUBLIC_URL}/assets/General/Doors/DoorOneOpen.png`);
    setTimeout(() => {
      navigate('/threats');
    }, 2000); // 2 seconds
  };

  return (
    <div className='IntroUnitOne'>

      <img className='first-background' src={doorImage} alt="Intro Unit 1" />
      <div className='door-signs-UnitOne'>
        {!hideFirstSign && (
          <div className='door-sign-UnitOne-first' onClick={handleSignOneClick} style={{ cursor: 'pointer' }}>
            <p className='door-sign-UnitOne-title-first'>היערכות לאיומים</p>
            <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignOne.png`} alt="Sign 1" />
          </div>
        )}
        <div className='door-sign-UnitOne-second disabled'>
          <p className='door-sign-UnitOne-title-second'>מצבי תפקוד</p>
          <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignTwo.png`} alt="Sign 2" />
        </div>
        <div className='door-sign-UnitOne-third disabled'>
          <p className='door-sign-UnitOne-title-third'>ממשקים </p>
          <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignThree.png`} alt="Sign 3" />
        </div>
        <div className='door-sign-UnitOne-fourth disabled'>
          <p className='door-sign-UnitOne-title-fourth'>אוכלוסיה </p>
          <img src={`${process.env.PUBLIC_URL}/assets/General/Doors/DoorsSigns/DoorSignFour.png`} alt="Sign 4" />
        </div>
      </div>
      <div>

      </div>
    </div>


  );
}

export default IntroUnitOne;

