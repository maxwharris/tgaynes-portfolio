import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>TRUMAN</h1>
          <p>Music Producer</p>
        </div>
        <div className="navbar-nav">
          <Link
            to="/"
            className={`navbar-item ${activeTab === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/music"
            className={`navbar-item ${activeTab === '/music' ? 'active' : ''}`}
          >
            Music
          </Link>
          <Link
            to="/experiences"
            className={`navbar-item ${activeTab === '/experiences' ? 'active' : ''}`}
          >
            Experiences
          </Link>
          <Link
            to="/contact"
            className={`navbar-item ${activeTab === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
