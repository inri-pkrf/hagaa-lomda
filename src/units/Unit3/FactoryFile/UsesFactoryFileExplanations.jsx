import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../Unit3/style/UsesFactoryFileExplanations.css";

function UsesFactoryFileExplanations() {
  const { id } = useParams();

  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    if (id === "3") {
      setHasReachedBottom(true);
    } else {
      setHasReachedBottom(false);
    }
  }, [id]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("setNextBtnDisabled", { detail: !hasReachedBottom }),
    );
    window.dispatchEvent(
      new CustomEvent("setPrevBtnDisabled", { detail: !hasReachedBottom }),
    );
  }, [hasReachedBottom]);

  const content = {
    1: {
      title: "פרק ראשון: נתונים כלליים ותרחיש האיומים שהמפעל נדרש להיערך אליהם",
      titleWidth: "55vw",
      titleTop: "24vh",
      listTop: "46.5vh",
      scrollOffsetVh: 90,
      paragraphs: [
        { text: "הצגת נתונים כלליים על המפעל." },
        { text: "האיומים שאליהם נדרשים להיערך במפעל." },
        { text: "ניתוח האיומים על המתקן." },
        { text: "ניתוח השטח והגורמים המשפיעים על המתקן." },
        { text: "פירוט החומרים המסוכנים במפעל." },
        { text: "הערכת סיכונים." },
        { text: "פירוט התפוקות והשירות שהמפעל נותן בחירום." },
        {
          text: "רשימת המטה בחירום- כולל ראשי הצוותים במפעל ובעלי תפקידים מארגוני החירום, משטרת ישראל ופיקוד והעורף.",
        },
      ],
    },
    2: {
      title: "פרק שני: עקרונות להכנת המרחבים המוגנים",
      titleWidth: "60vw",
      titleTop: "24vh",
      listTop: "57.5vh",
      scrollOffsetVh: 85,
      subtitle:
        "פרק זה מתמקד בעקרונות לבניית תוכנית מיגון מפני ירי רקטות וטילים ותוכנית פינוי לרעידת אדמה, בהן יוצגו מרחבים מוגנים ותוכנית פינוי לרעידת אדמה.   ",
      paragraphs: [
        { text: "מהו זמן ההתגוננות במפעלך? עלייך לבדוק זאת." },
        {
          text: "האם קיימים אמצעי התרעה במפעל? אם לא- יש לקבוע כיצד מתקבלת ההתרעה בזמן אמת.",
        },
        {
          text: 'סימון מרחבים מוגנים ע"ג מפת המתקן - גודל, כשירות (כולל תיאור), ציוד קיים ומספר העובדים שהם יכולים להכיל.',
        },
        {
          text: "תכנון אילו עובדים יקבלו מענה במרחבים המוגנים השונים, בהתאם למרחק\n(כפי שנגזר מזמן ההתגוננות באזור זה).",
        },
        { text: "הציוד הנדרש למרחב המוגן, לרבות מעקב אחרי מועדי רענון." },
        {
          text: "מפת תוכנית דרכי המילוט ושטחי כינוס והיערכות לרעידת אדמה.",
        },
      ],
    },
    3: {
      title: "פרק שלישי: צוותי חירום",
      titleWidth: "45vw",
      titleTop: "24vh",
      listTop: "41vh",
      scrollOffsetVh: 200,
      paragraphs: [
        { text: "עץ מבנה צוותי החירום במפעל." },
        {
          text: "פירוט תחומי אחריות של כל צוות וסדר פעולות (נקודת כינוס, תדריך וכו').",
        },
        { text: "פירוט כוח אדם בצוותים (לרבות מעקב אחר הכשרות)." },
        { text: "פירוט מיקום הציוד שקיים לכל צוות." },
        { text: "תוכנית הדרכות, הכשרות ותרגילים." },
        { text: "דרכי תקשורת לכוחות חבירים." },
      ],
    },
    4: {
      title: "פרק רביעי: היערכות משקית ותחבורתית בשעת חירום",
      titleWidth: "55vw",
      titleTop: "24vh",
      listTop: "47vh",
      scrollOffsetVh: 70,
      paragraphs: [
        { text: "חומרי הגלם הנדרשים לתפעול תפוקה נדרשת." },
        { text: "תכנון צריכת המים בשעת חירום." },
        { text: "תכנון צריכת הדלק בשעת חירום." },
        { text: "תכנון החשמל החלופי בשעת חירום באמצעות גנרטורים." },
        { text: "תכנון צריכת המזון בשעת חירום." },
        { text: "בתחום הרכב וההסעות: ריתוק רכב ותכנון הסעת אנשי צוות." },
        { text: "הכנת ציוד מכני-הנדסי." },
        { text: "תקשורת, מחשוב וגיבוי." },
        { text: "רציפות הייצור והאחסון בשעת חירום." },
        { text: "רשימת ספקים וקבלני-משנה הנדרשים מול התפוקה או השירות." },
        {
          text: 'דו"ח כוח אדם לביצוע התפוקות והשירותים בחירום, כולל פערים בכוח אדם והשלמות על ידי מגויסי חוץ או העסקת עובדים חלופיים.',
        },
      ],
    },
  };

  const currentContent = content[id] || {
    title: "",
    paragraphs: [],
    scrollOffsetVh: 10,
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const oneVhInPixels = window.innerHeight / 100;
    const offsetInPixels =
      (currentContent.scrollOffsetVh || 10) * oneVhInPixels;

    if (scrollHeight - scrollTop <= clientHeight + offsetInPixels) {
      setHasReachedBottom(true);
    }
  };

  return (
    <div
      className="UsesFactoryFileExplanations-container"
      onScroll={handleScroll}
    >
      {!hasReachedBottom && (
        <div className="scroll-message">
          <span>יש לגלול מטה להמשך</span>
          <div className="scroll-arrow">↓</div>
        </div>
      )}

      <div className="scrollable-content">
        <img
          src={`${process.env.PUBLIC_URL}/assets/UnitThreeImgs/FactoryFile/med-folder.webp`}
          id="UsesFactoryFileExplanations-background"
          alt="background"
        />

        <h1
          className="UsesFactoryFileExplanations-main-title"
          style={{
            width: currentContent.titleWidth,
            top: currentContent.titleTop,
          }}
        >
          {currentContent.title}
        </h1>

        {currentContent.subtitle && (
          <h2 className="UsesFactoryFileExplanations-subtitle">
            {currentContent.subtitle}
          </h2>
        )}

        <div
          className="factory-list-container"
          style={{ top: currentContent.listTop }}
        >
          {currentContent.paragraphs.map((p, index) => (
            <div key={index} className="factory-item-row">
              <span className="UsesFactoryFileExplanations-numbers">
                {index + 1}.
              </span>
              <p
                className="UsesFactoryFileExplanations-subText"
                style={{ whiteSpace: "pre-line" }}
              >
                {p.text}
              </p>
            </div>
          ))}
          {id === "2" && (
            <strong className="UsesFactoryFileExplanations-subText">
              * התיק יאגד בתוכו את התוכניות לטיפול בשרפה, חומ"ס וכו' בהתאם
              להנחיות הגורמים המוסמכים (כב"ה, מד"א) ויכלול סעיפי מניעה, הצטיידות
              וסדר פעולות לטיפול באירוע.
            </strong>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsesFactoryFileExplanations;
