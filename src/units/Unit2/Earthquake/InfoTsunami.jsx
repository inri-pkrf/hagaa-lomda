import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Rockets.css";


function InfoTsunami() {
  const navigate = useNavigate();


  const sliderImages = [
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami1.jpg`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami2.jpg`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami3.webp`,
    `${process.env.PUBLIC_URL}/assets/UnitTwoImgs/tsunami/tsunami4.jpg`,
  ];


  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1,
      );
    }, 3000);


    return () => clearInterval(timer);
  }, []);


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


  // const handleBackAndUnlock = () => {
  //   sessionStorage.setItem("earthquake_unlockedStep", "2");
  //   navigate("/preparation-earth");
  // };


  return (
    <div className="sub-page-container">
      <div className="sub-page-content">
        <div className="sub-page-text-section">
          <h1 className="sub-page-header">מאפייני האיום</h1>


          <div className="text-item">
            <div className="text-decorator"></div>
            {/* כאן אני דורס רק את ה-max-width כדי שהטקסט יתרחב */}
            <p style={{ maxWidth: "800px" }}>
              <strong>צונאמי</strong>(נחשול רעש) הוא תופעה של גלי ים גדולים
              המתפרצים בעוצמה רבה אל תוך חופי הים. בישראל יתכן צונמי הנגרם
              כתוצאה מרעידת אדמה בלב-ים או כתוצאה מרעידת אדמה בארץ.
            </p>
          </div>


          <div className="text-item">
            <div className="text-decorator"></div>
            <p style={{ maxWidth: "800px" }}>
              <strong>נזק ישיר:</strong> הצפות הרסניות, סחיפת מבנים, כלי רכב
              ותשתיות, פגיעות בנפש ובסביבה.
            </p>
          </div>


          <div className="text-item">
            <div className="text-decorator"></div>
            <p style={{ maxWidth: "800px" }}>
              <strong>נזקי משנה:</strong>זיהום מקורות מים, פגיעה במערכות חשמל
              ותקשורת, דליפות חומרים מסוכנים והתפרצות שרפות.
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
                  alt={`tsunami-gallery-${index + 1}`}
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


export default InfoTsunami;





