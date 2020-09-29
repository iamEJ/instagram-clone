import React from "react";
import "./css/Header.css";
import Login from "./Login";

function Header() {
  return (
    <div className="header">
      <img
        className="header_image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt=""
      />
      <Login />
    </div>
  );
}

export default Header;
