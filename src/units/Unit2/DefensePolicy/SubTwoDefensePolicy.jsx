import React from "react";
import '../style/DefensePolicy.css'; // ייבוא קובץ העיצוב


function SubTwoDefensePolicy() {
  return (
    // הוספת class לעמוד הראשי
    <div className="defense-policy-page video-page-layout">
     
      {/* מיכל לתוכן הטקסטואלי */}
      <div className="video-text-container">
        <h1 className="policy-video-title">מדיניות התגוננות - סרטון</h1>
        <h2 className="policy-video-subtitle">צפו בסרטון ובסיומו לחצו על המשך</h2>
      </div>


      {/* מיכל לסרטון - זה המפתח להגדלה ומרכוש */}
      <div className="video-frame-container">
        <iframe
          src="https://www.youtube.com/embed/y5ovsnn0HDQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="responsive-iframe"
        ></iframe>
      </div>
    </div>
  );
}


export default SubTwoDefensePolicy;

