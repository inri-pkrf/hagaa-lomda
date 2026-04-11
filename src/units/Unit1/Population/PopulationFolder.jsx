import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopulationFolder.css';
import FolderPopUp from './FolderPopUp';
import { populationDataFolders } from '../../../Data/Unit1/PopulationDataFolders';

function PopulationFolder() {
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [visitedFolders, setVisitedFolders] = useState(
    JSON.parse(sessionStorage.getItem("visitedFolders")) || []
  );
  const openFolder = (id) => {

    const folder = populationDataFolders.find(item => item.id === id);
    setSelectedFolder(folder);

    const visited = JSON.parse(sessionStorage.getItem("visitedFolders")) || [];

    if (!visited.includes(id)) {
      visited.push(id);
      sessionStorage.setItem("visitedFolders", JSON.stringify(visited));
      setVisitedFolders(visited);
    }
  };

  useEffect(() => {
    // השבתת חיצים כלליים
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
    window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: true }));

    const blockNav = (e) => e.preventDefault();

    window.addEventListener('onNextNav', blockNav);
    window.addEventListener('onPrevNav', blockNav);

    return () => {
      window.removeEventListener('onNextNav', blockNav);
      window.removeEventListener('onPrevNav', blockNav);
      // חשוב: לא תמיד נרצה לעשות Enable כאן, כי Population הראשי יחליט לפי הסטייט שלו
    };
  }, []);
  return (
    <div className='populationFolder-container'>

      <button className="back-to-office-btn" onClick={() => navigate('/population')}>
        חזרה למשרד 🏠
      </button>

      <div className='subtext-populationFolder'>
      יש ללחוץ על הקלסרים המוצגים, מימין לשמאל, כדי ללמוד על כך:
      </div>

      <img
        className='Population-foldersImg'
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationFolders.png`}
        alt="Population Folders"
      />

      <div
        className='populationFolder-text firstText'
        onClick={() => openFolder(1)}
      >
        <h2>תגובה</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/BlueIcon.png`}
          alt=""
        />
        {visitedFolders.includes(1) && <span className="checkMarkFolder">✔</span>}

      </div>

      <div
        className='populationFolder-text secondText'
        onClick={() => openFolder(2)}
      >
        <h2>תפיסת איום</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/GreenIcon.png`}
          alt=""
        />
        {visitedFolders.includes(2) && <span className="checkMarkFolder">✔</span>}

      </div>

      <div
        className='populationFolder-text thirdText'
        onClick={() => openFolder(3)}
      >
        <h2>נסיבות</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/RedIcon.png`}
          alt=""
        />
        {visitedFolders.includes(3) && <span className="checkMarkFolder">✔</span>}

      </div>

      {selectedFolder && (
        <FolderPopUp
          data={selectedFolder}
          close={() => setSelectedFolder(null)}
        />
      )}
      {visitedFolders.length === 3 && (
        <button
          className="gameButton"
          onClick={() => {
            // 1. שמירה שסיימנו את הקלסרים
            sessionStorage.setItem("populationFoldersFinished", "true");
            // 2. חזרה לחדר הראשי עם סטייט מעודכן
            navigate("/population", { state: { foldersFinished: true } });
          }}
        >
          סיום משימה        </button>
      )}

    </div>
  );
}

export default PopulationFolder;