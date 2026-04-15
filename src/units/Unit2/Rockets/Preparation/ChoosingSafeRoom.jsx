import React from 'react';
import '../../style/ChoosingSafeRoom.css';
import FlipCard from "../flipCard";








function ChoosingSafeRoom() {
  const safeRoomPriorities = [
    {
      id: 1,
      priority: "1",
      title: "ממ״ד",
      description: `ממ"ד, ממ"ק או ממ"מ`,
      image: `${process.env.PUBLIC_URL}/assets/unitTwoImgs/flipcard1.png`
    },
    {
      id: 2,
      priority: "2",
      title: "מקלט",
      description: `מקלט (משותף או ציבורי)`,
      image: `${process.env.PUBLIC_URL}/assets/unitTwoImgs/flipcard2.png`
    },
    {
      id: 3,
      priority: "3",
      title: "חדר מדרגות",
      description: `חדר מדרגות פנימי`,
      image: `${process.env.PUBLIC_URL}/assets/unitTwoImgs/flipcard3.png`
    },
    {
      id: 4,
      priority: "4",
      title: "חדר פנימי",
      description: `חדר פנימי`,
      image: `${process.env.PUBLIC_URL}/assets/unitTwoImgs/flipcard4.png`
    },
  ];


  return (
    <div>
      <h2 id='choosingSafeRoom-headline'> בחירת מרחב מוגן </h2>
      <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/chooseSafePlace-icon.png`} alt="Siren" id='choosingSafeRoom-icon'/>
      <p id='choosingSafeRoom-text1'>בעת קבלת התרעה על ירי רקטות וטילים, יש להיכנס למרחב מוגן בזמן ההתגוננות העומד לרשותנו, בהתאם לסדר העדיפויות הבא: (עברו עם העכבר על הכרטיסיה) </p>
      <p id='choosingSafeRoom-text2'>נתכנן לפי קיבולת אדם למבנה:יש להקצות 1.25 מ"ר לאדם במרחב מוגן</p>
      <div className="flip-cards-container">
        {safeRoomPriorities.map((priority) => (
          <FlipCard
            key={priority.id}
            priority={priority.priority}
            title={priority.title}
            description={priority.description}
            image={priority.image}
          />
        ))}
      </div>
    </div>
  );
}








export default ChoosingSafeRoom;





