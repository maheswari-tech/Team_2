import { Link } from "react-router-dom";
import "../styles/main.css";
import logo from "../assets/applogo.jpg";

function Navbar(){

  return(

    <nav>

      <div className="navbody">

        <div className="navlogo">

          <img src={logo} alt="logo" className="logoimg"/>

          <h2>Rapid-X</h2>

        </div>

        <div className="navtop">
          <Link to="/">Home</Link>
          <Link to="/book">Book Ride</Link>
          <Link to="/about">About Us</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>

        <div className="navbutton">
          <Link to="/login">
            <button className="loginbtn">Log In</button>
          </Link>

          <Link to="/signup">
            <button className="signupbtn">Sign Up</button>
          </Link>
        </div>

      </div>

    </nav>

  )

}

export default Navbar;