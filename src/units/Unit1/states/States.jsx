import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatesData from "../../../Data/Unit1/StatesData";
import StatesCard from './StatesCard';
import '../style/States.css';
function States() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [openedCards, setOpenedCards] = useState(new Set());
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesBackground.png`);
  const image = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesPin.png`;
  const [animate, setAnimate] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showCardPopup, setShowCardPopup] = useState(false);
useEffect(() => {
  // Load opened cards from sessionStorage
  const saved = sessionStorage.getItem('statesOpenedCards');
  if (saved) {
    setOpenedCards(new Set(JSON.parse(saved)));
  }

  const startZoom = setTimeout(() => {
    setAnimate('zoom-in-board');
  }, 500);


  const changeImage = setTimeout(() => {
    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`);
    setAnimate('zoom-out-board');
  }, 2500);


  // הכרטיסים מופיעים אחרי שהזום אאוט הסתיים
  const showCardsTimer = setTimeout(() => {
    setShowCards(true);
  }, 4500);





  return () => {
    clearTimeout(startZoom);
    clearTimeout(changeImage);
    clearTimeout(showCardsTimer);
  };


}, []);


  const handleComplete = () => {
    // מסמן שסיימתי את הפרק
    sessionStorage.setItem('unitOne-second', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'finished' }));
    setCompleted(true);
    // Clear opened cards for next visit if needed
    // sessionStorage.removeItem('statesOpenedCards');
    //מוביל חזרה לדלתות
    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 2000);
  };


  const handleCardClick = (id) => {
    const newOpened = new Set(openedCards);
    newOpened.add(id);
    setOpenedCards(newOpened);
    sessionStorage.setItem('statesOpenedCards', JSON.stringify(Array.from(newOpened)));
    openStateCard(id);
  };

  const openStateCard = (id) => {
    setSelectedId(id);
    setShowCardPopup(true);
  };


  const closeStateCard = () => {
    setShowCardPopup(false);
    setSelectedId(null);
  };




  return (
    <div className="threats-container">
      <img
        className={`room-background-states ${animate} ${bgImage.includes('ArtBoard') ? 'Board' : ''}`} src={bgImage}
        alt=""
      />


      {showCards && (
        <>
        <img className='pinState' id="states-pin1" src={image} alt="States Pin" />
        <img className='pinState' id="states-pin2" src={image} alt="States Pin" />
        <img className='pinState' id="states-pin3" src={image} alt="States Pin" />
        <img className='pinState' id="states-pin4" src={image} alt="States Pin" />
        </>
      )}


      {showCards && (
        <>
          <div className='card-div-states cardOneStates'
            onClick={() => handleCardClick(1)}
          >
            שגרה{openedCards.has(1) && <span style={{color: 'green', fontSize: '24px', marginLeft: '10px'}}>✓</span>}
          </div>
          <div className='card-div-states cardTwoStates'
            onClick={() => handleCardClick(2)}
          >
            מעבר משגרה לחירום{openedCards.has(2) && <span style={{color: 'green', fontSize: '24px', marginLeft: '10px'}}>✓</span>}
          </div>
          <div className='card-div-states cardThreeStates'
            onClick={() => handleCardClick(3)}
          >
            שגרת חירום{openedCards.has(3) && <span style={{color: 'green', fontSize: '24px', marginLeft: '10px'}}>✓</span>}
          </div>
          <div className='card-div-states cardFourStates'
            onClick={() => handleCardClick(4)}
          >
            אירוע חירום{openedCards.has(4) && <span style={{color: 'green', fontSize: '24px', marginLeft: '10px'}}>✓</span>}
          </div>
        </>
      )}


      {showCardPopup && selectedId != null && (
        <StatesCard
          {...StatesData[selectedId]}
          onClose={closeStateCard}
        />
      )}


{openedCards.size === 4 && !completed && (
        <button
          onClick={handleComplete}
          className='ending-button-states'
        >
          סיים וחזור
        </button>
      )}


      {completed && <p>הפרק הושלם! מעבר לדף הראשי...</p>}
    </div>
  );
}


export default States;

