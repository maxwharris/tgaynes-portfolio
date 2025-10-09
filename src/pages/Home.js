import React from 'react';
import { getBioContent } from '../utils/csvParser';

function Home() {
  const bioContent = getBioContent();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Welcome</h1>
        <p className="page-subtitle">Music Producer & Audio Engineer</p>
      </div>

      <div className="card">
        <div className="bio-content">
          <div className="bio-text">
            <div style={{ whiteSpace: 'pre-line' }}>
              {bioContent}
            </div>
          </div>
          <img
            src="/media/images/profile.jpg"
            alt="Profile"
            className="headshot"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNNjAgMTgwQzYwIDE1MCA5MCAxMjAgMTIwIDEyMEMxNTAgMTIwIDE4MCAxNTAgMTgwIDE4MCIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
