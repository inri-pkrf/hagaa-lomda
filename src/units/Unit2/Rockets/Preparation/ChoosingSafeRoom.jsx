import React from 'react';
import '../../style/ChoosingSafeRoom.css';
import FlipCard from "../flipCard";


function ChoosingSafeRoom() {
  const safeRoomPriorities = [
    {
      id: 1,
      priority: "4",
      title: "ממ״ד",
      description: `ממ"ד, ממ"ק או ממ"מ`
    },
    {
      id: 2,
      priority: "3",
      title: "מקלט",
      description: `מקלט (משותף או ציבורי)`
    },
    {
      id: 3,
      priority: "2",
      title: "חדר מדרגות",
      description: `חדר מדרגות פנימי`
    },
    {
      id: 4,
      priority: "1",
      title: "חדר פנימי",
      description: `חדר פנימי`
    },
  ];


  return (
    <div>
      <h2 id='choosingSafeRoom-headline'> בחירת מרחב מוגן </h2>
      <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/choose-space.png`} alt="Siren" id='choosingSafeRoom-icon'/>
      <p id='choosingSafeRoom-text1'>בעת קבלת התרעה על ירי רקטות וטילים, יש להיכנס למרחב מוגן בזמן ההתגוננות העומד לרשותנו, בהתאם לסדר העדיפויות הבא: (עברו עם העכבר על הכרטיסיה) </p>
     
      <div className="flip-cards-container">
        {safeRoomPriorities.map((priority) => (
          <FlipCard
            key={priority.id}
            priority={priority.priority}
            title={priority.title}
            description={priority.description}
          />
        ))}
      </div>
    </div>
  );
}


export default ChoosingSafeRoom;





