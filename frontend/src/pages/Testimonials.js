function Testimonials() {
  return (
    <div className="testimonial-section">

      <h1 className="testimonial-title">TESTIMONIALS</h1>
      <p className="testimonial-subtitle">
        What our users say about Rapid-X ride booking service
      </p>

      <div className="testimonial-cards">

        <div className="testimonial-card">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="testimonial-img"
          />

          <p className="testimonial-text">
            “Rapid-X makes travelling extremely easy. Booking rides is fast
            and drivers are always professional.”
          </p>

          <h3 className="testimonial-name">Arjun K</h3>
          <span className="testimonial-role">Regular Rider</span>
        </div>

        <div className="testimonial-card">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="user"
            className="testimonial-img"
          />

          <p className="testimonial-text">
            “Very reliable platform. The interface is simple and the pricing
            is transparent. Highly recommended!”
          </p>

          <h3 className="testimonial-name">Karthik R</h3>
          <span className="testimonial-role">Daily Commuter</span>
        </div>

        <div className="testimonial-card">
          <img
            src="https://randomuser.me/api/portraits/men/65.jpg"
            alt="user"
            className="testimonial-img"
          />

          <p className="testimonial-text">
            “Fast pickups and smooth rides every time. Rapid-X has completely
            changed my travel experience.”
          </p>

          <h3 className="testimonial-name">Prabhu S</h3>
          <span className="testimonial-role">Business Traveler</span>
        </div>

      </div>

    </div>
  );
}

export default Testimonials;