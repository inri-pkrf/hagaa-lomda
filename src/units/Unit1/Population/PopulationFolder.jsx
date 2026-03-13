import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PopulationFolder.css';
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
  return (
    <div className='populationFolder-container'>

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
        onClick={() => navigate("/populationGame")}
      >
        למשחק גרירה
      </button>
    )}

    </div>
  );
}

export default PopulationFolder;