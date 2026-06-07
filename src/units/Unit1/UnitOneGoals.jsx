import React from 'react';
import GoalsBase from '../../components/GoalsBase';
import goalsData from '../../Data/GoalsData'; // ודאי שהשם תואם לקובץ שלך

function UnitOneGoals() {
  return (
    <GoalsBase 
      unitKey="UnitOne" 
      data={goalsData.UnitOne} 
    />
  );
}

export default UnitOneGoals;