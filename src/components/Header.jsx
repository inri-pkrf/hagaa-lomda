// Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBarData from "../Data/NavBarData";
import ProgressBar from "./ProgressBar";
import TitlesData from "../Data/TitlesData";
import headerData from "../Data/HeaderData"; // ← הוסף את זה
import "../components/Styles/Header.css";

const Header = () => {
  const location = useLocation();

  const [currentUnit, setCurrentUnit] = useState(
    sessionStorage.getItem("currentUnit") || "UnitZero",
  );

  const hideProgressBarPaths = [
    "/",
    "/info-lomda",
    "/Structure",
    "/units-division",
    "/elevator",
    "/questions-end/5",
    "/last-page",
  ];
  const shouldShowProgressBar = !hideProgressBarPaths.includes(
    location.pathname,
  );

  const getTitle = (pathname, unit) => {
    for (const unitData of Object.values(TitlesData)) {
      if (
        Object.prototype.hasOwnProperty.call(unitData.pages ?? {}, pathname)
      ) {
        return unitData.pages[pathname] ?? "";
      }
    }
    return TitlesData[unit]?.default || "";
  };

  const mainTitle = getTitle(location.pathname, currentUnit);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUnit = sessionStorage.getItem("currentUnit") || "UnitZero";
      if (newUnit !== currentUnit) setCurrentUnit(newUnit);
    }, 500);

    window.addEventListener("updateTotalProgress", () =>
      setCurrentUnit((prev) => prev),
    );
    return () => {
      clearInterval(interval);
      window.removeEventListener("updateTotalProgress", () =>
        setCurrentUnit((prev) => prev),
      );
    };
  }, [currentUnit]);

  const unitNumberMap = { UnitOne: 1, UnitTwo: 2, UnitThree: 3, UnitFour: 4 };
  const unitNumber = unitNumberMap[currentUnit] ?? null;

  const unitInfo =
    unitNumber !== null && NavBarData[unitNumber - 1]
      ? { ...NavBarData[unitNumber - 1], unitNumber }
      : null;

  // ⭐ צבע הרקע — אם UnitZero (או כל יחידה ללא NavBarData) לוקח מ-headerData
  const isAboutUs =
    location.pathname === "/AboutUs" || location.pathname === "/CreditPage";

  const bgColor = isAboutUs
    ? "#fca6d4"
    : (unitInfo?.color ??
      headerData[currentUnit]?.backgroundColor ??
      "#CACACA");

  const textColor = isAboutUs
    ? "#e066a7"
    : (headerData[currentUnit]?.textColor ?? "#000");

  return (
    <header
      className="app-header-0"
      style={{
        "--bg-color": `linear-gradient(90deg, ${bgColor} 0%, #FFFFFF 100%)`,
        "--text-color": textColor,
      }}
    >
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`}
          alt="Logo 2"
          className="logo"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`}
          alt="Logo 1"
          className="logo"
        />
      </div>
      <h1 className="header-title">{mainTitle}</h1>

      {shouldShowProgressBar && unitInfo && (
        <ProgressBar key={location.pathname} unitInfo={unitInfo} />
      )}
    </header>
  );
};

export default Header;
