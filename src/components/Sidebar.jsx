import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Sidebar.css';
import { ChevronRight, ChevronLeft, Lock, Check } from 'lucide-react';


const Sidebar = ({ unitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  // פונקציית פתיחה/סגירה ששולחת אירוע לעדכון הנתונים מה-Storage
  const toggleSidebar = () => {
    if (!isOpen) {
      window.dispatchEvent(new Event('updateNavbar'));
    }
    setIsOpen(!isOpen);
  };


  // פונקציית ניווט - מנווטת רק אם הפרק לא נעול
  const handleNavigation = (path, isLocked) => {
    if (!isLocked && path) {
      navigate(path);
      setIsOpen(false); // סגירה אוטומטית לאחר בחירה
    }
  };


  if (!unitInfo) return null;


  return (
    <>
      {/* Overlay - הרקע הכהה שמחשיך את המסך */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />


      <div className={`sidebar-container ${!isOpen ? 'closed' : ''}`}>
       
        {/* לשונית החץ הקטנה */}
        <button
          className="toggle-tab"
          onClick={toggleSidebar}
          style={{ backgroundColor: unitInfo.color }}
          aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {isOpen ? <ChevronRight size={35} /> : <ChevronLeft size={35} />}
        </button>


        {/* תוכן הנאבר */}
        <div
          className="sidebar-content"
          style={{
            '--scrollbar-thumb': unitInfo.color,
            '--scrollbar-thumb-hover': unitInfo.color,
            '--scrollbar-track': '#ecf0f1'
          }}
        >
         
          {/* באנר עליון עם כותרת היחידה */}
          <header className="sidebar-header">
            <div className="logo-container-sidebar">
              <img src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`} alt="Logo 1" className="logo" />
              <img src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`} alt="Logo 2" className="logo" />
            </div>
            <div className="unit-banner" style={{ backgroundColor: unitInfo.color }}>
              <ChevronRight size={45} strokeWidth={1.5}/>
              <span className="unit-title">{unitInfo.title}</span>
              <ChevronLeft size={45} strokeWidth={1.5}/>
            </div>
          </header>


          <div className="chapters-wrapper">
            {unitInfo.chapters.map((chapter, idx) => (
              <div key={idx} className="chapter-group">
               
                {/* כרטיסיית פרק ראשי */}
                <div
                  className={`chapter-card ${chapter.isLocked ? 'is-locked' : 'clickable'}`}
                  style={{
                    backgroundColor: chapter.isLocked ? '#e0e0e0' : unitInfo.color,
                    cursor: chapter.isLocked ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => handleNavigation(chapter.path, chapter.isLocked)}
                >
                  <span className="chapter-label">{chapter.title}</span>
                 
                  <div className="chapter-icon-container">
                    {chapter.isLocked ? (
                      <Lock size={16} className="lock-icon" />
                    ) : chapter.isFinished ? (
                      /* הצגת V לבן בתוך עיגול עבור פרק ראשי שהושלם */
                      <div className="check-badge-main">
                        <Check size={12} color={unitInfo.color} strokeWidth={4} />
                      </div>
                    ) : (
                      /* ריבוע "ריק" לפרק שפתוח אך טרם הושלם */
                      <div className="unlock-icon" />
                    )}
                  </div>
                </div>


                {/* רשימת תתי פרקים (במידה וקיימים) */}
                {chapter.subChapters?.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className={`sub-chapter-item ${chapter.isLocked ? 'disabled' : 'clickable'}`}
                    style={{ cursor: chapter.isLocked ? 'not-allowed' : 'pointer' }}
                    onClick={() => handleNavigation(sub.path, chapter.isLocked)}
                  >
                    <span className="sub-title">{sub.title}</span>
                   
                    {/* סימן V כחול לתת-פרק שהושלם */}
                    {sub.isFinished && (
                      <div className="check-badge-sub" style={{ backgroundColor: 'white' }}>
                        <Check size={12} color={unitInfo.color} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export default Sidebar;

