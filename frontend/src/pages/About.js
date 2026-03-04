import React from "react";
import "../styles/main.css";

function About(){
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        Welcome to our platform, where convenience meets reliability.
        We are committed to transforming everyday travel by connecting riders
        with trusted drivers through smart, seamless technology.
      </p>
      <p className="about-text">
        Our mission is simple — to make transportation safe, affordable, and
        accessible for everyone. Whether it’s a daily commute, airport
        transfer, or a late-night ride, we ensure comfort, transparency, and
        peace of mind at every step.
      </p>
      <p className="about-text">
        With real-time tracking, verified drivers, and secure payments, we
        focus on delivering a smooth and dependable ride experience.
      </p>
    </div>
  );
};

export default About;