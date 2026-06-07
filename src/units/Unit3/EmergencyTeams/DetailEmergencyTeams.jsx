import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailEmergencyTeams.css";
import EmergencyTeamsData from "../../../Data/Unit3/EmergencyTeamsData";




function DetailEmergencyTeams() {
  const navigate = useNavigate();
  const { page: pageParam } = useParams();




  const [page, setPage] = useState(Number(pageParam) || 1);
  const [selectedTeam, setSelectedTeam] = useState(null);




  const [visitedTeams, setVisitedTeams] = useState(() => {
    const saved = sessionStorage.getItem("visitedEmergencyTeams");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    if (page === 2) {
      const allTeams = [
        "hazmat",
        "maintenance",
        "fire",
        "medical",
        "rescue",
        "workers",
      ];




      const allVisited = allTeams.every((teamId) =>
        visitedTeams.includes(teamId),
      );




      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: !allVisited }),
      );
    }




    return () => {
      window.dispatchEvent(
        new CustomEvent("setNextBtnDisabled", { detail: false }),
      );
    };
  }, [page, visitedTeams]);




  // סנכרון כשה־URL משתנה
  useEffect(() => {
    const pageNumber = Number(pageParam) || 1;
    setPage(pageNumber);
  }, [pageParam]);




  // עדכון URL כשמשנים עמוד
  const updatePage = (newPage) => {
    setPage(newPage);
    navigate(`/DetailEmergencyTeams/${newPage}`);
  };




  const handleTeamSelect = (teamId) => {
    const team = EmergencyTeamsData.find((t) => t.id === teamId);
    if (team) {
      setSelectedTeam(team);
      updatePage(3);




      setVisitedTeams((prev) => {
        if (!prev.includes(teamId)) {
          const updated = [...prev, teamId];
          sessionStorage.setItem(
            "visitedEmergencyTeams",
            JSON.stringify(updated),
          );
          return updated;
        }
        return prev;
      });
    }
  };




  return (
    <div className="et-main-container">
      {page === 1 && (
        <div className="et-page fade-in">
          <h2 id="title-ET">
            הקמת צוותי חירום במפעל תסייע למנהל.ת המפעל להתמודד באופן עצמאי עם
            אירוע חירום במפעל / מוסד
          </h2>
          <div className="subText-ET">
            תפקיד הצוותים להכין את המפעל בשגרה ולתת מענה מיידי באופן עצמאי
            בהתרחש אירוע חירום במפעל.
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/EmergencyTeams/צוות-חירום-כללי.webp`}
            alt="EmergencyTeams"
            id="EmergencyTeams-img"
          />
        </div>
      )}




      {page === 2 && (
        <div className="et-page fade-in">
          <div className="subText-ET centered-text">
            לפניכם שישה סוגי צוותים, אך מספר הצוותים וסוגם ייקבעו בהתאם לאופי
            המפעל. <strong>יש ללחוץ על כל צוות </strong>
            כדי ללמוד עליו.
          </div>




          <div className="interactive-map-container">
            <img
              src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/EmergencyTeams/צוות-חירום-פירוט.webp`}
              alt="EmergencyTeams"
              id="EmergencyTeamsPeople-img"
            />




            {[
              "hazmat",
              "maintenance",
              "fire",
              "medical",
              "rescue",
              "workers",
            ].map((teamId) => {
              const team = EmergencyTeamsData.find((t) => t.id === teamId);
              const isVisited = visitedTeams.includes(teamId);




              return (
                <div key={teamId} className={`team-bubble-wrapper b-${teamId}`}>
                  {isVisited && (
                    <div className="v-mark">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div
                    className="team-bubble"
                    onClick={() => handleTeamSelect(teamId)}
                  >
                    {team ? team.teamTitle : teamId}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}




      {page === 3 && selectedTeam && (
        <div className="et-page fade-in page3-layout">
          <h2 className="detail-main-title">{selectedTeam.teamTitle}</h2>
          <div className="detail-grid">
            <div className="detail-column right-side">
              <div className="orange-border-section">
                <h3>ייעוד הצוות:</h3>
                <p>{selectedTeam.teamGoals}</p>
              </div>
              <div className="orange-border-section">
                <h3>אופן ההכשרה:</h3>
                <p>{selectedTeam.methodOfTraining}</p>
              </div>
             
              <div className="orange-border-section">
                <h3>עקרונות להקמה:</h3>
                {/* כאן הוספנו את הגבלת הרוחב רק לטקסט עצמו */}
                <p style={{ width: "35vw" }}>
                  {selectedTeam.establishment}
                </p>
              </div>
            </div>




            <div className="detail-column left-side">
              <h3>משימות הצוות:</h3>
              <ul className="tasks-list">
                {selectedTeam.teamTasks.map((task, index) => (
                  <li key={index} className="task-item">
                    <span>{task}</span>
                    <div className="task-icon-circle">
                      <img
                        src={`${process.env.PUBLIC_URL}${selectedTeam.srcTeamIcon}`}
                        alt="icon"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}${selectedTeam.srcTeamImg}`}
            className="bg-character-fade"
            alt={selectedTeam.teamTitle}
          />
        </div>
      )}
    </div>
  );
}




export default DetailEmergencyTeams;

