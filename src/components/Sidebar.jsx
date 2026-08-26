import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Sidebar.css";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Lock,
  Check,
} from "lucide-react";
import NavBarData from "../Data/NavBarData";
import { isChapterFinished, isPathVisited } from "./Progressunits";

const Sidebar = ({ unitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const navigate = useNavigate();

  const units = ["UnitOne", "UnitTwo", "UnitThree", "UnitFour"];

  const unitFinishedKeys = {
    UnitOne: "unitOne-finished",
    UnitTwo: "unitTwo-finished",
    UnitThree: "unitThree-finished",
    UnitFour: "unitFour-finished",
  };

  // ⭐ חדש: במקום לסמוך על sessionStorage.getItem("currentUnit") (שערכו
  // עלול "להישכח"/להתאפס לאחור סתם בגלל דפדוף בין יחידות בסיידבר - כנראה
  // ע"י קוד אחר שמאפס אותו כשנכנסים ל-layout של יחידה ישנה), מחשבים כאן
  // באופן עצמאי ואמין את היחידה האחרונה שבאמת הגיעו אליה, לפי הדגלים
  // "unitX-finished" שנשמרים רק כשבאמת מסיימים יחידה (למשל ב-
  // SummaryCheckList.jsx). הדגלים האלה לא מתאפסים בגלל דפדוף/צפייה
  // חוזרת בפרקים ישנים, ולכן זהו מקור אמת יציב בהרבה.
  const getTrueCurrentUnitIndex = () => {
    for (let i = 0; i < units.length; i++) {
      if (sessionStorage.getItem(unitFinishedKeys[units[i]]) !== "finished") {
        return i;
      }
    }
    return units.length - 1; // כל היחידות הושלמו - נשארים על האחרונה
  };

  const trueCurrentUnitIndex = getTrueCurrentUnitIndex();

  const [displayedIndex, setDisplayedIndex] = useState(trueCurrentUnitIndex);

  const isViewingCurrentUnit = displayedIndex === trueCurrentUnitIndex;

  // ⭐ חדש: תמיד שולפים את נתוני היחידה המוצגת ישירות מ-NavBarData לפי
  // האינדקס האמיתי - לא מה-unitInfo prop, כדי שלא "נירש" כותרת/צבע/
  // פרקים שגויים אם unitInfo עצמו נבנה מתוך currentUnit שגוי.
  const displayedUnitData = NavBarData[displayedIndex];

  const goToNextUnit = () => {
    if (displayedIndex < units.length - 1) {
      setDisplayedIndex(displayedIndex + 1);
      setExpandedChapters(new Set());
    }
  };

  const goToPrevUnit = () => {
    if (displayedIndex > 0) {
      setDisplayedIndex(displayedIndex - 1);
      setExpandedChapters(new Set());
    }
  };

  const nextLocked = displayedIndex >= units.length - 1;
  const prevLocked = displayedIndex === 0;

  // ⭐ יחידה נגישה (לא נעולה) אם היא היחידה האמיתית הנוכחית או יחידה
  // קודמת שכבר עברו דרכה - רק יחידות עתידיות (שטרם הגיעו אליהן) נשארות
  // נעולות לגמרי.
  const isUnitAccessible = displayedIndex <= trueCurrentUnitIndex;

  const isQuestionFinishedFor = (title) => {
    const keys = {
      "יחידה 1 - מבוא": "unitOne-questions",
      "יחידה 2 - שגרה": "unitTwo-questions",
      "יחידה 3 - שגרה": "unitThree-questions",
      "יחידה 4 - חירום": "unitFour-questions",
    };
    return sessionStorage.getItem(keys[title]) === "finished";
  };

  const subChapterFinishedByPath = {
    "/PopulationInfo": "populationLaptopFinished",
    "/population-parts": "populationFoldersFinished",
    "/PopulationGame": "populationGameFinished",
  };

  const isSubChapterFinished = (path) => {
    const completionKey = subChapterFinishedByPath[path];
    if (completionKey) {
      return sessionStorage.getItem(completionKey) === "true";
    }
    return isPathVisited(path);
  };

  const toggleSidebar = () => {
    if (!isOpen) {
      setDisplayedIndex(getTrueCurrentUnitIndex());
      setExpandedChapters(new Set());
      window.dispatchEvent(new Event("updateNavbar"));
    }
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path, isLocked) => {
    if (!isLocked && path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  const handleFeedbackClick = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event("openFeedbackPopup"));
  };

  if (!unitInfo) return null;

  const chapters = Array.isArray(displayedUnitData.chapters)
    ? displayedUnitData.chapters
    : [];

  // ⭐ מחשבים מראש, לכל פרק ביחידה המוצגת, האם הוא הושלם - ואז מוצאים
  // את האינדקס של הפרק הראשון שעדיין לא הושלם. פרקים שלפניו (או הוא
  // עצמו) פתוחים ללחיצה; כל פרק אחריו נשאר נעול. כך מתקבלת נעילה
  // מדורגת בתוך היחידה, לפי כמה שבאמת התקדמו.
  const chapterFinishedFlags = chapters.map((chapter) =>
    chapter.title === "שאלות סיכום"
      ? isQuestionFinishedFor(displayedUnitData.title)
      : isChapterFinished(chapter.title, displayedIndex + 1),
  );
  const firstUnfinishedIdx = chapterFinishedFlags.findIndex((f) => !f);
  const nextAvailableIdx =
    firstUnfinishedIdx === -1 ? chapters.length : firstUnfinishedIdx;

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`sidebar-container ${!isOpen ? "closed" : ""}`}>
        <button
          className="toggle-tab"
          onClick={toggleSidebar}
          style={{
            backgroundColor: isOpen ? displayedUnitData.color : unitInfo.color,
          }}
        >
          {isOpen ? (
            <ChevronRight size={"6vw"} />
          ) : (
            <ChevronLeft size={"6vw"} />
          )}
        </button>

        <div className="sidebar-content">
          <header className="sidebar-header">
            <div className="logo-container-sidebar">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logos/collageLogo.png`}
                alt="Logo"
                className="logo"
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/logos/pakarLogo.png`}
                alt="Logo"
                className="logo"
              />
            </div>
            <div
              className="unit-banner"
              style={{ backgroundColor: displayedUnitData.color }}
            >
              <ChevronRight
                size={"2vw"}
                strokeWidth={1.5}
                onClick={goToPrevUnit}
                style={{
                  cursor: prevLocked ? "default" : "pointer",
                  opacity: prevLocked ? 0.3 : 1,
                }}
              />
              <span className="unit-title">{displayedUnitData.title}</span>
              <ChevronLeft
                size={"2vw"}
                strokeWidth={1.5}
                onClick={goToNextUnit}
                style={{
                  cursor: nextLocked ? "default" : "pointer",
                  opacity: nextLocked ? 0.3 : 1,
                }}
              />
            </div>
          </header>

          <div className="chapters-wrapper">
            {chapters.map((chapter, idx) => {
              const hasSubChapters =
                Array.isArray(chapter.subChapters) &&
                chapter.subChapters.length > 0;
              const isExpanded = expandedChapters.has(idx);

              // ⭐ נעילה מדורגת - נעול אם היחידה כולה לא נגישה (יחידה
              // עתידית), או שהפרק בא אחרי הפרק הראשון שטרם הושלם
              // ביחידה המוצגת.
              const isLocked = !isUnitAccessible || idx > nextAvailableIdx;

              const isFinished = chapterFinishedFlags[idx];

              return (
                <div key={idx} className="chapter-group">
                  <div
                    className={`chapter-card ${isLocked ? "is-locked" : "clickable"}`}
                    style={{
                      backgroundColor: isLocked
                        ? "#e0e0e0"
                        : displayedUnitData.color,
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (hasSubChapters) {
                        setExpandedChapters((prev) => {
                          const newSet = new Set(prev);
                          if (newSet.has(idx)) newSet.delete(idx);
                          else newSet.add(idx);
                          return newSet;
                        });
                      } else if (!isLocked) {
                        handleNavigation(chapter.path, isLocked);
                      }
                    }}
                  >
                    <div className="chapter-main-content">
                      <span className="chapter-label">{chapter.title}</span>
                      {hasSubChapters && (
                        <ChevronDown
                          size={"1vw"}
                          className={`arrow-icon-sidebar ${isExpanded ? "rotated" : ""}`}
                          style={{ marginRight: "8px" }}
                        />
                      )}
                    </div>
                    <div className="chapter-icon-container">
                      {isLocked ? (
                        <Lock size={"1vw"} className="lock-icon" />
                      ) : isFinished ? (
                        <div className="check-badge-main">
                          <Check
                            size={"1vw"}
                            color={displayedUnitData.color}
                            strokeWidth={4}
                          />
                        </div>
                      ) : (
                        <div className="unlock-icon" />
                      )}
                    </div>
                  </div>

                  {(() => {
                    if (!hasSubChapters) return null;

                    // ⭐ חדש: אותה שיטת "נעילה מדורגת" שכבר קיימת לפרקים
                    // הראשיים (chapterFinishedFlags/nextAvailableIdx
                    // למעלה), עכשיו גם בתוך כל פרק - ברמת תתי-הפרקים
                    // שלו. מוצאים את התת-פרק הראשון בתוך הפרק הזה שעדיין
                    // לא "נחצה" (isPathVisited), וכל תת-פרק אחריו נשאר
                    // נעול עד שמגיעים אליו לפי הסדר - כך אי אפשר לדלג
                    // קדימה בתוך הפרק.
                    const subFinishedFlags = chapter.subChapters.map((sub) =>
                      isSubChapterFinished(sub.path),
                    );
                    const firstUnfinishedSubIdx = subFinishedFlags.findIndex(
                      (f) => !f,
                    );
                    const nextAvailableSubIdx =
                      firstUnfinishedSubIdx === -1
                        ? chapter.subChapters.length
                        : firstUnfinishedSubIdx;

                    return (
                      isExpanded &&
                      chapter.subChapters.map((sub, sIdx) => {
                        // ⭐ תוקן (גנרי לכל היחידות/הפרקים): מציגים וי על
                        // תת-פרק אם המשתמש כבר "חצה" אותו ברצף הלינארי של
                        // הלומדה (routeOrder ב-Buttons.jsx) - כלומר הגיע
                        // אליו והתקדם משם הלאה. זה עובד אוטומטית לכל
                        // תתי-הפרקים בכל היחידות, בלי להסתמך על
                        // sub.isFinished הסטטי (שלא קיים בכלל ב-
                        // NavBarData) וגם בלי להסתמך על
                        // chapterSessionKeys (שממופה רק לכותרות של פרקים
                        // ראשיים, לא לתתי-פרקים).
                        const isSubFinished = subFinishedFlags[sIdx];

                        // ⭐ חדש: תת-פרק נעול אם הפרק ההורה כולו נעול,
                        // או שהוא בא אחרי תת-פרק אחר בתוך אותו פרק
                        // שעדיין לא הושלם - בדיוק כמו הנעילה בין פרקים
                        // ראשיים, רק ברמה פנימית יותר.
                        const isSubLocked =
                          isLocked || sIdx > nextAvailableSubIdx;

                        return (
                          <div
                            key={sIdx}
                            className={`sub-chapter-item ${
                              isSubLocked ? "disabled" : "clickable"
                            }`}
                            style={{
                              cursor: isSubLocked ? "not-allowed" : "pointer",
                            }}
                            onClick={() =>
                              handleNavigation(sub.path, isSubLocked)
                            }
                          >
                            <span className="sub-title">{sub.title}</span>
                            {isSubLocked ? (
                              <Lock
                                size={"1vw"}
                                className="lock-icon"
                              />
                            ) : (
                              isSubFinished && (
                                <div className="check-badge-sub">
                                  <Check
                                    size={"1vw"}
                                    color={displayedUnitData.color}
                                    strokeWidth={4}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        );
                      })
                    );
                  })()}
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <button
              className="about-us-btn"
              onClick={() => {
                navigate("/CreditPage");
                setIsOpen(false);
              }}
            >
              מי אנחנו
            </button>
            <button className="about-us-btn" onClick={handleFeedbackClick}>
              משוב
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;