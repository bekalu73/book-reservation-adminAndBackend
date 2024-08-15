import React, { useState } from "react";
import axios from "axios";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";

const BookRegistration = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8800/books",
        { title, author, description },
        {
          headers: {
            "x-auth-token": token, // Pass the token in the header
          },
        }
      );

      console.log(response);
      if (response.status === 201) {
        setSuccess("Book registered successfully!");
        setTitle("");
        setAuthor("");
        setDescription("");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Access denied. You must be an admin to register books.");
      } else if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        console.log(error);
      } else {
        setError("Failed to register book. Please try again.");
      }
    }
  };

  return (
    <div className="book-registration-container">
      <h2>Book Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Register Book
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default BookRegistration;
