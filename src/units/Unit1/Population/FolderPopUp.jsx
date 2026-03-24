import React from "react";
import "./FolderPopUp.css";

function FolderPopUp({ data, close }) {

  return (
    <div className="popup-overlay">

      <div className="popup-container">

        <img
          className="folderImg"
          src={data.folderImg}
          alt=""
        />

        <div className="popup-left">
          <h2>{data.title}</h2>

          <img
            className="popupIcon"
            src={data.icon}
            alt=""
          />
        </div>

        <div className="popup-text">
          <p>{data.text}</p>
        </div>

        <button className="closeBtn" onClick={close}>
          ✕
        </button>

      </div>

    </div>
  );
}

export default FolderPopUp;