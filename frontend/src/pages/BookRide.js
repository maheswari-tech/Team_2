import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import "../styles/bookride.css";
import * as rideService from "../services/rideService";

const center = { lat: 11.6643, lng: 78.1460 }; // Salem center

function BookRide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    vehicle: "Car",
    distance: ""
  });

  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCaf9Io8j7ZG1rV16i1bvhjaLp22RGBZGA", // PLACEHOLDER
    libraries
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const pickupRef = useRef();
  const dropRef = useRef();

  const calculateRoute = async () => {
    if (pickupRef.current.value === "" || dropRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickupRef.current.value,
      destination: dropRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const dist = results.routes[0].legs[0].distance.text;
    const distValue = parseFloat(dist.replace(/[^0-9.]/g, ''));
    setFormData(prev => ({ ...prev, distance: distValue, pickup: pickupRef.current.value, drop: dropRef.current.value }));
  };

  const userId = localStorage.getItem("userId") || 1;

  const handleBookRide = async () => {
    const loggedIn = localStorage.getItem("isUserLoggedIn");

    if (loggedIn !== "true") {
      alert("Please login to book a ride");
      navigate("/login");
      return;
    }

    if (!formData.pickup || !formData.drop || !formData.distance) {
      alert("Please enter locations and calculate route first");
      return;
    }

    try {
      await rideService.bookRide(
        userId,
        formData.pickup,
        formData.drop,
        formData.vehicle,
        parseFloat(formData.distance)
      );
      alert("Ride booked successfully! Go to dashboard to track.");
      navigate("/user-dashboard");
    } catch (error) {
      alert("Failed to book ride");
    }
  };

  const [loadError, setLoadError] = useState(false);

  // Handle loading error
  useEffect(() => {
    if (!isLoaded && !loadError) {
      const timer = setTimeout(() => {
        if (!isLoaded) setLoadError(true);
      }, 3000); // Wait 3 seconds before showing fallback
      return () => clearTimeout(timer);
    }
  }, [isLoaded, loadError]);

  const handleManualDistChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, distance: value }));
  };

  const calculateFareValue = () => {
    const rates = { Car: 20, Bike: 10, Auto: 15 };
    const distance = parseFloat(formData.distance) || 0;
    return distance * (rates[formData.vehicle] || 0);
  };

  return (
    <div className="bookcontainer">
      <div className="book-layout">
        <div className="card">
          <h2>Book a Ride</h2>

          {isLoaded ? (
            <>
              <Autocomplete onPlaceChanged={calculateRoute}>
                <input
                  placeholder="Pickup Location"
                  ref={pickupRef}
                  className="form-input"
                />
              </Autocomplete>

              <Autocomplete onPlaceChanged={calculateRoute}>
                <input
                  placeholder="Drop Location"
                  ref={dropRef}
                  className="form-input"
                />
              </Autocomplete>
            </>
          ) : (
            <div className="fallback-inputs">
              <p className="warning-text">⚠️ Google Maps API Key missing/invalid. Using manual mode.</p>
              <input
                placeholder="Pickup Location"
                className="form-input"
                value={formData.pickup}
                onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
              />
              <input
                placeholder="Drop Location"
                className="form-input"
                value={formData.drop}
                onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
              />
              <input
                type="number"
                placeholder="Enter Distance manually (km)"
                className="form-input"
                value={formData.distance}
                onChange={handleManualDistChange}
              />
            </div>
          )}

          {formData.distance && (
            <div className="info-box">
              <p><strong>Distance:</strong> {formData.distance} km</p>
              <p><strong>Estimated Fare:</strong> ₹{calculateFareValue()}</p>
            </div>
          )}

          <select
            className="bookselect"
            value={formData.vehicle}
            onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
          >
            <option value="Car">Car (₹20/km)</option>
            <option value="Bike">Bike (₹10/km)</option>
            <option value="Auto">Auto (₹15/km)</option>
          </select>

          <button onClick={handleBookRide} className="btn-primary">Book Ride</button>
        </div>

        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '12px' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          ) : (
            <div className="map-placeholder">
              <div className="placeholder-content">
                <h3>🗺️ Map Preview</h3>
                <p>Google Maps will appear here once a valid API Key is provided in <code>BookRide.js</code></p>
                <div className="mock-route">
                  <div className="dot green"></div>
                  <div className="line"></div>
                  <div className="dot red"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookRide;

