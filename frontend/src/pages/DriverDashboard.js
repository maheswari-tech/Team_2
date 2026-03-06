import { useState, useEffect } from "react";
import "../styles/driver.css";
import * as rideService from "../services/rideService";

function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState("offline");
  const [currentRide, setCurrentRide] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [earnings, setEarnings] = useState({ today: 354, week: 2450, month: 9850, total: 45750 });
  const [activeTab, setActiveTab] = useState("requests");
  const [otpInput, setOtpInput] = useState("");

  const driverId = localStorage.getItem("driverId") || 1; // Fallback for demo

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await rideService.getAvailableRides();
        setRideRequests(requests);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };

    if (driverStatus === "online") {
      fetchRequests();
      const interval = setInterval(fetchRequests, 5000);
      return () => clearInterval(interval);
    }
  }, [driverStatus]);

  useEffect(() => {
    const fetchActiveRide = async () => {
      try {
        const activeRide = await rideService.getDriverActiveRide(driverId);
        if (activeRide) {
          setCurrentRide(activeRide);
          setDriverStatus("online");
        }
      } catch (error) {
        console.error("Error fetching active ride", error);
      }
    };
    fetchActiveRide();
  }, [driverId]);


  const toggleStatus = () => {
    setDriverStatus(driverStatus === "online" ? "offline" : "online");
  };

  const acceptRide = async (rideId) => {
    try {
      const ride = await rideService.acceptRide(rideId, driverId);
      setCurrentRide(ride);
      setRideRequests(rideRequests.filter(r => r.id !== rideId));
      alert(`Ride accepted! Ask customer for OTP.`);
    } catch (error) {
      alert("Failed to accept ride");
    }
  };

  const startRide = async () => {
    try {
      const ride = await rideService.startRide(currentRide.id, otpInput);
      setCurrentRide(ride);
      alert("OTP verified! Ride started.");
    } catch (error) {
      alert("Invalid OTP! Please check with customer.");
    }
  };

  const completeRide = async () => {
    try {
      await rideService.completeRide(currentRide.id);
      setEarnings({
        ...earnings,
        today: earnings.today + (currentRide?.fare || 0),
        total: earnings.total + (currentRide?.fare || 0)
      });
      setCurrentRide(null);
      alert(`Ride completed! Fare: ₹${currentRide?.fare}`);
    } catch (error) {
      alert("Failed to complete ride");
    }
  };

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
          <h3>Total Earnings</h3>
          <p className="stat-number">₹{earnings.total}</p>
        </div>
      </div>

      {/* Current Ride Section */}
      {currentRide && (
        <div className="current-ride-card">
          <h2>Current Ride</h2>
          <div className={`status-badge ${currentRide.status.toLowerCase()}`}>
            {currentRide.status}
          </div>
          <div className="ride-details">
            <p><strong>Customer:</strong> {currentRide.user?.name || "Customer"}</p>
            <p><strong>Pickup:</strong> {currentRide.pickupLocation}</p>
            <p><strong>Drop:</strong> {currentRide.dropLocation}</p>
            <p><strong>Fare:</strong> ₹{currentRide.fare}</p>
          </div>

          {currentRide.status === "ACCEPTED" && (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter Customer OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="otp-input"
              />
              <button onClick={startRide} className="btn-primary">Start Ride</button>
            </div>
          )}

          {currentRide.status === "ONGOING" && (
            <div className="ride-actions">
              <button onClick={completeRide} className="btn-success">Complete Ride</button>
            </div>
          )}
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
      </div>

      {/* Ride Requests Tab */}
      {activeTab === "requests" && (
        <div className="section-card">
          <h2>Available Ride Requests</h2>
          {driverStatus === "offline" ? (
            <p className="no-data">Go online to see requests</p>
          ) : rideRequests.length === 0 ? (
            <p className="no-data">No ride requests available</p>
          ) : (
            rideRequests.map(ride => (
              <div key={ride.id} className="request-card">
                <div className="request-header">
                  <h3>{ride.user?.name || "Customer"}</h3>
                  <span className="fare-badge">₹{ride.fare}</span>
                </div>
                <p>📍 From: {ride.pickupLocation}</p>
                <p>🏁 To: {ride.dropLocation}</p>
                <p>📏 Distance: {ride.distance} km</p>
                <button onClick={() => acceptRide(ride.id)} className="btn-primary">
                  Accept Ride
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;
