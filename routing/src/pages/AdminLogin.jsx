import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(true);
    navigate("/admin-dashboard");
  }, [setIsLoggedIn, navigate]);

  return (
    <div>
      <Navbar />
      <h2>Admin Login</h2>
      <p>Redirecting to Admin Dashboard...</p>
    </div>
  );
};

export default AdminLogin;
