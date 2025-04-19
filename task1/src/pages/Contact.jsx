import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p className="contact-intro">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </section>

      <section className="contact-info">
        <div className="info-grid">
          <div className="info-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <a href="mailto:adithya.menon@gmail.com">adithya.menon@gmail.com</a>
          </div>
          <div className="info-card">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <a href="tel:+9174617849">+91 746 178 49</a>
          </div>
          <div className="info-card">
            <i className="fab fa-linkedin"></i>
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/adithya-p-menon/" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/adithya-p-menon
            </a>
          </div>
          <div className="info-card">
            <i className="fab fa-github"></i>
            <h3>GitHub</h3>
            <a href="https://github.com/apm2004" target="_blank" rel="noopener noreferrer">
              github.com/apm2004
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </section>

      <section className="social-links">
        <h2>Connect with Me</h2>
        <div className="social-grid">
          <a href="https://www.linkedin.com/in/adithya-p-menon/" className="social-card" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/apm2004" className="social-card" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a href="mailto:adithya.menon@gmail.com" className="social-card">
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact; 