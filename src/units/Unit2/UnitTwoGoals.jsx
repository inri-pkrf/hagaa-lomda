import React from 'react';
import GoalsBase from '../../components/GoalsBase';
import goalsData from '../../Data/GoalsData'; // ודאי שהשם תואם לקובץ שלך

function UnitTwoGoals() {
  return (
    <GoalsBase 
      unitKey="UnitTwo" 
      data={goalsData.UnitTwo} 
    />
  );
}

export default UnitTwoGoals;