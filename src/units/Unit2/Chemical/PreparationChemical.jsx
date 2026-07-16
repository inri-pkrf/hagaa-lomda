import React, { useState, useEffect } from "react";
import "../../Unit2/style/PreparationChemical.css";

function PreparationChemical() {
  const contentData = {
    hazard_recognition: {
      title: "הכרת החומרים",
      text: "יש להכיר את דפי הבטיחות של כל חומר לפני תחילת עבודה.",
    },
    emergency_drill: {
      title: "תרגול נוהל",
      text: "יש לבצע תרגול נוהל חירום מלא פעמיים בשנה לפחות.",
    },
    protective_gear: {
      title: "רכש ציוד",
      text: "יש לרכוש ולהחזיק במלאי ציוד מיגון אישי תקני ותקין.",
    },
    team_training: {
      title: "הכשרת צוות",
      text: "יש לוודא שכל עובד עבר הכשרה ייעודית לטיפול בחומרים מסוכנים.",
    },
    water_monitor: {
      title: "התקנת מתזי מים",
      text: "יש להתקין ולהפעיל מתזי מים באזורי אחסון רגישים.",
    },
    alarm_system: {
      title: "גלאי התרעה",
      text: "יש להתקין גלאי התרעה פעילים עם חיווי קולי וחזותי.",
    },
    tank_protection: {
      title: "מיגון מיכלים",
      text: "יש לוודא שכל המיכלים מוגנים מפני פגיעה מכנית או קורוזיה.",
    },
    tank_burial: {
      title: "הטמנת מיכלים",
      text: "יש לבצע הטמנה בהתאם לתקני איכות הסביבה ומניעת זליגה.",
    },
    signage: {
      title: "שילוט",
      text: "יש להציב שילוט ברור על כל מצבור חומרים מסוכנים \nכולל תמרורי אזהרה.",
    },
  };

  const topics = [
    { id: "hazard_recognition", label: "הכרת החומרים", icon: "🧪" },
    { id: "emergency_drill", label: "תרגול נוהל", icon: "⏱️" },
    { id: "protective_gear", label: "רכש ציוד", icon: "🦺" },
    { id: "team_training", label: "הכשרת צוות", icon: "🎓" },
    { id: "water_monitor", label: "התקנת מנטרי מים", icon: "💧" },
    { id: "alarm_system", label: "גלאי התראה", icon: "🚨" },
    { id: "tank_protection", label: "מיגון מיכלים", icon: "🛢️" },
    { id: "tank_burial", label: "הטמנת מיכלים", icon: "🕳️" },
    { id: "signage", label: "שילוט", icon: "⚠️" },
  ];

  const [activeTopic, setActiveTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);

  // חסום כפתור קדימה בטעינה
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: true }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, []);

  // עדכון חסימה לפי התקדמות
  useEffect(() => {
    const allCompleted = topics.every((t) => completedTopics.includes(t.id));
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allCompleted }),
    );
  }, [completedTopics]);

  const handleTopicClick = (id) => {
    setActiveTopic(id);
    if (!completedTopics.includes(id)) {
      setCompletedTopics((prev) => [...prev, id]);
    }
  };

  return (
    <div className="prep-page-wrapper">
      <div className="wheel-container">
        {activeTopic && (
          <div className="watermark-icon">
            {topics.find((t) => t.id === activeTopic)?.icon}
          </div>
        )}
        {topics.map((item, index) => (
          <div
            key={item.id}
            className={`wheel-item ${activeTopic === item.id ? "active" : ""} ${completedTopics.includes(item.id) ? "completed" : ""}`}
            style={{ "--i": index }}
            onClick={() => handleTopicClick(item.id)}
          >
            {item.icon}
            {completedTopics.includes(item.id) && (
              <span className="checkmark">✔</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-panel">
        <h2 id="chemical-title">היערכות ומניעה</h2>
        <p className="chemical-second">
          כדי למנוע אירוע שבו יש חשיפה לחומרים מסוכנים, יש להקפיד
          על&nbsp;ההנחיות.
        </p>

        {activeTopic && contentData[activeTopic] ? (
          <div className="dynamic-box">
            <h4>{contentData[activeTopic].title}</h4>
            <p>{contentData[activeTopic].text}</p>
          </div>
        ) : (
          <p className="placeholder-text">
            <strong> יש ללחוץ </strong>
            על האייקונים בגלגל כדי לחשוף את ההנחיות.
          </p>
        )}
      </div>
    </div>
  );
}

export default PreparationChemical;
