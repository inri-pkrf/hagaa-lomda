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
    // 1. הגדרת מצב הלחצנים ב-Navbar
    // חץ אחורה תמיד פעיל, חץ קדימה פעיל רק אם סיימו את 3 הקלסרים
    window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: visitedFolders.length !== 3 }));


    // 2. סימון סיום ב-sessionStorage אם הכל נצפה
    if (visitedFolders.length === 3) {
      sessionStorage.setItem("populationFoldersFinished", "true");
    }


    // 3. פונקציית הניווט של החץ אחורה
    const handlePrev = (e) => {
      e.preventDefault(); // עוצר את התנהגות הדפדפן הדיפולטיבית
      navigate('/population'); // מחזיר למסך הראשי של האוכלוסייה
    };


    // 4. חסימת חץ קדימה (אופציונלי, למקרה שהמשתמש מנסה ללחוץ כשהוא חסום)
    const blockNext = (e) => {
      if (visitedFolders.length !== 3) {
        e.preventDefault();
      }
    };


    window.addEventListener('onPrevNav', handlePrev);
    window.addEventListener('onNextNav', blockNext);


    return () => {
      window.removeEventListener('onPrevNav', handlePrev);
      window.removeEventListener('onNextNav', blockNext);
      // איפוס מצב החצים ביציאה מהמסך
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
      window.dispatchEvent(new CustomEvent('setPrevBtnDisabled', { detail: false }));
    };
  }, [visitedFolders, navigate]);
 
  return (
    <div className='populationFolder-container'>


      <div className='subtitles subtext-populationFolder'>
      יש ללחוץ על הקלסרים המוצגים, מימין לשמאל, כדי ללמוד על כך:
      </div>


      <img
        className='Population-foldersImg'
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/PopulationFolders.webp`}
        alt="Population Folders"
      />


      <div
        className='populationFolder-text firstText'
        onClick={() => openFolder(1)}
      >
        <h2 className='title-population'>תגובה</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/BlueIcon.png`}
          alt=""
        />
        {visitedFolders.includes(1) && 
          <div className="completion-v">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>}


      </div>


      <div
        className='populationFolder-text secondText'
        onClick={() => openFolder(2)}
      >
        <h2 className='title-population'>תפיסת איום</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/GreenIcon.png`}
          alt=""
        />
        {visitedFolders.includes(2) &&           
          <div className="completion-v">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>}


      </div>


      <div
        className='populationFolder-text thirdText'
        onClick={() => openFolder(3)}
      >
        <h2 className='title-population'>נסיבות</h2>
        <img
          className='folderIcon'
          src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/Population/RedIcon.png`}
          alt=""
        />
        {visitedFolders.includes(3) &&
          <div className="completion-v">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>}


      </div>


      {selectedFolder && (
        <FolderPopUp
          data={selectedFolder}
          close={() => setSelectedFolder(null)}
        />
      )}
      {/* אין כפתור סיום - החץ קדימה יופעל אוטומטית */}


    </div>
  );
}


export default PopulationFolder;

