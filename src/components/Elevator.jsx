import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Elevator.css";
import ElevatorButtons from "./ElevatorButtons";

function Elevator() {
  const [currentUnit, setCurrentUnit] = useState("unit1");
  const navigate = useNavigate();

  const [stage, setStage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showOpenInside, setShowOpenInside] = useState(false);
  const [autoHover, setAutoHover] = useState(false);

  // ✅ רפרנס למוזיקה
  const audioRef = useRef(null);

  const floorToPath = {
    unit1: "/unit-one-opening",
    unit2: "/unit-two-opening",
    unit3: "/unit-three-opening",
    unit4: "/unit-four-opening",
  };

  // ─── טעינת יחידה ─────────────────────────────
  useEffect(() => {
    const savedUnit = sessionStorage.getItem("currentUnit");

    if (savedUnit) {
      const unitNumber = {
        UnitOne: "unit1",
        UnitTwo: "unit2",
        UnitThree: "unit3",
        UnitFour: "unit4",
      };

      setCurrentUnit(unitNumber[savedUnit] || "unit1");
    }
  }, []);

  // ─── הפעלת מוזיקה ─────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // ─── אנימציית מעלית ───────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5000),
      setTimeout(() => setShowButtons(true), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // ─── hover אוטומטי + פתיחה + ניווט ───────────
// ─── hover אוטומטי + פתיחה + ניווט ───────────
  useEffect(() => {
      if (!showButtons) return;

      const timers = [
        setTimeout(() => {
          setAutoHover(true);
        }, 600),

        setTimeout(() => {
          setShowOpenInside(true);
        }, 1800),

        // ⭐ התחלת fade out למוזיקה
        setTimeout(() => {
          const audio = audioRef.current;
          if (!audio) return;

          const fadeOut = setInterval(() => {
            if (audio.volume > 0.06) {
              audio.volume = Math.max(0, audio.volume - 0.06);
            } else {
              audio.volume = 0;
              audio.pause();
              clearInterval(fadeOut);
            }
          }, 100);
        }, 2400),

        setTimeout(() => {
          navigate(floorToPath[currentUnit]);
        }, 3200),
      ];

      return () => timers.forEach(clearTimeout);
    }, [showButtons, currentUnit, navigate]);

  return (
    <main className="Elevator">

      {/* ✅ מוזיקת מעלית */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/assets/General/elevator-music.mp3`}
        loop
      />

      {/* סגורה */}
      <img
        className={`elevator-img ${stage >= 1 ? "fade-out" : "visible"}`}
        src={`${process.env.PUBLIC_URL}/assets/General/Elevator.jpg`}
        alt=""
      />

      {/* פתוחה */}
      <img
        className={`elevator-img 
          ${stage >= 1 ? "visible" : ""} 
          ${stage >= 2 ? "zoom-in" : ""} 
          ${stage >= 3 ? "fade-out" : ""}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorOpen.jpg`}
        alt=""
      />

      {/* פנים */}
      <img
        className={`elevator-img-inside ${stage >= 3 ? "fade-in-slow" : ""}`}
        src={`${process.env.PUBLIC_URL}/assets/General/ElevatorInside.jpg`}
        alt=""
      />

      {/* פתיחה פנימית */}
      {showOpenInside && (
        <img
          className="elevator-img-open-inside fade-in"
          src={`${process.env.PUBLIC_URL}/assets/General/ElevatorOpenInside.jpg`}
          alt=""
        />
      )}

      {/* כפתורים */}
      {showButtons && (
        <div className="buttons-wrapper">
          <ElevatorButtons
            unit={currentUnit}
            onUnitSelect={() => {}}
            autoHover={autoHover}
          />
        </div>
      )}

    </main>
  );
}

export default Elevator;