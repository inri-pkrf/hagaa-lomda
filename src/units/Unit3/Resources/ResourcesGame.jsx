import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Unit3/style/ResourcesGame.css";




function ResourcesGame() {
  const navigate = useNavigate();




  const steps = [
    {
      id: "communication",
      img: "communication.webp",
      label: "תקשורת ודרכי תקשורת",
      top: "58%",
      left: "59%",
    },
    {
      id: "backup",
      img: "backup.webp",
      label: "מחשוב וגיבוי למערכות מידע",
      top: "59%",
      left: "45%",
    },
    {
      id: "water",
      img: "waterbottles.png",
      label: "מים (3-4 ליטרים לאדם)",
      top: "82%",
      left: "21%",
    },
    { id: "food", img: "food.webp", label: "מזון", top: "74%", left: "32%" },
    {
      id: "emergency_light",
      img: "light.png",
      label: "גנרטור- רציפות אנרגטית, סוללות, תאורת חירום - פנסי יד",
      top: "89%",
      left: "32%",
    },
    {
      id: "protection",
      img: "protection.png",
      label: `מיגון אישי (חומ"ס בהתאם לתקנות)`,
      top: "28%",
      left: "8%",
    },
    { id: "solar", img: "solar.webp", label: "סולר", top: "84%", left: "86%" },
    { id: "fuel", img: "fuel.webp", label: "דלק", top: "90%", left: "74%" },
    {
      id: "hygiene",
      img: "hygiene.png",
      label: "מוצרי היגיינה",
      top: "68%",
      left: "78%",
    },
    {
      id: "horm",
      img: "horm.svg",
      label: "צופר בהתאם להנחיות פיקוד העורף",
      top: "85%",
      left: "10%",
    },
    {
      id: "toolkit",
      img: "Toolkit.svg",
      label: "ארגז כלי עבודה",
      top: "90%",
      left: "50%",
    },
  ];




  const unexaminedResources = [
    { id: "raw_materials", label: "חומרי גלם ליצור ייעודי למפעל" },
    { id: "energy_sources", label: "מקורות אנרגיה" },
    { id: "gas", label: "גז" },
    { id: "radio_batteries", label: "מקלט רדיו וסוללות" },
    { id: "transportation", label: "תחבורה ורכבי הובלה" },
    { id: "heavy_machinery", label: "ציוד מכני הנדסי ומפעילים" },
    { id: "suppliers", label: "ספקים וחוזים נצורים" },
    { id: "shelter_equipment_new", label: "ציוד למרחב מוגן" },
    { id: "childcare_framework_equipment", label: "ציוד למסגרות ילדי העובדים" },
    {
      id: "emergency_teams_equipment",
      label: 'ציוד לצוותי חירום (עזרה ראשונה, כיבוי, חילוץ, חומ"ס)',
    },
  ];




  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [isFinished, setIsFinished] = useState(false);




  useEffect(() => {
    sessionStorage.setItem("MainTitle", "משחק משאבים");
    const savedClicks = sessionStorage.getItem("ResourcesClicks");
    const savedIndex = sessionStorage.getItem("ResourcesIndex");
    const savedIntro = sessionStorage.getItem("ResourcesIntro");
    const savedFinished = sessionStorage.getItem("ResourcesFinished");




    if (savedClicks) setClicked(JSON.parse(savedClicks));
    if (savedIndex) setActiveIndex(Number(savedIndex));
    if (savedIntro) setShowIntro(savedIntro === "true");
    if (savedFinished) setIsFinished(savedFinished === "true");
  }, []);




  useEffect(() => {
    sessionStorage.setItem("ResourcesClicks", JSON.stringify(clicked));
    sessionStorage.setItem("ResourcesIndex", activeIndex);
    sessionStorage.setItem("ResourcesIntro", showIntro);
    sessionStorage.setItem("ResourcesFinished", isFinished);
  }, [clicked, activeIndex, showIntro, isFinished]);




  useEffect(() => {
    if (activeIndex >= steps.length) {
      setIsFinished(true);
    }
  }, [activeIndex]);




  const handleHover = (index, id) => {
    if (index !== activeIndex) return;
    setHovered(id);
  };




  const handleCompleteStep = (step, index) => {
    if (index !== activeIndex) return;
    setClicked((prev) => (prev.includes(step.id) ? prev : [...prev, step.id]));
    setActiveIndex((prev) => prev + 1);
  };




  return (
    <div className="Resources-game-container">
      {showIntro && (
        <div className="Resources-popup-overlay">
          <div className="Resources-popup-content custom-design">
            <h2>
              בלחיצה על כפתור ההתחלה יופיע משאב מהבהב. במעבר עכבר עליו יחשף
              המידע אודותיו. יש לשים לב שבכדי לעבור למשאב הבא, יש ללחוץ על המשאב
              הנוכחי.
            </h2>
            <button
              className="continue-btn-new"
              onClick={() => setShowIntro(false)}
            >
              התחלה
            </button>
          </div>
        </div>
      )}




      <img
        src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/ResourcesBackground.jpg`}
        className="Resources-bg"
        alt="bg"
      />
      <div className="dim-overlay" />




      {/* המונה המתוקן */}
      <div className="steps-counter">
        {clicked.length}/{steps.length}
      </div>




      <div className="hotspots-layer">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isClicked = clicked.includes(step.id);




          return (
            <div
              key={step.id}
              className={`hotspot hotspot-${step.id} ${isActive ? "active-glow" : ""} ${isClicked ? "done" : ""}`}
              style={{ top: step.top, left: step.left, zIndex: 5 }}
              onMouseEnter={() => handleHover(index, step.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCompleteStep(step, index)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/Resources/${step.img}`}
                alt={step.id}
                style={{ zIndex: 5 }}
              />
              {(hovered === step.id || isClicked) && (
                <div className="tooltip">{step.label}</div>
              )}
            </div>
          );
        })}




        {steps.map((step) => {
          if (!clicked.includes(step.id)) return null;
          return (
            <div
              key={`v-${step.id}`}
              className="v-container-fixed"
              style={{ top: step.top, left: step.left, zIndex: 10 }}
            >
              <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                <polyline
                  points="20 6 9 17 4 12"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
            </div>
          );
        })}
      </div>




      {isFinished && (
        <div className="Resources-checklist-screen">
          <div className="final-checks-container-game">
            <h3>משאבים נוספים:</h3>
            <div
              className="checklist-sections-wrapper"
              style={{ textAlign: "right" }}
            >
              <ul className="checks-list">
                {unexaminedResources.map((resource) => (
                  <li
                    key={resource.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1vh",
                      margin: "1vh 0",
                    }}
                  >
                    <span id="resources-span">{resource.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="continue-btn-new-checklist"
              onClick={() => {
                sessionStorage.removeItem("ResourcesClicks");
                sessionStorage.removeItem("ResourcesIndex");
                sessionStorage.removeItem("ResourcesFinished");
                navigate("/Resources");
              }}
            >
              סיום
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




export default ResourcesGame;









