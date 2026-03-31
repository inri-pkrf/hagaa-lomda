import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import headerData from '../Data/HeaderData';
import './Styles/Buttons.css';

const routeOrder = [
  '/',
  '/info-lomda',
  '/elevator',
  '/unit-opening/UnitOne',
  '/goals',
  '/intro-unit-one',
  '/threats',
  '/states',
  '/interfaces',
  '/population',
  '/populationInfo',
  '/population-parts',
  '/populationGame',
  '/intro-unit-one',
  '/summary-checklist',
  '/questions-end',
  '/elevator',
  '/intro-unit-two',
  '/rockets',
  '/info-rockets',
  '/intro-unit-three',
  '/intro-unit-four',
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

  const currentPath = location.pathname;
  const color = getHeaderColor();

  const getMatchingIndexes = (path) => {
    return routeOrder.reduce((matches, route, idx) => {
      const isMatch = route === '/unit-opening/UnitOne'
        ? path.startsWith('/unit-opening')
        : route === path;
      if (isMatch) matches.push(idx);
      return matches;
    }, []);
  };

  useEffect(() => {
    const matchingIndexes = getMatchingIndexes(currentPath);
    let index = matchingIndexes[0] ?? -1;

    const savedIndex = Number(sessionStorage.getItem('routeIndex'));
    if (!Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < routeOrder.length) {
      if (matchingIndexes.includes(savedIndex)) {
        index = savedIndex;
      } else {
        const nextFromSaved = matchingIndexes.find((i) => i > savedIndex);
        if (typeof nextFromSaved !== 'undefined') {
          index = nextFromSaved;
        }
      }
    }

    setCurrentIndex(index);

    const prev = index > 0 ? routeOrder[index - 1] : null;
    const next = index >= 0 && index < routeOrder.length - 1 ? routeOrder[index + 1] : null;

    setPrevPath(prev);
    setNextPath(next);

    sessionStorage.setItem('routeIndex', String(index));

    sessionStorage.setItem('currentUnit', sessionStorage.getItem('currentUnit') || 'UnitZero');
    sessionStorage.setItem('fromPage', currentPath);
    sessionStorage.setItem('toPage', '');
    sessionStorage.setItem('lastPage', '');
    sessionStorage.setItem('targetPage', '');
    sessionStorage.setItem('previousPage', prev || '');
    sessionStorage.setItem('nextPage', next || '');
  }, [currentPath]);

  const getNextIndexForTarget = (targetPath) => {
    const primary = routeOrder.findIndex((route, idx) => {
      if (idx <= currentIndex) return false;
      if (route === '/unit-opening/UnitOne') return targetPath.startsWith('/unit-opening');
      return route === targetPath;
    });

    if (primary >= 0) return primary;
    return routeOrder.findIndex((route) => route === targetPath);
  };

  const goToPath = (targetPath) => {
    if (!targetPath) return;

    const targetIndex = getNextIndexForTarget(targetPath);
    if (targetIndex >= 0) {
      sessionStorage.setItem('routeIndex', String(targetIndex));
    }

    sessionStorage.setItem('fromPage', currentPath);
    sessionStorage.setItem('toPage', targetPath);
    sessionStorage.setItem('lastPage', currentPath);
    sessionStorage.setItem('targetPage', targetPath);
    sessionStorage.setItem('currentUnit', sessionStorage.getItem('currentUnit') || 'UnitZero');

    navigate(targetPath);
  };

  return (
    <div className="buttons-page-corner" style={{ '--btn-color': color }}>
      <button className="app-button app-button--next" onClick={() => goToPath(nextPath)} disabled={!nextPath} type="button" aria-label="Next">
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Next" className="app-button__icon next" />
      </button>
      <button className="app-button app-button--prev" onClick={() => goToPath(prevPath)} disabled={!prevPath} type="button" aria-label="Back">
        <img src={`${process.env.PUBLIC_URL}/assets/Btns/NextBtnArrow.png`} alt="Back" className="app-button__icon back" />
      </button>
    </div>
  );
}

export default Buttons;