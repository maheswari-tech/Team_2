import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [role,setRole]=useState("");

 const navigate = useNavigate();

 // Login Logic
 const handleLogin = () => {

   if(role==="ADMIN" && email==="admin@gmail.com" && password==="admin123"){
     navigate("/admin-dashboard");
   }

   else if(role==="USER" && email==="user@gmail.com" && password==="123"){
     navigate("/user-dashboard");
   }

   else if(role==="DRIVER" && email==="driver@gmail.com" && password==="123"){
     navigate("/driver-dashboard");
   }

   else{
     alert("Invalid Credentials");
   }

 }

 // Navigate to signup page
 const goToSignup = () => {
   navigate("/signup");
 }

 return(

  <div className="container">

    <div className="card">

      <h2>Login</h2>

      {/* Role selection */}

      <select onChange={(e)=>setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
        <option value="DRIVER">Driver</option>
      </select>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

     <p className="switch-text">
  Don't have an account? 
  <span className="signup-link" onClick={goToSignup}> Signup</span>
</p>

    </div>

  </div>

 )

}

export default Login;