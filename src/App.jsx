import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate , useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Questions from './components/Questions';
import OpeningPage from './units/Unit0/OpeningPage';
import Header from './components/Header';
import InfoLomda from './units/Unit0/InfoLomda';
import Elevator from './components/Elevator';
import UnitOpeningPage from './components/UnitOpeningPage';
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
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [videoPlaying, setVideoPlaying] = useState(
    sessionStorage.getItem('VIDEO_IS_PLAYING') === 'true'
  );

  return (
    <div className="App">
      <>
        {location.pathname !== "/elevator" && !videoPlaying && <Header />}
      </>

      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/questions/:chapter" element={<Questions />} />
        <Route path="/info-lomda" element={<InfoLomda />} />
        <Route path="/elevator" element={<Elevator />} />
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
        <Route path="/intro-unit-two" element={<IntroUnitTwo />} />
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