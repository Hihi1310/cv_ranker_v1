import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { get_job_description, get_job_name } from "../slices/jdSlice";
import axios from "axios";

function JobDescription() {
  const { jobDescription, jobName } = useSelector((state) => state.jdReducer);
  const dispatch = useDispatch();

  const postDescriptionData = async () => {
    try {
      // request jobname {'job_name' : name} || request jobdescription {"job_name": name, " job_description": text}
      const response = await axios.post(
        "/backend/process-matching",
        JSON.stringify({
          job_name: jobName,
          jobDescription: jobDescription,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const jd_response = await axios.post("/job", job_description); // cái này là submit riêng
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    dispatch(get_job_description(evt.target.value));
    dispatch(get_job_name(evt.target.value));
    console.log(evt.target.value);
  };
  const handleSubmitJD = () => {
    console.log(
      "jobDescription",
      JSON.stringify({
        job_name: jobName,
        jobDescription: jobDescription,
      })
    );
    postDescriptionData();
  };

  return (
    <div className="jd-container">
      <input
        type="text"
        className="form-control"
        placeholder="Enter your job's name..."
        onChange={handleChange}
      />
      <textarea
        className="form-control"
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={handleChange}
        placeholder="Enter/Paste your Job Description..."
      ></textarea>
      <button className="jd-button-1" onClick={handleSubmitJD}>
        Submit Job Description
      </button>
    </div>
  );
}

export default JobDescription;
