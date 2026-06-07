import React from 'react';
import UnitOpeningBase from '../../components/UnitOpeningBase';
import openingData from '../../Data/OpeningData';

function UnitTwoOpening() {
  return (
    <UnitOpeningBase 
      unitKey="UnitTwo" 
      data={openingData.UnitTwo} 
     nextPath="/goals-unit-two"
    />
  );
}

export default UnitTwoOpening;