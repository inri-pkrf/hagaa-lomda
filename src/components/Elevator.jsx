import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Elevator.css';
import ElevatorButtons from './ElevatorButtons';


function Elevator() {
  const [currentUnit, setCurrentUnit] = useState("unit1");


  const navigate = useNavigate();


  const [stage, setStage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showOpenInside, setShowOpenInside] = useState(false);


  useEffect(() => {
  const savedUnit = sessionStorage.getItem("currentUnit");


  if (savedUnit) {
    const unitNumber = {
      UnitOne: "unit1",
      UnitTwo: "unit2",
      UnitThree: "unit3",
      UnitFour: "unit4"
    };


    setCurrentUnit(unitNumber[savedUnit] || "unit1");
  }
}, []);


  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5000),
      // טיימאאוט קצר אחרי התמונה השלישית (0.5 שניות)
      setTimeout(() => setShowButtons(true), 6000),
    ];


    return () => timers.forEach(clearTimeout);
  }, []);


  const handleUnitSelect = (unitName) => {
    setSelectedUnit(unitName);
    // הצג את התמונה הפתוחה בפנים עם אנימציה
    setTimeout(() => setShowOpenInside(true), 500);
    // לאחר האנימציה, נווט לעמוד הפתיחה של היחידה
    setTimeout(() => navigate(`/unit-opening/${unitName}`), 2000);
  };


  return (
    <main className="Elevator">


      {/* מעלית סגורה */}
      <img
        className={`elevator-img ${stage >= 1 ? 'fade-out' : 'visible'}`}
        src={`${process.env.PUBLIC_URL}/assets/General/Elevator.png`}
        alt=""
      />


      {/* מעלית פתוחה */}
      <img
        className={`elevator-img
          ${stage >= 1 ? 'visible' : ''}
          ${stage >= 2 ? 'zoom-in' : ''}
          ${stage >= 3 ? 'fade-out' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorOpen.png`}
        alt=""
      />


      {/* פנים המעלית */}
      <img
        className={`elevator-img-inside ${stage >= 3 ? 'fade-in-slow' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorInside.png`}
        alt=""
      />


      {/* מעלית פתוחה בפנים לאחר בחירה */}
      {showOpenInside && (
        <img
          className="elevator-img-open-inside fade-in"
          src={`${process.env.PUBLIC_URL}/assets/General/ElevatorOpenInside.png`}
          alt=""
        />
      )}


      {/* הכפתורים – מופיעים עם דיליי קצר אחרי התמונה השלישית */}
      {showButtons && !selectedUnit && (
        <div className="buttons-wrapper">
        <ElevatorButtons unit={currentUnit} onUnitSelect={handleUnitSelect} />
        </div>
      )}


    </main>
  );
}


export default Elevator;

