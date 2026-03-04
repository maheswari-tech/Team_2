import { useNavigate } from "react-router-dom";
import "../styles/bookride.css";

function BookRide(){

  const navigate = useNavigate();

  const bookride = () => {

    const loggedIn = localStorage.getItem("isUserLoggedIn");

    if(loggedIn === "true"){
      navigate("/user-dashboard");   // user already logged in
    }
    else{
      alert("Please login to book a ride");
      navigate("/login");            // user not logged in
    }

  };

  return(

    <div className="bookcontainer">

      <div className="card">

        <h2>Book a Ride</h2>

        <input placeholder="Pickup Location"/>

        <input placeholder="Drop Location"/>

        <input type="date"/>

        <select className="bookselect">
          <option>Car</option>
          <option>Bike</option>
          <option>Auto</option>
        </select>

        <button onClick={bookride}>Book Ride</button>

      </div>

    </div>

  )

}

export default BookRide;