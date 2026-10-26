import React from 'react';
import './OurJourney.css';

interface Milestone {
  title: string;
  period: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    title: 'Where it started',
    period: '2000',
    description: "Shri S.P. Babu Vijay founded Indu Housing on one principle: honest advice over hard selling. 25+ Years later, that principle hasn't changed."
  },
  {
    title: 'Homes across the City',
    period: '2000 – Today',
    description: '39 residential projects delivered across Chennai: villas, individual houses and apartments. Each one is planned and built with our in-house civil engineers and architects.'
  },
  {
    title: 'Indu Coral, Besant Nagar',
    period: 'Ongoing, 2026',
    description: "TNRERA-registered, 40 residences in Besant Nagar — our current project on Chennai's coast. Stilt + 5 floors, with 2 and 3 BHK homes built for coastal living."
  }
];

export const OurJourney: React.FC = () => {
  return (
    <section className="our-journey-section">
      <div className="our-journey-container">
        {/* Top Badge */}
        <div className="our-journey-badge">
          <span className="our-journey-badge-dot" aria-hidden="true" />
          <span>Our journey</span>
        </div>

        {/* 2-Column Content Grid */}
        <div className="our-journey-grid">
          {/* Left Column: Outer Tinted Container with 3 Cards */}
          <div className="our-journey-left">
            <div className="our-journey-card-tray">
              {milestones.map((item, index) => (
                <div key={index} className="our-journey-card">
                  <div className="our-journey-card-header">
                    <span className="our-journey-card-title">{item.title}</span>
                    <span className="our-journey-card-period">{item.period}</span>
                  </div>
                  <p className="our-journey-card-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Subtitle, and CTA Button */}
          <div className="our-journey-right">
            <h2 className="our-journey-heading">
              Two decades of building, one story worth telling
            </h2>

            <p className="our-journey-subtext">
              From a single promise in 2000 to a TNRERA-registered project on Chennai's coast today.
            </p>

            <a href="#contact" className="btn-primary-blue our-journey-cta-btn">
              <span>Schedule a Call</span>
              <span className="btn-icon-box">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
