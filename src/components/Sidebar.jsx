import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Sidebar.css';
import { ChevronRight, ChevronLeft, ChevronDown, Lock, Check } from 'lucide-react'; // הוספנו ChevronDown

const Sidebar = ({ unitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const navigate = useNavigate();

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
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={() => setIsOpen(false)} />
      <div className={`sidebar-container ${!isOpen ? 'closed' : ''}`}>
        <button className="toggle-tab" onClick={toggleSidebar} style={{ backgroundColor: unitInfo.color }}>
          {isOpen ? <ChevronRight size={35} /> : <ChevronLeft size={35} />}
        </button>

        <div className="sidebar-content">
          <header className="sidebar-header">
            <div className="logo-container-sidebar">
              <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo" className="logo" />
              <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo" className="logo" />
            </div>
            <div className="unit-banner" style={{ backgroundColor: unitInfo.color }}>
              <ChevronRight size={45} strokeWidth={1.5} />
              <span className="unit-title">{unitInfo.title}</span>
              <ChevronLeft size={45} strokeWidth={1.5} />
            </div>
          </header>

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
                    {/* צד ימין של הכרטיס: טקסט ואז חץ פתיחה */}
                    <div className="chapter-main-content">
                      <span className="chapter-label">{chapter.title}</span>
                      {hasSubChapters && (
                        <ChevronDown
                          size={18}
                          className={`arrow-icon-sidebar ${isExpanded ? 'rotated' : ''}`}
                          style={{ marginRight: '8px' }} // רווח בין הטקסט לחץ
                        />
                      )}
                    </div>

                    {/* צד שמאל של הכרטיס: מנעול או V */}
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

                  {/* הצגת תתי פרקים */}
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