import React from 'react';
import './style/IntroUnitOne.css';
function IntroUnitOne() {
          sessionStorage.setItem('MainTitle', "יחידה 1");

  return (
    <div className='IntroUnitOne'>

      <img className='first-background' src={`${process.env.PUBLIC_URL}/assets/General/Doors/Doors.png`} alt="Intro Unit 1" />
      <div>
        <div>
        
      </div>
      </div>
    
    </div>
  );
}

export default IntroUnitOne;

