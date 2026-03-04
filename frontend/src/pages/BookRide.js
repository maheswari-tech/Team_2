import { useNavigate } from 'react-router-dom';
import '../styles/bookride.css'

function BookRide(){
  const navigate = useNavigate();
  const bookride = () => {
    const loggedIn = localStorage.getItem("isUserLoggedIn");

    if(loggedIn !== "true"){
      navigate("/login");
    }
    else{
      localStorage.removeItem("isUserLoggedIn");
      navigate("/book-ride");
    }

  }
 return(

  <div className="bookcontainer">

    <div className="card">

      <h2>Book a Ride</h2>

      <input placeholder="Pickup Location"/>

      <input placeholder="Drop Location"/>

      <input type="date"/>

      <select className='bookselect'>
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