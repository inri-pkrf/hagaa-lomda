import React from 'react';
import GoalsBase from '../../components/GoalsBase';
import goalsData from '../../Data/GoalsData'; // ודאי שהשם תואם לקובץ שלך

function UnitThreeGoals() {
  return (
    <GoalsBase 
      unitKey="UnitThree" 
      data={goalsData.UnitThree} 
    />
  );
}

export default UnitThreeGoals;