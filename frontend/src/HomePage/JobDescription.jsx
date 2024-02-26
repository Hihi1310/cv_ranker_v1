import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { get_job_description, get_job_name } from "../slices/jdSlice";

function JobDescription() {
  const { JobDescription } = useSelector((state) => state.jdReducer);
  const dispatch = useDispatch();

  function handleChange(evt) {
    dispatch(get_job_description(evt.target.value));
    dispatch(get_job_name(evt.target.value));
    console.log(evt.target.value);
  }

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
    </div>
  );
}

export default JobDescription;
