import React from 'react';
import '../../style/Wait10mins.css';
import { useLocation } from 'react-router-dom';

function Wait10mins() {
  const location = useLocation();
  let page = 1;
  if (location.pathname === '/Wait10mins/2') page = 2;

  return (
    <>
      {page === 1 && (
        <div>
          <h2 id='wait10min-headline'> למה חשוב להמתין 10 דקות </h2>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/wait10min-icon.png`} alt="Siren" id='wait10min-icon'/>
          <p id='wait10min-text1'>סכנה לנפילת שברי יירוט</p>
          <p id='wait10min-text2'>מטח הרקטות יכול להימשך</p>
          <p id='wait10min-text3'>שיפור ההגנה לאזרח</p>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/image-removebg-preview (49) 1.png`} alt="Siren" id='wait10min-img1'/>
        </div>
      )}
      {page === 2 && (
        <div>
          <h2 id='wait10min-headline'> למה חשוב להמתין 10 דקות </h2>
          <img src={`${process.env.PUBLIC_URL}/assets/UnitTwoImgs/timer10.png`} alt="Siren" id='wait10min-icon'/>
          <h2 id='wait10min-dircations'>צפו בסרטון, בסיום לחצו על החץ להמשך</h2>
          <iframe
            width="1025"
            height="575"
            src="https://www.youtube.com/embed/GAovfagHHRo"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            id='video-protectedSpace'
          ></iframe>
        </div>
      )}
    </>
  );
}

export default Wait10mins;



