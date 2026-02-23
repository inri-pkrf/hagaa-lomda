import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

import OpeningPage from './units/Unit0/OpeningPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      {/* לוגו שניתן ללחוץ עליו */}
      {/* <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`}
        alt="main-logo"
        className="main-logo"
        onClick={() => navigate('/')}
      /> */}

      {/* Routes – כרגע רק עמוד פתיחה */}
      <Routes>
        <Route path="/" element={<OpeningPage />} />
      </Routes>
    </div>
  );
}

// AppWrapper עם HashRouter
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;