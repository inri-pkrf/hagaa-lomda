import React, { useState, useEffect } from "react";
import "./Styles/InfoPageBase.css";

function InfoPageBase({ headline, boxes, listItems, sliderImages, colorClass, sliderColor }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));

  const renderBox = (item, i) => {
    if (item?.type === "headline") {
      return <h2 key={i} className="info-page-headline">{item.text}</h2>;
    }
    if (item?.type === "box") {
      return <p key={i} className={`info-page-box ${colorClass}`}>{item.text}</p>;
    }
    return <p key={i} className={`info-page-box ${colorClass}`}>{item}</p>;
  };

  const MAX_DOTS = 4;

  const getVisibleDots = () => {
    const total = sliderImages.length;
    if (total <= MAX_DOTS) {
      return sliderImages.map((_, i) => ({ index: i, type: "dot" }));
    }

    let start = Math.max(0, currentIndex - Math.floor(MAX_DOTS / 2));
    let end = start + MAX_DOTS;

    if (end > total) {
      end = total;
      start = end - MAX_DOTS;
    }

    const dots = [];
    if (start > 0) dots.push({ index: -1, type: "ellipsis-start" });
    for (let i = start; i < end; i++) {
      dots.push({ index: i, type: "dot" });
    }
    if (end < total) dots.push({ index: -1, type: "ellipsis-end" });

    return dots;
  };

  return (
    <div className="info-page-wrapper">
      <div className="info-page-body">
        <div className="info-page-content">
          <h2 className="info-page-headline">{headline}</h2>
          {boxes.map((item, i) => renderBox(item, i))}
          {listItems && listItems.length > 0 && (
            <ul className="info-page-list">
              {listItems.map((item, i) => (
                <li key={i} className="info-page-list-item">
                  <span className="info-page-checkbox" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="info-page-slider" style={{ '--slider-color': sliderColor }}>
          <button className="info-slider-arrow info-slider-arrow--prev" onClick={prevSlide}>&#10094;</button>
          <div className="info-slider-frame">
            {sliderImages.map((src, i) => (
              <img key={i} src={src} alt={`slide-${i + 1}`}
                className={`info-slider-img ${i === currentIndex ? "active" : ""}`} />
            ))}
          </div>
          <button className="info-slider-arrow info-slider-arrow--next" onClick={nextSlide}>&#10095;</button>

          <div className="info-slider-dots">
            {getVisibleDots().map((item, i) => {
                if (item.type === "ellipsis-start" || item.type === "ellipsis-end") {
                return (
                    <span key={item.type} className="info-dot-ellipsis">
                    <span /><span /><span />
                    </span>
                );
                }
              return (
                <span
                  key={item.index}
                  className={`info-dot ${item.index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(item.index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPageBase;