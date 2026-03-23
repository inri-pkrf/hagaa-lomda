import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatesData from "../../../Data/Unit1/StatesData";
import StatesCard from './StatesCard';
import '../style/states.css';

function States() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [openedCards, setOpenedCards] = useState(new Set());
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי לוח 1.png`);
  const image = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesPin.png`;
  // const [animate, setAnimate] = useState(false); // REMARKED
  const [showCards, setShowCards] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showCardPopup, setShowCardPopup] = useState(false);

  useEffect(() => {
    // Load opened cards from sessionStorage
    const saved = sessionStorage.getItem('statesOpenedCards');
    if (saved) {
      setOpenedCards(new Set(JSON.parse(saved)));
    }

    /* REMARKED: AUTOMATIC ANIMATION LOGIC
    const startZoom = setTimeout(() => {
      setAnimate('zoom-in-board');
    }, 500);

    const changeImage = setTimeout(() => {
      setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`);
      setAnimate('zoom-out-board');
    }, 2500);

    const showCardsTimer = setTimeout(() => {
      setShowCards(true);
    }, 4500);

    return () => {
      clearTimeout(startZoom);
      clearTimeout(changeImage);
      clearTimeout(showCardsTimer);
    };
    */
  }, []);

  // NEW: Manual skip/cut to the board content
  const handleBackgroundClick = () => {
    if (showCards) return; // Don't trigger if already on the board

    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`);
    setShowCards(true);
    // If you need to keep the "Board" specific class for styling:
    // setAnimate('manual-cut'); 
  };

  const handleComplete = () => {
    sessionStorage.setItem('unitOne-second', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'finished' }));
    setCompleted(true);
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
    <div className='subtext-threats'>
      לחצו על הלוח במשרד כדי ללמוד על המצבים השונים של העורף
    </div>

    {/* רקע המשרד - תמיד קבוע מאחור */}
    <img
      className="room-background-states"
      src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי לוח 1.png`}
      alt="Background"
    />

    {/* האזור הלחיץ שמופיע רק לפני המעבר ללוח */}
    {!showCards && (
      <div className='click-div-states' onClick={handleBackgroundClick}></div>
    )}

    {/* מצב לוח פתוח */}
    {showCards && (
      <>
        {/* שכבת ההאפלה */}
        <div className="overlay-dark"></div>
        
        {/* הקונטיינר של הלוח והתוכן שלו */}
        <div className="board-container-wrapper">
          <img 
            className="Board-image-element" 
            src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`} 
            alt="Board" 
          />
          
          {/* הפינים - כעת הם ממוקמים יחסית ללוח */}
          <img className='pinState' id="states-pin1" src={image} alt="Pin" />
          <img className='pinState' id="states-pin2" src={image} alt="Pin" />
          <img className='pinState' id="states-pin3" src={image} alt="Pin" />
          <img className='pinState' id="states-pin4" src={image} alt="Pin" />
          
          {/* הכרטיסיות - כעת הן ממוקמות יחסית ללוח */}
          <div className='card-div-states cardOneStates' onClick={(e) => { e.stopPropagation(); handleCardClick(1); }}>
            שגרה{openedCards.has(1) && <span className="check-mark">✓</span>}
          </div>
          <div className='card-div-states cardTwoStates' onClick={(e) => { e.stopPropagation(); handleCardClick(2); }}>
            מעבר משגרה לחירום{openedCards.has(2) && <span className="check-mark">✓</span>}
          </div>
          <div className='card-div-states cardThreeStates' onClick={(e) => { e.stopPropagation(); handleCardClick(3); }}>
            שגרת חירום{openedCards.has(3) && <span className="check-mark">✓</span>}
          </div>
          <div className='card-div-states cardFourStates' onClick={(e) => { e.stopPropagation(); handleCardClick(4); }}>
            אירוע חירום{openedCards.has(4) && <span className="check-mark">✓</span>}
          </div>
        </div>
      </>
    )}

    {/* פופ-אפ פרטני לכל כרטיס */}
    {showCardPopup && selectedId != null && (
      <StatesCard
        {...StatesData[selectedId]}
        onClose={closeStateCard}
      />
    )}

    {/* כפתור סיום - מחוץ ללוח כדי שיישאר במיקום קבוע במסך */}
    {openedCards.size === 4 && !completed && (
      <button onClick={handleComplete} className='ending-button-states'>
        סיים וחזור
      </button>
    )}
  </div>
);
}

export default States;