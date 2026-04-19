import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Sidebar.css';
import { ChevronRight, ChevronLeft, ChevronDown, Lock, Check } from 'lucide-react';

const Sidebar = ({ unitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const navigate = useNavigate();

  // =========================
  // 🔥 ניהול יחידות
  // =========================
  const units = ['UnitOne', 'UnitTwo', 'UnitThree', 'UnitFour'];

  const unitRoutes = {
    UnitOne: '/unit-one-opening',
    UnitTwo: '/unit-two-opening',
    UnitThree: '/intro-unit-three',
    UnitFour: '/intro-unit-four'
  };

  const goToNextUnit = () => {
    const current = sessionStorage.getItem('currentUnit') || 'UnitOne';
    const index = units.indexOf(current);

    if (index < units.length - 1) {
      const nextUnit = units[index + 1];
      sessionStorage.setItem('currentUnit', nextUnit);
      navigate(unitRoutes[nextUnit]);
    }
  };

  const goToPrevUnit = () => {
    const current = sessionStorage.getItem('currentUnit') || 'UnitOne';
    const index = units.indexOf(current);

    if (index > 0) {
      const prevUnit = units[index - 1];
      sessionStorage.setItem('currentUnit', prevUnit);
      navigate(unitRoutes[prevUnit]);
    }
  };

  // =========================
  // Sidebar רגיל
  // =========================
  const toggleSidebar = () => {
    if (!isOpen) {
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

  if (!unitInfo) return null;

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`sidebar-container ${!isOpen ? 'closed' : ''}`}>

        {/* כפתור פתיחה/סגירה */}
        <button
          className="toggle-tab"
          onClick={toggleSidebar}
          style={{ backgroundColor: unitInfo.color }}
        >
          {isOpen ? <ChevronRight size={35} /> : <ChevronLeft size={35} />}
        </button>

        <div className="sidebar-content">

          {/* HEADER */}
          <header className="sidebar-header">

            <div className="logo-container-sidebar">
              <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo" className="logo" />
              <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo" className="logo" />
            </div>

            {/* 🔥 ניווט בין יחידות */}
            <div className="unit-banner" style={{ backgroundColor: unitInfo.color }}>

              <ChevronRight
                size={40}
                strokeWidth={1.5}
                onClick={goToPrevUnit}
                style={{ cursor: 'pointer' }}
              />

              <span className="unit-title">{unitInfo.title}</span>

              <ChevronLeft
                size={40}
                strokeWidth={1.5}
                onClick={goToNextUnit}
                style={{ cursor: 'pointer' }}
              />
            </div>

          </header>

          {/* פרקים */}
          <div className="chapters-wrapper">
            {unitInfo.chapters.map((chapter, idx) => {
              const hasSubChapters = chapter.subChapters && chapter.subChapters.length > 0;
              const isExpanded = expandedChapters.has(idx);

              return (
                <div key={idx} className="chapter-group">

                  <div
                    className={`chapter-card ${chapter.isLocked ? 'is-locked' : 'clickable'}`}
                    style={{
                      backgroundColor: chapter.isLocked ? '#e0e0e0' : unitInfo.color,
                      cursor: chapter.isLocked ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => {
                      if (hasSubChapters) {
                        setExpandedChapters(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(idx)) newSet.delete(idx);
                          else newSet.add(idx);
                          return newSet;
                        });
                      } else if (!chapter.isLocked) {
                        handleNavigation(chapter.path, chapter.isLocked);
                      }
                    }}
                  >

                    {/* טקסט + חץ */}
                    <div className="chapter-main-content">
                      <span className="chapter-label">{chapter.title}</span>

                      {hasSubChapters && (
                        <ChevronDown
                          size={18}
                          className={`arrow-icon-sidebar ${isExpanded ? 'rotated' : ''}`}
                          style={{ marginRight: '8px' }}
                        />
                      )}
                    </div>

                    {/* אייקון מצב */}
                    <div className="chapter-icon-container">
                      {chapter.isLocked ? (
                        <Lock size={16} className="lock-icon" />
                      ) : chapter.isFinished ? (
                        <div className="check-badge-main">
                          <Check size={12} color={unitInfo.color} strokeWidth={4} />
                        </div>
                      ) : (
                        <div className="unlock-icon" />
                      )}
                    </div>

                  </div>

                  {/* תתי פרקים */}
                  {isExpanded && hasSubChapters && chapter.subChapters.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className={`sub-chapter-item ${chapter.isLocked ? 'disabled' : 'clickable'}`}
                      onClick={() => handleNavigation(sub.path, chapter.isLocked)}
                    >
                      <span className="sub-title">{sub.title}</span>

                      {sub.isFinished && (
                        <div className="check-badge-sub">
                          <Check size={12} color={unitInfo.color} strokeWidth={4} />
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;