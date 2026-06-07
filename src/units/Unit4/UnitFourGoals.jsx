import React from 'react';
import GoalsBase from '../../components/GoalsBase';
import goalsData from '../../Data/GoalsData'; // ודאי שהשם תואם לקובץ שלך

function UnitFourGoals() {
  return (
    <GoalsBase 
      unitKey="UnitFour" 
      data={goalsData.UnitFour} 
    />
  );
}

export default UnitFourGoals;