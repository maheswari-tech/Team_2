import { Link } from "react-router-dom";
import "../styles/main.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero-content">
        <h1>Ride Booking System</h1>

        <p>
          Book rides quickly and safely. Drivers and users can login
          to manage rides and travel easily.
        </p>

        <Link to="/book">
          <button className="book-btn">Book a Ride</button>
        </Link>
      </div>

    </div>
  );
}

export default Home;