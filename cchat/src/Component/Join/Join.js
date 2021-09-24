import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("JoinInput").value;
  document.getElementById("JoinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>C Chat</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name :"
          type="text"
          id="JoinInput"
        />
        <Link
          onClick={(event) => (name ? null : event.preventDefault())}
          to="/chat"
        >
          <button onClick={sendUser} className="JoinButton">
            Login In
          </button>
        </Link>
      </div>
    </div>
  );
};

export { user };
export default Join;
