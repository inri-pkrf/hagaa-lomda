import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PopulationFolder() {
  const navigate = useNavigate();
 

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>אוכלוסיה העמוד של הקלסרים</h2>
      <p>This is the Population (אוכלוסיה) screen placeholder.</p>
     
      
    </div>
  );
}

export default PopulationFolder;