import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate , useLocation } from 'react-router-dom';
import React from 'react';
import Questions from './components/Questions';
import OpeningPage from './units/Unit0/OpeningPage';
import Header from './components/Header';
import InfoLomda from './units/Unit0/InfoLomda';
import Elevator from './components/Elevator';
import UnitOpeningPage from './components/UnitOpeningPage';
import Goals from './components/Goals';
import IntroUnitOne from './units/Unit1/IntroUnitOne.jsx';
import IntroUnitTwo from './units/Unit2/IntroUnitTwo';
import IntroUnitThree from './units/Unit3/IntroUnitThree';
import IntroUnitFour from './units/Unit4/IntroUnitFour';  
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      <>
      {location.pathname !== "/elevator" && <Header />}

      {/* שאר ה-Routes שלך */}
    </>
      {/* אפשר להחזיר את הלוגו אם רוצים */}
      {/* <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`}
        alt="main-logo"
        className="main-logo"
        onClick={() => navigate('/')}
      /> */}

      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/questions/:chapter" element={<Questions />} />
        <Route path="/info-lomda" element={<InfoLomda />} />
        <Route path="/elevator" element={<Elevator />} />
        <Route path="/unit-opening/:unitName" element={<UnitOpeningPage />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/intro-unit-one" element={<IntroUnitOne />} />
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