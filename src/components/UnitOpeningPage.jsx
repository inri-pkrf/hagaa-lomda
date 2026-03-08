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

  return (
    <main className="UnitOpeningPage">
      <img
        className='openingPage-building'
        src={`${process.env.PUBLIC_URL}${data.image}`}
        alt={`${unitName} Image`}
      />
      <h1 className="UnitOpeningPage__title">{data.title}</h1>
      <p className="UnitOpeningPage__subtitle">{data.subtitle}</p>
      <div className='UnitOpeningPage_cards'>
            <p className="UnitOpeningPage__text">{data.text}</p>

      </div>
      //בהמשך נעבור לחצים
      <button
        className="start-button-unitOpeningPage"
        onClick={() => navigate(data.navigateTo)}
      >
        {data.buttonText}
      </button>
    </main>
  );
}

export default UnitOpeningPage;
