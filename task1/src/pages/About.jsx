import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="about-intro">
          I'm a third-year BTech student specializing in Computer Science and Engineering at Cochin University 
          of Science and Technology (CUSAT). My interests lie in cybersecurity, ethical hacking, and space systems. 
          I actively engage in research and projects that bridge these domains.
        </p>
      </section>

      <section className="education">
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>BTech in Computer Science and Engineering</h3>
              <p className="institution">CUSAT</p>
              <p className="period">2022–Present</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Higher Secondary (XII)</h3>
              <p className="institution">CBSE – Kerala</p>
              <p className="period">2020–2022</p>
              <p className="achievement">91.2%</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Secondary School (X)</h3>
              <p className="institution">CBSE – Kerala</p>
              <p className="period">2019–2020</p>
              <p className="achievement">96.4%</p>
              <p className="award">Awarded CBSE Certificate of Merit for Outstanding Academic Performance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skills-category">
            <h3>Technical Skills</h3>
            <ul>
              <li>Programming: C, C++, Java, Python, HTML</li>
              <li>Database: MySQL</li>
              <li>Tools: Canvas</li>
              <li>Concepts: Algorithms, Neural Signal Processing</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>Soft Skills</h3>
            <ul>
              <li>Teamwork</li>
              <li>Time Management</li>
              <li>Effective Communication</li>
              <li>Critical Thinking</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="certifications">
        <h2>Certifications</h2>
        <div className="cert-grid">
          <div className="cert-card">
            <i className="fas fa-certificate"></i>
            <h3>Introduction to Cybersecurity</h3>
            <p>Cisco Networking Academy</p>
          </div>
          <div className="cert-card">
            <i className="fas fa-medal"></i>
            <h3>Data Mining</h3>
            <p>NPTEL (IIT Kharagpur)</p>
            <p className="achievement">Top 5% (Silver Medal)</p>
          </div>
        </div>
      </section>

      <section className="activities">
        <h2>Activities & Leadership</h2>
        <div className="activities-grid">
          <div className="activity-card">
            <i className="fas fa-users"></i>
            <h3>Chair</h3>
            <p>IEEE Computer Society – CUSAT Student Branch Chapter</p>
            <p className="period">2024–Present</p>
            <p>Leading technical events, workshops, and member engagement initiatives.</p>
          </div>
          <div className="activity-card">
            <i className="fas fa-rocket"></i>
            <h3>Event Lead</h3>
            <p>IRES SEDS CUSAT</p>
            <p className="period">2024–Present</p>
            <p>Organizing space-related outreach and technical events, including SpaceU CUSAT.</p>
          </div>
          <div className="activity-card">
            <i className="fas fa-laptop-code"></i>
            <h3>Workshops & Hackathons</h3>
            <ul>
              <li>Completed workshop on CTF and Ethical Hacking by FSS CT</li>
              <li>Participated in FOSS Hack 2025, a national open-source hackathon</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 