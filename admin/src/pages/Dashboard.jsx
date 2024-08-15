import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardOverview from "../components/DashboardOverview";
import BookStats from "../components/BookStats";
import "../styles/index.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main>
          <DashboardOverview />
          {/* <BookStats /> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
