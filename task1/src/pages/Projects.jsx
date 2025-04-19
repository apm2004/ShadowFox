import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  return (
    <div className="projects">
      <section className="projects-hero">
        <h1>Research & Projects</h1>
        <p className="projects-intro">
          Exploring the frontiers of technology through research and innovative projects
          in cybersecurity, space technology, and brain-computer interfaces.
        </p>
      </section>

      <section className="featured-research">
        <h2>Featured Research</h2>
        <div className="research-card">
          <div className="research-header">
            <i className="fas fa-brain"></i>
            <h3>Brain-Computer Interface Research</h3>
          </div>
          <div className="research-content">
            <p className="institution">Indian Institute of Space Science and Technology (IIST), Trivandrum</p>
            <ul className="research-details">
              <li>Collaborated with Dr. B.S. Manoj on BCI research</li>
              <li>Explored neural signal processing and computing integration</li>
              <li>Publication: "IIST BCI Dataset-7 for Human Space Missions" on TechRxiv</li>
            </ul>
            <div className="research-links">
              <a href="https://techrxiv.org/turn0search0" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                View Publication
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="technical-projects">
        <h2>Technical Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Cybersecurity Projects</h3>
            <ul>
              <li>Network Security Analysis</li>
              <li>Ethical Hacking Simulations</li>
              <li>Security Protocol Implementation</li>
            </ul>
          </div>
          <div className="project-card">
            <div className="project-icon">
              <i className="fas fa-space-shuttle"></i>
            </div>
            <h3>Space Technology</h3>
            <ul>
              <li>Satellite Communication Systems</li>
              <li>Space Mission Planning</li>
              <li>Remote Sensing Applications</li>
            </ul>
          </div>
          <div className="project-card">
            <div className="project-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3>Software Development</h3>
            <ul>
              <li>Web Application Development</li>
              <li>Database Management Systems</li>
              <li>Algorithm Implementation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="publications">
        <h2>Publications & Presentations</h2>
        <div className="publications-list">
          <div className="publication-item">
            <h3>IIST BCI Dataset-7 for Human Space Missions</h3>
            <p className="venue">TechRxiv</p>
            <p className="authors">In collaboration with Dr. B.S. Manoj</p>
            <a href="https://techrxiv.org/turn0search0" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Read Paper
            </a>
          </div>
        </div>
      </section>

      <section className="research-interests">
        <h2>Research Interests</h2>
        <div className="interests-grid">
          <div className="interest-card">
            <i className="fas fa-brain"></i>
            <h3>Brain-Computer Interfaces</h3>
            <p>Exploring the integration of neural signals with computing systems</p>
          </div>
          <div className="interest-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Cybersecurity</h3>
            <p>Investigating advanced security protocols and ethical hacking methodologies</p>
          </div>
          <div className="interest-card">
            <i className="fas fa-rocket"></i>
            <h3>Space Technology</h3>
            <p>Researching applications of technology in space exploration and missions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects; 