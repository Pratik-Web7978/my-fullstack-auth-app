import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

//   return (
//     <div
//       className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/cafe-bg.jpg')" }} // place the image inside public folder
//     >
//       <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-white">
//         <h2 className="text-4xl font-bold text-center mb-8">LOGIN</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
//             <FaUser className="mr-3 text-white text-lg" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="bg-transparent outline-none w-full placeholder-white text-white"
//             />
//           </div>

//           <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
//             <FaLock className="mr-3 text-white text-lg" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="bg-transparent outline-none w-full placeholder-white text-white"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-3 rounded-lg transition duration-300"
//           >
//             LOG IN
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm text-white/80 hover:underline cursor-pointer">
//           Forgot password?
//         </p>

//         <p className="text-center mt-2 text-sm text-white/80">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="underline text-white hover:text-blue-200">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <div className="links">
          <p><a href="#">Forgot password?</a></p>
          <p>Don’t have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}


export default Login;
