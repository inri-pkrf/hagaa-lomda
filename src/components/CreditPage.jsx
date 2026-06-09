import React, { useState, useEffect } from "react";
import "./Styles/CreditPage.css";

const PUBLIC_URL = process.env.PUBLIC_URL || "";

const CREDIT_DATA = [
  {
    id: "college",
    title: "מכללה",
    subtitle: "הפיקוד והסגל המקצועי של המכללה הלאומית לאיתנות ישראלית",
    className: "credit-page-college",
    items: [
      {
        name: `אל"ם שירן חשאי לוי - מפקדת המכללה`,
        icon: `${PUBLIC_URL}/assets/CreditPage/yellow-star.png`,
      },
      {
        name: `סא"ל לישי נחמיאס - מפקדת מגמת אימוני רשויות`,
        icon: `${PUBLIC_URL}/assets/CreditPage/yellow-star.png`,
      },
      {
        name: `רס"ן אופיר גבסו - רמ"ד מגמת אימוני רשויות`,
        icon: `${PUBLIC_URL}/assets/CreditPage/yellow-star.png`,
      },
    ],
  },
  {
    id: "management",
    title: "ניהול",
    subtitle: "לניהול והובלת הפרויקט הייתה אחראית יועצת חדשנות ודיגיטל ",
    className: "credit-page-management",
    items: [
      {
        name: "תמר בוסתן - מנהלת הפרויקט",
        icon: `${PUBLIC_URL}/assets/CreditPage/green-star.png`,
      },
    ],
  },
  {
    id: "content",
    title: "תוכן",
    subtitle: "לתיקוף וחידוש התוכן היו אחראים מומחי התוכן",
    className: "credit-page-content",
    items: [
      {
        name: "עמיר עטייה - מנהל תוכן מקצועי",
        icon: `${PUBLIC_URL}/assets/CreditPage/blue-star.png`,
      },
      {
        name: "סילביה - רכזת תוכן",
        icon: `${PUBLIC_URL}/assets/CreditPage/blue-star.png`,
      },
      {
        name: `בילי פרנקל - מנהלת תוכן פקע"ר`,
        icon: `${PUBLIC_URL}/assets/CreditPage/blue-star.png`,
      },
    ],
  },
  {
    id: "development",
    title: "פיתוח",
    className: "credit-page-development",
    highlightText: "מה היא מפתחת לומדה?",
    items: [
      {
        name: "שלי יצחק - מפתחת לומדה",
        icon: `${PUBLIC_URL}/assets/CreditPage/pink-star.png`,
      },
      {
        name: "אליאורה לרר - מפתחת לומדה",
        icon: `${PUBLIC_URL}/assets/CreditPage/pink-star.png`,
      },
      {
        name: "נעמה לביא - מפתחת לומדה",
        icon: `${PUBLIC_URL}/assets/CreditPage/pink-star.png`,
      },
      {
        name: "אביטל המבורג",
        icon: `${PUBLIC_URL}/assets/CreditPage/pink-star.png`,
        isSmall: true,
        groupTitle: "מפתחות נוספות",
      },
      {
        name: "עלמה יובל",
        icon: `${PUBLIC_URL}/assets/CreditPage/pink-star.png`,
        isSmall: true,
      },
    ],
  },
];

const CLOUDS = [
  { cls: "cloud-1", width: 400, color: "rgba(255,255,255,0.85)" },
  { cls: "cloud-2", width: 220, color: "rgba(255, 255, 255, 0.7)" },
  { cls: "cloud-3", width: 300, color: "rgba(255, 255, 255, 0.72)" },
  { cls: "cloud-4", width: 480, color: "rgba(255, 255, 255, 0.8)" },
  { cls: "cloud-5", width: 130, color: "rgba(255, 252, 252, 0.9)" },
  { cls: "cloud-6", width: 300, color: "rgba(255, 255, 255, 0.8)" },
  { cls: "cloud-7", width: 220, color: "rgba(255, 255, 255, 0.85)" },
  { cls: "cloud-8", width: 500, color: "rgba(255, 255, 255, 0.75)" },
];

function CloudShape({ width, color }) {
  const h = Math.round(width * 0.41);
  const cx = width / 2;
  const cy = Math.round(h * 0.85);
  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={Math.round(cx * 0.9)}
        ry={Math.round(h * 0.2)}
        fill={color}
      />
      <ellipse
        cx={Math.round(cx * 0.7)}
        cy={Math.round(cy * 0.75)}
        rx={Math.round(cx * 0.5)}
        ry={Math.round(h * 0.4)}
        fill={color}
      />
      <ellipse
        cx={Math.round(cx * 1.1)}
        cy={Math.round(cy * 0.55)}
        rx={Math.round(cx * 0.65)}
        ry={Math.round(h * 0.5)}
        fill={color}
      />
      <ellipse
        cx={Math.round(cx * 1.5)}
        cy={Math.round(cy * 0.7)}
        rx={Math.round(cx * 0.42)}
        ry={Math.round(h * 0.35)}
        fill={color}
      />
    </svg>
  );
}

function CreditPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="credit-page">
      <div className="bg-blob-blue" />
      <div className="bg-blob-purple" />
      <div className="bg-blob-pink" />

      {CLOUDS.map(({ cls, width, color }) => (
        <div key={cls} className={`cloud ${cls}`}>
          <CloudShape width={width} color={color} />
        </div>
      ))}

      <header className="credit-page-header">
        <p className="credit-page-intro">
          אנשים רבים וטובים לקחו חלק בהקמתה של הכשרה זו והקדישו זמן, ניסיון
          ומקצועיות כדי להפוך ידע חיוני לחוויית למידה דיגיטלית נגישה ואיכותית.
          תודה לכל מי שתרמה או תרם לידע, לתכנון, לכתיבה, לעיצוב, לפיתוח, להפקה
          ולהטמעת ההכשרה, ולכל מי שסייע בהפיכת חזון זה למוצר למידה משמעותי
          ומתקדם.
        </p>
      </header>

      <main className="credit-columns-container">
        {CREDIT_DATA.map((column) => (
          <section
            key={column.id}
            className={`credit-column ${column.className}`}
          >
            <div className="tape tape-top-right"></div>
            <div className="tape tape-bottom-left"></div>
            <div className="column-content-wrapper">
              <h2 className="column-title">{column.title}</h2>
              {column.subtitle && (
                <p className="column-subtitle">{column.subtitle}</p>
              )}
              {column.highlightText && (
                <span
                  className="highlight-link"
                  onClick={() => setIsPopupOpen(true)}
                >
                  {column.highlightText}
                </span>
              )}
              <ul className="credit-names-list">
                {column.items.map((item, index) => {
                  const [itemName, itemDetail] = item.name.split(/\s*-\s*/, 2);
                  return (
                    <React.Fragment key={index}>
                      {item.groupTitle && (
                        <li className="group-title-item">{item.groupTitle}</li>
                      )}
                      <li
                        className={`name-item ${item.isSmall ? "small-item" : ""}`}
                      >
                        <span className="item-text">
                          <span className="item-name">{itemName}</span>
                          {itemDetail && (
                            <span className="item-detail">{itemDetail}</span>
                          )}
                        </span>
                        <img
                          src={item.icon}
                          alt=""
                          className="item-icon-image"
                        />
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </main>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div
            className="popup-water-blob"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="blob-close-btn"
              onClick={() => setIsPopupOpen(false)}
            >
              ×
            </button>
            <div className="blob-content-centered">
              <div className="popup-text-side-credit">
                <h3 className="blob-popup-title">מהי מפתחת לומדה?</h3>
                <div className="blob-popup-text-lines">
                  <p>
                    מפתחת לומדה אחראית על פיצוח, אפיון, עיצוב, תכנות ופיתוח
                    הלומדה. בנוסף, בלומדה זו המפתחות היו אחראיות גם על יצירת
                    הגרפיקות.{" "}
                  </p>
                  <p>
                    מהות התפקיד הוא להנגיש חומר לימודי בצורה אינטראקטיבית
                    ועניינית שתשפר את חווית הלמידה של המשתמש, זהו תפקיד נחוץ
                    והכרחי בתחום ההדרכה כולו.{" "}
                  </p>
                </div>
              </div>
              <img
                src={`${PUBLIC_URL}/assets/CreditPage/protrait.webp`}
                alt="group-picture"
                className="credit-protrait-popup"
              />
            </div>
          </div>
        </div>
      )}

      <button
        className="back-to-lomda-btn"
        onClick={() => window.history.back()}
      >
        <span className="btn-star">★</span>
        חזרה ללומדה
      </button>
    </div>
  );
}

export default CreditPage;
