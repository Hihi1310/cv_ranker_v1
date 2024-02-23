import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../css/main.css";
import CVImporting from "./CVImporting";
import Match from "./Match";
import JobDescription from "./JobDescription";
import Result from "./Result";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { click } from "../slices/matchSlice";
import resumeData from "../data/resume.json";

function HomePage() {
  const { isMatched } = useSelector((state) => state.matchReducer);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(click(isMatched));
  };

  // console.log("resume keys: ", Object.keys(resumeData));

  return (
    <div className="homepage-container">
      <Header />
      <div className="homepage-body">
        <CVImporting />
        <Match />
        <JobDescription />
        <Dialog open={isMatched}>
          <DialogTitle>RESUMÉ/CV SUMMARY</DialogTitle>
          <DialogContent className="cv-summary-dialog-content-custom">
            <DialogContentText>
              <h4>Degree: </h4>
              {resumeData.Degree.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Experience: </h4>
              {resumeData.Experience.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Technical Skills: </h4>
              {resumeData.TechnicalSkills.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Responsibilities: </h4>
              {resumeData.Responsibilities.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Certificates: </h4>
              {resumeData.Certificates.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Soft Skills: </h4>
              {resumeData.SoftSkills.map((val) => {
                return <li>{val}</li>;
              })}
              <br />
              <hr />
              <br />
              <h4>Comment: </h4>
              <li>{resumeData.Comment}</li>
              <br />
              <hr />
              <br />
              <h4>Job Recommend: </h4>
              {resumeData.JobRecommend.map((val) => {
                return <li>{val}</li>;
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-danger" autoFocus onClick={handleClick}>
              Close
            </button>
          </DialogActions>
        </Dialog>

        {/* <Result /> */}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
