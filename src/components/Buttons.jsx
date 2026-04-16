import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import headerData from '../Data/HeaderData';
import './Styles/Buttons.css';

const routeOrder = [
  '/', '/info-lomda', '/elevator', '/unit-one-opening', '/goals-unit-one',
  '/intro-unit-one', '/threats', '/states', '/intro-unit-one',
  '/interfaces', '/interfaces-game',
  '/population', '/PopulationInfo', '/population-parts', '/population',
  '/PopulationGame', '/population', '/intro-unit-one',
  '/questions-end', '/summary-checklist-unit1', '/elevator', '/unit-two-opening', '/goals-unit-two',
  '/rockets', '/info-rockets', '/rockets', '/preparation', '/frame3', '/summary-checklist-unit2-sub1',
];
// '',
const getHeaderColor = () => {
  const currentUnit = sessionStorage.getItem('currentUnit') || 'UnitZero';
  return headerData[currentUnit]?.backgroundColor || '#3FC6F3';
};

function Buttons() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevPath, setPrevPath] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const currentPath = location.pathname;
  const color = getHeaderColor();

  useEffect(() => {
    const getMatchingIndexes = (path) => {
        return routeOrder.reduce((matches, route, idx) => {
          const isMatch = route === '/unit-opening/UnitOne' ? path.startsWith('/unit-opening') : route === path;
          if (isMatch) matches.push(idx);
          return matches;
        }, []);
      };

    const matchingIndexes = getMatchingIndexes(currentPath);
    let index = matchingIndexes[0] ?? -1;

    const savedIndex = Number(sessionStorage.getItem('routeIndex'));
    if (!Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < routeOrder.length) {
      if (matchingIndexes.includes(savedIndex)) index = savedIndex;
    }

    setCurrentIndex(index);
    const prev = index > 0 ? routeOrder[index - 1] : null;
    const next = index >= 0 && index < routeOrder.length - 1 ? routeOrder[index + 1] : null;

    setPrevPath(prev);
    setNextPath(next);

    sessionStorage.setItem('routeIndex', String(index));
  }, [currentPath]);

  // עמודי המעבר המיוחדים
  const specialPages = ['/ProtectedSpace', '/Alert', '/Defense', '/ChoosingSafeRoom', '/Wait10mins', '/BuildingMaintenance'];

  const goToPath = (targetPath, isNext = true) => {
    if (!targetPath) return;

    // שליחת אירוע "שאלה" לקומפוננטה הנוכחית
    const eventName = isNext ? 'onNextNav' : 'onPrevNav';
    const navEvent = new CustomEvent(eventName, { cancelable: true });
    const isCanceled = !window.dispatchEvent(navEvent);

    // אם הקומפוננטה עשתה preventDefault(), אנחנו לא מנווטים
    if (isCanceled) return;


    // מעבר ל-intro-unit-two אם כל המסגרות ברקטות הושלמו, וסימון הדלת הראשונה כבוצעה
    if (isNext && location.pathname === '/rockets') {
      try {
        const clickedFrames = JSON.parse(sessionStorage.getItem('clickedFrames') || '[]');
        const allFrames = [1,2,3,4,5];
        const allClicked = allFrames.every(id => clickedFrames.includes(id));
        if (allClicked) {
          // סימון פתיחה של יחידה 2 כבוצעה
          sessionStorage.setItem('unitTwo-opening', 'finished');
          sessionStorage.setItem('unitTwo-first', 'finished'); // סימון הדלת הראשונה
          window.dispatchEvent(new Event('updateNavbar'));
          navigate('/intro-unit-two');
          return;
        }
      } catch (e) {}
    }

    // אם אנחנו באחד מהעמודים המיוחדים או ב-/BuildingMaintenance ולוחצים "קדימה" -> תמיד חוזרים ל-preparation
    if (isNext && (specialPages.includes(location.pathname) || location.pathname === '/BuildingMaintenance')) {
      navigate('/preparation');
      return;
    }

    // אם אנחנו ב-preparation ולוחצים "קדימה" -> תמיד ל-rockets
    if (isNext && location.pathname === '/preparation') {
      navigate('/rockets');
      return;
    }

    // ניווט רגיל בכל שאר המצבים (כולל אחורה בכל העמודים)
    navigate(targetPath);
  };

  useEffect(() => {
    // האזנה לאירוע השבתה/הפעלה
    const handleToggleNext = (e) => setIsNextDisabled(e.detail);
    
    window.addEventListener('setNextBtnDisabled', handleToggleNext);
    return () => {
      window.removeEventListener('setNextBtnDisabled', handleToggleNext);
      setIsNextDisabled(false); // איפוס ביציאה מהקומפוננטה
    };
  }, [location.pathname]);

  // בדיקה אם אנחנו במעלית - אם כן, לא מחזירים את ה-HTML של הכפתורים
  if (location.pathname === '/elevator') {
    return null;
  }

  // Disable both buttons on /BuildingMaintenance
  const isBuildingMaintenance = location.pathname === '/BuildingMaintenance';

  return (
    <div className="buttons-page-corner" style={{ '--btn-color': color }}>
      <button
        className="app-button app-button--next"
        onClick={() => goToPath(nextPath, true)}
        disabled={!nextPath || isNextDisabled || isBuildingMaintenance}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Next" className="app-button__icon next" />
      </button>
      <button
        className="app-button app-button--prev"
        onClick={() => goToPath(prevPath, false)}
        disabled={!prevPath || isBuildingMaintenance}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Back" className="app-button__icon back" />
      </button>
    </div>
  );
}

export default Buttons;