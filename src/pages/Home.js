import React, { useState, useEffect, useRef } from 'react';
import { getBioContent } from '../utils/csvParser';

function Home() {
  const [bioContent, setBioContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
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
  }, []);

  const handleEnterSite = async () => {
    try {
      if (audioRef.current) {
        // Set audio properties
        audioRef.current.volume = 0.3; // Lower volume for background music
        audioRef.current.loop = true;

        // Play the music - this should work because of user interaction
        await audioRef.current.play();
        setIsPlaying(true);
      }

      // Hide the overlay to reveal the site
      setShowOverlay(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      // Still hide overlay even if audio fails
      setShowOverlay(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Main site content */}
      <div
        className="page"
        style={{
          filter: showOverlay ? 'blur(2px) grayscale(50%)' : 'none',
          opacity: showOverlay ? 0.7 : 1,
          transition: 'all 0.5s ease',
          pointerEvents: showOverlay ? 'none' : 'auto'
        }}
      >
        <div className="page-header">
          <h1 className="page-title">Welcome</h1>
          <p className="page-subtitle">Music Producer & Licensing Adminstrator</p>
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

        {/* Music indicator - shows when playing */}
        {isPlaying && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'rgba(74, 144, 226, 0.9)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            ♫ Music Playing
          </div>
        )}
      </div>

      {/* Enter Site Overlay */}
      {showOverlay && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(2px)',
          animation: 'fadeIn 0.8s ease'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            maxWidth: '400px',
            padding: '40px'
          }}>
            <h1 style={{
              fontSize: '48px',
              marginBottom: '20px',
              fontWeight: '300',
              letterSpacing: '2px'
            }}>
              Welcome
            </h1>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Music Producer & Audio Portfolio
            </p>
            <button
              onClick={handleEnterSite}
              style={{
                background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '50px',
                cursor: 'pointer',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(74, 144, 226, 0.3)',
                animation: 'pulse 2s infinite'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(74, 144, 226, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.3)';
              }}
            >
              Enter Site
            </button>
          </div>
        </div>
      )}

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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default Home;
