import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Styles/OrientationExplanation.css";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    target: ".app-header-0",
    text: "בחלק הזה של המסך תוכלו לראות את הכותרת הראשית של הפרק או תת פרק ביחידה בו אתם נמצאים",
    popupPosition: "bottom",
    openSidebar: false,
  },
  {
    target: ".pg-container",
    text: "זהו סרגל ההתקדמות, הוא נועד להציג את אחוז ההשלמה של הקורס כולו. המד מחולק לפי יחידות – כל יחידה שווה 25%.",
    popupPosition: "bottom",
    openSidebar: false,
  },
  {
    target: ".toggle-tab",
    text: "בלחיצה על הלשונית הזו יפתח תפריט הניווט הצדדי.",
    popupPosition: "left",
    openSidebar: false,
  },
  {
    target: ".sidebar-content",
    text: "בתפריט הצדדי תוכלו לראות את כל הפרקים והנושאים ביחידה הנוכחית ולקפוץ בין הנושאים שהשלמתם.",
    popupPosition: "left",
    openSidebar: true,
  },
  {
    target: ".sidebar-footer",
    text: `בתחתית התפריט, תוכלו למצוא שני כפתורים. כפתור "מי אנחנו" מוביל לאודות, שם תוכלו לקרוא על הצוות שיצר את הלומדה. בלחיצה על כפתור "משוב", תוכלו להשאיר חוות דעת ולתת ביקורת בונה על הלומדה ועל החוויה שלכם איתה.`,
    popupPosition: "left",
    openSidebar: true,
  },
  {
    target: ".buttons-page-corner",
    text: [
      "כפתורי הניווט – בלחיצה על הכפתור הגדול השמאלי תוכלו לעבור קדימה ובלחיצה על הכפתור הקטן הימני אחורה.",
      <br key="br" />,
      <>
        <strong>שימו לב:</strong> הכפתורים יכולים להיות מושבתים בחלק מהדפים עד
        להשלמת הפעילות.
      </>,
    ],
    popupPosition: "top",
    openSidebar: false,
  },
];

const PADDING = 8;

const normalizeUnit = (unit) => {
  const map = {
    UnitOne: "unit1",
    UnitTwo: "unit2",
    UnitThree: "unit3",
    UnitFour: "unit4",
    UnitZero: "unit0",
  };
  return map[unit] || "unit1";
};

function getVisibleRect(el) {
  const r = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x = Math.max(0, r.left);
  const y = Math.max(0, r.top);
  const right = Math.min(vw, r.right);
  const bottom = Math.min(vh, r.bottom);
  return {
    x: x - PADDING,
    y: y - PADDING,
    w: right - x + PADDING * 2,
    h: bottom - y + PADDING * 2,
  };
}

function OrientationExplanation() {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [unit, setUnit] = useState("unit1");
  const sidebarOpenRef = useRef(false);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentUnit", "UnitOne");
    sessionStorage.setItem("MainTitle", "יחידה 1: מבוא");
    setUnit(normalizeUnit("UnitOne"));
    return () => {
      sessionStorage.setItem("currentUnit", "UnitZero");
      sessionStorage.setItem("MainTitle", "מבנה שיעור הסמכה דיגיטלי");
    };
  }, []);

  const isSidebarOpen = () => {
    const s = document.querySelector(".sidebar-container");
    return s ? !s.classList.contains("closed") : false;
  };

  const openSidebar = useCallback(() => {
    if (!isSidebarOpen()) document.querySelector(".toggle-tab")?.click();
    sidebarOpenRef.current = true;
  }, []);

  const closeSidebar = useCallback(() => {
    if (isSidebarOpen()) document.querySelector(".toggle-tab")?.click();
    sidebarOpenRef.current = false;
  }, []);

  const findRect = (selector) =>
    new Promise((resolve) => {
      const attempt = (tries = 0) => {
        const el = document.querySelector(selector);
        if (!el) {
          if (tries < 20) setTimeout(() => attempt(tries + 1), 80);
          return;
        }
        const r = getVisibleRect(el);
        if ((r.w <= PADDING * 2 || r.h <= PADDING * 2) && tries < 20) {
          setTimeout(() => attempt(tries + 1), 80);
          return;
        }
        resolve(r);
      };
      attempt();
    });

  const goToStep = useCallback(
    async (newStep) => {
      const stepConfig = steps[newStep];
      setPopupVisible(false);
      await new Promise((r) => setTimeout(r, 250));

      if (stepConfig.openSidebar) {
        openSidebar();
        await new Promise((r) => setTimeout(r, 400));
      } else if (sidebarOpenRef.current) {
        closeSidebar();
        await new Promise((r) => setTimeout(r, 400));
      }

      const newRect = await findRect(stepConfig.target);
      setRect(newRect);
      await new Promise((r) => setTimeout(r, 400));
      setPopupVisible(true);
    },
    [openSidebar, closeSidebar],
  );

  useEffect(() => {
    const init = async () => {
      const newRect = await findRect(steps[0].target);
      setRect(newRect);
      setTimeout(() => setPopupVisible(true), 200);
    };
    init();
  }, []);

  const handleNext = () => {
    if (step < steps.length - 1) {
      const next = step + 1;
      setStep(next);
      goToStep(next);
    } else {
      if (sidebarOpenRef.current) closeSidebar();
      sessionStorage.setItem("tourDone", "true");
      navigate("/elevator");
    }
  };

  const handleSkip = () => {
    if (sidebarOpenRef.current) closeSidebar();
    sessionStorage.setItem("tourDone", "true");
    navigate("/elevator");
  };

  const vw = viewport.width;
  const vh = viewport.height;

const getPopupStyle = () => {
  const popupW = Math.min(vw * 0.28, 500);
  const popupH = Math.min(vh * 0.38, 400); // ← היה 0.28 / 220, עכשיו גדול יותר
  const gap = vw * 0.012;

    if (!rect)
      return { bottom: "8vh", left: "50%", transform: "translateX(-50%)" };

    const pos = steps[step].popupPosition;
    const extraLeft = steps[step].target === ".toggle-tab" ? 44 : 0;

    const clampL = (l) => Math.max(12, Math.min(l, vw - popupW - 12));
    const clampT = (t) => Math.max(12, Math.min(t, vh - popupH - 12));

    if (pos === "bottom")
      return {
        top: Math.min(rect.y + rect.h + gap, vh - popupH - 12),
        left: clampL(rect.x + rect.w / 2 - popupW / 2),
      };
    if (pos === "top")
      return {
        top: clampT(rect.y - popupH - gap),
        left: clampL(rect.x + rect.w / 2 - popupW / 2),
      };
    if (pos === "left")
      return {
        top: clampT(rect.y + rect.h / 2 - popupH / 2),
        left: clampL(rect.x - popupW - gap - extraLeft),
      };
    if (pos === "right")
      return {
        top: clampT(rect.y + rect.h / 2 - popupH / 2),
        left: clampL(rect.x + rect.w + gap),
      };

    return { bottom: "8vh", right: "4vw" };
  };

  const strips = rect
    ? [
        { top: 0, left: 0, width: vw, height: Math.max(0, rect.y) },
        { top: rect.y + rect.h, left: 0, width: vw, height: Math.max(0, vh - rect.y - rect.h) },
        { top: rect.y, left: 0, width: Math.max(0, rect.x), height: rect.h },
        { top: rect.y, left: rect.x + rect.w, width: Math.max(0, vw - rect.x - rect.w), height: rect.h },
      ]
    : [{ top: 0, left: 0, width: vw, height: vh }];

  const popupBaseStyle = getPopupStyle();

  return (
    <div className={`tour-overlay theme-${unit}`}>
      {strips.map((s, i) => (
        <div
          key={i}
          className="tour-shade"
          style={{
            position: "fixed",
            ...s,
            transition: "top 0.45s cubic-bezier(0.4,0,0.2,1), left 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      ))}

      {rect && (
        <div
          className="tour-highlight-border"
          style={{
            position: "fixed",
            top: rect.y,
            left: rect.x,
            width: rect.w,
            height: rect.h,
            transition: "top 0.45s cubic-bezier(0.4,0,0.2,1), left 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      )}

      <div
        className="tour-popup"
        style={{
          position: "fixed",
          ...popupBaseStyle,
          opacity: popupVisible ? 1 : 0,
          transform: `${popupBaseStyle.transform || ""} translateY(${popupVisible ? "0" : "10px"})`,
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: popupVisible ? "auto" : "none",
        }}
      >
        <div className="tour-step-dots">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`tour-dot ${i === step ? "active" : i < step ? "done" : ""}`}
            />
          ))}
        </div>
        <p className="tour-text">{steps[step].text}</p>
        <div className="tour-actions">
          <button className="tour-btn-skip" onClick={handleSkip}>דלג</button>
          <button className="tour-btn-next" onClick={handleNext}>
            {step < steps.length - 1 ? "הבא ←" : "סיום ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrientationExplanation;