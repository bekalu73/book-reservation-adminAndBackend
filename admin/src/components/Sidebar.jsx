import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Admin Dashboard</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard">Overview</Link>
          </li>
          <li>
            <Link to="/dashboard/book-registration">Book Registration</Link>
          </li>
          <li>
            <Link to="/dashboard/user-approval">User Approval</Link>
          </li>
          <li>
            <Link to="/dashboard/book-reservation">Book Reservations</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
