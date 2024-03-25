import React, { useState } from "react";

const LoginForm = () => {
  const [isCheck, setIsCheck] = useState(false);
  const handleIsCheck = (evt) => {
    setIsCheck(!isCheck);
    evt.preventDefault();
  };
  return (
    <div className="flex">
      <form
        action=""
        className="flex  flex-col gap-y-4 p-4"
        onsubmit="return false"
      >
        <input
          type="text"
          placeholder="Enter username / email"
          className="pl-2"
        />
        <div>
          <input
            type={isCheck ? "text" : "password"}
            placeholder="Enter password"
            className="pl-2"
          />
          <button onClick={handleIsCheck}>Check</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
