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
      <div className="page-header">
        <h1 className="page-title">Contact</h1>
        <p className="page-subtitle">Get in touch for collaborations and inquiries</p>
      </div>

      <div className="card">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>
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
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #dee2e6'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '10px', color: '#666' }}>
                    CAPTCHA v2 Verification
                  </p>
                  <div style={{
                    width: '200px',
                    height: '60px',
                    backgroundColor: '#fff',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: '14px',
                    color: '#999'
                  }}>
                    [CAPTCHA Widget Placeholder]
                  </div>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                    In production, integrate with reCAPTCHA v2
                  </p>
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

      {/* Contact Information */}
      <div className="card">
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#000' }}>
          Other Ways to Connect
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4A90E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}>
              ✉️
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#000' }}>Email</div>
              <div style={{ color: '#666' }}>your.email@example.com</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4A90E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}>
              📱
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#000' }}>Phone</div>
              <div style={{ color: '#666' }}>+1 (555) 123-4567</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4A90E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}>
              📍
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#000' }}>Location</div>
              <div style={{ color: '#666' }}>Your City, State</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
