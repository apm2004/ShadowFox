import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Adithya Pramod Menon</span>
          </h1>
          <h2 className="hero-subtitle">Computer Science Student & Cybersecurity Enthusiast</h2>
          <p className="hero-description">
            A Computer Science student at CUSAT, passionate about cybersecurity and space technology.
            I thrive on exploring the intersection of technology and innovation, aiming to contribute
            to advancements in these fields.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-placeholder"></div>
        </div>
      </section>

      <section className="featured-skills">
        <h3>Core Competencies</h3>
        <div className="skills-grid">
          <div className="skill-card">
            <i className="fas fa-shield-alt"></i>
            <span>Cybersecurity</span>
          </div>
          <div className="skill-card">
            <i className="fas fa-space-shuttle"></i>
            <span>Space Tech</span>
          </div>
          <div className="skill-card">
            <i className="fas fa-brain"></i>
            <span>BCI Research</span>
          </div>
          <div className="skill-card">
            <i className="fas fa-code"></i>
            <span>Programming</span>
          </div>
        </div>
      </section>

      <section className="quick-links">
        <div className="links-grid">
          <Link to="/about" className="link-card">
            <i className="fas fa-user-graduate"></i>
            <h4>Education</h4>
            <p>BTech in Computer Science at CUSAT</p>
          </Link>
          <Link to="/projects" className="link-card">
            <i className="fas fa-project-diagram"></i>
            <h4>Research</h4>
            <p>Brain-Computer Interface at IIST</p>
          </Link>
          <Link to="/activities" className="link-card">
            <i className="fas fa-users"></i>
            <h4>Leadership</h4>
            <p>IEEE & IRES SEDS CUSAT</p>
          </Link>
          <Link to="/contact" className="link-card">
            <i className="fas fa-envelope"></i>
            <h4>Contact</h4>
            <p>Let's connect and collaborate</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 