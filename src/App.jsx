import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';


// עמודים כללים של כל הלומדה
import Buttons from './components/Buttons';
import Header from './components/Header';
// import SideBar from './components/Sidebar.jsx';
import Elevator from './components/Elevator';
// import UnitOpeningPage from './components/UnitOpeningPage';
// import Goals from './components/Goals';

// פתיח הלומדה
import OpeningPage from './units/Unit0/OpeningPage';
import InfoLomda from './units/Unit0/InfoLomda';

// קומפוננטות של יחידה 1
import UnitOneLayout from './units/Unit1/UnitOneLayout';
// import UnitOneSideBar from './units/Unit1/UnitOneSidebar.jsx';
import UnitOneOpening from './units/Unit1/UnitOneOpening.jsx';
import UnitOneGoals from './units/Unit1/UnitOneGoals.jsx';
import IntroUnitOne from './units/Unit1/IntroUnitOne.jsx';
import Threats from './units/Unit1/Threats/Threats.jsx';
import States from './units/Unit1/states/States.jsx';
import Interfaces from './units/Unit1/Interfences/Interfaces.jsx';
import InterfacesGame from "./units/Unit1/Interfences/InterfacesGame.jsx";
import Population from './units/Unit1/Population/Population.jsx';
import PopulationLaptop from './units/Unit1/Population/PopulationLaptop.jsx';
import PopulationFolders from './units/Unit1/Population/PopulationFolder.jsx';
import PopulationGame from './units/Unit1/Population/PopulationGame.jsx';
import QuestionsEnd from './units/Unit1/QuestionsEnd.jsx';
import SummaryCheckList from './components/SummaryCheckList.jsx';
import { unitOneChecklist, unitTwoChecklist, unitTwoSub1Checklist, unitTwoSub2Checklist, unitTwoSub3Checklist, unitTwoSub4Checklist } from './Data/ChecklistData';

// קומפוננטות של יחידה 2
import UnitTwoLayout from './units/Unit2/UnitTwoLayout';
import UnitTwoOpening from './units/Unit2/UnitTwoOpening.jsx';
import UnitTwoGoals from './units/Unit2/UnitTwoGoals.jsx';
import IntroUnitTwo from './units/Unit2/IntroUnitTwo';
import Rockets from './units/Unit2/Rockets/Rockets.jsx';
import InfoRockets from './units/Unit2/Rockets/Preparation/InfoRockets.jsx';
import Preparation from './units/Unit2/Rockets/Preparation/Preparation.jsx';
import ProtectedSpace from './units/Unit2/Rockets/Preparation/ProtectedSpace.jsx';
import Alert from './units/Unit2/Rockets/Preparation/Alert.jsx';
import Defense from './units/Unit2/Rockets/Preparation/Defense.jsx';
import ChoosingSafeRoom from './units/Unit2/Rockets/Preparation/ChoosingSafeRoom.jsx';
import Wait10mins from './units/Unit2/Rockets/Preparation/Wait10mins.jsx';
import BuildingMaintenance from './units/Unit2/Rockets/Preparation/BuildingMaintenance.jsx';
import SubOneDefensePolicy from './units/Unit2/DefensePolicy/SubOneDefensePolicy';
import SubTwoDefensePolicy from "./units/Unit2/DefensePolicy/SubTwoDefensePolicy";
import TimeToEnterMamad1 from './units/Unit2/Rockets/TimeToEnterMamad1.jsx';
import TimeToEnterMamad2 from './units/Unit2/Rockets/TimeToEnterMamad2.jsx';
import TimeToEnterMamad3 from './units/Unit2/Rockets/TimeToEnterMamad3.jsx';
import Earthquake from './units/Unit2/Earthquake/Earthquake.jsx';
import InfoEarthquake from './units/Unit2/Earthquake/InfoEarthquake.jsx';
import InfoTsunami from './units/Unit2/Earthquake/InfoTsunami.jsx';
import PreparationEarth from './units/Unit2/PreparationEarth.jsx';

// קומפוננטות של יחידה 3
import IntroUnitThree from './units/Unit3/IntroUnitThree';

// קומפוננטות של יחידה 4
import IntroUnitFour from './units/Unit4/IntroUnitFour';


function App() {
  const navigate = useNavigate();
  const location = useLocation();


  const [videoPlaying, setVideoPlaying] = useState(
    sessionStorage.getItem('VIDEO_IS_PLAYING') === 'true'
  );


  // פונקציית האיפוס לפיתוח
  const handleResetAll = () => {
    const confirmReset = window.confirm("האם לאפס את כל ההתקדמות בלומדה ולחזור להתחלה?");
    if (confirmReset) {
      sessionStorage.clear();
      navigate('/');
      window.location.reload();
    }
  };


  return (
    <div className="App">
      {/* כפתור איפוס זמני לפיתוחה */}
      <button className="developer-reset-btn" onClick={handleResetAll}>
        איפוס לומדה 🔄
      </button>


      {!videoPlaying && location.pathname !== "/elevator" && <Header />}
      <Buttons></Buttons>


      <Routes>
        {/* דפים ללא סידבר */}
        <Route path="/" element={<OpeningPage />} />
        <Route path="/info-lomda" element={<InfoLomda />} />
        <Route path="/elevator" element={<Elevator />} />

        {/* --- התחלת יחידה 1 עם Layout --- */}
        <Route element={<UnitOneLayout />}>
          <Route path="/unit-one-opening" element={<UnitOneOpening />} />
          <Route path="/goals-unit-one" element={<UnitOneGoals />} />
          <Route path="/intro-unit-one" element={<IntroUnitOne />} />
          <Route path="/threats" element={<Threats setVideoPlaying={setVideoPlaying} />} />
          <Route path="/states" element={<States />} />
          <Route path="/interfaces" element={<Interfaces />} />
          <Route path="/interfaces-game" element={<InterfacesGame />} />
          <Route path="/population" element={<Population />} />
          <Route path="/populationInfo" element={<PopulationLaptop />} />
          <Route path="/population-parts" element={<PopulationFolders />} />
          <Route path="/populationGame" element={<PopulationGame />} />
          <Route path="/questions-end" element={<QuestionsEnd />} />
          <Route path="/summary-checklist-unit1" element={<SummaryCheckList checklist={unitOneChecklist} isFinalUnit={true} />} />
        </Route>
        {/* --- סיום יחידה 1 --- */}


        {/* --- יחידה 2 עם Layout וסידבר משלה --- */}
        <Route element={<UnitTwoLayout />}>
          <Route path="/unit-two-opening" element={<UnitTwoOpening />} />
          <Route path="/goals-unit-two" element={<UnitTwoGoals />} />
          <Route path="/intro-unit-two" element={<IntroUnitTwo />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/info-rockets" element={<InfoRockets />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/ProtectedSpace" element={<ProtectedSpace />} />
          <Route path="/Alert" element={<Alert />} />
          <Route path="/Defense" element={<Defense />} />
          <Route path="/ChoosingSafeRoom" element={<ChoosingSafeRoom />} />
          <Route path="/Wait10mins" element={<Wait10mins />} />
          <Route path="/BuildingMaintenance" element={<BuildingMaintenance />} />
          <Route path="/defense-policy/sub-one" element={<SubOneDefensePolicy />} />
          <Route path="/defense-policy/sub-two" element={<SubTwoDefensePolicy />}/>
          <Route path="/TimeToEnterMamad1" element={<TimeToEnterMamad1 />} />
          <Route path="/TimeToEnterMamad2" element={<TimeToEnterMamad2 />} />
          <Route path="/TimeToEnterMamad3" element={<TimeToEnterMamad3 />} />
          <Route path="/summary-checklist-unit2" element={<SummaryCheckList checklist={unitTwoChecklist} isFinalUnit={true} />} />
            {/* סיכומי תתי-יחידות יחידה 2 */}
            <Route path="/summary-checklist-unit2-sub1" element={<SummaryCheckList checklist={unitTwoSub1Checklist} />} />
            <Route path="/summary-checklist-unit2-sub2" element={<SummaryCheckList checklist={unitTwoSub2Checklist} />} />
            <Route path="/summary-checklist-unit2-sub3" element={<SummaryCheckList checklist={unitTwoSub3Checklist} />} />
            <Route path="/summary-checklist-unit2-sub4" element={<SummaryCheckList checklist={unitTwoSub4Checklist} />} />

          <Route path="/earthquake" element={<Earthquake />}/>
          <Route path="/earthquake/info-earthquake" element={<InfoEarthquake />}/>
           <Route path="/earthquake/info-tsunami" element={<InfoTsunami />}/>
          <Route path="/preparation-earth" element={<PreparationEarth />}/>
          
          {/* כאן להוסיף בהמשך את שאר הנתיבים של יחידה 2 (רעידת אדמה, חומ"ס וכו') */}
        </Route>

        {/* --- התחלת יחידה 3 עם Layout --- */}
        <Route path="/intro-unit-three" element={<IntroUnitThree />} />

        {/* --- התחלת יחידה 4 עם Layout --- */}
        <Route path="/intro-unit-four" element={<IntroUnitFour />} />
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

