import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Use the state variables
    console.log("Signup attempt with:", { name, email, username, phone });
    alert("Signup Successful");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>

        <p className="switch-text">
          Already have an account?
          <span className="login-link" onClick={goToLogin}> Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;