import React, { useState, useEffect } from 'react';


function InfoRockets() {
  const sliderImages = [
    `${process.env.PUBLIC_URL}/assets/unitTwoImgs/gallery1.png`,
    `${process.env.PUBLIC_URL}/assets/unitTwoImgs/gallery2.jpg`,
    `${process.env.PUBLIC_URL}/assets/unitTwoImgs/gallery3.png`,
    `${process.env.PUBLIC_URL}/assets/unitTwoImgs/gallery4.jpg`,
  ];


  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };


  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };


  return (
    <div className="sub-page-container">
      <div className="sub-page-content">
        <div className="sub-page-text-section">
          <h1 className="sub-page-header">מאפייני האיום</h1>
          <div className="text-item">
            <div className="text-decorator"></div>
            <p>
              ירי טילים הוא אירוע מלחמתי המאיים על העורף
              ומוביל להרס מבנים, שריפות, וחומרים מסוכנים.
            </p>
          </div>


          <div className="text-item">
            <div className="text-decorator"></div>
            <p>
              המרחב המוגן הינו המקום הבטוח ביותר
              להימצא בו בזמן ירי טילים.
            </p>
          </div>
        </div>


        <div className="sub-page-image-section">
          <div className="slider-wrapper">
            <button className="slider-arrow prev" onClick={prevSlide}>&#10095;</button>


            <div className="image-container">
              {sliderImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`gallery-${index + 1}`}
                  className={`main-sub-img ${index === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>


            <button className="slider-arrow next" onClick={nextSlide}>&#10094;</button>
          </div>


          <div className="img-pagination-dots">
            {sliderImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default InfoRockets;







