import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopicCircle from '../../components/TopicCircle.jsx';




function PreparationEarth() {
  const navigate = useNavigate();


  // הגדרת 3 נושאים בלבד עבור רעידת אדמה
  const topicsData = [
    {
      id: `HowPreper`,//לשים בApp את הנתיב
      title: "כיצד נערכים לרעידת אדמה?",
      bgColor: "#FFB356",
      icon: "questionIcon.png", // וודא שהאייקון קיים בתיקייה
      hasInfo: true,
    },
    {
      id: `RightBehavior`,//לשים בApp את הנתיב
      title: "התנהגות נכונה- הנחיות מצילות חיים",
      bgColor: "#56C3A9",
      icon: "goodBehavior.png",
      hasPlay: true
    },
    {
      id: `PostEarthquake`,//לשים בApp את הנתיב
      title: "הנחיות לאחר רעידת אדמה",
      bgColor: "#00ADEF",
      icon: "afterEarthquake.png",
      hasInfo: true,
    }
  ];


  const [clickedTopics, setClickedTopics] = useState(() => {
    const saved = sessionStorage.getItem('clickedTopicsEarth');
    return saved ? JSON.parse(saved) : [];
  });


  const handleTopicClick = (id) => {
    setClickedTopics((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem('clickedTopicsEarth', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
    navigate(`/${id}`);
  };


  useEffect(() => {
    const allClicked = topicsData.every(t => clickedTopics.includes(t.id));
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: !allClicked }));
    return () => {
      window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    };
  }, [clickedTopics]);


  return (
    <div className="preparation-page-container">
      <h1 className="preparation-main-header">היערכות והתנהגות ברעידת אדמה</h1>
      <p className="preparation-sub-text">
     לפניך מספר עקרונות להיערכות והתנהגות התרחיש רעידת אדמה<br />
        <strong>יש ללחוץ על האייקונים להרחבה:</strong>
      </p>


      <div className="topics-grid">
        {topicsData.map((topic) => (
          <TopicCircle
            key={topic.id}
            {...topic}
            isCompleted={clickedTopics.includes(topic.id)}
            onClick={handleTopicClick}
          />
        ))}
      </div>
    </div>
  );
}


export default PreparationEarth;

