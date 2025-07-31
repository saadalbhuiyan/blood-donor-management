import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const AdminDashboard = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    setIsLoggedIn(false);
    navigate("/")
  }
  return (
    <div>
      <Navbar/>
      <h1> admin dashboard</h1>
      <button onClick={handleLogout}></button>
    </div>
  );
};

export default AdminDashboard;