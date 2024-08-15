import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookRegistration from "./pages/BookRegistration";
import UserApproval from "./pages/UserApproval";
import BookReservation from "./pages/BookReservation";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/index.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/dashboard/book-registration"
        element={<BookRegistration />}
      />
      <Route path="/dashboard/user-approval" element={<UserApproval />} />
      <Route path="/dashboard/book-reservation" element={<BookReservation />} />
      {/* </Route> */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
