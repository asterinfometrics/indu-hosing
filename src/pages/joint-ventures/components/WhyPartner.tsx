import React from 'react';
import whyPartnerImg from '../../../assets/joint-ventures/why-partner.webp';
import './WhyPartner.css';
import Image from 'next/image';

interface StatItem {
  number: string;
  title: string;
  description: string;
}

const stats: StatItem[] = [
  {
    number: '25+',
    title: 'Years of trust',
    description: 'Guiding Property Owners since 2000'
  },
  {
    number: '39',
    title: 'Projects completed',
    description: 'A verified track record across Chennai'
  },
  {
    number: '3,84,000+',
    title: 'Sq. ft. delivered',
    description: 'Real construction, real scale'
  },
  {
    number: 'TNRERA',
    title: 'Registered',
    description: 'Indu Coral is fully compliant'
  }
];

export const WhyPartner: React.FC = () => {
  return (
    <section className="why-partner-section" id="why-partner">
      <div className="why-partner-container">
        {/* Top Badge & Divider Line Row */}
        <div className="why-partner-badge-row">
          <div className="why-partner-badge">
            <span className="why-partner-badge-dot" aria-hidden="true" />
            <span>Why partner with Indu Housing</span>
          </div>
          <div className="why-partner-badge-line" aria-hidden="true" />
        </div>

        {/* Top Header Row */}
        <div className="why-partner-header">
          {/* Left Title Group */}
          <div className="why-partner-header-left">
            <h2 className="why-partner-title">
              Built on trust,<br />
              not promises
            </h2>
          </div>

          {/* Right Description & CTA */}
          <div className="why-partner-header-right">
            <p className="why-partner-subtitle">
              Honest guidance, quality construction and a track record you can verify, across every home we build.
            </p>
            <a href="#jv-partner-form" className="btn-primary-blue why-partner-cta-btn">
              <span>Schedule a Call</span>
              <span className="btn-icon-box" aria-hidden="true">
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

        {/* Bottom Content Grid: Left Image + Right 2x2 Stats Grid */}
        <div className="why-partner-grid">
          {/* Left Image Card */}
          <div className="why-partner-image-card">
            <Image
              src={whyPartnerImg}
              alt="Indu Housing luxury residential living room interior"
              className="why-partner-img"
            />
          </div>

          {/* Right 2x2 Stats Cards */}
          <div className="why-partner-stats-grid">
            {stats.map((item, index) => (
              <div key={index} className="why-partner-stat-card">
                <div className="why-partner-stat-number">{item.number}</div>
                <div className="why-partner-stat-info">
                  <h3 className="why-partner-stat-title">{item.title}</h3>
                  <p className="why-partner-stat-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;
