import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { populationDataLaptop } from '../../../Data/Unit1/PopulationDataLaptop';
import '../style/PopulationLaptop.css';

function PopulationLaptop() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

 const nextSlide = () => {
  if (index < populationDataLaptop.length - 1) {
    setIndex(index + 1);
  } else {
    navigate('/population', { state: { laptopFinished: true } });
  }
};
  const current = populationDataLaptop[index];

  return (
    <div className='populationLaptop-container'>
      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationLaptop.png`}
        alt="Population Laptop"
        className="populationLaptop-background"
      />

      <div className='population-content'>
        <h2>{current.title}</h2>
        <p>{current.text}</p>
      </div>

      <button className='PopulationNextButton' onClick={nextSlide}>
        הבא
      </button>

    </div>
  );
}

export default PopulationLaptop;