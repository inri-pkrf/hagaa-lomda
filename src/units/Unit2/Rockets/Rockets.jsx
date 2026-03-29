import React, { useEffect, useState } from 'react';
import '../style/Rockets.css';


function Rockets() {
  const [startSequence, setStartSequence] = useState(false);


  useEffect(() => {
    sessionStorage.setItem('MainTitle', "ירי טילים");


    const sequenceTimeout = setTimeout(() => {
      setStartSequence(true);
    }, 2000);


    return () => {
      clearTimeout(sequenceTimeout);
    };
  }, []);


  const rocketFramesData = [
    { id: 1, text: "מאפייני האיום" },
    { id: 2, text: "היערכות והתגוננות" },
    { id: 3, text: "מרחבים מוגנים" },
    { id: 4, text: "מדיניות התגוננות" },
    { id: 5, text: "סיכום" },
  ];


  const containerClass = `rockets-container ${startSequence ? 'sequence-active' : ''}`;
  const showContent = startSequence;


  return (
    <div className={containerClass}>
      <div
        className="rockets-background-layer"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/unitTwoImgs/rocketsOpeningBg.png)`
        }}
      />


      {showContent && (
        <div className="rockets-header fade-in-delayed">
          <h2>ירי טילים - שלבי ההתגוננות</h2>
        </div>
      )}


      <div className="rockets-frames-container">
        {rocketFramesData.map((frame) => (
          <div key={frame.id} className="rocket-frame-item">
            <img
              src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/frame${frame.id}.png`}
              className="rocket-frame-img"
              alt={`frame-${frame.id}`}
            />


            {showContent && (
              <div className="rocket-frame-content fade-in-delayed">
                <p>{frame.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Rockets;



