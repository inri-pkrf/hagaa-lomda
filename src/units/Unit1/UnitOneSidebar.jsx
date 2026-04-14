import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitOneSidebar = () => {
  const getProgress = () => ({
    opening: sessionStorage.getItem('unitone-opening') === 'finished',
    goals: sessionStorage.getItem('unitone-goals') === 'finished',
    threats: sessionStorage.getItem('unitOne-first') === 'finished',
    states: sessionStorage.getItem('unitOne-second') === 'finished',
    interfaces: sessionStorage.getItem('unitOne-third') === 'finished',
    population: sessionStorage.getItem('unitOne-fourth') === 'finished',
    questions: sessionStorage.getItem('unitOne-questions') === 'finished',

    // תתי-שיעורים
    pop1: sessionStorage.getItem('populationLaptopFinished') === 'true',
    pop2: sessionStorage.getItem('populationFoldersFinished') === 'true',
    pop3: sessionStorage.getItem('populationGameFinished') === 'true',
  });

  const [finished, setFinished] = useState(getProgress());

  useEffect(() => {
    const handleUpdate = () => setFinished(getProgress());
    window.addEventListener('updateNavbar', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('updateNavbar', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const prepareData = () => {
    const base = NavBarData[0];

    return {
      ...base,
      chapters: base.chapters.map((ch) => {
        let isLocked = true;
        let isFinished = false;

        // --- לוגיקה לפי כותרת הפרק (הכי בטוח) ---

        if (ch.title === "פתיחה") {
          isLocked = false; // תמיד פתוח
          isFinished = finished.opening;
        }
        else if (ch.title === "מטרות") {
          isLocked = !finished.opening; // נפתח כשפתיחה הסתיימה
          isFinished = finished.goals;
        }
        else if (ch.title === "היערכות לאיומים") {
          isLocked = !finished.goals; // נפתח כשמטרות הסתיימו
          isFinished = finished.threats;
        }
        else if (ch.title === "מצבי תפקוד") {
          isLocked = !finished.threats;
          isFinished = finished.states;
        }
        else if (ch.title === "ממשקים") {
          isLocked = !finished.states;
          isFinished = finished.interfaces;
        }
        else if (ch.title === "אוכלוסיה") {
          isLocked = !finished.interfaces;
          isFinished = finished.population;
        }
        else if (ch.title === "שאלות סיכום") {
          isLocked = !finished.population;
          isFinished = finished.questions;
        }
        else if (ch.title === "סיכום פרק") {
          isLocked = !finished.questions;
          isFinished = false;
        }

        // עדכון תתי-שיעורים (אוכלוסייה)
        const updatedSubChapters = ch.subChapters?.map((sub, subIndex) => {
          let subFinished = false;
          if (ch.title === "אוכלוסיה") {
            if (subIndex === 0) subFinished = finished.pop1;
            if (subIndex === 1) subFinished = finished.pop2;
            if (subIndex === 2) subFinished = finished.pop3;
          } else {
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

export default UnitOneSidebar;