function BookRide(){

 return(

  <div className="container">

    <div className="card">

      <h2>Book a Ride</h2>

      <input placeholder="Pickup Location"/>

      <input placeholder="Drop Location"/>

      <input type="date"/>

      <select>
        <option>Car</option>
        <option>Bike</option>
        <option>Auto</option>
      </select>

      <button>Book Ride</button>

    </div>

  </div>

 )

}

export default BookRide;