import React from 'react';
import ResumeCard from '../components/ResumeCard';

function Resume() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Resume</h1>
        <p className="page-subtitle">Professional experience and technical skills</p>
      </div>

      <div className="resume-wrapper">
        <ResumeCard />
      </div>
    </div>
  );
}

export default Resume;
