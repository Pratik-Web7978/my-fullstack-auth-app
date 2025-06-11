import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  // State to store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Hook to allow navigation after successful signup
  const navigate = useNavigate();

  // This function is called when the signup form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend API for signup
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parse the JSON response from the server
      const data = await response.json();

      if (response.ok) {
        // If the response is OK, alert the user and navigate to the login page
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        // If not, show an error message from the response
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      // Catch any errors during the signup process
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
        /><br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
