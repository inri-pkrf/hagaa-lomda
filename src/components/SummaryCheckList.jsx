import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/SummaryCheckList.css";

const renderItem = (text) => {
  if (text.trimStart().startsWith("**")) {
    const cleaned = text.trimStart();
    const endBold = cleaned.indexOf("**", 2);
    if (endBold !== -1) {
      const boldPart = cleaned.slice(2, endBold);
      const rest = cleaned.slice(endBold + 2).trimStart();
      return (
        <>
          <strong style={{ display: "block", fontSize: "1.8vw" }}>
            {boldPart}
          </strong>
          {rest}
        </>
      );
    }
  }
  return text;
};

function SummaryCheckList({ checklist = {}, onFinish, pinImg }) {
  const navigate = useNavigate();
  const location = useLocation();

  const image =
    pinImg || `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Vector.png`;
  const items = checklist.items || [];

  const buildingImg =
    checklist.image ||
    `${process.env.PUBLIC_URL}/assets/UnitOneImgs/Group 494.webp`;
  const checklistImg =
    checklist.checklistImg ||
    `${process.env.PUBLIC_URL}/assets/UnitOneImgs/CheckListEnd.png`;

  const isSingleItem = items.length === 1;

  useEffect(() => {
    const handleNext = (e) => {
      e.preventDefault();
      handleFinishUnit();
    };

    const handlePrev = (e) => {
      e.preventDefault();

      const path = location.pathname;

      if (path === "/summary-checklist-unit1") {
        navigate("/questions-end/1");
        return;
      }
      if (path === "/summary-checklist-unit2") {
        navigate("/questions-end/2");
        return;
      }
      if (path === "/summary-checklist-unit3") {
        navigate("/questions-end/3");
        return;
      }
      if (path === "/summary-checklist-unit4") {
        navigate("/questions-end/4");
        return;
      }

      if (path === "/summary-checklist-unit2-sub1") {
        navigate("/rockets");
        return;
      }
      if (path === "/summary-checklist-unit2-sub2") {
        navigate("/earthquake");
        return;
      }
      if (path === "/summary-checklist-unit2-sub3") {
        navigate("/chemical");
        return;
      }
      if (path === "/summary-checklist-unit2-sub4") {
        navigate("/fire");
        return;
      }

      if (path === "/summary-checklist-unit3-sub1") {
        navigate("/EmergencyTeams");
        return;
      }
      if (path === "/summary-checklist-unit3-sub2") {
        navigate("/Education");
        return;
      }
      if (path === "/summary-checklist-unit3-sub3") {
        navigate("/Resources");
        return;
      }
      if (path === "/summary-checklist-unit3-sub4") {
        navigate("/ExternalRecruits");
        return;
      }
    };

    window.addEventListener("onNextNav", handleNext);
    window.addEventListener("onPrevNav", handlePrev);

    return () => {
      window.removeEventListener("onNextNav", handleNext);
      window.removeEventListener("onPrevNav", handlePrev);
    };
  }, [navigate, location.pathname]);

  const handleFinishUnit = () => {
    if (onFinish) {
      onFinish();
      return;
    }

    const path = location.pathname;

    if (path === "/summary-checklist-unit1") {
      sessionStorage.setItem("unitOne-checklist", "finished");
      sessionStorage.setItem("unitOne-finished", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
      sessionStorage.setItem("unitOneStatus", "completed");
      sessionStorage.setItem("currentUnit", "UnitTwo");
      setTimeout(() => navigate("/elevator"), 300);
      return;
    }

    if (path === "/summary-checklist-unit2-sub1") {
      navigate("/rockets");
      return;
    }
    if (path === "/summary-checklist-unit2-sub2") {
      navigate("/earthquake");
      return;
    }
    if (path === "/summary-checklist-unit2-sub4") {
      navigate("/fire");
      return;
    }
    if (path === "/summary-checklist-unit2-sub3") {
      navigate("/chemical");
      return;
    }

    if (path === "/summary-checklist-unit2") {
      sessionStorage.setItem("unitTwo-checklist", "finished");
      sessionStorage.setItem("unitTwo-finished", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
      sessionStorage.setItem("unitOneStatus", "completed");
      sessionStorage.setItem("unitTwoStatus", "completed");
      sessionStorage.setItem("currentUnit", "UnitThree");
      navigate("/elevator");
      return;
    }

    if (path === "/summary-checklist-unit3-sub1") {
      navigate("/EmergencyTeams");
      return;
    }
    if (path === "/summary-checklist-unit3-sub2") {
      navigate("/Education");
      return;
    }
    if (path === "/summary-checklist-unit3-sub3") {
      navigate("/Resources");
      return;
    }
    if (path === "/summary-checklist-unit3-sub4") {
      navigate("/ExternalRecruits");
      return;
    }

    if (path === "/summary-checklist-unit3") {
      sessionStorage.setItem("unitThree-checklist", "finished");
      sessionStorage.setItem("unitThree-finished", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
      sessionStorage.setItem("unitOneStatus", "completed");
      sessionStorage.setItem("unitTwoStatus", "completed");
      sessionStorage.setItem("unitThreeStatus", "completed");
      sessionStorage.setItem("currentUnit", "UnitFour");
      navigate("/elevator");
      return;
    }

    if (path === "/summary-checklist-unit4") {
      sessionStorage.setItem("unitFour-checklist", "finished");
      sessionStorage.setItem("unitFour-finished", "finished");
      window.dispatchEvent(new Event("updateNavbar"));
      sessionStorage.setItem("unitOneStatus", "completed");
      sessionStorage.setItem("unitTwoStatus", "completed");
      sessionStorage.setItem("unitThreeStatus", "completed");
      sessionStorage.setItem("unitFourStatus", "completed");
      navigate("/info-quiz");
      return;
    }
  };

  return (
    <div className="OpeningPage">
      <div className="summary-row">
        <div className="checklist-wrapper">
          <img className="check-list" src={checklistImg} alt="checklist" />

          <div className="checklist-center-content">
            {location.pathname.includes("sub") && (
              <p
                id="summery-check-list-title"
                style={{
                  color: location.pathname.includes("unit3")
                    ? "#FFB356"
                    : checklist.color || "red",
                }}
              >
                לסיכום, משימותיכם כממוני הג"א:
              </p>
            )}
            {items.map((item, idx) => (
              <div className="checklist-row" key={idx}>
                {location.pathname.includes("sub") && (
                  <img
                    className={`checklist-pin ${isSingleItem ? "single" : ""}`}
                    src={
                      location.pathname.includes("unit2")
                        ? `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit2Pin.png`
                        : location.pathname.includes("unit3")
                          ? `${process.env.PUBLIC_URL}/assets/General/check-list-data/CheckListUnit3Pin.png`
                          : image
                    }
                    alt="pin"
                  />
                )}
                <h2
                  className={`checklist-text ${isSingleItem ? "single" : ""}`}
                  style={{
                    color: location.pathname.includes("unit3")
                      ? "#FFB356"
                      : checklist.color || "red",
                  }}
                >
                  {renderItem(item)}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            location.pathname.includes("sub") ? "end-door-wrapper" : ""
          }
        >
          {location.pathname.includes("sub") && checklist.doorTitle && (
            <p
              className="door-title"
              style={{ color: checklist.color || "#56C3A9" }}
            >
              {checklist.doorTitle}
            </p>
          )}
          <img
            className={
              location.pathname.includes("sub") ? "end-door" : "end-building"
            }
            src={buildingImg}
            alt={location.pathname.includes("sub") ? "door" : "building"}
          />
        </div>
      </div>
    </div>
  );
}

export default SummaryCheckList;
