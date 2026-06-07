import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitFourSidebar = () => {
  // 1. הגדרת כל המפתחות מה-sessionStorage עבור יחידה 4
  const getProgress = () => ({
    opening: sessionStorage.getItem('unitfour-opening') === 'finished',
    LegalSituation: sessionStorage.getItem('unitFour-first') === 'finished',
    RoutineToEmergency: sessionStorage.getItem('unitFour-second') === 'finished',
    Emergency: sessionStorage.getItem('unitFour-third') === 'finished',
    questions: sessionStorage.getItem('unitFour-questions') === 'finished',
    checklist: sessionStorage.getItem('unitFour-checklist') === 'finished',
    // תתי-שיעורים ספציפיים
    Sub1Legal: sessionStorage.getItem('Sub1Legal') === 'finished',
    Sub2Legal: sessionStorage.getItem('Sub2Legal') === 'finished',
    Sub3Legal: sessionStorage.getItem('GameLegalSituation') === 'finished',
  });

  const [finished, setFinished] = useState(getProgress());

  useEffect(() => {
    const handleUpdate = () => {
      const currentFinished = getProgress();
      setFinished(currentFinished);

      // --- לוגיקת חישוב אחוזים ליחידה 4 ---
      const keys = Object.keys(currentFinished);
      const finishedCount = keys.filter(key => 
        currentFinished[key] === true || currentFinished[key] === 'finished'
      ).length;
      
      const totalInUnit = keys.length;

      // יחידה 4 תופסת את הטווח שבין 25% ל-50%
      const unitWeight = 25; 
      const baseProgress = 25; 
      
      const calculatedPercent = baseProgress + Math.round((finishedCount / totalInUnit) * unitWeight);

      // שמירה ושליחה לשיא ההתקדמות
      const savedMax = parseInt(sessionStorage.getItem('max_progress') || '0');
      const finalPercent = Math.max(calculatedPercent, savedMax);

      sessionStorage.setItem('max_progress', finalPercent.toString());
      
      window.dispatchEvent(new CustomEvent('updateTotalProgress', { 
        detail: { percent: finalPercent } 
      }));
    };

    handleUpdate(); // עדכון ראשוני
    window.addEventListener('updateNavbar', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('updateNavbar', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const prepareData = () => {
    const base = NavBarData[3]; // יחידה 4 באינדקס 3
    
    return {
      ...base,
      chapters: base.chapters.map((ch) => {
        let isLocked = true;
        let isFinished = false;

        // לוגיקת פתיחה/נעילה לפי כותרות
        if (ch.title === "פתיחה") {
          isLocked = false; 
          isFinished = finished.opening;
        } 
        else if (ch.title === "מצבים משפטיים") {
          isLocked = !finished.opening;
          isFinished = finished.LegalSituation;
        }
        else if (ch.title === " מעבר משגרה לחירום") {
          isLocked = !finished.LegalSituation;
          isFinished = finished.RoutineToEmergency;
        }
        else if (ch.title === "אירוע חירום") {
          isLocked = !finished.RoutineToEmergency;
          isFinished = finished.Emergency;
        }
        else if (ch.title === "שאלות סיכום") {
          isLocked = !finished.Emergency;
          isFinished = finished.questions;
        }
        else if (ch.title === "סיכום פרק") {
          isLocked = !finished.questions;
          isFinished = finished.checklist;
        }
        else if (ch.title === "סיכום פרק") {
          isLocked = !finished.checklist;
          isFinished = false; 
        }

        const updateSubs = (subs, parentFinished) => {
          if (!subs) return undefined;
          return subs.map((sub) => {
            return {
              ...sub,
              isFinished: parentFinished,
              subChapters: updateSubs(sub.subChapters, parentFinished)
            };
          });
        };

        return { 
          ...ch, 
          isLocked, 
          isFinished, 
          subChapters: updateSubs(ch.subChapters, isFinished) 
        };
      })
    };
  };

  return <Sidebar unitInfo={prepareData()} />;
};

export default UnitFourSidebar;