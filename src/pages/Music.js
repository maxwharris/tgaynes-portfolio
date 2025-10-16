import React, { useState } from 'react';
import { getDiscographyData } from '../utils/csvParser';
import AudioVisualizer from '../components/AudioVisualizer';

function Music() {
  const discographyData = getDiscographyData();
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Audio files and their corresponding presets
  const tracks = [
    { file: '1.wav', preset: 'electronic', name: 'Track 1' },
    { file: '2.wav', preset: 'ambient', name: 'Track 2' },
    { file: '3.wav', preset: 'pop', name: 'Track 3' },
    { file: '4.wav', preset: 'rock', name: 'Track 4' },
    { file: '5.wav', preset: 'electronic', name: 'Track 5' }
  ];

  return (
    <div className="page">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Music</h1>
        <p className="page-subtitle">Music production and audio visualization</p>
      </div>

      {/* Audio Visualizer Section */}

        <div className="audio-visualizer-section">
          {/* Cassette Tape Visualizer */}
          <AudioVisualizer
            tracks={tracks}
            currentTrackIndex={selectedTrack}
            onTrackChange={setSelectedTrack}
            height={350}
            className="cassette-player"
          />
        </div>
     

      {/* Original Discography Section (fallback) */}
      <div className="card">
        <div className="discography-section">
          <h3>Complete Discography</h3>
          <div className="discography-list">
            {discographyData.map((item, index) => (
              <div key={index} className="discography-item">
                <div className="discography-info">
                  <h4>{item.Title}</h4>
                  <p>{item.Artist} • {item.Year} • {item.Genre}</p>
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                    {item.Description}
                  </p>
                </div>
                <a
                  href={item.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  Listen on SoundCloud
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Works Section */}
      <div className="card">
        <div className="other-works-section">
          <h3>Other Works</h3>
          <div className="video-grid">
            <div className="video-wrapper">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/P3wJe6OwCRM"
                  title="Original Music Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-description">Original music</div>
            </div>
            <div className="video-wrapper">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/xdTu_gU24_I"
                  title="Original Music Video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-description">Original music</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
