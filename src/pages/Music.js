import React, { useState } from 'react';
import { getDiscographyData } from '../utils/csvParser';
import AudioVisualizer from '../components/AudioVisualizer';
import ResumeCard from '../components/ResumeCard';

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
        <h1 className="page-title">Work</h1>
        <p className="page-subtitle">Music production and professional experience</p>
      </div>

      {/* Audio Visualizer Section */}
      <div className="card">
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
      </div>

      {/* Resume/Experience Section */}
      <div className="card">
        <ResumeCard />
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
    </div>
  );
}

export default Music;
