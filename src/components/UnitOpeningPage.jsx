import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import openingData from '../Data/OpeningData';
import './Styles/UnitOpeningPage.css'; // Assuming shared styles

function UnitOpeningPage() {
  const navigate = useNavigate();
  const { unitName } = useParams();
  const data = openingData[unitName];


  if (!data) {
    return <div>Unit data not found for {unitName}</div>;
  }

  // Save mainTitle to sessionStorage
  sessionStorage.setItem('MainTitle', data.mainTitle);

  const colors = data.colors;
  return (
    <main className="UnitOpeningPage" style={{
    "--card-main": colors.main,
    "--card-layer1": colors.layer1,
    "--card-layer2": colors.layer2,
    "--card-text": colors.text
  }}>
      <img
        className='UnitOpeningPage__building'
        src={`${process.env.PUBLIC_URL}${data.image}`}
        alt={`${unitName} Image`}
      />
    
      <div className='UnitOpeningPage_cards'>
          <h1 className="UnitOpeningPage__title">{data.title}</h1>
      <p className="UnitOpeningPage__subtitle">{data.subtitle}</p>
            <p className="UnitOpeningPage__text">{data.text}</p>

      </div>
      {/* כל הכפתורים יעברו בהמשך לחצים */}
      <button
        className="start-button-unitOpeningPage"
        onClick={() => navigate("/goals")}
      >
        {data.buttonText}
      </button>
    </main>
  );
}

export default UnitOpeningPage;
