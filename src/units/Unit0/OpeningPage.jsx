import React from 'react';
import './Styles/OpeningPage.css';
import { useNavigate } from 'react-router-dom';

function OpeningPage() {
  const navigate = useNavigate();
  return (
    <main className="OpeningPage">
        <img
          className='openingPage-building'
          src={`${process.env.PUBLIC_URL}/assets/General/mainBuilding.png`}
          alt="Pakar Logo"></img>
          <button className="start-button-openingPage" onClick={() => navigate('/info-lomda')}>
כפתור התחלה לבינתיים           </button>
        
    
    </main>
  );
}

export default OpeningPage;