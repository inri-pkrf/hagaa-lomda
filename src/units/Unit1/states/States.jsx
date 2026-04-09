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

  const isAllOpened = openedCards.size === 4;

  useEffect(() => {
    const saved = sessionStorage.getItem('statesOpenedCards');
    if (saved) {
      setOpenedCards(new Set(JSON.parse(saved)));
    }

    // השבתת החץ הכללי של הלומדה (Next)
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));

    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, []);

  useEffect(() => {
    if (isAllOpened) {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    }
  }, [isAllOpened]);

  // --- לוגיקת החצים (קדימה ואחורה) ---
  useEffect(() => {
    const handleNext = (e) => {
      if (isAllOpened) {
        e.preventDefault();
        handleComplete();
      }
    };

    const handlePrev = (e) => {
      // חטיפת כפתור "חזור" - עוצר את הניווט האוטומטי ומחזיר למסדרון
      e.preventDefault();
      navigate('/intro-unit-one');
    };

    window.addEventListener('onNextNav', handleNext);
    window.addEventListener('onPrevNav', handlePrev); // האזנה לחץ אחורה

    return () => {
      window.removeEventListener('onNextNav', handleNext);
      window.removeEventListener('onPrevNav', handlePrev);
    };
  }, [isAllOpened, navigate]);

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
    navigate('/intro-unit-one');
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
      {process.env.NODE_ENV === 'development' && !isAllOpened && (
        <button onClick={handleDevQuickOpen} className="dev-btn"> DEV: פתח הכל </button>
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
            <img className="Board-image-element" src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.png`} alt="Board" />

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

      {isAllOpened && (
        <button onClick={handleComplete} className="ending-button-states">
          סיום וחזרה למסדרון
        </button>
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