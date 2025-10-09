import React, { useState, useEffect, useRef } from 'react';
import { getBioContent } from '../utils/csvParser';

function Home() {
  const [bioContent, setBioContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
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

    // Auto-play background music with fallback
    const initAudio = async () => {
      try {
        if (audioRef.current) {
          // Set audio properties
          audioRef.current.volume = 0.3; // Lower volume for background music
          audioRef.current.loop = true;

          // Attempt to play
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Autoplay prevented by browser - showing play button');
        setShowPlayButton(true);
      }
    };

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(initAudio, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayMusic = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Lower volume for background music
        await audioRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div className="page">
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

      {/* Music Play Button - shows when autoplay is blocked */}
      {showPlayButton && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <button
            onClick={handlePlayMusic}
            style={{
              background: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#357ABD';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4A90E2';
              e.target.style.transform = 'scale(1)';
            }}
            title="Play background music"
          >
            ▶
          </button>
        </div>
      )}

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
