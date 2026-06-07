import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitTwoSidebar = () => {
  // 1. הגדרת כל המפתחות מה-sessionStorage עבור יחידה 2
  const getProgress = () => ({
    opening: sessionStorage.getItem('unittwo-opening') === 'finished',
    rockets: sessionStorage.getItem('unitTwo-first') === 'finished',
    earthquake: sessionStorage.getItem('unitTwo-second') === 'finished',
    fire: sessionStorage.getItem('unitTwo-third') === 'finished',
    chemical: sessionStorage.getItem('unitTwo-fourth') === 'finished',
    questions: sessionStorage.getItem('unitTwo-questions') === 'finished',
    checklist: sessionStorage.getItem('unitTwo-checklist') === 'finished',

    // תתי-שיעורים ספציפיים
    rocketsSub1: sessionStorage.getItem('rockets-sub1-finished') === 'finished',
    rocketsSub2: sessionStorage.getItem('rockets-sub2-finished') === 'finished',
    rocketsSub3: sessionStorage.getItem('rockets-sub3-finished') === 'finished',
    rocketsSub4: sessionStorage.getItem('rockets-sub4-finished') === 'finished',
    rocketsSub5: sessionStorage.getItem('rockets-sub5-finished') === 'finished',
    earthquakeSub1: sessionStorage.getItem('earthquake-sub1-finished') === 'finished',
    earthquakeSub2: sessionStorage.getItem('earthquake-sub2-finished') === 'finished',
    earthquakeSub3: sessionStorage.getItem('earthquake-sub3-finished') === 'finished',
    earthquakeSub4: sessionStorage.getItem('earthquake-sub4-finished') === 'finished',
    fireSub1: sessionStorage.getItem('fire-sub1-finished') === 'finished',
    fireSub2: sessionStorage.getItem('fire-sub2-finished') === 'finished',
    fireSub3: sessionStorage.getItem('fire-sub3-finished') === 'finished',
    fireSub4: sessionStorage.getItem('fire-sub4-finished') === 'finished',
    fireSub5: sessionStorage.getItem('fire-sub5-finished') === 'finished',
    chemicalSub1: sessionStorage.getItem('chemical-sub1-finished') === 'finished',
    chemicalSub2: sessionStorage.getItem('chemical-sub2-finished') === 'finished',
    chemicalSub3: sessionStorage.getItem('chemical-sub3-finished') === 'finished',
    chemicalSub4: sessionStorage.getItem('chemical-sub4-finished') === 'finished',
    chemicalSub5: sessionStorage.getItem('chemical-sub5-finished') === 'finished',
  });

  const [finished, setFinished] = useState(getProgress());

  useEffect(() => {
    const handleUpdate = () => {
      const currentFinished = getProgress();
      setFinished(currentFinished);

      // --- לוגיקת חישוב אחוזים ליחידה 2 ---
      const keys = Object.keys(currentFinished);
      const finishedCount = keys.filter(key => 
        currentFinished[key] === true || currentFinished[key] === 'finished'
      ).length;
      
      const totalInUnit = keys.length;

      // יחידה 2 תופסת את הטווח שבין 25% ל-50%
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
    const base = NavBarData[1]; // יחידה 2 באינדקס 1
    
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
        else if (ch.title === "ירי טילים") {
          isLocked = !finished.opening;
          isFinished = finished.rockets;
        }
        else if (ch.title === "רעידת אדמה וצונאמי") {
          isLocked = !finished.rockets;
          isFinished = finished.earthquake;
        }
        else if (ch.title === "שריפה") {
          isLocked = !finished.earthquake;
          isFinished = finished.fire;
        }
        else if (ch.title === "חומרים מסוכנים") {
          isLocked = !finished.fire;
          isFinished = finished.chemical;
        }
        else if (ch.title === "שאלות סיכום") {
          isLocked = !finished.chemical;
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

        // עדכון תתי-שיעורים 
        const updatedSubChapters = ch.subChapters?.map((sub, subIndex) => {
          let subFinished = false;
          if (ch.title === "ירי טילים") {
            if (subIndex === 0) subFinished = finished.rocketsSub1;
            if (subIndex === 1) subFinished = finished.rocketsSub2;
            if (subIndex === 2) subFinished = finished.rocketsSub3;
            if (subIndex === 3) subFinished = finished.rocketsSub4;
            if (subIndex === 4) subFinished = finished.rocketsSub5;
          }
          else if (ch.title === "רעידת אדמה וצונאמי") {
            if (subIndex === 0) subFinished = finished.earthquakeSub1;
            if (subIndex === 1) subFinished = finished.earthquakeSub2;
            if (subIndex === 2) subFinished = finished.earthquakeSub3;
            if (subIndex === 3) subFinished = finished.earthquakeSub4;
          }
          else if (ch.title === "שריפה") {
            if (subIndex === 0) subFinished = finished.fireSub1;
            if (subIndex === 1) subFinished = finished.fireSub2;
            if (subIndex === 2) subFinished = finished.fireSub3;
            if (subIndex === 3) subFinished = finished.fireSub4;
            if (subIndex === 4) subFinished = finished.fireSub5;
          }
          else if (ch.title === "חומרים מסוכנים") {
            if (subIndex === 0) subFinished = finished.chemicalSub1;
            if (subIndex === 1) subFinished = finished.chemicalSub2;
            if (subIndex === 2) subFinished = finished.chemicalSub3;
            if (subIndex === 3) subFinished = finished.chemicalSub4;
            if (subIndex === 4) subFinished = finished.chemicalSub5;
          }
           else {
            subFinished = isFinished;
          }
          return { ...sub, isFinished: subFinished };
        });

        return { ...ch, isLocked, isFinished, subChapters: updatedSubChapters };
      })
    };
  };

  return <Sidebar unitInfo={prepareData()} />;
};

export default UnitTwoSidebar;