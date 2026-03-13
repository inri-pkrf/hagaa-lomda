import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Population.css';

function Population() {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationBackground.png`;
  const laptopImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationLaptop.png`;
  const bindersImg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationFolders.png`;

  const [bgImage, setBgImage] = useState(backgroundImg);
  const [animate, setAnimate] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('MainTitle', " אוכלוסיה");

    const laptopFinished =
      location.state?.laptopFinished ||
      sessionStorage.getItem("populationLaptopFinished");

 const steps = laptopFinished
  ? [
      { bg: laptopImg, animate: 'zoom-out-strong', delay: 2000 },
      { bg: backgroundImg, animate: 'fade-in-background', delay: 1500 },
      { showCheck: true, delay: 1200 },
      { animate: 'zoom-in-left', delay: 1500 , hideCheck: true },
      { bg: bindersImg, animate: 'zoom-in-gentle', delay: 1800 },  
      { animate: 'zoom-out-gentle', delay: 1800 }, // zoom-out קלסרים
      { animate: 'final-binders', delay: 0 },
      { navigate: '/population-parts', delay: 6000 }
    ]
      : [
          { animate: 'zoom-in-population', delay: 1000 },
          { bg: laptopImg, animate: 'zoom-out-population', delay: 2500 },
          { navigate: '/PopulationInfo', delay: 2000 },
        ];

    let index = 0;
    let timeout;

    const runStep = () => {
      const step = steps[index];
      if (!step) return;

      if (step.bg) setBgImage(step.bg);
      if (step.animate) setAnimate(step.animate);
if (step.showCheck) setShowCheck(true);
if (step.hideCheck) setShowCheck(false);
      if (step.navigate) {
        navigate(step.navigate);
        return;
      }

      timeout = setTimeout(() => {
        index++;
        runStep();
      }, step.delay || 1000);
    };

    runStep();

    return () => clearTimeout(timeout);
  }, [navigate, location]);

  return (
    <div className="population-container">
      <img
        className={`room-background-population ${animate}`}
        src={bgImage}
        alt=""
      />
      {showCheck && <div className="population-laptop-check">✔</div>}
    </div>
  );
}

export default Population;