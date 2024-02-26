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
import { click, get_matching_data } from "../slices/matchSlice";
import resumeData from "../data/resume.json";

function HomePage() {
  const { isMatched, matchingData } = useSelector(
    (state) => state.matchReducer
  );
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
            <DialogContentText>{matchingData ? JSON.stringify(matchingData) : ""}</DialogContentText>
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
