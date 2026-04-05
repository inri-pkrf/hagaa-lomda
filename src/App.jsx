import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import Buttons from './components/Buttons';

import QuestionsEnd from './units/Unit1/QuestionsEnd.jsx';
import OpeningPage from './units/Unit0/OpeningPage';
import Header from './components/Header';
import InfoLomda from './units/Unit0/InfoLomda';
import SideBar from './components/Sidebar.jsx';
import Elevator from './components/Elevator';
import UnitOneLayout from './units/Unit1/UnitOneLayout';
import UnitOpeningPage from './components/UnitOpeningPage';
import UnitOneSideBar from './units/Unit1/UnitOneSidebar.jsx';
import Goals from './components/Goals';
import IntroUnitOne from './units/Unit1/IntroUnitOne.jsx';
import States from './units/Unit1/states/States.jsx';
import Interfaces from './units/Unit1/Interfences/Interfaces.jsx';
import Population from './units/Unit1/Population/Population.jsx';
import IntroUnitTwo from './units/Unit2/IntroUnitTwo';
import IntroUnitThree from './units/Unit3/IntroUnitThree';
import IntroUnitFour from './units/Unit4/IntroUnitFour';
import Threats from './units/Unit1/Threats/Threats.jsx';
import PopulationLaptop from './units/Unit1/Population/PopulationLaptop.jsx';
import PopulationFolders from './units/Unit1/Population/PopulationFolder.jsx';
import PopulationGame from './units/Unit1/Population/PopulationGame.jsx';
import SummaryCheckList from './units/Unit1/SummaryCheckList.jsx';

import Rockets from './units/Unit2/Rockets/Rockets.jsx';
import InfoRockets from './units/Unit2/Rockets/Preparation/InfoRockets.jsx';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [videoPlaying, setVideoPlaying] = useState(
    sessionStorage.getItem('VIDEO_IS_PLAYING') === 'true'
  );

  // פונקציית האיפוס
  const handleResetAll = () => {
    const confirmReset = window.confirm("האם לאפס את כל ההתקדמות בלומדה ולחזור להתחלה?");
    if (confirmReset) {
      sessionStorage.clear(); // מוחק את כל ה-sessionStorage
      navigate('/'); // מחזיר לדף הפתיחה
      window.location.reload(); // מרענן כדי לאפס סטייטים פנימיים אם יש
    }
  };

  return (
    <div className="App">
      {/* כפתור איפוס זמני לפיתוח - יופיע בפינה העליונה */}
      <button className="developer-reset-btn" onClick={handleResetAll}>
        איפוס לומדה 🔄
      </button>

      {!videoPlaying && location.pathname !== "/elevator" && <Header />}
      <Buttons></Buttons>

      <Routes>
        {/* דפים ללא סידבר */}
        <Route path="/" element={<OpeningPage />} />
        <Route path="/info-lomda" element={<InfoLomda />} />
        <Route path="/elevator" element={<Elevator />} />


        {/* --- התחלת יחידה 1 עם Layout --- */}
        <Route element={<UnitOneLayout />}>
          <Route path="/unit-opening/:unitName" element={<UnitOpeningPage />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/intro-unit-one" element={<IntroUnitOne />} />
          <Route path="/threats" element={<Threats setVideoPlaying={setVideoPlaying} />} />
          <Route path="/states" element={<States />} />
          <Route path="/interfaces" element={<Interfaces />} />
          <Route path="/population" element={<Population />} />
          <Route path="/populationInfo" element={<PopulationLaptop />} />
          <Route path="/population-parts" element={<PopulationFolders />} />
          <Route path="/populationGame" element={<PopulationGame />} />
          <Route path="/summary-checklist" element={<SummaryCheckList />} />
          <Route path="/questions-end" element={<QuestionsEnd />} />
        </Route>
        {/* --- סיום יחידה 1 --- */}

        {/* יחידות אחרות (בינתיים ללא Layout) */}
        <Route path="/intro-unit-two" element={<IntroUnitTwo />} />
        <Route path="/rockets" element={<Rockets />} />
        <Route path="/info-rockets" element={<InfoRockets />} />

        <Route path="/intro-unit-three" element={<IntroUnitThree />} />
        <Route path="/intro-unit-four" element={<IntroUnitFour />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}