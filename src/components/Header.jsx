// Header.jsx
import React from "react";
import "../components/Styles/Header.css"; // כאן ניתן להגדיר צבעים וסטייל

const Header = () => {
  return (
    <header className="app-header-0">
        
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo 2" className="logo" />
           <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo 1" className="logo" />
      </div>
      <h1 className="header-title">כותרת ראשית</h1>
    </header>
  );
};

export default Header;