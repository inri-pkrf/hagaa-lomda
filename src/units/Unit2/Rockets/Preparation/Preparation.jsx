import React, { useState, useEffect } from "react";
import TopicCircle from "../../../../components/TopicCircle.jsx";
import "../../style/Preparation.css";
import { useNavigate } from "react-router-dom";

function Preparation() {
  const navigate = useNavigate();
  const topicsData = [
    {
      id: `ProtectedSpace`,
      title: "כיצד המרחב המוגן מגן עלינו?",
      bgColor: "#FFB356",
      icon: "shelter-man.png",
      hasInfo: false,
      hasPlay: true,
      isCompleted: false,
    },
    {
      id: `ChoosingSafeRoom`,
      title: "בחירת מרחב מוגן",
      bgColor: "#E2787A",
      icon: "choose-space.png",
      hasInfo: true,
      hasPlay: true,
    },
    {
      id: `BuildingMaintenance`,
      title: "ציוד מרחב מוגן ואחזקתו",
      bgColor: "#567691",
      icon: "equipment.png",
      hasInfo: true,
      hasPlay: false,
    },
    {
      id: `Alert`,
      title: "התרעה",
      bgColor: "#56C3A9",
      icon: "siren.png",
      hasInfo: true,
      hasPlay: true,
    },
    {
      id: `Defense`,
      title: "כיצד נתגונן?",
      bgColor: "#00ADEF",
      icon: "questionIcon.png",
      hasInfo: true,
      hasPlay: true,
    },
    {
      id: `Wait10mins`,
      title: "למה חשוב להמתין להנחיה מפורשת?",
      bgColor: "#E67E22",
      icon: "timer10.png",
      hasInfo: true,
      hasPlay: false,
    },
  ];

  const [clickedTopics, setClickedTopics] = useState(() => {
    const saved = sessionStorage.getItem("clickedTopics");
    return saved ? JSON.parse(saved) : [];
  });

  const handleTopicClick = (id) => {
    setClickedTopics((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      sessionStorage.setItem("clickedTopics", JSON.stringify(updated));
      return updated;
    });

    if (id === "BuildingMaintenance") {
      navigate("/BuildingMaintenance");
    } else {
      navigate(`/${id}`);
    }
  };

  useEffect(() => {
    const allClicked = topicsData.every((t) => clickedTopics.includes(t.id));
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [clickedTopics, topicsData]);

  return (
    <div className="preparation-page-container">
      <h1 className="preparation-main-header">היערכות והתנהגות</h1>
      <p className="preparation-sub-text">
        לפניך מספר עקרונות להיערכות והתנהגות בתרחיש ירי טילים.
        <br />
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

export default Preparation;