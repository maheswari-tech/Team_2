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

  const handleLogin = async () => {
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

      const slogin = {
            email,
            password
        };

        try{
            const response = await fetch("http://localhost:8080/api/drivers/driver-login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(slogin)
            });

            const data = await response.json();

            if(data.success){
                alert("Login Successful");
                navigate("/driver-dashboard")
                // navigate("/student-dashboard",{state:{reg}});
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.log(error);
            alert("Server error");
        }
    }
    
    // User login (simplified for demo)
    else if (role === "USER") {
       const slogin = {
            email,
            password
        };

        try{
            const response = await fetch("http://localhost:8080/api/user/user-login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(slogin)
            });

            const data = await response.json();

            if(data.success){
                alert("Login Successful");
                localStorage.setItem("isUserLoggedIn","true");
                // navigate("/student-dashboard",{state:{reg}});
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.log(error);
            alert("Server error");
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