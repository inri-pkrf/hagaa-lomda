import React, { useState, useEffect } from "react";
import "../../Unit3/style/ManPower.css";

function ManPower() {
  const [activeTab, setActiveTab] = useState(null);
  const [clickedTabs, setClickedTabs] = useState([]);

  const personnelData = {
    internal: {
      title: "עובדים במפעל",
      imgSrc: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/ExternalRecruits/internal-worker.png`,
      content: [
        "עובדים שמתגברים את המפעל בזמן חירום בשל הפער שנוצר עקב גיוס חלק מהעובדים הקבועים למפעל למילואים.",
        "מגויסי חוץ אינם עובדים במפעל בשגרה.",
        "במקרים ייחודיים, ניתן לזמנם בשלב ההכנות לחירום, לאימון ולהכשרה לתפקיד בחירום.",
        "גיוסי חוץ יופעלו באמצעות צווים אישיים על פי דרישת המפעל.",
      ],
    },
    external: {
      title: "מגויסי חוץ",
      imgSrc: `${process.env.PUBLIC_URL}/assets/UnitThreeImgs/ExternalRecruits/external-worker.png`,
      content: [
        "עובדים הפטורים משירות ביטחון הינם עובדים שלא משרתים במילואים.",
        "במקרים ייחודיים, ניתן לנתק אף עובדים המחויבים בשירות ביטחון.",
        "יש להכשיר מחליפים לבעלי תפקידים חיוניים חייבי גיוס לצבא ההגנה לישראל מקרב עובדי המפעל או על בסיס מגויסי חוץ.",
        "יש ליצור מראש עתודת עובדים שתבוסס על עובדים שפרשו לגמלאות, בני משפחה וכו'.",
      ],
    },
  };

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

  // שחרר כשנלחצו שני הטאבים
  useEffect(() => {
    const allClicked = Object.keys(personnelData).every((key) =>
      clickedTabs.includes(key),
    );
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !allClicked }),
    );
  }, [clickedTabs]);

  const handleTabClick = (id) => {
    setActiveTab((prev) => (prev === id ? null : id));
    if (!clickedTabs.includes(id)) {
      setClickedTabs((prev) => [...prev, id]);
    }
  };

  return (
    <div className="manpower-wrapper">
      <p id="subtitles-manpower-center" className="subtitles">
        מהי מידת הזמינות של העובדים במפעלך, בשעת חירום?
        <br /> לכל מפעל קיים קו תקן עובדים בחירום, ואיושו מתבסס על שני סוגי
        עובדים.
      </p>

      <div className="main-container">
        <div className="tabs-header">
          {Object.entries(personnelData).map(([key, item]) => (
            <div
              key={key}
              className={`tab-item ${activeTab === key ? "active" : "inactive"}`}
              onClick={() => handleTabClick(key)}
            >
              <div className="tab-icon-container">
                <img src={item.imgSrc} alt={item.title} className="tab-image" />
                {/* ✅ וי בלחיצה */}
                {clickedTabs.includes(key) && (
                  <div className="tab-check">
                    <svg viewBox="0 0 24 24" width="28" height="28">
                      <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                      <polyline
                        points="20 6 9 17 4 12"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <span className="tab-text">{item.title}</span>
              <span className="tab-arrow">{activeTab === key ? "▲" : "▼"}</span>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="content-area">
            <ul className="info-list">
              {personnelData[activeTab].content.map((text, index) => (
                <li key={index} className="info-item">
                  <span className="bulb-icon">💡</span>
                  <p className="info-text">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManPower;
