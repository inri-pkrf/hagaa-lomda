import React from 'react';
import UnitOpeningBase from '../../components/UnitOpeningBase';
import openingData from '../../Data/OpeningData';

function UnitThreeOpening() {
  return (
    <UnitOpeningBase 
      unitKey="UnitThree" 
      data={openingData.UnitThree} 
      nextPath="/goals-unit-three"
    />
  );
}

export default UnitThreeOpening;