import React, { useRef } from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import {
  get,
  set_import_status,
  set_upload_status,
} from "../slices/resumeSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

function CVImporting() {
  const { resumeFile, importStatus, uploadStatus } = useSelector(
    (state) => state.resumeReducer
  );
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    if (evt.target.files) {
      dispatch(get(evt.target.files[0]));
    }
    dispatch(set_import_status("hidden"));
    dispatch(set_upload_status(""));
  };

  const handleResetClick = () => {
    dispatch(set_upload_status("hidden"));
    dispatch(set_import_status(""));
  };

  const handleUploadFileClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = (evt) => {
    console.log("resumeFile: ", resumeFile);

    // lưu file vào biến
    // const postData = async () => {
    //   try {
    //     const response = await axios.post("/upload-cv", file);
    //     console.log(response.status);
    //   } catch (error) {
    //     console.log(response.error);
    //   }
    // };
  };
  const fileInputRef = useRef(null);

  return (
    <div className="cv-importing-container">
      <h2>UPLOAD YOUR RESUMÉ/CV</h2>
      <div className="cv-importing-form">
        <div className="resume-upload" hidden={uploadStatus}>
          <button onClick={handleUpload} className="cv-importing-button-2">
            UPLOAD FILE
          </button>
          <div className="resume-file-box">
            <span className="resume-file-name">
              {resumeFile ? resumeFile.name : ""}
            </span>
          </div>
          <img src="../img/reset.svg" alt="" />
          <FontAwesomeIcon
            icon={faRotateRight}
            onClick={handleResetClick}
            className="btn"
          />
        </div>
        <div className="resume-browsing" hidden={importStatus}>
          <button
            className="cv-importing-button-2"
            onClick={handleUploadFileClick}
            hidden={importStatus}
          >
            Browse
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          // name={"file"}
          className="cv-importing-input"
          onChange={handleChange}
          accept=".pdf"
        />
      </div>
    </div>
  );
}

export default CVImporting;
