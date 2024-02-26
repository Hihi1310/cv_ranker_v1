import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { click } from "../slices/matchSlice";
import axios from "axios";

function Match() {
  const { isMatched } = useSelector((state) => state.matchReducer);
  const { jobName, jobDescription } = useSelector((state) => state.jdReducer);
  const dispatch = useDispatch();

  const postData = async () => {
    try {
      // request jobname {'job_name' : name} || request jobdescription {"job_name": name, " job_description": text}
      const response = await axios.post(
        "/process-matching",
        JSON.stringify({
          job_name: jobName,
          jobDescription: jobDescription,
        })
      );
      // const jd_response = await axios.post("/job", job_description); // cái này là submit riêng
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    dispatch(click(isMatched));
    console.log(
      JSON.stringify({
        job_name: jobName,
        jobDescription: jobDescription,
      })
    );
    console.log(jobName);
    postData();
  };

  return (
    <div className="match-container">
      <button className="match-button" onClick={handleClick}>
        Match
      </button>
    </div>
  );
}

export default Match;
