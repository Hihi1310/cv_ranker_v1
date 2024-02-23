import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../slices/resumeSlice";
import axios from "axios";

function CVImporting() {
  const { resumeFile } = useSelector((state) => state.resumeReducer);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    if (evt.target.files) {
      dispatch(get(evt.target.files[0]));
    }
  };

  const handleUpload = (evt) => {
    console.log("resumeFile: ", resumeFile);
  };

  return (
    <div className="cv-importing-container">
      <h2>UPLOAD YOUR RESUMÉ/CV</h2>
      <div className="cv-importing-form">
        {(resumeFile && (
          <div className="resume-upload">
            <button onClick={handleUpload} className="cv-importing-button-2">
              UPLOAD FILE
            </button>
            <div className="resume-file-box">
              <span className="resume-file-name">{resumeFile.name}</span>
            </div>
          </div>
        )) || (
          <input
            type="file"
            name={"file"}
            className="cv-importing-input form-control"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default CVImporting;
