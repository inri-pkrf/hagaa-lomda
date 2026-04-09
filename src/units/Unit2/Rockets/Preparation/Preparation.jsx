import React from 'react';
import TopicCircle from '../../../../components/TopicCircle.jsx';
import '../../style/Preparation.css';
import { useNavigate } from "react-router-dom";


function Preparation() {
  const navigate = useNavigate();
  const topicsData = [
    {
      id: `ProtectedSpace`,
      title: "כיצד המרחב המוגן שומר עלינו?",
      bgColor: "#FFB356",
      icon: "shelter-man.png",
      hasInfo: false,
      hasPlay: true,
      isCompleted: false
    },
    {
      id: `Alert`,
      title: "התרעה",
      bgColor: "#56C3A9",
      icon: "siren.png",
      hasInfo: true,
      hasPlay: true
    },
    {
      id: `Defense`,
      title: "כיצד נתגונן?",
      bgColor: "#00ADEF",
      icon: "questionIcon.png",
      hasInfo: true,
      hasPlay: true
    },
    {
      id: `ChoosingSafeRoom`,
      title: "בחירת מרחב מוגן",
      bgColor: "#E2787A",
      icon: "choose-space.png",
      hasInfo: true,
      hasPlay: false
    },
    {
      id: `Wait10mins`,
      title: "למה חשוב להמתין 10 דקות?",
      bgColor: "#E67E22",
      icon: "timer10.png",
      hasInfo: true,
      hasPlay: true
    },
    {
      id: `BuildingMaintenance`,
      title: "ציוד ואחזקת מרחב מוגן",
      bgColor: "#567691",
      icon: "equipment.png",
      hasInfo: true,
      hasPlay: false
    },
  ];
 
  const handleTopicClick = (id) => {
    navigate(`/${id}`);
  };




  return (
    <div className="preparation-page-container">
      <h1 className="preparation-main-header">היערכות והתנהגות בתרחיש ירי טילים</h1>
      <p className="preparation-sub-text">
        לפניך מספר עקרונות להיערכות והתנהגות בתרחיש ירי טילים.<br />
        <strong>יש ללחוץ על האייקונים להרחבה:</strong>
      </p>




      <div className="topics-grid">
        {topicsData.map((topic) => (
          <TopicCircle
            key={topic.id}
            {...topic}
            onClick={handleTopicClick}
          />
        ))}
      </div>
    </div>
  );
}
export default Preparation;

