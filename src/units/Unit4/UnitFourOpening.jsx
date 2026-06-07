import React from 'react';
import UnitOpeningBase from '../../components/UnitOpeningBase';
import openingData from '../../Data/OpeningData';

function UnitFourOpening() {
  return (
    <UnitOpeningBase 
      unitKey="UnitFour" 
      data={openingData.UnitFour} 
      nextPath="/goals-unit-four"
    />
  );
}

export default UnitFourOpening;