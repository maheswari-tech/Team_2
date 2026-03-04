import { useState } from "react";
import "../styles/driver.css";

function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState("offline");
  const [currentRide, setCurrentRide] = useState(null);
  const [rideRequests, setRideRequests] = useState([
    { id: 1, customer: "Alice", pickup: "MG Road", drop: "Indiranagar", distance: "5.2 km", fare: 104 },
    { id: 2, customer: "Bob", pickup: "Koramangala", drop: "Whitefield", distance: "12.5 km", fare: 250 }
  ]);
  const [earnings, setEarnings] = useState({ today: 354, week: 2450, month: 9850, total: 45750 });
  const [activeTab, setActiveTab] = useState("requests");
  const [otp, setOtp] = useState("");

  const toggleStatus = () => {
    setDriverStatus(driverStatus === "online" ? "offline" : "online");
  };

  const acceptRide = (rideId) => {
    const ride = rideRequests.find(r => r.id === rideId);
    setCurrentRide(ride);
    setRideRequests(rideRequests.filter(r => r.id !== rideId));
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOTP);
    alert(`Ride accepted! Share OTP with customer: ${generatedOTP}`);
  };

  const startRide = () => {
    const enteredOTP = prompt("Enter OTP from customer:");
    if (enteredOTP === otp.toString()) {
      alert("OTP verified! Ride started.");
    } else {
      alert("Invalid OTP!");
    }
  };

  const completeRide = () => {
    setCurrentRide(null);
    setEarnings({
      ...earnings,
      today: earnings.today + (currentRide?.fare || 0),
      total: earnings.total + (currentRide?.fare || 0)
    });
    alert(`Ride completed! Fare: ₹${currentRide?.fare}`);
  };

  const rideHistory = [
    { id: 1, date: "Today 10:30", customer: "Alice", from: "MG Road", to: "Indiranagar", fare: 104 },
    { id: 2, date: "Yesterday 15:45", customer: "Bob", from: "Koramangala", to: "Whitefield", fare: 250 },
    { id: 3, date: "2024-03-13", customer: "Charlie", from: "Jayanagar", to: "Electronic City", fare: 360 }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🚗 Driver Dashboard</h1>
        <button 
          className={`status-toggle ${driverStatus}`}
          onClick={toggleStatus}
        >
          {driverStatus === "online" ? "🟢 Online" : "🔴 Offline"}
        </button>
      </div>

      {/* Earnings Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Earnings</h3>
          <p className="stat-number">₹{earnings.today}</p>
        </div>
        <div className="stat-card">
          <h3>This Week</h3>
          <p className="stat-number">₹{earnings.week}</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p className="stat-number">₹{earnings.month}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p className="stat-number">₹{earnings.total}</p>
        </div>
      </div>

      {/* Current Ride Section */}
      {currentRide && (
        <div className="current-ride-card">
          <h2>Current Ride</h2>
          <div className="ride-details">
            <p><strong>Customer:</strong> {currentRide.customer}</p>
            <p><strong>Pickup:</strong> {currentRide.pickup}</p>
            <p><strong>Drop:</strong> {currentRide.drop}</p>
            <p><strong>Distance:</strong> {currentRide.distance}</p>
            <p><strong>Fare:</strong> ₹{currentRide.fare}</p>
          </div>
          <div className="ride-actions">
            <button onClick={startRide} className="btn-primary">Start Ride</button>
            <button onClick={completeRide} className="btn-success">Complete Ride</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          📋 Ride Requests ({rideRequests.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          📜 Ride History
        </button>
      </div>

      {/* Ride Requests Tab */}
      {activeTab === "requests" && (
        <div className="section-card">
          <h2>Available Ride Requests</h2>
          {rideRequests.length === 0 ? (
            <p className="no-data">No ride requests available</p>
          ) : (
            rideRequests.map(ride => (
              <div key={ride.id} className="request-card">
                <div className="request-header">
                  <h3>{ride.customer}</h3>
                  <span className="fare-badge">₹{ride.fare}</span>
                </div>
                <p>📍 From: {ride.pickup}</p>
                <p>🏁 To: {ride.drop}</p>
                <p>📏 Distance: {ride.distance}</p>
                <button onClick={() => acceptRide(ride.id)} className="btn-primary">
                  Accept Ride
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Ride History Tab */}
      {activeTab === "history" && (
        <div className="section-card">
          <h2>Your Ride History</h2>
          <div className="filter-buttons">
            <button className="filter-btn active">Today</button>
            <button className="filter-btn">Week</button>
            <button className="filter-btn">Month</button>
          </div>
          <table className="rides-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {rideHistory.map(ride => (
                <tr key={ride.id}>
                  <td>{ride.date}</td>
                  <td>{ride.customer}</td>
                  <td>{ride.from}</td>
                  <td>{ride.to}</td>
                  <td>₹{ride.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;