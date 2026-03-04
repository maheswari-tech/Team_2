import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simulated database - In real app, this would come from backend
const adminCredentials = {
  email: "admin@gmail.com",
  password: "admin123"
};

// This will store drivers added from admin dashboard
let driverCredentials = [];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Load drivers from localStorage on component mount
  useState(() => {
    const storedDrivers = localStorage.getItem('drivers');
    if (storedDrivers) {
      driverCredentials = JSON.parse(storedDrivers);
    }
  }, []);

  const handleLogin = () => {
    // Admin login
    if (role === "ADMIN") {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        navigate("/admin-dashboard");
      } else {
        alert("Invalid Admin Credentials");
      }
    }
    
    // Driver login - check against drivers added by admin
    else if (role === "DRIVER") {
      const storedDrivers = JSON.parse(localStorage.getItem('drivers') || '[]');
      const driver = storedDrivers.find(d => d.email === email && d.password === password);
      
      if (driver) {
        // Store logged in driver info
        localStorage.setItem('currentDriver', JSON.stringify(driver));
        navigate("/driver-dashboard");
      } else {
        alert("Invalid Driver Credentials");
      }
    }
    
    // User login (simplified for demo)
    else if (role === "USER") {
      if (email === "user@gmail.com" && password === "123") {
        navigate("/user-dashboard");
      } else {
        alert("Invalid User Credentials");
      }
    }
    
    else {
      alert("Please select a role");
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="DRIVER">Driver</option>
        </select>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="switch-text">
          Don't have an account? 
          <span className="signup-link" onClick={goToSignup}> Signup</span>
        </p>
        
        {role === "DRIVER" && (
          <p className="note">Use credentials provided by admin</p>
        )}
      </div>
    </div>
  );
}

export default Login;