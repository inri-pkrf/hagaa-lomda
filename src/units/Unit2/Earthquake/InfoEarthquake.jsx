import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Rockets.css";


function InfoEarthquake() {
  sessionStorage.setItem("MainTitle", "רעידת אדמה וצונאמי");


  const navigate = useNavigate();


  const sliderImages = [
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake1.png`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake2.jpg`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake3.jpg`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/earthquake/earthquake4.jpg`,
  ];


  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);


  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1,
    );
  };


  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1,
    );
  };


  const handleBackAndUnlock = () => {
    sessionStorage.setItem("earthquake_unlockedStep", "2");
    navigate("/earthquake/info-tsunami");
  };


  return (
    <div className="sub-page-container">
      <div className="sub-page-content">
        <div className="sub-page-text-section">
          <h1 className="sub-page-header">מאפייני האיום</h1>


          <div className="text-item">
            <div className="text-decorator"></div>
            {/* כאן אני דורס רק את ה-max-width כדי שהטקסט יתרחב */}
            <p style={{ maxWidth: "800px" }}>
              <strong>רעידת אדמה</strong> היא תופעת טבע שכיחה בכדור הארץ.
              באזורים מיושבים ובנויים גורמת רעידת אדמה לרוב לנזק רב בנפש וברכוש,
              בהתאם לעוצמת הרעש, המרחק ממוקד הרעש, איכות הבנייה וסוג הסלע עליו
              המבנה ניצב.
            </p>
          </div>


          <div className="text-item">
            <div className="text-decorator"></div>
            <p style={{ maxWidth: "800px" }}>
              <strong>נזק ישיר:</strong> קריסת מבנים, פגיעות בתשתיות (כבישים,
              גשרים, חשמל, מים, תקשורת) ופגיעות בנפש (הרוגים, פצועים, לכודים,
              נעדרים, חסרי קורת גג).
            </p>
          </div>


          <div className="text-item">
            <div className="text-decorator"></div>
            <p style={{ maxWidth: "800px" }}>
              <strong>נזקי משנה:</strong> שריפות, דליפות גז או חומרים מסוכנים,
              הצפות מצינורות שהתבקעו, מפולות וסחף קרקע, פגיעה בשרשרת אספקה
              ושיבוש שגרת החיים.
            </p>
          </div>


        </div>


        <div className="sub-page-image-section">
          <div className="slider-wrapper">
            <button className="slider-arrow prev" onClick={prevSlide}>
              &#10095;
            </button>


            <div className="image-container-rockets-part1">
              {sliderImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`earthquake-gallery-${index + 1}`}
                  className={`main-sub-img ${index === currentIndex ? "active" : ""}`}
                />
              ))}
            </div>


            <button className="slider-arrow next" onClick={nextSlide}>
              &#10094;
            </button>
          </div>


          <div className="img-pagination-dots">
            {sliderImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default InfoEarthquake;



