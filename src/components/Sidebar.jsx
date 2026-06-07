import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Sidebar.css';
import { ChevronRight, ChevronLeft, ChevronDown, Lock, Check } from 'lucide-react';
import NavBarData from '../Data/NavBarData';


const Sidebar = ({ unitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const navigate = useNavigate();

  const units = ['UnitOne', 'UnitTwo', 'UnitThree', 'UnitFour'];

  const unitFinishedKeys = {
    UnitOne:   'unitOne-finished',
    UnitTwo:   'unitTwo-finished',
    UnitThree: 'unitThree-finished',
    UnitFour:  'unitFour-finished',
  };

  const titleToUnit = {
    "יחידה 1 - מבוא": 'UnitOne',
    "יחידה 2 - שגרה": 'UnitTwo',
    "יחידה 3 - שגרה": 'UnitThree',
    "יחידה 4 - חירום": 'UnitFour',
  };

  const titleToIndex = {
    "יחידה 1 - מבוא": 0,
    "יחידה 2 - שגרה": 1,
    "יחידה 3 - שגרה": 2,
    "יחידה 4 - חירום": 3,
  };

  const getCurrentUnit = () =>
    titleToUnit[unitInfo.title] || sessionStorage.getItem('currentUnit') || 'UnitOne';

  const currentUnitIndex = titleToIndex[unitInfo.title] ?? 0;
  const [displayedIndex, setDisplayedIndex] = useState(currentUnitIndex);

  const isViewingCurrentUnit = displayedIndex === currentUnitIndex;
  const displayedUnitData = isViewingCurrentUnit ? unitInfo : NavBarData[displayedIndex];

  const goToNextUnit = () => {
    if (displayedIndex < units.length - 1) {
      setDisplayedIndex(displayedIndex + 1);
      setExpandedChapters(new Set());
    }
  };

  const goToPrevUnit = () => {
    if (displayedIndex > 0) {
      setDisplayedIndex(displayedIndex - 1);
      setExpandedChapters(new Set());
    }
  };

  const nextLocked = displayedIndex >= units.length - 1;
  const prevLocked = displayedIndex === 0;

  const isQuestionFinished = () => {
    const keys = {
      "יחידה 1 - מבוא": 'unitOne-questions',
      "יחידה 2 - שגרה": 'unitTwo-questions',
      "יחידה 3 - שגרה": 'unitThree-questions',
      "יחידה 4 - חירום": 'unitFour-questions'
    };
    return sessionStorage.getItem(keys[unitInfo.title]) === 'finished';
  };

  const toggleSidebar = () => {
    if (!isOpen) {
      setDisplayedIndex(currentUnitIndex);
      setExpandedChapters(new Set());
      window.dispatchEvent(new Event('updateNavbar'));
    }
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path, isLocked) => {
    if (!isLocked && path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  const handleFeedbackClick = () => {
    setIsOpen(false);
    // אם כבר בדף CreditPage — פתח ישירות
    if (window.location.pathname.includes('CreditPage')) {
      window.dispatchEvent(new Event("openFeedbackPopup"));
    } else {
      // נווט לדף ופתח את הפופאפ אחרי הניווט
      navigate('/CreditPage');
      setTimeout(() => {
        window.dispatchEvent(new Event("openFeedbackPopup"));
      }, 300);
    }
  };

  if (!unitInfo) return null;

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`sidebar-container ${!isOpen ? 'closed' : ''}`}>
        <button
          className="toggle-tab"
          onClick={toggleSidebar}
          style={{ backgroundColor: isOpen ? displayedUnitData.color : unitInfo.color }}
        >
          {isOpen ? <ChevronRight size={'6vw'} /> : <ChevronLeft size={'6vw'} />}
        </button>

        <div className="sidebar-content">
          <header className="sidebar-header">
            <div className="logo-container-sidebar">
              <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo" className="logo" />
              <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo" className="logo" />
            </div>
            <div className="unit-banner" style={{ backgroundColor: displayedUnitData.color }}>
              <ChevronRight
                size={'2vw'}
                strokeWidth={1.5}
                onClick={goToPrevUnit}
                style={{ cursor: prevLocked ? 'default' : 'pointer', opacity: prevLocked ? 0.3 : 1 }}
              />
              <span className="unit-title">{displayedUnitData.title}</span>
              <ChevronLeft
                size={'2vw'}
                strokeWidth={1.5}
                onClick={goToNextUnit}
                style={{ cursor: nextLocked ? 'default' : 'pointer', opacity: nextLocked ? 0.3 : 1 }}
              />
            </div>
          </header>

          <div className="chapters-wrapper">
            {Array.isArray(displayedUnitData.chapters) && displayedUnitData.chapters.map((chapter, idx) => {
              const hasSubChapters = Array.isArray(chapter.subChapters) && chapter.subChapters.length > 0;
              const isExpanded = expandedChapters.has(idx);
              const isLocked = isViewingCurrentUnit ? chapter.isLocked : true;
              const isFinished = isViewingCurrentUnit
                ? (chapter.title === "שאלות סיכום" ? isQuestionFinished() : chapter.isFinished)
                : false;

              return (
                <div key={idx} className="chapter-group">
                  <div
                    className={`chapter-card ${isLocked ? 'is-locked' : 'clickable'}`}
                    style={{
                      backgroundColor: isLocked ? '#e0e0e0' : displayedUnitData.color,
                      cursor: isLocked ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => {
                      if (hasSubChapters) {
                        setExpandedChapters(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(idx)) newSet.delete(idx);
                          else newSet.add(idx);
                          return newSet;
                        });
                      } else if (!isLocked) {
                        handleNavigation(chapter.path, isLocked);
                      }
                    }}
                  >
                    <div className="chapter-main-content">
                      <span className="chapter-label">{chapter.title}</span>
                      {hasSubChapters && (
                        <ChevronDown
                          size={'1vw'}
                          className={`arrow-icon-sidebar ${isExpanded ? 'rotated' : ''}`}
                          style={{ marginRight: '8px' }}
                        />
                      )}
                    </div>
                    <div className="chapter-icon-container">
                      {isLocked ? (
                        <Lock size={'1vw'} className="lock-icon" />
                      ) : isFinished ? (
                        <div className="check-badge-main">
                          <Check size={'1vw'} color={displayedUnitData.color} strokeWidth={4} />
                        </div>
                      ) : (
                        <div className="unlock-icon" />
                      )}
                    </div>
                  </div>

                  {isExpanded && hasSubChapters && chapter.subChapters.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className={`sub-chapter-item ${isLocked ? 'disabled' : 'clickable'}`}
                      onClick={() => handleNavigation(sub.path, isLocked)}
                    >
                      <span className="sub-title">{sub.title}</span>
                      {sub.isFinished && (
                        <div className="check-badge-sub">
                          <Check size={'1vw'} color={displayedUnitData.color} strokeWidth={4} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <button
              className="about-us-btn"
              onClick={() => {
                navigate('/CreditPage');
                setIsOpen(false);
              }}
            >
              מי אנחנו
            </button>
            <button
              className="about-us-btn"
              onClick={handleFeedbackClick}
            >
              משוב
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;