import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simulated admin credentials
const adminCredentials = {
  email: "admin@gmail.com",
  password: "admin123"
};

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(role === ""){
      alert("Please select a role");
      return;
    }

    /* ---------------- ADMIN LOGIN ---------------- */

    if(role === "ADMIN"){

      if(email === adminCredentials.email && password === adminCredentials.password){

        alert("Admin Login Successful");
        navigate("/admin-dashboard");

      }
      else{
        alert("Invalid Admin Credentials");
      }

    }

    /* ---------------- DRIVER LOGIN ---------------- */

    else if(role === "DRIVER"){

      const slogin = {
        email,
        password
      };

      try{

        const response = await fetch("http://localhost:8080/api/drivers/driver-login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(slogin)
        });

        const data = await response.json();

        if(data.success){
          alert("Driver Login Successful");

          localStorage.setItem("isDriverLoggedIn","true");

          navigate("/driver-dashboard");
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

    /* ---------------- USER LOGIN ---------------- */

    else if(role === "USER"){

      const slogin = {
        email,
        password
      };

      try{

        const response = await fetch("http://localhost:8080/api/user/user-login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(slogin)
        });

        const data = await response.json();

        if(data.success){

          alert("User Login Successful");

          localStorage.setItem("isUserLoggedIn","true");

          navigate("/user-dashboard");   // ✅ fixed navigation

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

  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return(

    <div className="container">

      <div className="card">

        <h2>Login</h2>

        <select
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="DRIVER">Driver</option>
        </select>

        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text">
          Don't have an account?
          <span className="signup-link" onClick={goToSignup}> Signup</span>
        </p>

        {role === "DRIVER" && (
          <p className="note">
            Use credentials provided by admin
          </p>
        )}

      </div>

    </div>

  )

}

export default Login;