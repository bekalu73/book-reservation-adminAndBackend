import React, { useEffect, useState } from "react";
import "../styles/index.css";

const DashboardOverview = () => {
  // Define state variables for users and books
  const [users, setUsers] = useState(0);
  const [books, setBooks] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8800/auth/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data.users);
        setBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="dashboard-overview">
      <div className="overview-card">
        <h3>Total Users</h3>
        <p>{users}</p>
      </div>
      <div className="overview-card">
        <h3>Books Registered</h3>
        <p>{books}</p>
      </div>
      <div className="overview-card">
        <h3>Pending Reservations</h3>
        <p>30</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
