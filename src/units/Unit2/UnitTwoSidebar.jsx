import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NavBarData from '../../Data/NavBarData';

const UnitTwoSidebar = () => {
  // 1. הגדרת כל המפתחות מה-sessionStorage עבור יחידה 2
  const getProgress = () => ({
    opening: sessionStorage.getItem('unitTwo-opening') === 'finished',
    goals: sessionStorage.getItem('unitTwo-goals') === 'finished',
    rockets: sessionStorage.getItem('unitTwo-rockets') === 'finished',
    earthquake: sessionStorage.getItem('unitTwo-earthquake') === 'finished',
    chemical: sessionStorage.getItem('unitTwo-chemical') === 'finished',
    fire: sessionStorage.getItem('unitTwo-fire') === 'finished',
    questions: sessionStorage.getItem('unitTwo-questions') === 'finished',

    // דוגמאות למפתחות ספציפיים לתתי-שיעורים (אם תרצי פירוט עמוק יותר)
    // אם אין מפתח ספציפי, תת-השיעור יסומן ב-V ברגע שהפרק הראשי יושלם
    rocketsSub1: sessionStorage.getItem('rockets-sub1-finished') === 'true',
    rocketsSub2: sessionStorage.getItem('rockets-sub2-finished') === 'true',
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
    const base = NavBarData[1]; // יחידה 2 נמצאת באינדקס 1
    
    return {
      ...base,
      chapters: base.chapters.map((ch) => {
        let isLocked = true;
        let isFinished = false;

        // --- לוגיקת פתיחה/נעילה וסיום לפי כותרות יחידה 2 ---
        if (ch.title === "פתיחה") {
          isLocked = false; 
          isFinished = finished.opening;
        } 
        else if (ch.title === "מטרות") {
          isLocked = !finished.opening;
          isFinished = finished.goals;
        }
        else if (ch.title === "ירי טילים") {
          isLocked = !finished.goals;
          isFinished = finished.rockets;
        }
        else if (ch.title === "רעידת אדמה וצונאמי") {
          isLocked = !finished.rockets;
          isFinished = finished.earthquake;
        }
        else if (ch.title === "חומרים מסוכנים") {
          isLocked = !finished.earthquake;
          isFinished = finished.chemical;
        }
        else if (ch.title === "שריפה") {
          isLocked = !finished.chemical;
          isFinished = finished.fire;
        }
        else if (ch.title === "שאלות סיכום") {
          isLocked = !finished.fire;
          isFinished = finished.questions;
        }
        else if (ch.title === "סיכום פרק") {
          isLocked = !finished.questions;
        }

        // --- פונקציה רקורסיבית לעדכון תתי-שיעורים (מתאים למבנה המקונן של ירי טילים) ---
        const updateSubs = (subs, parentFinished) => {
          if (!subs) return undefined;
          return subs.map((sub) => {
            // אם הפרק הראשי נגמר, כל תתי התפריט שלו מסומנים ב-V
            let subFinished = parentFinished;
            
            // כאן ניתן להוסיף חריגים, למשל:
            // if (sub.title === "מאפייני האיום") subFinished = finished.rocketsSub1;

            return {
              ...sub,
              isFinished: subFinished,
              // קריאה חוזרת לעצמה עבור תתי-תת-שיעורים
              subChapters: updateSubs(sub.subChapters, subFinished)
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

export default UnitTwoSidebar;