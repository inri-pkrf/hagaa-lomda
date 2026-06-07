import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitThreeSidebar = () => {
  // 1. הגדרת כל המפתחות מה-sessionStorage עבור יחידה 3
  const getProgress = () => ({
    opening: sessionStorage.getItem('unitthree-opening') === 'finished',
    EmergencyTeams: sessionStorage.getItem('unitThree-first') === 'finished',
    Education: sessionStorage.getItem('unitThree-second') === 'finished',
    Resources: sessionStorage.getItem('unitThree-third') === 'finished',
    ExternalRecruits: sessionStorage.getItem('unitThree-fourth') === 'finished',
    FactoryFile: sessionStorage.getItem('unitThree-fifth') === 'finished',
    questions: sessionStorage.getItem('unitThree-questions') === 'finished',
    checklist: sessionStorage.getItem('unitThree-checklist') === 'finished',

    // תתי-שיעורים ספציפיים
    EmergencyTeamsSub1: sessionStorage.getItem('EmergencyTeams-sub1-finished') === 'finished',
    EmergencyTeamsSub2: sessionStorage.getItem('EmergencyTeams-sub2-finished') === 'finished',
    EmergencyTeamsSub3: sessionStorage.getItem('EmergencyTeams-sub3-finished') === 'finished',
    EducationSub1: sessionStorage.getItem('Education-sub1-finished') === 'finished',
    EducationSub2: sessionStorage.getItem('Education-sub2-finished') === 'finished',
    EducationSub3: sessionStorage.getItem('Education-sub3-finished') === 'finished',
    ResourcesSub1: sessionStorage.getItem('Resources-sub1-finished') === 'finished',
    ResourcesSub2: sessionStorage.getItem('Resources-sub2-finished') === 'finished',
    ResourcesSub3: sessionStorage.getItem('Resources-sub3-finished') === 'finished',
    ExternalRecruitsSub1: sessionStorage.getItem('ExternalRecruits-sub1-finished') === 'finished',
    ExternalRecruitsSub2: sessionStorage.getItem('ExternalRecruits-sub2-finished') === 'finished',
    ExternalRecruitsSub3: sessionStorage.getItem('ExternalRecruits-sub3-finished') === 'finished',
    ExternalRecruitsSub4: sessionStorage.getItem('ExternalRecruits-sub4-finished') === 'finished',
    FactoryFileSub1: sessionStorage.getItem('FactoryFile-sub1-finished') === 'finished',
    FactoryFileSub2: sessionStorage.getItem('FactoryFile-sub2-finished') === 'finished',
    FactoryFileSub3: sessionStorage.getItem('FactoryFile-sub3-finished') === 'finished',

  });

  const [finished, setFinished] = useState(getProgress());

  useEffect(() => {
    const handleUpdate = () => {
      const currentFinished = getProgress();
      setFinished(currentFinished);

      // --- לוגיקת חישוב אחוזים ליחידה 3 ---
      const keys = Object.keys(currentFinished);
      const finishedCount = keys.filter(key => 
        currentFinished[key] === true || currentFinished[key] === 'finished'
      ).length;
      
      const totalInUnit = keys.length;

      // יחידה 3 תופסת את הטווח שבין 25% ל-50%
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
    const base = NavBarData[2]; // יחידה 3 באינדקס 2
    
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
        else if (ch.title === "צוותי חירום") {
          isLocked = !finished.opening;
          isFinished = finished.EmergencyTeams;
        }
        else if (ch.title === " שמרטפיה") {
          isLocked = !finished.EmergencyTeams;
          isFinished = finished.Education;
        }
        else if (ch.title === "משאבים") {
          isLocked = !finished.Education;
          isFinished = finished.Resources;
        }
        else if (ch.title === "מגויסי חוץ ") {
          isLocked = !finished.Resources;
          isFinished = finished.ExternalRecruits;
        }
        else if (ch.title === " תיק מפעל") {
          isLocked = !finished.ExternalRecruits;
          isFinished = finished.FactoryFile;
        }
        else if (ch.title === "שאלות סיכום") {
          isLocked = !finished.FactoryFile;
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

        const updatedSubChapters = ch.subChapters?.map((sub, subIndex) => {
          let subFinished = false;
          if (ch.title === "צוותי חירום") {
            if (subIndex === 0) subFinished = finished.EmergencyTeamsSub1;
            if (subIndex === 1) subFinished = finished.EmergencyTeamsSub2;
            if (subIndex === 2) subFinished = finished.EmergencyTeamsSub3;
          }
          else if (ch.title === " שמרטפיה") {
            if (subIndex === 0) subFinished = finished.EducationSub1;
            if (subIndex === 1) subFinished = finished.EducationSub2;
            if (subIndex === 2) subFinished = finished.EducationSub3;
          }
          else if (ch.title === "משאבים") {
            if (subIndex === 0) subFinished = finished.ResourcesSub1;
            if (subIndex === 1) subFinished = finished.ResourcesSub2;
            if (subIndex === 2) subFinished = finished.ResourcesSub3;
          }
          else if (ch.title === "מגויסי חוץ ") {
            if (subIndex === 0) subFinished = finished.ExternalRecruitsSub1;
            if (subIndex === 1) subFinished = finished.ExternalRecruitsSub2;
            if (subIndex === 2) subFinished = finished.ExternalRecruitsSub3;
            if (subIndex === 3) subFinished = finished.ExternalRecruitsSub4;
          }
          else if (ch.title === " תיק מפעל") {
            if (subIndex === 0) subFinished = finished.FactoryFileSub1;
            if (subIndex === 1) subFinished = finished.FactoryFileSub2;
            if (subIndex === 2) subFinished = finished.FactoryFileSub3;
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

export default UnitThreeSidebar;