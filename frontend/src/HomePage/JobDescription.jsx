import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../slices/jdSlice";

function JobDescription() {
  const { JobDescription } = useSelector((state) => state.jdReducer);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(get(evt.target.value));
    console.log(evt.target.value);
  };

  return (
    <div className="jd-container">
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
