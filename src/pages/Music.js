import React from 'react';
import { getDiscographyData } from '../utils/csvParser';

function Music() {
  const discographyData = getDiscographyData();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Music</h1>
        <p className="page-subtitle">My latest tracks and discography</p>
      </div>

      {/* SoundCloud Playlists Section */}
      <div className="card playlists-section">
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#000' }}>Featured Playlists</h3>

        {/* Placeholder SoundCloud embeds - replace with actual URLs */}
        <div className="playlist-embed">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/PLACEHOLDER_ID&color=%234A90E2&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            style={{ borderRadius: '12px' }}
          ></iframe>
        </div>

        <div className="playlist-embed">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/PLACEHOLDER_ID_2&color=%234A90E2&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            style={{ borderRadius: '12px' }}
          ></iframe>
        </div>
      </div>

      {/* Discography Section */}
      <div className="card">
        <div className="discography-section">
          <h3>Discography</h3>
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
                  Listen
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
