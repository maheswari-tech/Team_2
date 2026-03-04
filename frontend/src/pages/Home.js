import { Link } from "react-router-dom";
import "../styles/main.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero-content">
        <h1>Go anywhere. Ride anytime.</h1>

        <h3 className="hh1">
          Whether it’s work, shopping, or a late-night trip, we connect you with reliable drivers near you. Fast pickups, transparent pricing, and smooth journeys—every time.
        </h3>

        <Link to="/book">
          <button className="book-btn">Book a Ride</button>
        </Link>
      </div>

    </div>
  );
}

export default Home;