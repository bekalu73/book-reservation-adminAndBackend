import React from "react";
import "../styles/index.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Welcome, Admin</h1>
      </div>
      <div className="header-right">
        <button className="header-button">Notifications</button>
        <button className="header-button">Profile</button>
      </div>
    </header>
  );
};

export default Header;
