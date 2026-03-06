import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/main.css";
import logo from "../assets/applogo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      const userLogged = localStorage.getItem("isUserLoggedIn") === "true";
      const driverLogged = localStorage.getItem("isDriverLoggedIn") === "true";
      setIsLoggedIn(userLogged || driverLogged);
      setUserRole(localStorage.getItem("userRole"));
    };

    checkLogin();
    // Listen for storage changes (for same-domain tabs) or custom events
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    alert("Logged out successfully");
    navigate("/");
    window.location.reload(); // Force reload to update state across components
  };

  return (
    <nav>
      <div className="navbody">
        <div className="navlogo">
          <img src={logo} alt="logo" className="logoimg" />
          <h2>Rapid-X</h2>
        </div>

        <div className="navtop">
          <Link to="/">Home</Link>
          {userRole === "USER" && <Link to="/user-dashboard">Dashboard</Link>}
          {userRole === "DRIVER" && <Link to="/driver-dashboard">Dashboard</Link>}
          <Link to="/book">Book Ride</Link>
          <Link to="/about">About Us</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>

        <div className="navbutton">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="loginbtn">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="signupbtn">Sign Up</button>
              </Link>
            </>
          ) : (
            <button className="signupbtn" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;