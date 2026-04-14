import React from 'react';
import '../../style/ProtectedSpace.css';


function ProtectedSpace() {
  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/shelter-man.png`} alt="icon" id='protectedSpace-icon'/>
      <h2 id='headline-icon-protectedSpace'>כיצד המרחב המוגן שומר עלינו?</h2>
      <h2 id='protectedSpace-headline'>צפו בסרטון, בסיום לחצו על החץ להמשך</h2>
     
    <iframe
      width="1025"
      height="575"
      src="https://www.youtube.com/embed/v4IplZeHHhs"
      title="YouTube video"
      frameBorder="0"
      allowFullScreen
      id='video-protectedSpace'
    ></iframe>
    </div>
  );
}


export default ProtectedSpace;

