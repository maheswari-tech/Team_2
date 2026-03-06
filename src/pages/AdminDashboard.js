import { useState } from "react";
import "../styles/admin.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("add");
  const [drivers, setDrivers] = useState([]); // Start with empty drivers
  
  const [newDriver, setNewDriver] = useState({
    name: "", email: "", phone: "", vehicle: "", password: "", location: ""
  });
  
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [filter, setFilter] = useState("all");

  // Add Driver Function
  const handleAddDriver = async () => {
    if (!newDriver.name || !newDriver.email || !newDriver.phone || !newDriver.password || !newDriver.location) {
      alert("Please fill all fields including password and location");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/drivers/driver-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDriver),
      });

      if (!response.ok) {
        alert("Error adding driver: ");
        return;
      }

      const savedDriver = await response.json();

      // Update drivers list locally
      setDrivers([...drivers, savedDriver]);

      // Show success message
      alert(`✅ Driver added successfully!\n\nName: ${savedDriver.name}\nEmail: ${savedDriver.email}\nPassword: ${savedDriver.password}\nLocation: ${savedDriver.location}\n\nPlease save these credentials.`);

      // Clear form
      setNewDriver({ name: "", email: "", phone: "", vehicle: "", password: "", location: "" });
      
    } catch (error) {
      console.error("Error during adding driver:", error);
      alert("Something went wrong. Please try again.");
    }
  };

// Delete Driver by ID
const handleDeleteDriver = async (id) => {
  if (!window.confirm("Are you sure you want to delete this driver?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/drivers/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      alert("Error deleting driver: " + errorMsg);
      return;
    }

    // Remove driver from local state after successful deletion
    setDrivers(drivers.filter(driver => driver.id !== id));
    alert("Driver deleted successfully!");
    
  } catch (error) {
    console.error("Error deleting driver:", error);
    alert("Something went wrong. Please try again.");
  }
};

  // View Driver Details
  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
  };

  // Filter drivers for selected period
  const getDriverStats = () => {
    const totalRides = drivers.reduce((sum, driver) => sum + driver.rides, 0);
    const totalEarnings = drivers.reduce((sum, driver) => sum + (driver.rides * 200), 0);
    
    switch(filter) {
      case "today":
        return { rides: 12, earnings: 2400 };
      case "month":
        return { rides: totalRides, earnings: totalEarnings };
      case "year":
        return { rides: totalRides, earnings: totalEarnings };
      default:
        return { rides: totalRides, earnings: totalEarnings };
    }
  };

  const stats = getDriverStats();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🚖 Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <p className="stat-number">{drivers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Drivers</h3>
          <p className="stat-number">{drivers.filter(d => d.status === "online").length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Rides</h3>
          <p className="stat-number">{stats.rides}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p className="stat-number">₹{stats.earnings}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeSection === "add" ? "active" : ""}`}
          onClick={() => setActiveSection("add")}
        >
          ➕ Add Driver
        </button>
        <button 
          className={`tab-btn ${activeSection === "manage" ? "active" : ""}`}
          onClick={() => setActiveSection("manage")}
        >
          👥 Manage Drivers
        </button>
      </div>

      {/* Add Driver Section */}
      {activeSection === "add" && (
        <div className="section-card">
          <h2>Add New Driver</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Full Name"
              value={newDriver.name}
              onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
              className="form-input"
              required
            />
            <input
              type="email"
              placeholder="Email (used for login)"
              value={newDriver.email}
              onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
              className="form-input"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newDriver.phone}
              onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="Vehicle Number"
              value={newDriver.vehicle}
              onChange={(e) => setNewDriver({...newDriver, vehicle: e.target.value})}
              className="form-input"
              required
            />
            <input
              type="password"
              placeholder="Password (for driver login)"
              value={newDriver.password}
              onChange={(e) => setNewDriver({...newDriver, password: e.target.value})}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newDriver.location}
              onChange={(e) => setNewDriver({...newDriver, location: e.target.value})}
              className="form-input"
              required
            />
            <select className="form-input" defaultValue="Bike">
              <option value="Bike">Bike</option>
              <option value="Auto">Auto</option>
              <option value="Car">Car</option>
            </select>
          </div>
          <button onClick={handleAddDriver} className="btn-primary">
            Create Driver Account
          </button>
          <p className="note">⚠️ Note: Save the password - it will be shown only once!</p>
        </div>
      )}

      {/* Manage Drivers Section */}
      {activeSection === "manage" && (
        <div className="section-card">
          <div className="section-header">
            <h2>Driver Management</h2>
            <div className="filter-buttons">
              <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
              <button className={`filter-btn ${filter === "month" ? "active" : ""}`} onClick={() => setFilter("month")}>This Month</button>
            </div>
          </div>

          {drivers.length === 0 ? (
            <div className="no-data">
              <p>No drivers added yet. Click on "Add Driver" tab to create drivers.</p>
            </div>
          ) : selectedDriver ? (
            <div className="driver-detail-view">
              <button onClick={() => setSelectedDriver(null)} className="back-btn">← Back</button>
              <h3>{selectedDriver.name}'s Details</h3>
              <div className="driver-info">
                <p><strong>ID:</strong> {selectedDriver.id}</p>
                <p><strong>Name:</strong> {selectedDriver.name}</p>
                <p><strong>Email:</strong> {selectedDriver.email}</p>
                <p><strong>Password:</strong> {selectedDriver.password}</p>
                <p><strong>Phone:</strong> {selectedDriver.phone}</p>
                <p><strong>Vehicle:</strong> {selectedDriver.vehicle}</p>
                <p><strong>Location:</strong> {selectedDriver.location}</p>
                <p><strong>Status:</strong> <span className={`status ${selectedDriver.status}`}>{selectedDriver.status}</span></p>
                <p><strong>Total Rides:</strong> {selectedDriver.rides}</p>
                <p><strong>Joined Date:</strong> {selectedDriver.joinedDate}</p>
                <p><strong>Earnings:</strong> ₹{selectedDriver.rides * 200}</p>
              </div>
            </div>
          ) : (
            <table className="drivers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Rides</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map(driver => (
                  <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.email}</td>
                    <td>
                      <span className="password-display">{driver.password}</span>
                    </td>
                    <td>{driver.phone}</td>
                    <td>{driver.vehicle}</td>
                    <td>{driver.location}</td>
                    <td><span className={`status ${driver.status}`}>{driver.status}</span></td>
                    <td>{driver.rides}</td>
                    <td>
                      <button onClick={() => handleViewDriver(driver)} className="action-btn view">View</button>
                      <button onClick={() => handleDeleteDriver(driver.id)} className="action-btn delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;