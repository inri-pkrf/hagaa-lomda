import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatesData from "../../../Data/Unit1/StatesData";
import StatesCard from './StatesCard';
import './states.css';

function States() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [openedCards, setOpenedCards] = useState(new Set());
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי לוח 1.png`);
  const image = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesPin.png`;
  const [showCards, setShowCards] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showCardPopup, setShowCardPopup] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('statesOpenedCards');
    if (saved) {
      setOpenedCards(new Set(JSON.parse(saved)));
    }
  }, []);

  // --- לוגיקת החצים הכלליים ---
  useEffect(() => {
    const handleNext = (e) => {
      if (!showCards) {
        e.preventDefault();
        handleBackgroundClick();
        return;
      }

      if (showCardPopup) {
        e.preventDefault();
        closeStateCard();
        return;
      }

      const allIds = [1, 2, 3, 4];
      const nextId = allIds.find(id => !openedCards.has(id));

      if (nextId) {
        e.preventDefault();
        handleCardClick(nextId);
      } 
      else {
        e.preventDefault();
        handleComplete();
      }
    };

    // --- הוספת מאזין לחץ אחורה ---
    const handlePrev = (e) => {
      // אנחנו עוצרים את החזרה האוטומטית ל-Threats שמוגדרת ב-routeOrder
      e.preventDefault();

      if (showCardPopup) {
        // אם יש כרטיס פתוח, לחיצה על אחורה פשוט תסגור אותו
        closeStateCard();
      } else {
        // אם אנחנו בלוח (או בחדר), לחיצה על אחורה תחזיר למסדרון היחידה
        navigate('/intro-unit-one');
      }
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev); // רישום המאזין לאחורה

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev); // ניקוי המאזין
    };
  }, [showCards, showCardPopup, openedCards, navigate]); // הוספת תלויות מעודכנות

  const handleDevQuickOpen = (e) => {
    e.stopPropagation();
    const allIds = [1, 2, 3, 4];
    const newOpened = new Set(allIds);
    setOpenedCards(newOpened);
    sessionStorage.setItem('statesOpenedCards', JSON.stringify(allIds));
    setShowCards(true);
  };

  const handleBackgroundClick = () => {
    if (showCards) return;
    setBgImage(`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`);
    setShowCards(true);
  };

  const handleComplete = () => {
    sessionStorage.setItem('unitOne-second', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'finished' }));
    setCompleted(true);
    
    window.dispatchEvent(new Event('updateNavbar'));

    setTimeout(() => {
      navigate('/intro-unit-one');
    }, 1000);
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
      {process.env.NODE_ENV === 'development' && showCards && (
        <button
          onClick={handleDevQuickOpen}
          style={{
            position: 'fixed',
            top: '79px',
            left: '230px',
            zIndex: 10013,
            padding: '10px',
            background: 'red',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            border: '2px solid white',
            fontFamily: "Assistant, sans-serif"
          }}
        >
          DEV: פתח הכל
        </button>
      )}

      <div className='subtext-threats'>
        לחצו על הלוח במשרד כדי ללמוד על המצבים השונים של העורף
      </div>

      <img
        className="room-background-states"
        src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/חיווי לוח 1.png`}
        alt="Background"
      />

      {!showCards && (
        <div className='click-div-states' onClick={handleBackgroundClick}></div>
      )}

      {showCards && (
        <>
          <div className="overlay-dark"></div>
          <div className="board-container-wrapper">
            <img
              className="Board-image-element"
              src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`}
              alt="Board"
            />

            <img className='pinState' id="states-pin1" src={image} alt="Pin" />
            <img className='pinState' id="states-pin2" src={image} alt="Pin" />
            <img className='pinState' id="states-pin3" src={image} alt="Pin" />
            <img className='pinState' id="states-pin4" src={image} alt="Pin" />

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

      {showCardPopup && selectedId != null && (
        <StatesCard
          {...StatesData[selectedId]}
          onClose={closeStateCard}
        />
      )}
    </div>
  );
}

export default States;