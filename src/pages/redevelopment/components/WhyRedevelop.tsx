import React from 'react';
import whyRedevelopImg from '../../../assets/partner/why-redevelop.webp';
import './WhyRedevelop.css';
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

export const WhyRedevelop: React.FC = () => {
  return (
    <section className="why-redevelop-section">
      <div className="why-redevelop-container">
        {/* Top Badge & Divider Line Row */}
        <div className="why-redevelop-badge-row">
          <div className="why-redevelop-badge">
            <span className="why-redevelop-badge-dot" aria-hidden="true" />
            <span>Why redevelop with Indu Housing</span>
          </div>
          <div className="why-redevelop-badge-line" aria-hidden="true" />
        </div>

        {/* Top Header Row */}
        <div className="why-redevelop-header">
          {/* Left Title Group */}
          <div className="why-redevelop-header-left">
            <h2 className="why-redevelop-title">
              Your Old Property,<br />
              Rebuilt Right
            </h2>
          </div>

          {/* Right Description & CTA */}
          <div className="why-redevelop-header-right">
            <p className="why-redevelop-subtitle">
              Honest guidance and quality construction - turning aging, underused properties into modern homes you can verify every step of the way.
            </p>
            <a href="#rd-partner-form" className="btn-primary-blue why-redevelop-cta-btn">
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

        {/* Bottom Content Grid: Left Image + Right 2x2 Stats Grid */}
        <div className="why-redevelop-grid">
          {/* Left Image Card */}
          <div className="why-redevelop-image-card">
            <Image
              src={whyRedevelopImg}
              alt="Modern luxury rebuilt home living room by Indu Housing"
              className="why-redevelop-img"
            />
          </div>

          {/* Right 2x2 Stats Cards */}
          <div className="why-redevelop-stats-grid">
            {stats.map((item, index) => (
              <div key={index} className="why-redevelop-stat-card">
                <div className="why-redevelop-stat-number">{item.number}</div>
                <div className="why-redevelop-stat-info">
                  <h3 className="why-redevelop-stat-title">{item.title}</h3>
                  <p className="why-redevelop-stat-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRedevelop;
