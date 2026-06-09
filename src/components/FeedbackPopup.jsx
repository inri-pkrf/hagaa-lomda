import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const FeedbackPopup = () => {
  const [step, setStep] = useState(0);
  const [stars, setStars] = useState(-1);
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [emoji, setEmoji] = useState(null);
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const stepConfig = [
    {
      title: "דרגו את הלומדה ⭐",
      badge: "שלב 1 מתוך 3",
    },
    {
      title: "מה הרגשתם?",
      badge: "שלב 2 מתוך 3",
    },
    {
      title: "הצעות לשיפור",
      badge: "שלב 3 מתוך 3",
    },
    {
      title: "תודה רבה! 🌸",
      badge: "הושלם ✓",
    },
  ];

  const emojis = [
    { icon: "😕", label: "קשה" },
    { icon: "😐", label: "סבבה" },
    { icon: "😊", label: "טוב" },
    { icon: "🤩", label: "מעולה" },
  ];

  const cfg = stepConfig[Math.min(step, 3)];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setStars(-1);
      setHoveredStar(-1);
      setEmoji(null);
      setText("");
    }
  }, [isOpen]);

  useEffect(() => {
    const openPopup = () => {
      setIsOpen(true);
    };

    window.addEventListener("openFeedbackPopup", openPopup);

    return () => {
      window.removeEventListener("openFeedbackPopup", openPopup);
    };
  }, []);

  const sendFeedback = () => {
    setIsSending(true);

    const templateParams = {
      stars: stars + 1,
      emoji:
        emoji !== null
          ? `${emojis[emoji].icon} (${emojis[emoji].label})`
          : "לא נבחר",
      message: text.trim() || "לא נכתב פידבק מילולי",
    };

    emailjs
      .send(
        "service_rxsjjac",
        "template_ohwbfqs",
        templateParams,
        "GL5Dm84DlUiu2MoMN",
      )
      .then(() => setStep(3))
      .catch((err) => {
        console.error(err);
        setStep(3);
      })
      .finally(() => setIsSending(false));
  };

  if (!isOpen) return null;
  return (
    <div className="inner-feedback-overlay" onClick={() => setIsOpen(false)}>
      <div className="inner-feedback-card" onClick={(e) => e.stopPropagation()}>
        <button className="feedback-close-btn" onClick={() => setIsOpen(false)}>
          ✕
        </button>

        <div className="feedback-wizard-box">
          <div
            className={`wiz-header wiz-header-${
              step === 0 ? "pink" : step === 1 ? "purple" : "teal"
            }`}
          >
            <div className="wiz-header-top">
              <span
                className={`wiz-badge wiz-badge-${
                  step === 0 ? "pink" : step === 1 ? "purple" : "teal"
                }`}
              >
                {cfg.badge}
              </span>

              <div className="wiz-dots" style={{ direction: "rtl" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`wiz-dot ${step >= i ? "active" : ""}`}
                    onClick={() => {
                      if (i <= step) setStep(i);
                    }}
                    style={{
                      cursor: i <= step ? "pointer" : "default",
                      opacity: i <= step ? 1 : 0.3,
                      background: step === i ? "#e8348a" : "#ccc",
                      transform: step === i ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            <h2
              className={`wiz-title wiz-title-wiz-header-${
                step === 0 ? "pink" : step === 1 ? "purple" : "teal"
              }`}
            >
              {cfg.title}
            </h2>
          </div>

          <div className="wiz-body">
            {step === 0 && (
              <div className="wiz-step">
                <div className="wiz-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`wiz-star ${
                        i <= (hoveredStar >= 0 ? hoveredStar : stars)
                          ? "wiz-star-lit"
                          : ""
                      }`}
                      onClick={() => setStars(i)}
                      onMouseEnter={() => setHoveredStar(i)}
                      onMouseLeave={() => setHoveredStar(-1)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <button
                  className="wiz-btn wiz-btn-pink"
                  disabled={stars === -1}
                  onClick={() => setStep(1)}
                >
                  הבא
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="wiz-step">
                <div className="wiz-emoji-row">
                  {emojis.map((e, i) => (
                    <div
                      key={i}
                      className={`wiz-emoji-opt ${
                        emoji === i ? "wiz-emoji-picked" : ""
                      }`}
                      onClick={() => setEmoji(i)}
                    >
                      <div className="wiz-emoji-icon">{e.icon}</div>
                      <div className="wiz-emoji-label">{e.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  className="wiz-btn wiz-btn-purple"
                  disabled={emoji === null}
                  onClick={() => setStep(2)}
                >
                  הבא
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="wiz-step">
                <textarea
                  className="wiz-textarea"
                  placeholder="יש לכם רעיון לשיפור?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <button
                  className="wiz-btn wiz-btn-teal"
                  onClick={sendFeedback}
                  disabled={isSending}
                >
                  {isSending ? "שולח..." : "שלח משוב"}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="wiz-thanks">
                <div className="wiz-thanks-title">המשוב נשלח בהצלחה</div>

                <button
                  className="wiz-btn wiz-btn-pink"
                  onClick={() => setIsOpen(false)}
                >
                  סגור
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
