// Header.jsx
import React from "react";
import headerData from "../Data/HeaderData";
import "../components/Styles/Header.css"; // כאן ניתן להגדיר צבעים וסטייל

const Header = () => {
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitOne';
  const data = headerData[currentUnit] || { backgroundColor: '#CACACA', textColor: '#000', mainTitle: 'כותרת ראשית' };
  const mainTitle = sessionStorage.getItem('MainTitle') || data.mainTitle || 'כותרת ראשית';

  return (
    <header className="app-header-0" style={{ '--bg-color': `linear-gradient(90deg, ${data.backgroundColor} 0%, #FFFFFF 100%)`, '--text-color': data.textColor }}>
        
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo 2" className="logo" />
           <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo 1" className="logo" />
      </div>
      <h1 className="header-title">{mainTitle}</h1>
    </header>
  );
};

export default Header;