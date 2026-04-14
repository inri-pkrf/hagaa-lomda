import React from 'react';
import UnitOpeningBase from '../../components/UnitOpeningBase';
import openingData from '../../Data/OpeningData';

function UnitOneOpening() {
  return (
    <UnitOpeningBase 
      unitKey="UnitOne" 
      data={openingData.UnitOne} 
      nextPath="/goals-unit-one"
    />
  );
}

export default UnitOneOpening;