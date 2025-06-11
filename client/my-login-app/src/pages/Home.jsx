import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Home Page</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
