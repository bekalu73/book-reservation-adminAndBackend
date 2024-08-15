import React from "react";
import "../styles/index.css";

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <div className="overview-card">
        <h3>Total Users</h3>
        <p>150</p>
      </div>
      <div className="overview-card">
        <h3>Books Registered</h3>
        <p>120</p>
      </div>
      <div className="overview-card">
        <h3>Pending Reservations</h3>
        <p>30</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
