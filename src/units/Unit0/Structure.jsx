import React, { useEffect } from 'react';
import './Styles/OpeningPage.css';
import { useNavigate } from 'react-router-dom';

function Structure() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNext = (e) => {
      navigate('/info-lomda');
    };

    window.addEventListener('onNextNav', handleNext);

    return () => {
      window.removeEventListener('onNextNav', handleNext);
    };
  }, [navigate]);

  return (
    <main
      className="OpeningPage"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/General/mainBackground.jpg)`,
      }}
    >
      <img
        className='openingPage-building'
        src={`${process.env.PUBLIC_URL}/assets/General/mainBuilding.png`}
        alt="Pakar Logo"
      />
    </main>
  );
}

export default Structure;