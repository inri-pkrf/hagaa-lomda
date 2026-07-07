import { useLocation, useNavigate } from "react-router-dom";
import headerData from "../Data/HeaderData";
import "./Styles/Buttons.css";
import React, { useEffect, useState, useRef } from "react";
import { STATE_KEYS } from "../Data/Statekeys";
import { getProgressData } from "./Progressunits";

function getUrlParams() {
  const hash = window.location.hash;
  const queryString = hash.includes("?") ? hash.split("?")[1] : "";
  const params = new URLSearchParams(queryString);
  const learningId = parseInt(params.get("learningId"), 10);
  console.log("🔍 URL Hash:", hash);
  console.log("🔍 Query String:", queryString);
  console.log("🔍 learningId:", learningId);
  return {
    learningId,
    key: params.get("key"),
  };
}
const { learningId: LEARNING_ID } = getUrlParams();

const routeOrder = [
  "/",
  "/info-lomda",
  "/info-lomda/3",
  "/info-lomda/4",
  "/info-lomda/5",
  "/Structure",
  "/units-division",
  "/orientation-explanation",
  "/elevator",
  "/unit-one-opening",
  "/intro-unit-one",
  "/threats",
  "/intro-unit-one",
  "/states",
  "/intro-unit-one",
  "/interfaces",
  "/interfaces-game",
  "/population",
  "/PopulationInfo",
  "/population",
  "/population-parts",
  "/population",
  "/PopulationGame",
  "/intro-unit-one",
  "/questions-end/1",
  "/summary-checklist-unit1",
  "/elevator",
  "/unit-two-opening",
  "/intro-unit-two",
  "/rockets",
  "/info-rockets",
  "/rockets",
  "/preparation",
  "/ProtectedSpace",
  "/preparation",
  "/Alert",
  "/Alert/1.5",
  "/Alert/2",
  "/Alert/3",
  "/Alert/4",
  "/preparation",
  "/Defense",
  "/Defense/2",
  "/preparation",
  "/ChoosingSafeRoom",
  "/ChoosingSafeRoomImgs",
  "/ChoosingSafeRoomVideo",
  "/preparation",
  "/Wait10mins",
  "/Wait10mins/2",
  "/preparation",
  "/BuildingMaintenance",
  "/preparation",
  "/rockets",
  "/TimeToEnterMamad1",
  "/TimeToEnterMamad2",
  "/TimeToEnterMamad3",
  "/SafeRoomExercise",
  "/rockets",
  "/defense-policy/sub-one",
  "/defense-policy/sub-two",
  "/defense-policy/sub-three",
  "/rockets",
  "/summary-checklist-unit2-sub1",
  "/rockets",
  "/intro-unit-two",
  "/earthquake",
  "/earthquake/info-earthquake",
  "/earthquake/info-tsunami",
  "/earthquake",
  "/preparation-earth",
  "/HowPreper",
  "/securing",
  "/HowPreper",
  "/Tsunami",
  "/HowPreper",
  "/Training",
  "/HowPreper",
  "/reinforcement",
  "/HowPreper",
  "/Emergency",
  "/HowPreper",
  "/Escape",
  "/HowPreper",
  "/Risk",
  "/HowPreper",
  "/preparation-earth",
  "/VideoPreperEarth",
  "/RightBehavior",
  "/preparation-earth",
  "/PostEarthquake",
  "/preparation-earth",
  "/earthquake",
  "/EarthquakeExercise",
  "/earthquake",
  "/summary-checklist-unit2-sub2",
  "/earthquake",
  "/intro-unit-two",
  "/fire",
  "/InfoFire",
  "/fire",
  "/PreparationFire",
  "/FireRightBehavior",
  "/fire",
  "/FireBehaviorIn",
  "/FireBehaviorOut",
  "/FirePoster",
  "/fire",
  "/LifeSavingFire",
  "/fire",
  "/summary-checklist-unit2-sub4",
  "/fire",
  "/intro-unit-two",
  "/chemical",
  "/InfoChemical",
  "/VideoChemical",
  "/chemical",
  "/CausesChemical",
  "/ExposureChemical",
  "/chemical",
  "/PreparationChemical",
  "/chemical",
  "/GuidelinesChemical",
  "/ActionsChemical",
  "/chemical",
  "/summary-checklist-unit2-sub3",
  "/chemical",
  "/intro-unit-two",
  "/questions-end/2",
  "/summary-checklist-unit2",
  "/elevator",
  "/unit-three-opening",
  "/intro-unit-three",
  "/EmergencyTeams",
  "/DetailEmergencyTeams",
  "/DetailEmergencyTeams/2",
  "/DetailEmergencyTeams/3",
  "/DetailEmergencyTeams/2",
  "/EmergencyTeams",
  "/QuizEmergencyTeams",
  "/EmergencyTeams",
  "/summary-checklist-unit3-sub1",
  "/EmergencyTeams",
  "/intro-unit-three",
  "/Education",
  "/EducationInfo",
  "/Education",
  "/EducationGame",
  "/Education",
  "/summary-checklist-unit3-sub2",
  "/Education",
  "/intro-unit-three",
  "/Resources",
  "/ResourcesInfo",
  "/Resources",
  "/ResourcesGame",
  "/Resources",
  "/summary-checklist-unit3-sub3",
  "/Resources",
  "/intro-unit-three",
  "/ExternalRecruits",
  "/ExternalInfo",
  "/ExternalRecruits",
  "/ManPower",
  "/ExternalRecruits",
  "/ExternalRecruitsQuestion",
  "/ExternalRecruits",
  "/summary-checklist-unit3-sub4",
  "/ExternalRecruits",
  "/intro-unit-three",
  "/FactoryFile",
  "/UsesFactoryFile",
  "/unit3/factory/1",
  "/UsesFactoryFile",
  "/unit3/factory/2",
  "/UsesFactoryFile",
  "/unit3/factory/3",
  "/UsesFactoryFile",
  "/unit3/factory/4",
  "/UsesFactoryFile",
  "/FactoryFile",
  "/QuestionFactoryFile",
  "/FactoryFile",
  "/Toolkit",
  "/FactoryFile",
  "/intro-unit-three",
  "/questions-end/3",
  "/summary-checklist-unit3",
  "/elevator",
  "/unit-four-opening",
  "/intro-unit-four",
  "/Sub1Legal",
  "/LegalState",
  "/Sub1Legal",
  "/FactState",
  "/Sub1Legal",
  "/Sub2Legal",
  "/GameLegalSituation",
  "/intro-unit-four",
  "/ExplainationRTE",
  "/ExplainationRTE2",
  "/QuestionRTE",
  "/intro-unit-four",
  "/ExplainEmergency",
  "/intro-unit-four",
  "/questions-end/4",
  "/summary-checklist-unit4",
  "/info-quiz",
  "/questions-end/5",
  "/last-page",
];

const getHeaderColor = () => {
  const currentUnit = sessionStorage.getItem("currentUnit") || "UnitZero";
  return headerData[currentUnit]?.backgroundColor || "#3FC6F3";
};

const openingToPrev = {
  "/unit-one-opening": "/units-division",
  "/unit-two-opening": "/summary-checklist-unit1",
  "/unit-three-opening": "/summary-checklist-unit2",
  "/unit-four-opening": "/summary-checklist-unit3",
};

// ⭐ 1 = טרם התחיל, 2 = בתהליך
const getStatusForPath = (path) => (path === "/" ? 1 : 2);

function Buttons() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevPath, setPrevPath] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isMamad3Complete, setIsMamad3Complete] = useState(false);
  const [isSafeRoomExerciseComplete, setIsSafeRoomExerciseComplete] = useState(false);
  const [isEarthquakeExerciseComplete, setIsEarthquakeExerciseComplete] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [highlightNext, setHighlightNext] = useState(false);
  const prevIsNextDisabled = useRef(true);
  const isFirstRender = useRef(true);
  const hasRestoredState = useRef(false);

  const currentPath = location.pathname;
  const color = getHeaderColor();
  const isBuildingMaintenance = currentPath === "/BuildingMaintenance";

  const isCurrentlyDisabled =
    isNextDisabled ||
    isBuildingMaintenance ||
    (currentPath === "/TimeToEnterMamad3" && !isMamad3Complete) ||
    (currentPath === "/SafeRoomExercise" && !isSafeRoomExerciseComplete) ||
    (currentPath === "/EarthquakeExercise" && !isEarthquakeExerciseComplete) ||
    currentPath === "/EducationGame" ||
    currentPath === "/ResourcesGame";

  useEffect(() => {
    const handleTogglePrev = (e) => setIsPrevDisabled(e.detail);
    window.addEventListener("setPrevBtnDisabled", handleTogglePrev);
    return () => {
      window.removeEventListener("setPrevBtnDisabled", handleTogglePrev);
      setIsPrevDisabled(false);
    };
  }, [location.pathname]);

  // ⭐ טעינת מצב מהשרת + שחזור sessionStorage
  const getState = async () => {
    if (hasRestoredState.current) return;
    if (location.pathname !== "/") return;
    if (!LEARNING_ID || Number.isNaN(LEARNING_ID)) {
      console.warn("learningId חסר או לא תקין ב-URL");
      return;
    }
    try {
      const res = await fetch(
        `/umbraco/api/learning/GetIframeLearning?learningId=${LEARNING_ID}`,
        { credentials: "include" }
      );
      if (!res.ok) {
        console.warn("השרת לא זמין:", res.status);
        return;
      }
      const data = await res.json();
      if (data.success && data.stateJson) {
        const parsedState = JSON.parse(data.stateJson);
        const { lastPath, sessionState } = parsedState;
        if (sessionState) {
          Object.entries(sessionState).forEach(([key, val]) => {
            sessionStorage.setItem(key, val);
          });
        }
        const index = routeOrder.indexOf(lastPath);
        if (index !== -1) {
          hasRestoredState.current = true;
          setCurrentIndex(index);
          navigate(lastPath);
        }
      }
    } catch (e) {
      console.warn("שרת לא זמין, ממשיך בלעדיו");
    }
  };

  // ⭐ שמירת מצב לשרת במבנה החדש
  const saveState = async (path) => {
    // בפיתוח (development) - לא נשלח לשרת
    const isDev = LEARNING_ID === undefined || Number.isNaN(LEARNING_ID);
    if (isDev) {
      console.log("🔵 [DEV MODE] לא משלחים ל-UMBRACCO (אין learningId)");
      return;
    }

    try {
      const sessionState = {};
      STATE_KEYS.forEach((key) => {
        const val = sessionStorage.getItem(key);
        if (val !== null) sessionState[key] = val;
      });

      const status = getStatusForPath(path);
      const progressData = getProgressData(status);

      // ⭐ stateJson מכיל רק sessionState
      const stateJson = JSON.stringify({ sessionState });
      const score = Number(sessionStorage.getItem("finalQuizScore")) || 0;

      console.log("📤 שולח ל-UMBRACCO:", {
        learningId: LEARNING_ID,
        path,
        status,
        score,
        stateJson: stateJson.substring(0, 100) + "...",
      });

      const res = await fetch("/umbraco/api/learning/SetIframeLearning", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learningId: LEARNING_ID,
          stateJson,
          progressData,
          status,
          score,
        }),
      });

      if (!res.ok) {
        console.error("❌ שגיאת שרת בשמירה:", res.status);
      } else {
        console.log("✅ נשמר בהצלחה!");
      }
    } catch (e) {
      console.error("❌ שגיאה בשמירה:", e);
    }
  };

  const multiStepPages = {
    "/Alert": ["/Alert","/Alert/1.5", "/Alert/2", "/Alert/3", "/Alert/4"],
  };

  useEffect(() => {
    const getMatchingIndexes = (path) =>
      routeOrder.reduce((matches, route, idx) => {
        if (route === path) matches.push(idx);
        return matches;
      }, []);

    const matchingIndexes = getMatchingIndexes(currentPath);
    let index = matchingIndexes[0] ?? -1;

    const savedIndex = Number(sessionStorage.getItem("routeIndex"));
    if (
      !Number.isNaN(savedIndex) &&
      savedIndex >= 0 &&
      savedIndex < routeOrder.length
    ) {
      if (matchingIndexes.includes(savedIndex)) index = savedIndex;
    }

    setCurrentIndex(index);
    setPrevPath(index > 0 ? routeOrder[index - 1] : null);
    setNextPath(
      index >= 0 && index < routeOrder.length - 1
        ? routeOrder[index + 1]
        : null
    );
    sessionStorage.setItem("routeIndex", String(index));
    saveState(currentPath);
    setHighlightNext(false);
  }, [currentPath]);

  useEffect(() => {
    let intervalId;
    const checkExerciseComplete = () => {
      setIsMamad3Complete(
        location.pathname === "/TimeToEnterMamad3"
          ? sessionStorage.getItem("TimeToEnterMamad3Complete") === "true"
          : false
      );
      setIsSafeRoomExerciseComplete(
        location.pathname === "/SafeRoomExercise"
          ? sessionStorage.getItem("SafeRoomExerciseComplete") === "true"
          : false
      );
      setIsEarthquakeExerciseComplete(
        location.pathname === "/EarthquakeExercise"
          ? sessionStorage.getItem("EarthquakeExerciseComplete") === "true"
          : false
      );
    };
    checkExerciseComplete();
    if (
      ["/TimeToEnterMamad3", "/SafeRoomExercise", "/EarthquakeExercise"].includes(
        location.pathname
      )
    ) {
      intervalId = setInterval(checkExerciseComplete, 300);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevIsNextDisabled.current = isCurrentlyDisabled;
      return;
    }
    const nextWasDisabled = prevIsNextDisabled.current;
    const nextIsNowEnabled = !isCurrentlyDisabled;
    const nextPathExists = !!nextPath;
    if (nextWasDisabled && nextIsNowEnabled && nextPathExists && !isBuildingMaintenance) {
      setHighlightNext(true);
    }
    prevIsNextDisabled.current = isCurrentlyDisabled;
  }, [isCurrentlyDisabled, nextPath]);

  useEffect(() => {
    const handleToggleNext = (e) => setIsNextDisabled(e.detail);
    window.addEventListener("setNextBtnDisabled", handleToggleNext);
    return () => {
      window.removeEventListener("setNextBtnDisabled", handleToggleNext);
      setIsNextDisabled(false);
    };
  }, [location.pathname]);

  useEffect(() => {
    getState();
  }, []);

  const goToPath = (targetPath, isNext = true) => {
    if (!targetPath) return;
    if (isNext) setHighlightNext(false);
    if (!isNext && targetPath === "/orientation-explanation") {
      sessionStorage.setItem("currentUnit", "UnitZero");
      sessionStorage.setItem("MainTitle", "מבנה שיעור הסמכה דיגיטלי");
    }
    
    // ⭐ שמירה לשרת לפני ניווט
    saveState(targetPath);
    
    const navEvent = new CustomEvent(isNext ? "onNextNav" : "onPrevNav", {
      cancelable: true,
    });
    if (!window.dispatchEvent(navEvent)) return;
    if (!isNext && openingToPrev[location.pathname]) {
      navigate(openingToPrev[location.pathname]);
      return;
    }
    if (location.pathname === "/questions-end/5" && isNext) {
      window.dispatchEvent(new Event("quizNext"));
      return;
    }
    for (const [base, steps] of Object.entries(multiStepPages)) {
      const idx = steps.indexOf(location.pathname);
      if (idx !== -1) {
        if (isNext && idx < steps.length - 1) {
          navigate(steps[idx + 1]);
          return;
        }
        if (!isNext && idx > 0) {
          navigate(steps[idx - 1]);
          return;
        }
      }
    }
    const frameChecks = [
      {
        path: "/rockets",
        key: "clickedFrames",
        frames: [1, 2, 3, 4, 5],
        keys: ["unitTwo-opening", "unitTwo-first"],
        nav: "/intro-unit-two",
      },
      {
        path: "/earthquake",
        key: "earthquake_clickedFrames",
        frames: [1, 2, 3, 4],
        keys: ["unitTwo-opening", "unitTwo-first", "unitTwo-second"],
        nav: "/intro-unit-two",
      },
      {
        path: "/fire",
        key: "clickedFireFrames",
        frames: [1, 2, 3, 4, 5],
        keys: ["unitTwo-opening", "unitTwo-first", "unitTwo-second", "unitTwo-third"],
        nav: "/intro-unit-two",
      },
      {
        path: "/chemical",
        key: "clickedChemicalFrames",
        frames: [1, 2, 3, 4, 5],
        keys: ["unitTwo-opening", "unitTwo-first", "unitTwo-second", "unitTwo-third", "unitTwo-fourth"],
        nav: "/intro-unit-two",
      },
      {
        path: "/EmergencyTeams",
        key: "clickedEmergencyFrames",
        frames: [1, 2, 3],
        keys: ["unitThree-opening", "unitThree-first"],
        nav: "/intro-unit-three",
      },
      {
        path: "/Education",
        key: "clickedEducationFrames",
        frames: [1, 2, 3],
        keys: ["unitThree-opening", "unitThree-first", "unitThree-second"],
        nav: "/intro-unit-three",
      },
      {
        path: "/Resources",
        key: "clickedResourcesFrames",
        frames: [1, 2, 3],
        keys: ["unitThree-opening", "unitThree-first", "unitThree-second", "unitThree-third"],
        nav: "/intro-unit-three",
      },
      {
        path: "/ExternalRecruits",
        key: "clickedExternalRecruitsFrames",
        frames: [1, 2, 3, 4],
        keys: ["unitThree-opening", "unitThree-first", "unitThree-second", "unitThree-third", "unitThree-fourth"],
        nav: "/intro-unit-three",
      },
      {
        path: "/FactoryFile",
        key: "clickedFactoryFrames",
        frames: [1, 2],
        keys: ["unitThree-opening", "unitThree-first", "unitThree-second", "unitThree-third", "unitThree-fourth", "unitThree-fifth"],
        nav: "/intro-unit-three",
      },
    ];
    if (isNext) {
      for (const check of frameChecks) {
        if (location.pathname === check.path) {
          try {
            const clicked = JSON.parse(
              sessionStorage.getItem(check.key) || "[]"
            );
            if (check.frames.every((id) => clicked.includes(id))) {
              check.keys.forEach((k) => sessionStorage.setItem(k, "finished"));
              window.dispatchEvent(new Event("updateNavbar"));
              navigate(check.nav);
              return;
            }
          } catch (e) {}
          return;
        }
      }
    }
    if (isNext && location.pathname === "/Sub1Legal") { navigate("/Sub2Legal"); return; }
    if (isNext && location.pathname === "/BuildingMaintenance") { navigate("/preparation"); return; }
    if (isNext && location.pathname === "/preparation") { navigate("/rockets"); return; }
    if (isNext && location.pathname === "/preparation-earth") { navigate("/earthquake"); return; }
    if (isNext && location.pathname === "/HowPreper") { navigate("/preparation-earth"); return; }
    if (isNext && location.pathname === "/DetailEmergencyTeams/2") { navigate("/EmergencyTeams"); return; }
    if (isNext && location.pathname === "/UsesFactoryFile") { navigate("/FactoryFile"); return; }
    navigate(targetPath);
  };

  if (
    location.pathname === "/elevator" ||
    location.pathname === "/" ||
    location.pathname === "/last-page" ||
    location.pathname === "/AboutUs" ||
    location.pathname === "/CreditPage"
  )
    return null;

  return (
    <div className="buttons-page-corner" style={{ "--btn-color": color }}>
      <button
        className={`app-button app-button--next ${highlightNext ? "highlight-pulse" : ""}`}
        onClick={() => goToPath(nextPath, true)}
        disabled={!nextPath || isCurrentlyDisabled}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`}
          alt="Next"
          className="app-button__icon next"
        />
      </button>
      <button
        className="app-button app-button--prev"
        onClick={() => goToPath(prevPath, false)}
        disabled={
          !prevPath ||
          isPrevDisabled ||
          isBuildingMaintenance ||
          location.pathname === "/EducationGame" ||
          location.pathname === "/ResourcesGame"
        }
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`}
          alt="Back"
          className="app-button__icon back"
        />
      </button>
    </div>
  );
}

export default Buttons;