import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");


    if (!token) {
      alert("Please login first!");
      navigate("/login");
    } else {
      setUsername(storedUsername || "User"); // fallback to 'User' if not set
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>HOME</h2>
        <p>Welcome, {username}! You are logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
