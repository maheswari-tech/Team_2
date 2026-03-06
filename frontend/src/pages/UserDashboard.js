import { useState, useEffect } from "react";
import "../styles/user.css";
import * as rideService from "../services/rideService";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("book");
  const [currentRide, setCurrentRide] = useState(null);
  const [userRides, setUserRides] = useState([]);

  const [rideForm, setRideForm] = useState({
    pickup: "",
    drop: "",
    vehicle: "Car",
    distance: ""
  });

  const userId = localStorage.getItem("userId") || 1; // Fallback for demo

  useEffect(() => {
    const fetchUserRides = async () => {
      try {
        const rides = await rideService.getUserRides(userId);
        setUserRides(rides);
      } catch (error) {
        console.error("Error fetching rides", error);
      }
    };

    const fetchActiveRide = async () => {
      try {
        const rides = await rideService.getUserRides(userId);
        const active = rides.find(r => r.status !== "COMPLETED" && r.status !== "CANCELLED");
        if (active) {
          setCurrentRide(active);
        } else {
          setCurrentRide(null);
        }
      } catch (error) {
        console.error("Error fetching active ride", error);
      }
    };

    fetchUserRides();
    const interval = setInterval(() => {
      fetchUserRides();
      fetchActiveRide();
    }, 5000);
    return () => clearInterval(interval);
  }, [userId]);


  const calculateFare = () => {
    const rates = { Car: 20, Bike: 10, Auto: 15 };
    const distance = parseFloat(rideForm.distance) || 0;
    return distance * (rates[rideForm.vehicle] || 0);
  };

  const handleBookRide = async () => {
    if (rideForm.pickup && rideForm.drop && rideForm.distance) {
      try {
        const ride = await rideService.bookRide(
          userId,
          rideForm.pickup,
          rideForm.drop,
          rideForm.vehicle,
          parseFloat(rideForm.distance)
        );
        setCurrentRide(ride);
        alert("Finding nearby drivers...");
      } catch (error) {
        alert("Failed to book ride");
      }
    } else {
      alert("Please fill all fields");
    }
  };


  const cancelRide = async () => {
    if (currentRide) {
      try {
        await rideService.cancelRide(currentRide.id);
        setCurrentRide(null);
        alert("Ride cancelled successfully");
      } catch (error) {
        alert("Failed to cancel ride");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">👤 User Dashboard</h1>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Rides</h3>
          <p className="stat-number">{userRides.length}</p>
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
      </div>

      {/* Book Ride Tab */}
      {activeTab === "book" && (
        <div className="section-card">
          {currentRide ? (
            <div className="current-ride">
              <h2>Your Current Ride</h2>
              <div className={`status-badge ${currentRide.status.toLowerCase()}`}>
                {currentRide.status}
              </div>

              {currentRide.status === "REQUESTED" && (
                <p>⏳ Finding a driver for you...</p>
              )}

              {currentRide.status === "ACCEPTED" && (
                <div className="ride-info">
                  <p><strong>Driver:</strong> {currentRide.driver?.name || "Assigned"}</p>
                  <div className="otp-container">
                    <p><strong>OTP for Driver:</strong></p>
                    <div className="otp-bubble">{currentRide.otp}</div>
                    <small>Share this OTP with your driver to start the ride</small>
                  </div>
                  <p><strong>From:</strong> {currentRide.pickupLocation}</p>
                  <p><strong>To:</strong> {currentRide.dropLocation}</p>
                  <p><strong>Fare:</strong> ₹{currentRide.fare}</p>
                </div>
              )}

              {currentRide.status === "ONGOING" && (
                <div className="ride-info">
                  <p>🚀 Ride in progress...</p>
                  <p><strong>Estimated arrival:</strong> 10 mins</p>
                </div>
              )}

              {currentRide.status !== "ONGOING" && (
                <button onClick={cancelRide} className="btn-danger">Cancel Request</button>
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
                  onChange={(e) => setRideForm({ ...rideForm, pickup: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Drop Location"
                  value={rideForm.drop}
                  onChange={(e) => setRideForm({ ...rideForm, drop: e.target.value })}
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={rideForm.distance}
                  onChange={(e) => setRideForm({ ...rideForm, distance: e.target.value })}
                  className="form-input"
                />
                <select
                  className="form-input"
                  value={rideForm.vehicle}
                  onChange={(e) => setRideForm({ ...rideForm, vehicle: e.target.value })}
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
              {userRides.map(ride => (
                <tr key={ride.id}>
                  <td>{new Date(ride.bookingTime).toLocaleDateString()}</td>
                  <td>{ride.pickupLocation}</td>
                  <td>{ride.dropLocation}</td>
                  <td>₹{ride.fare}</td>
                  <td><span className={`status ${ride.status.toLowerCase()}`}>{ride.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
