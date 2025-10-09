import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Music from './pages/Music';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  React.useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <h1>TRUMAN</h1>
          <p>Music Producer</p>
        </div>
        <div className="nav">
          <Link
            to="/"
            className={`nav-item ${activeTab === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/music"
            className={`nav-item ${activeTab === '/music' ? 'active' : ''}`}
          >
            Music
          </Link>
          <Link
            to="/resume"
            className={`nav-item ${activeTab === '/resume' ? 'active' : ''}`}
          >
            Resume
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${activeTab === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
