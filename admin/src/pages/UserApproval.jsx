import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";

const UserApproval = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please log in as admin.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8800/auth/pending", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in as admin.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8800/auth/approve/${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setSuccess("User approved successfully!");
      setUsers(users.filter((user) => user._id !== userId));
      setError("");
    } catch (error) {
      setError("Failed to approve user.");
      setSuccess("");
    }
  };

  const handleReject = async (userId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in as admin.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8800/auth/reject/${userId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setSuccess("User rejected and deleted.");
      setUsers(users.filter((user) => user._id !== userId));
      setError("");
    } catch (error) {
      setError("Failed to reject user.");
      setSuccess("");
    }
  };

  return (
    <div className="user-approval-container">
      <h1>User Approval</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleApprove(user._id)}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(user._id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No pending users.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserApproval;
