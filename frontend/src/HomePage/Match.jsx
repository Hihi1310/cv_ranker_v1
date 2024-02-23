import React from "react";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { click } from "../slices/matchSlice";

function Match() {
  const { isMatched } = useSelector((state) => state.matchReducer);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(click(isMatched));
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
