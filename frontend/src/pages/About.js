import "../styles/main.css";
function About(){

  return(

    <div className="about-container">

      <h1 className="about-title">About Rapid-X</h1>

      <p className="about-description">
        Rapid-X is a modern ride booking platform designed to make transportation
        easy, fast, and reliable. Our mission is to connect riders with trusted
        drivers through a simple and efficient booking system.
      </p>

      <div className="about-features">

        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Book rides instantly with a simple and user-friendly interface.</p>
        </div>

        <div className="feature-card">
          <h3>Trusted Drivers</h3>
          <p>All drivers are verified to ensure safe and comfortable rides.</p>
        </div>

        <div className="feature-card">
          <h3>Affordable Prices</h3>
          <p>We offer transparent pricing with no hidden charges.</p>
        </div>

      </div>

    </div>

  )

}

export default About;