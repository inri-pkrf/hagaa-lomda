import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { STATE_KEYS } from "./Data/Statekeys"; // ⭐ ייבוא משותף
import { calculateOverallProgress, getCurrentUnit } from "./components/Progressunits.jsx"; // ⭐ חישוב אחוז התקדמות + יחידה נוכחית, משותף

// עמודים כללים של כל הלומדה
import Buttons from "./components/Buttons";
import Header from "./components/Header";
import QuestionsEnd from "./components/QuestionsEnd.jsx";
import Elevator from "./components/Elevator";
import CreditPage from "./components/CreditPage.jsx";
import FeedbackPopup from "./components/FeedbackPopup.jsx";

import NarrationPlayer from "./components/NarrationPlayer";

// פתיח הלומדה
import Structure from "./units/Unit0/Structure";
import InfoLomda from "./units/Unit0/InfoLomda";
import FirstPage from "./units/Unit0/FirstPage";
import UnitsDivision from "./units/Unit0/UnitsDivision.jsx";
import OrientationExplanation from "./units/Unit0/OrientationExplanation.jsx";

// קומפוננטות של יחידה 1
import UnitOneLayout from "./units/Unit1/UnitOneLayout";
import UnitOneOpening from "./units/Unit1/UnitOneOpening.jsx";
import IntroUnitOne from "./units/Unit1/IntroUnitOne.jsx";
import Threats from "./units/Unit1/Threats/Threats.jsx";
import States from "./units/Unit1/states/States.jsx";
import Interfaces from "./units/Unit1/Interfences/Interfaces.jsx";
import InterfacesGame from "./units/Unit1/Interfences/InterfacesGame.jsx";
import Population from "./units/Unit1/Population/Population.jsx";
import PopulationLaptop from "./units/Unit1/Population/PopulationLaptop.jsx";
import PopulationFolders from "./units/Unit1/Population/PopulationFolder.jsx";
import PopulationGame from "./units/Unit1/Population/PopulationGame.jsx";
import SummaryCheckList from "./components/SummaryCheckList.jsx";
import {
  unitOneChecklist,
  unitTwoChecklist,
  unitTwoSub1Checklist,
  unitTwoSub2Checklist,
  unitTwoSub3Checklist,
  unitTwoSub4Checklist,
  unitThreeChecklist,
  unitThreeSub1Checklist,
  unitThreeSub2Checklist,
  unitThreeSub3Checklist,
  unitThreeSub4Checklist,
  unitFourChecklist,
} from "./Data/ChecklistData";

// קומפוננטות של יחידה 2
import UnitTwoLayout from "./units/Unit2/UnitTwoLayout";
import UnitTwoOpening from "./units/Unit2/UnitTwoOpening.jsx";
import IntroUnitTwo from "./units/Unit2/IntroUnitTwo";
import Rockets from "./units/Unit2/Rockets/Rockets.jsx";
import InfoRockets from "./units/Unit2/Rockets/Preparation/InfoRockets.jsx";
import Preparation from "./units/Unit2/Rockets/Preparation/Preparation.jsx";
import ProtectedSpace from "./units/Unit2/Rockets/Preparation/ProtectedSpace.jsx";
import Alert from "./units/Unit2/Rockets/Preparation/Alert.jsx";
import Defense from "./units/Unit2/Rockets/Preparation/Defense.jsx";
import ChoosingSafeRoom from "./units/Unit2/Rockets/Preparation/ChoosingSafeRoom.jsx";
import ChoosingSafeRoomImgs from "./units/Unit2/Rockets/Preparation/ChoosingSafeRoomImgs.jsx";
import ChoosingSafeRoomVideo from "./units/Unit2/Rockets/Preparation/ChoosingSafeRoomVideo.jsx";
import Wait10mins from "./units/Unit2/Rockets/Preparation/Wait10mins.jsx";
import BuildingMaintenance from "./units/Unit2/Rockets/Preparation/BuildingMaintenance.jsx";
import SubOneDefensePolicy from "./units/Unit2/DefensePolicy/SubOneDefensePolicy";
import SubTwoDefensePolicy from "./units/Unit2/DefensePolicy/SubTwoDefensePolicy";
import TimeToEnterMamad1 from "./units/Unit2/Rockets/TimeToEnterMamad1.jsx";
import TimeToEnterMamad2 from "./units/Unit2/Rockets/TimeToEnterMamad2.jsx";
import TimeToEnterMamad3 from "./units/Unit2/Rockets/TimeToEnterMamad3.jsx";
import Earthquake from "./units/Unit2/Earthquake/Earthquake.jsx";
import InfoEarthquake from "./units/Unit2/Earthquake/InfoEarthquake.jsx";
import InfoTsunami from "./units/Unit2/Earthquake/InfoTsunami.jsx";
import PreparationEarth from "./units/Unit2/PreparationEarth.jsx";
import HowPreper from "./units/Unit2/HowPreper.jsx";
import RightBehavior from "./units/Unit2/RightBehavior.jsx";
import PostEarthquake from "./units/Unit2/PostEarthquake.jsx";
import SafeRoomExercise from "./units/Unit2/Rockets/SafeRoomExercise.jsx";
import VideoPreperEarth from "./units/Unit2/VideoPreperEarth.jsx";
import Escape from "./units/Unit2/Escape.jsx";
import EarthquakeExercise from "./units/Unit2/EarthquakeExercise.jsx";
import Fire from "./units/Unit2/Fire/Fire.jsx";
import InfoFire from "./units/Unit2/Fire/InfoFire.jsx";
import PreparationFire from "./units/Unit2/Fire/PreparationFire.jsx";
import FireBehaviorIn from "./units/Unit2/Fire/FireBehaviorIn.jsx";
import FireBehaviorOut from "./units/Unit2/Fire/FireBehaviorOut.jsx";
import Emergency from "./units/Unit2/Emergency.jsx";
import Training from "./units/Unit2/Training.jsx";
import Risk from "./units/Unit2/Risk.jsx";
import Chemical from "./units/Unit2/Chemical/Chemical.jsx";
import Tsunami from "./units/Unit2/Tsunami.jsx";
import Securing from "./units/Unit2/Securing.jsx";
import Reinforcement from "./units/Unit2/Reinforcement.jsx";
import FireRightBehavior from "./units/Unit2/Fire/FireRightBehavior.jsx";
import InfoChemical from "./units/Unit2/Chemical/InfoChemical.jsx";
import VideoChemical from "./units/Unit2/Chemical/VideoChemical.jsx";
import CausesChemical from "./units/Unit2/Chemical/CausesChemical.jsx";
import ExposureChemical from "./units/Unit2/Chemical/ExposureChemical.jsx";
import GuidelinesChemical from "./units/Unit2/Chemical/GuidelinesChemical.jsx";
import PreparationChemical from "./units/Unit2/Chemical/PreparationChemical.jsx";
import ActionsChemical from "./units/Unit2/Chemical/actionsChemical.jsx";
import SubThreeDefensePolicy from "./units/Unit2/DefensePolicy/SubThreeDefensePolicy";
import FirePoster from "./units/Unit2/Fire/FirePoster.jsx";
import ChemicalPoster from "./units/Unit2/Chemical/ChemicalPoster.jsx";

// קומפוננטות של יחידה 3
import IntroUnitThree from "./units/Unit3/IntroUnitThree";
import UnitThreeLayout from "./units/Unit3/UnitThreeLayout";
import UnitThreeOpening from "./units/Unit3/UnitThreeOpening";
import EmergencyTeams from "./units/Unit3/EmergencyTeams/EmergencyTeams.jsx";
import Education from "./units/Unit3/Education/Education.jsx";
import Resources from "./units/Unit3/Resources/Resources.jsx";
import ExternalRecruits from "./units/Unit3/ExternalRecruits/ExternalRecruits.jsx";
import EducationInfo from "./units/Unit3/Education/EducationInfo.jsx";
import EducationGame from "./units/Unit3/Education/EducationGame.jsx";
import ResourcesInfo from "./units/Unit3/Resources/ResourcesInfo.jsx";
import ResourcesGame from "./units/Unit3/Resources/ResourcesGame.jsx";
import ExternalInfo from "./units/Unit3/ExternalRecruits/ExternalInfo.jsx";
import ManPower from "./units/Unit3/ExternalRecruits/ManPower.jsx";
import ExternalRecruitsQuestion from "./units/Unit3/ExternalRecruits/ExternalRecruitsQuestion.jsx";
import FactoryFile from "./units/Unit3/FactoryFile/FactoryFile.jsx";
import QuestionFactoryFile from "./units/Unit3/FactoryFile/QuestionFactoryFile.jsx";
import UsesFactoryFile from "./units/Unit3/FactoryFile/UsesFactoryFile.jsx";
import Toolkit from "./units/Unit3/FactoryFile/Toolkit.jsx";
import DetailEmergencyTeams from "./units/Unit3/EmergencyTeams/DetailEmergencyTeams.jsx";
import LifeSavingFire from "./units/Unit2/Fire/LifeSavingFire.jsx";
import QuizEmergencyTeams from "./units/Unit3/EmergencyTeams/QuizEmergencyTeams.jsx";
import UsesFactoryFileExplanations from "./units/Unit3/FactoryFile/UsesFactoryFileExplanations.jsx";

// קומפוננטות של יחידה 4
import IntroUnitFour from "./units/Unit4/IntroUnitFour";
import UnitFourLayout from "./units/Unit4/UnitFourLayout";
import UnitFourOpening from "./units/Unit4/UnitFourOpening";
import ExplainEmergency from "./units/Unit4/Emergency/ExplainEmergency.jsx";
import Sub1Legal from "./units/Unit4/LegalSituation/Sub1Legal.jsx";
import LegalState from "./units/Unit4/LegalSituation/LegalState.jsx";
import FactState from "./units/Unit4/LegalSituation/FactState.jsx";
import Sub2Legal from "./units/Unit4/LegalSituation/Sub2Legal.jsx";
import GameLegalSituation from "./units/Unit4/LegalSituation/GameLegalSituation.jsx";
import ExplainationRTE from "./units/Unit4/RoutineToEmergency/ExplainationRTE.jsx";
import QuestionRTE from "./units/Unit4/RoutineToEmergency/QuestionRTE.jsx";

// קומפוננטות שאלות סיכום
import InfoQuiz from "./components/QuizAtTheEnd/InfoQuiz.jsx";
import LastPage from "./components/QuizAtTheEnd/LastPage.jsx";

// ─── קומפוננטת ה-overlay של מסך מלא ──────────
function FullscreenOverlay() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      const isApiFullscreen = !!document.fullscreenElement;
      const isNativeFullscreen =
        window.innerHeight === window.screen.height &&
        window.innerWidth === window.screen.width;
      setIsFullscreen(isApiFullscreen || isNativeFullscreen);
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    window.addEventListener("resize", checkFullscreen);
    checkFullscreen();

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      window.removeEventListener("resize", checkFullscreen);
    };
  }, []);

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("שגיאה בכניסה למסך מלא:", err);
    });
  };
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) return null;
  if (isFullscreen) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-message">
        <p>לחווית למידה מיטבית, אנא עברו למסך מלא</p>
        <div className="fullscreen-hint">
          לחצו <kbd>F11</kbd> או לחצו על הכפתור
        </div>
        <button className="fullscreen-button" onClick={enterFullscreen}>
          למסך מלא
        </button>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [videoPlaying, setVideoPlaying] = useState(
    sessionStorage.getItem("VIDEO_IS_PLAYING") === "true",
  );

  const handleResetAll = () => {
    const confirmReset = window.confirm(
      "האם לאפס את כל ההתקדמות בלומדה ולחזור להתחלה?",
    );
    if (confirmReset) {
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  // ⭐ הורדת JSON לבדיקה - כולל כל sessionStorage, אחוז ההתקדמות, היחידה הנוכחית והסטטוס
  // זמין מכל עמוד בלומדה (לא רק בעמוד הסיום) כדי לאפשר בדיקה באמצע התהליך
  const handleDownloadReport = () => {
    const sessionState = {};
    STATE_KEYS.forEach((key) => {
      const val = sessionStorage.getItem(key);
      if (val !== null) sessionState[key] = val;
    });

    const progress = calculateOverallProgress();
    const unit = getCurrentUnit();
    const score = Number(sessionStorage.getItem("finalQuizScore")) || 0;

    const report = {
      lastPath: location.pathname,
      score,
      pass: score >= 70,
      sessionState,
      progress,
      unit,
      status: location.pathname === "/" ? 1 : score >= 70 ? 3 : 2,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "learning-report.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      {/* ─── overlay מסך מלא - תמיד פעיל בכל האפליקציה ─── */}
      <FullscreenOverlay />

      {/* כפתורי פיתוח זמניים: איפוס + הורדת JSON לבדיקה */}
      <div className="developer-toolbar">
        <button className="developer-reset-btn" onClick={handleResetAll}>
          איפוס לומדה 🔄
        </button>
        <button className="developer-download-btn" onClick={handleDownloadReport}>
          הורד JSON לבדיקה ⬇️
        </button>
      </div>

      {location.pathname !== "/elevator" && <Header />}

      <Buttons></Buttons>

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Structure" element={<Structure />} />
        <Route path="/info-lomda" element={<InfoLomda />} />
        <Route path="/info-lomda/2" element={<InfoLomda />} />
        <Route path="/info-lomda/3" element={<InfoLomda />} />
        <Route path="/info-lomda/4" element={<InfoLomda />} />
        <Route path="/info-lomda/5" element={<InfoLomda />} />
        <Route path="/elevator" element={<Elevator />} />
        <Route path="/units-division" element={<UnitsDivision />} />
        <Route
          path="/questions-end/5"
          element={<QuestionsEnd unitNumber={5} />}
        />
        <Route path="/CreditPage" element={<CreditPage />} />

        <Route element={<UnitOneLayout />}>
          <Route
            path="/orientation-explanation"
            element={<OrientationExplanation />}
          />
          <Route path="/unit-one-opening" element={<UnitOneOpening />} />
          <Route path="/intro-unit-one" element={<IntroUnitOne />} />
          <Route
            path="/threats"
            element={<Threats setVideoPlaying={setVideoPlaying} />}
          />
          <Route path="/states" element={<States />} />
          <Route path="/interfaces" element={<Interfaces />} />
          <Route path="/interfaces-game" element={<InterfacesGame />} />
          <Route path="/population" element={<Population />} />
          <Route path="/populationInfo" element={<PopulationLaptop />} />
          <Route path="/population-parts" element={<PopulationFolders />} />
          <Route path="/populationGame" element={<PopulationGame />} />
          <Route
            path="/questions-end/1"
            element={<QuestionsEnd unitNumber={1} />}
          />
          <Route
            path="/summary-checklist-unit1"
            element={
              <SummaryCheckList
                checklist={unitOneChecklist}
                isFinalUnit={true}
              />
            }
          />
        </Route>

        <Route element={<UnitTwoLayout />}>
          <Route path="/unit-two-opening" element={<UnitTwoOpening />} />
          <Route path="/intro-unit-two" element={<IntroUnitTwo />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/info-rockets" element={<InfoRockets />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/ProtectedSpace" element={<ProtectedSpace />} />
          <Route path="/Alert" element={<Alert />} />
          <Route path="/Alert/2" element={<Alert />} />
          <Route path="/Alert/3" element={<Alert />} />
          <Route path="/Alert/4" element={<Alert />} />
          <Route path="/Defense" element={<Defense />} />
          <Route path="/Defense/2" element={<Defense />} />
          <Route path="/ChoosingSafeRoom" element={<ChoosingSafeRoom />} />
          <Route
            path="/ChoosingSafeRoomImgs"
            element={<ChoosingSafeRoomImgs />}
          />
          <Route
            path="/ChoosingSafeRoomVideo"
            element={<ChoosingSafeRoomVideo />}
          />
          <Route path="/Wait10mins" element={<Wait10mins />} />
          <Route path="/Wait10mins/2" element={<Wait10mins />} />
          <Route
            path="/BuildingMaintenance"
            element={<BuildingMaintenance />}
          />
          <Route
            path="/defense-policy/sub-one"
            element={<SubOneDefensePolicy />}
          />
          <Route
            path="/defense-policy/sub-two"
            element={<SubTwoDefensePolicy />}
          />
          <Route
            path="/defense-policy/sub-three"
            element={<SubThreeDefensePolicy />}
          />
          <Route path="/TimeToEnterMamad1" element={<TimeToEnterMamad1 />} />
          <Route path="/TimeToEnterMamad2" element={<TimeToEnterMamad2 />} />
          <Route path="/TimeToEnterMamad3" element={<TimeToEnterMamad3 />} />
          <Route
            path="/questions-end/2"
            element={<QuestionsEnd unitNumber={2} />}
          />
          <Route
            path="/summary-checklist-unit2"
            element={
              <SummaryCheckList
                checklist={unitTwoChecklist}
                isFinalUnit={true}
              />
            }
          />
          <Route
            path="/summary-checklist-unit2-sub1"
            element={<SummaryCheckList checklist={unitTwoSub1Checklist} />}
          />
          <Route
            path="/summary-checklist-unit2-sub2"
            element={<SummaryCheckList checklist={unitTwoSub2Checklist} />}
          />
          <Route
            path="/summary-checklist-unit2-sub3"
            element={<SummaryCheckList checklist={unitTwoSub3Checklist} />}
          />
          <Route
            path="/summary-checklist-unit2-sub4"
            element={<SummaryCheckList checklist={unitTwoSub4Checklist} />}
          />
          <Route path="/earthquake" element={<Earthquake />} />
          <Route
            path="/earthquake/info-earthquake"
            element={<InfoEarthquake />}
          />
          <Route path="/earthquake/info-tsunami" element={<InfoTsunami />} />
          <Route path="/preparation-earth" element={<PreparationEarth />} />
          <Route path="/HowPreper" element={<HowPreper />} />
          <Route path="/RightBehavior" element={<RightBehavior />} />
          <Route path="/PostEarthquake" element={<PostEarthquake />} />
          <Route path="/SafeRoomExercise" element={<SafeRoomExercise />} />
          <Route path="/VideoPreperEarth" element={<VideoPreperEarth />} />
          <Route path="/Escape" element={<Escape />} />
          <Route path="/EarthquakeExercise" element={<EarthquakeExercise />} />
          <Route path="/fire" element={<Fire />} />
          <Route path="/InfoFire" element={<InfoFire />} />
          <Route path="/PreparationFire" element={<PreparationFire />} />
          <Route path="/FireBehaviorOut" element={<FireBehaviorOut />} />
          <Route path="/FireBehaviorIn" element={<FireBehaviorIn />} />
          <Route path="/Training" element={<Training />} />
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/Risk" element={<Risk />} />
          <Route path="/chemical" element={<Chemical />} />
          <Route path="/Tsunami" element={<Tsunami />} />
          <Route path="/Securing" element={<Securing />} />
          <Route path="/Reinforcement" element={<Reinforcement />} />
          <Route path="/FireRightBehavior" element={<FireRightBehavior />} />
          <Route path="/LifeSavingFire" element={<LifeSavingFire />} />
          <Route path="/InfoChemical" element={<InfoChemical />} />
          <Route path="/VideoChemical" element={<VideoChemical />} />
          <Route path="/CausesChemical" element={<CausesChemical />} />
          <Route path="/ExposureChemical" element={<ExposureChemical />} />
          <Route path="/GuidelinesChemical" element={<GuidelinesChemical />} />
          <Route
            path="/PreparationChemical"
            element={<PreparationChemical />}
          />
          <Route path="/ActionsChemical" element={<ActionsChemical />} />
          <Route path="/FirePoster" element={<FirePoster />} />
          <Route path="/ChemicalPoster" element={<ChemicalPoster />} />
        </Route>

        <Route element={<UnitThreeLayout />}>
          <Route path="/intro-unit-three" element={<IntroUnitThree />} />
          <Route path="/unit-three-opening" element={<UnitThreeOpening />} />
          <Route path="/EmergencyTeams" element={<EmergencyTeams />} />
          <Route
            path="/questions-end/3"
            element={<QuestionsEnd unitNumber={3} />}
          />
          <Route
            path="/summary-checklist-unit3"
            element={
              <SummaryCheckList
                checklist={unitThreeChecklist}
                isFinalUnit={true}
              />
            }
          />
          <Route
            path="/summary-checklist-unit3-sub1"
            element={<SummaryCheckList checklist={unitThreeSub1Checklist} />}
          />
          <Route
            path="/summary-checklist-unit3-sub2"
            element={<SummaryCheckList checklist={unitThreeSub2Checklist} />}
          />
          <Route
            path="/summary-checklist-unit3-sub3"
            element={<SummaryCheckList checklist={unitThreeSub3Checklist} />}
          />
          <Route
            path="/summary-checklist-unit3-sub4"
            element={<SummaryCheckList checklist={unitThreeSub4Checklist} />}
          />
          <Route
            path="/unit3/factory/:id"
            element={<UsesFactoryFileExplanations />}
          />
          <Route path="/Education" element={<Education />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/ExternalRecruits" element={<ExternalRecruits />} />
          <Route path="/EducationInfo" element={<EducationInfo />} />
          <Route path="/EducationGame" element={<EducationGame />} />
          <Route path="/ResourcesInfo" element={<ResourcesInfo />} />
          <Route path="/ResourcesGame" element={<ResourcesGame />} />
          <Route path="/ExternalInfo" element={<ExternalInfo />} />
          <Route path="/ManPower" element={<ManPower />} />
          <Route
            path="/ExternalRecruitsQuestion"
            element={<ExternalRecruitsQuestion />}
          />
          <Route path="/FactoryFile" element={<FactoryFile />} />
          <Route
            path="/QuestionFactoryFile"
            element={<QuestionFactoryFile />}
          />
          <Route path="/UsesFactoryFile" element={<UsesFactoryFile />} />
          <Route path="/factory2" element={<UsesFactoryFile />} />

          <Route path="/Toolkit" element={<Toolkit />} />
          <Route
            path="/DetailEmergencyTeams"
            element={<DetailEmergencyTeams />}
          />
          <Route
            path="/DetailEmergencyTeams/:page"
            element={<DetailEmergencyTeams />}
          />
          <Route path="/QuizEmergencyTeams" element={<QuizEmergencyTeams />} />
        </Route>

        <Route element={<UnitFourLayout />}>
          <Route path="/unit-four-opening" element={<UnitFourOpening />} />
          <Route path="/intro-unit-four" element={<IntroUnitFour />} />
          <Route
            path="/questions-end/4"
            element={<QuestionsEnd unitNumber={4} />}
          />
          <Route
            path="/summary-checklist-unit4"
            element={
              <SummaryCheckList
                checklist={unitFourChecklist}
                isFinalUnit={true}
              />
            }
          />
          <Route path="/ExplainEmergency" element={<ExplainEmergency />} />
          <Route path="/Sub1Legal" element={<Sub1Legal />} />
          <Route path="/LegalState" element={<LegalState />} />
          <Route path="/FactState" element={<FactState />} />
          <Route path="/Sub2Legal" element={<Sub2Legal />} />
          <Route path="/GameLegalSituation" element={<GameLegalSituation />} />
          <Route path="/ExplainationRTE" element={<ExplainationRTE />} />
          <Route path="/ExplainationRTE2" element={<ExplainationRTE />} />
          <Route path="/QuestionRTE" element={<QuestionRTE />} />
        </Route>

        <Route path="/info-quiz" element={<InfoQuiz />} />
        <Route path="/last-page" element={<LastPage />} />
      </Routes>
      <FeedbackPopup />

      {!videoPlaying && <NarrationPlayer />}
    </div>
  );
}

export default App;