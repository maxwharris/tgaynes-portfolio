import React, { useState, useEffect } from 'react';
import { getBioContent } from '../utils/csvParser';

function Home() {
  const [bioContent, setBioContent] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image">
          <img
            src="/media/images/profile.jpg"
            alt="Truman Gaynes at work"
            className="hero-img"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
            }}
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Music, Storytelling, and Sound Design</h1>
          <div className="hero-description">
            <p>I'm Truman Gaynes, a New York-based music technologist and licensing coordinator connecting sound to story across entertainment, fashion, and brands. I compose daily, edit dialogue and ADR, and manage organized delivery workflows that help creative teams move faster.</p>
          </div>
        </div>

        <div className="hero-project">
          <div className="video-showcase">
            <iframe
              src="https://www.youtube.com/embed/P3wJe6OwCRM"
              title="Portfolio Video"
              className="portfolio-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="my-story">
            <h3 className="story-title">My Story</h3>
            <div className="story-content">
              <p>My background in Music Technology and the Business of Entertainment (NYU) bridges the creative and logistical sides of sound. I've worked on dozens of original compositions, including for New York Fashion Week, interactive scores for indie games, and helping with custom pitches at Tuner Music for global brands.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="content-sections">
        <div className="section-item">
          <h3 className="section-title">education</h3>
          <p className="section-content">NYU - Music Technology, Music Business</p>
        </div>
        <div className="section-item">
          <h3 className="section-title">focus</h3>
          <p className="section-content">Composition, Licensing, Sound Design</p>
        </div>
        <div className="section-item">
          <h3 className="section-title">experience</h3>
          <p className="section-content">Turner Music, New York Fashion Week, Project Wayfarer</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
