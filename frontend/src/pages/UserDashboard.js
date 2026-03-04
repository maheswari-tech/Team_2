import { useState } from "react";
import "../styles/user.css";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("book");
  const [currentRide, setCurrentRide] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  const [rideForm, setRideForm] = useState({
    pickup: "",
    drop: "",
    vehicle: "Car",
    distance: ""
  });

  const rideHistory = [
    { id: 1, date: "2024-03-15", from: "MG Road", to: "Indiranagar", fare: 104, status: "completed" },
    { id: 2, date: "2024-03-14", from: "Koramangala", to: "Whitefield", fare: 250, status: "completed" },
    { id: 3, date: "2024-03-13", from: "Jayanagar", to: "Electronic City", fare: 360, status: "completed" }
  ];

  const calculateFare = () => {
    const rates = { Car: 20, Bike: 10, Auto: 15 };
    const distance = parseFloat(rideForm.distance) || 10;
    return distance * rates[rideForm.vehicle];
  };

  const handleBookRide = () => {
    if (rideForm.pickup && rideForm.drop) {
      const fare = calculateFare();
      setCurrentRide({
        ...rideForm,
        fare,
        status: "requested",
        driver: null
      });
      setShowOtpModal(true);
      alert("Finding nearby drivers...");
    } else {
      alert("Please fill all fields");
    }
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      setCurrentRide({...currentRide, status: "ongoing"});
      setShowOtpModal(false);
      setOtp("");
      alert("Ride started! Enjoy your journey.");
    } else {
      alert("Invalid OTP");
    }
  };

  const cancelRide = () => {
    setCurrentRide(null);
    alert("Ride cancelled");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">👤 User Dashboard</h1>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Rides</h3>
          <p className="stat-number">24</p>
        </div>
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p className="stat-number">₹3,450</p>
        </div>
        <div className="stat-card">
          <h3>Member Since</h3>
          <p className="stat-number">2024</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === "book" ? "active" : ""}`}
          onClick={() => setActiveTab("book")}
        >
          🚗 Book a Ride
        </button>
        <button 
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          📜 Ride History
        </button>
        <button 
          className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          💳 Payment Methods
        </button>
      </div>

      {/* Book Ride Tab */}
      {activeTab === "book" && (
        <div className="section-card">
          {currentRide ? (
            <div className="current-ride">
              <h2>Your Current Ride</h2>
              {currentRide.status === "requested" && (
                <>
                  <p>⏳ Finding a driver for you...</p>
                  <button onClick={cancelRide} className="btn-danger">Cancel Request</button>
                </>
              )}
              {currentRide.status === "ongoing" && (
                <>
                  <p><strong>Driver:</strong> John (Rating: 4.8 ★)</p>
                  <p><strong>Vehicle:</strong> TN01AB1234 (Bike)</p>
                  <p><strong>From:</strong> {currentRide.pickup}</p>
                  <p><strong>To:</strong> {currentRide.drop}</p>
                  <p><strong>Fare:</strong> ₹{currentRide.fare}</p>
                  <p><strong>Estimated arrival:</strong> 10 mins</p>
                  <button onClick={cancelRide} className="btn-danger">Cancel Ride</button>
                </>
              )}
            </div>
          ) : (
            <>
              <h2>Book Your Ride</h2>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={rideForm.pickup}
                  onChange={(e) => setRideForm({...rideForm, pickup: e.target.value})}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Drop Location"
                  value={rideForm.drop}
                  onChange={(e) => setRideForm({...rideForm, drop: e.target.value})}
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={rideForm.distance}
                  onChange={(e) => setRideForm({...rideForm, distance: e.target.value})}
                  className="form-input"
                />
                <select 
                  className="form-input"
                  value={rideForm.vehicle}
                  onChange={(e) => setRideForm({...rideForm, vehicle: e.target.value})}
                >
                  <option value="Car">Car (₹20/km)</option>
                  <option value="Bike">Bike (₹10/km)</option>
                  <option value="Auto">Auto (₹15/km)</option>
                </select>
              </div>
              {rideForm.distance && (
                <div className="fare-estimate">
                  Estimated Fare: ₹{calculateFare()}
                </div>
              )}
              <button onClick={handleBookRide} className="btn-primary">
                Find Drivers
              </button>
            </>
          )}
        </div>
      )}

      {/* Ride History Tab */}
      {activeTab === "history" && (
        <div className="section-card">
          <h2>Your Ride History</h2>
          <table className="rides-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rideHistory.map(ride => (
                <tr key={ride.id}>
                  <td>{ride.date}</td>
                  <td>{ride.from}</td>
                  <td>{ride.to}</td>
                  <td>₹{ride.fare}</td>
                  <td><span className="status completed">{ride.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === "payment" && (
        <div className="section-card">
          <h2>Payment Methods</h2>
          <div className="payment-methods">
            <div className="payment-card">
              <input type="radio" name="payment" /> 💳 Credit Card (•••• 4242)
            </div>
            <div className="payment-card">
              <input type="radio" name="payment" /> 📱 UPI (user@okhdfcbank)
            </div>
            <div className="payment-card">
              <input type="radio" name="payment" /> 💰 Cash
            </div>
          </div>
          <button className="btn-primary">Add New Payment Method</button>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter OTP to Start Ride</h3>
            <p>Please enter the 6-digit OTP shown on driver's app</p>
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button onClick={verifyOtp} className="btn-primary">Verify</button>
              <button onClick={() => setShowOtpModal(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;