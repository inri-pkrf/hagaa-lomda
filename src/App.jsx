import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import Questions from './components/Questions';
import OpeningPage from './units/Unit0/OpeningPage';
import Header from './components/Header';
import InfoLomda from './units/Unit0/InfoLomda';
function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
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