import React, { useState, useEffect, useRef } from 'react';
import { getBioContent } from '../utils/csvParser';

function Home() {
  const [bioContent, setBioContent] = useState('');
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadBioContent = async () => {
      try {
        const content = await getBioContent();
        setBioContent(content);
      } catch (error) {
        console.error('Error loading bio content:', error);
        setBioContent('Error loading bio content. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    loadBioContent();

    // Auto-play background music
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          // Some browsers require user interaction for autoplay
          // We'll attempt to play and handle any errors gracefully
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Autoplay was prevented by browser policy');
        // Audio will be available for user to play manually if needed
      }
    };

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(playAudio, 1000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* Hidden background music player */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/media/music/landing.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Home;
