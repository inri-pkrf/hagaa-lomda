import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import headerData from '../Data/HeaderData';
import './Styles/Buttons.css';

const routeOrder = [
  '/', '/info-lomda', '/elevator', '/unit-opening/UnitOne', '/goals', 
  '/intro-unit-one', '/threats', '/states', '/interfaces', '/population', 
  '/populationInfo', '/population-parts', '/populationGame', '/intro-unit-one', 
  '/summary-checklist', '/questions-end', '/elevator', '/intro-unit-two', 
  '/rockets', '/info-rockets', '/intro-unit-three', '/intro-unit-four',
];

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

  const goToPath = (targetPath, isNext = true) => {
    if (!targetPath) return;

    // שליחת אירוע "שאלה" לקומפוננטה הנוכחית
    const eventName = isNext ? 'onNextNav' : 'onPrevNav';
    const navEvent = new CustomEvent(eventName, { cancelable: true });
    const isCanceled = !window.dispatchEvent(navEvent);

    // אם הקומפוננטה עשתה preventDefault(), אנחנו לא מנווטים
    if (isCanceled) return;

    // ניווט רגיל אם האירוע לא נעצר
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


  return (
    <div className="buttons-page-corner" style={{ '--btn-color': color }}>
      <button className="app-button app-button--next" onClick={() => goToPath(nextPath, true)} disabled={!nextPath || isNextDisabled} >
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Next" className="app-button__icon next" />
      </button>
      <button className="app-button app-button--prev" onClick={() => goToPath(prevPath, false)} disabled={!prevPath}>
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Back" className="app-button__icon back" />
      </button>
    </div>
  );
}

export default Buttons;