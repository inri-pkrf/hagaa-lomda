import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitOneSidebar = () => {
  const getProgress = () => ({
    chapter1: sessionStorage.getItem('unitOne-first') === 'finished',
    chapter2: sessionStorage.getItem('unitOne-second') === 'finished',
    chapter3: sessionStorage.getItem('unitOne-third') === 'finished',
    chapter4: sessionStorage.getItem('unitOne-fourth') === 'finished',
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
      chapters: base.chapters.map((ch, index) => {
        let isLocked = true;
        let isFinished = false;

        // --- לוגיקת פתיחת פרקים (מניעת הדיליי) ---
        
        if (index === 0 || index === 1) {
          // פתיחה ומטרות - תמיד פתוחים
          isLocked = false;
          // אם בכל זאת את רוצה V עליהם כשמסיימים את הפרק הראשון:
          isFinished = index === 0 ? finished.chapter1 : false; 
        } 
        else if (index === 2) {
          // היערכות לאיומים - הפרק הלימודי הראשון - תמיד פתוח
          isLocked = false;
          isFinished = finished.chapter1;
        }
        else if (index === 3) {
          // מצבי תפקוד - נפתח כשפרק 1 (איומים) מסתיים
          isLocked = !finished.chapter1;
          isFinished = finished.chapter2;
        }
        else if (index === 4) {
          // ממשקים - נפתח כשפרק 2 (מצבי תפקוד) מסתיים
          isLocked = !finished.chapter2;
          isFinished = finished.chapter3;
        }
        else if (index === 5) {
          // אוכלוסייה - נפתח כשפרק 3 (ממשקים) מסתיים
          isLocked = !finished.chapter3;
          isFinished = finished.chapter4;
        }
        else {
          // שאלות סיכום וצ'קליסט - נפתחים כשפרק 4 (אוכלוסייה) מסתיים
          isLocked = !finished.chapter4;
        }

        return {
          ...ch,
          isLocked,
          isFinished,
          subChapters: ch.subChapters?.map(sub => ({
            ...sub,
            isFinished: isFinished
          }))
        };
      })
    };
  };

  return <Sidebar unitInfo={prepareData()} />;
};

export default UnitOneSidebar;