import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    // For now, we'll just show an alert
    alert('Thank you for your message! This is a demo form - in a real application, this would be submitted to a server.');
  };

  return (
    <div className="page">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Contact</h1>
        <p className="page-subtitle">Get in touch for collaborations and inquiries</p>
      </div>

      {/* Two Column Layout */}
      <div className="contact-layout">
        {/* Left Column - Contact Form */}
        <div className="contact-form-container">
          <div className="contact-form-card">
            <p className="contact-intro">
              Interested in working together? Send me a message and I'll get back to you soon.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* CAPTCHA v2 placeholder */}
              <div className="form-group">
                <div className="captcha-container">
                  <div className="captcha-placeholder">
                    <p>CAPTCHA v2 Verification</p>
                    <div className="captcha-widget">
                      [CAPTCHA Widget Placeholder]
                    </div>
                    <small>In production, integrate with reCAPTCHA v2</small>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ textAlign: 'center' }}>
                <button type="submit" className="btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Other Ways to Connect */}
        <div className="contact-info-container">
          <div className="contact-info-card">
            <h3 className="contact-info-title">Other Ways to Connect</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">your.email@example.com</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Your City, State</div>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="contact-profile">
              <img
                src="/media/images/profile.jpg"
                alt="Profile"
                className="contact-profile-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik01MCAxMjBDNTAgMTAwIDUwIDgwIDc1IDgwQzk5IDgwIDEwMCA5NSA5OSAxMjAiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
