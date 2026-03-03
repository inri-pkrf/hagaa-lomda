import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate , useLocation } from 'react-router-dom';
import React from 'react';
import Questions from './components/Questions';
import OpeningPage from './units/Unit0/OpeningPage';
import Header from './components/Header';
import InfoLomda from './units/Unit0/InfoLomda';
import Elevator from './components/Elevator';
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