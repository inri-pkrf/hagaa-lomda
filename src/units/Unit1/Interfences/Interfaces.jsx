import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Interfaces.css";
import InterfencesData from "../../../Data/Unit1/InterfencesData.js";
import InterfacePopUp from "./InterfacePopUp";

function Interfaces() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [visited, setVisited] = useState([]);

  const totalItems = Object.keys(InterfencesData).length;
  const isAllVisited = visited.length === totalItems;

  useEffect(() => {
    const saved = sessionStorage.getItem("interfacesVisited");
    if (saved) setVisited(JSON.parse(saved));

    sessionStorage.setItem("MainTitle", "ממשקים");

    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !isAllVisited }),
    );
    window.dispatchEvent(
      new CustomEvent("setPrevBtnDisabled", { detail: false }),
    );

    const handleNext = (e) => {
      if (isAllVisited) {
        e.preventDefault();
        navigate("/interfaces-game");
      }
    };

    const handlePrev = (e) => {
      e.preventDefault();
      navigate("/intro-unit-one");
    };

    window.addEventListener("onNextNav", handleNext);
    window.addEventListener("onPrevNav", handlePrev);

    return () => {
      window.removeEventListener("onNextNav", handleNext);
      window.removeEventListener("onPrevNav", handlePrev);
    };
  }, [isAllVisited, navigate]);

  const handleTriangleClick = (key, item) => {
    setSelectedItem(item);

    if (!visited.includes(key)) {
      const updated = [...visited, key];
      setVisited(updated);
      sessionStorage.setItem("interfacesVisited", JSON.stringify(updated));

      if (updated.length === totalItems) {
        window.dispatchEvent(
          new CustomEvent("setNextBtnDisabled", { detail: false }),
        );
      }
    }
  };

  const handleDevSkip = (e) => {
    e.stopPropagation();
    const allKeys = Object.keys(InterfencesData);
    setVisited(allKeys);
    sessionStorage.setItem("interfacesVisited", JSON.stringify(allKeys));
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: false }),
    );
  };

  return (
    <div
      className="interfaces-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitOneImgs/Interfences/InterfencesBackground.jpg)`,
      }}
    >
      <h2 className="interfaces-title">
        במסגרת תפקידכם, עליכם לעבוד בשיתוף פעולה עם הגופים השונים. יש ללחוץ על
        הכרטיסיות שעל השולחן כדי ללמוד על הממשקים איתם:
      </h2>

      {Object.keys(InterfencesData).map((key) => {
        const item = InterfencesData[key];
        const keyNum = Number(key);

        const rotationAngle =
          keyNum <= 5 ? "-5deg" : keyNum <= 10 ? "-7deg" : "0deg";

        const needsFlip = keyNum >= 6;

        return (
          <div
            key={key}
            className={`tringle t${key} ${visited.includes(key) ? "visited" : ""}`}
            onClick={() => handleTriangleClick(key, item)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/UnitOneImgs/Interfences/NameTringle.webp)`,
            }}
          >
            <p
              style={{
                transform: `rotate(${rotationAngle}) ${needsFlip ? "scaleX(-1)" : ""}`,
                whiteSpace: "nowrap",
                direction: "rtl",
              }}
            >
              {item.name}
            </p>
          </div>
        );
      })}

      {selectedItem && (
        <InterfacePopUp
          title={selectedItem.name}
          description={selectedItem.description}
          image={selectedItem.image}
          circleColor={selectedItem.colorCircle}
          Imgid={selectedItem.Imgid}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default Interfaces;
