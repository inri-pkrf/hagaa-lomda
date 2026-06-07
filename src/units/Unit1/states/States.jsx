import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatesData from "../../../Data/Unit1/StatesData";
import StatesCard from './StatesCard';
import './states.css';


function States() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [openedCards, setOpenedCards] = useState(new Set());


  // נתיבי התמונות
  const initialBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesBackground.jpg`;
  const finalBg = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesBackground.jpg`;
  const pinImage = `${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesPin.png`;


  const [showCards, setShowCards] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showCardPopup, setShowCardPopup] = useState(false);


  const isAllOpened = openedCards.size === 4;


  const [isStatesDone, setIsStatesDone] = useState(
    sessionStorage.getItem('unitOne-second') === 'finished'
  );


  // --- פונקציית דילוג לפיתוח ---
  const handleDevSkip = (e) => {
    e.stopPropagation(); // מונע הקלקה על דברים מתחת
    const allIds = new Set([1, 2, 3, 4]);
    setOpenedCards(allIds);
    sessionStorage.setItem('statesOpenedCards', JSON.stringify(Array.from(allIds)));
    // שימי לב: ה-useEffect של isAllOpened כבר יטפל בשמירה ל-session ולסידבר
  };


  useEffect(() => {
    const saved = sessionStorage.getItem('statesOpenedCards');
    if (saved) {
      setOpenedCards(new Set(JSON.parse(saved)));
    }


    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !isAllOpened }));


    const handlePrev = (e) => {
      e.preventDefault();
      navigate('/intro-unit-one');
    };


    window.addEventListener('onPrevNav', handlePrev);
    return () => {
      window.removeEventListener('onPrevNav', handlePrev);
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [isAllOpened, navigate]);


  useEffect(() => {
    if (isAllOpened && !isStatesDone) {
      setIsStatesDone(true);
      sessionStorage.setItem('unitOne-second', 'finished');
      sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'unitOne-second', state: 'finished' }));
      setCompleted(true);
      window.dispatchEvent(new Event('updateNavbar'));
    }
  }, [isAllOpened, isStatesDone]);


  const handleBackgroundClick = () => {
    if (showCards) return;
    setShowCards(true);
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
      <div className='subtitles subtext-threats'>
        {isStatesDone
          ? "כבר למדת על מצבי העורף, ניתן לצפות שוב או לחזור למסדרון"
          : "לחצו על הלוח במשרד כדי ללמוד על המצבים השונים של העורף"}
      </div>


      <img
        className="room-background-states"
        src={isStatesDone ? finalBg : initialBg}
        alt="Background"
      />


      {!showCards && (
        <div
          className={isStatesDone ? 'click-div-states-done' : 'click-div-states'}
          onClick={handleBackgroundClick}
        >
          {isStatesDone && (
        <div className="completion-v done-states ">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
          )}
        </div>
      )}


      {showCards && (
        <>
          <div className="overlay-dark"></div>
          <div className="board-container-wrapper">
            <button className="close-board-btn" onClick={() => setShowCards(false)}>
              ✕
            </button>


            <img className="Board-image-element" src={`${process.env.PUBLIC_URL}/assets/UnitOneImgs/StatesArtBoard.jpg`} alt="Board" />


            <img className='pinState' id="states-pin1" src={pinImage} alt="Pin" />
            <img className='pinState' id="states-pin2" src={pinImage} alt="Pin" />
            <img className='pinState' id="states-pin3" src={pinImage} alt="Pin" />
            <img className='pinState' id="states-pin4" src={pinImage} alt="Pin" />


            {[
              { id: 1, text: "שגרה", class: "cardOneStates" },
              { id: 2, text: "מעבר משגרה לחירום", class: "cardTwoStates" },
              { id: 3, text: "שגרת חירום", class: "cardThreeStates" },
              { id: 4, text: "אירוע חירום", class: "cardFourStates" }
            ].map(card => (
              <div
                key={card.id}
                className={`card-div-states ${card.class}`}
                onClick={(e) => { e.stopPropagation(); handleCardClick(card.id); }}
              >
              {card.text}{openedCards.has(card.id) &&         
                <div className="completion-v check-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
              </div>}
              </div>
            ))}
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

