import React from 'react';
import './Styles/Elevator.css';
import { useNavigate } from 'react-router-dom';

function Elevator() {
  const navigate = useNavigate();
  return (
    <main className="Elevator">
        <img
          className='elevator-building'
          src={`${process.env.PUBLIC_URL}/assets/General/mainBuilding.png`}
          alt="Pakar Logo"></img>
        
    
    </main>
  );
}

export default Elevator;