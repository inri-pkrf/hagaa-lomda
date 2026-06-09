import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/UnitOpeningPage.css";

function UnitOpeningBase({ unitKey, data, nextPath }) {
  const navigate = useNavigate();

  // Hook 1: עדכון כותרות וסיידבר + סימון opening כהושלם
  useEffect(() => {
    if (data) {
      sessionStorage.setItem("MainTitle", data.mainTitle);
      sessionStorage.setItem(`${unitKey.toLowerCase()}-opening`, "finished");
      window.dispatchEvent(new Event("updateNavbar"));
    }
  }, [data, unitKey]);

  if (!data) return null;

  const { colors } = data;

  return (
    <main
      className="UnitOpeningPage"
      style={{
        "--card-main": colors.main,
        "--card-layer1": colors.layer1,
        "--card-layer2": colors.layer2,
        "--card-layer3": colors.layer3,
        "--card-layer4": colors.layer4,
        "--card-text": colors.text,
      }}
    >
      <img
        className="UnitOpeningPage__building"
        src={`${process.env.PUBLIC_URL}${data.image}`}
        alt={data.mainTitle}
      />

      <div className="UnitOpeningPage_cards">
        <h1 className="UnitOpeningPage__title">{data.title}</h1>
        <p className="UnitOpeningPage__subtitle">{data.subtitle}</p>
        <div className="UnitOpeningPage__text">{data.text}</div>
      </div>
    </main>
  );
}

export default UnitOpeningBase;
