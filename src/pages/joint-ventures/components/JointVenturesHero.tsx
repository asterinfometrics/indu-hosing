import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroVector from '../../../assets/joint-ventures/hero-vector.svg';
import './JointVenturesHero.css';
import Image from 'next/image';
export const JointVenturesHero: React.FC = () => {
  return (
    <section className="jv-hero-section">
      {/* Background Vector Graphic */}
      <div className="jv-hero-vector-wrapper" aria-hidden="true">
        <Image
          src={heroVector}
          alt=""
          className="jv-hero-vector"
        />
        <div className="jv-hero-gradient-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="jv-hero-nav-wrapper">
        <Navbar activePage="partner" />
      </div>

      {/* Centered Foreground Hero Content */}
      <div className="jv-hero-content">
        <h1 className="jv-hero-title">
          Let's Talk About<br />
          Your Land
        </h1>

        <p className="jv-hero-subtitle">
          Whether you're exploring a Joint Venture, considering Redevelopment, or just want to
          understand how it works — talk to our team and get a straight answer, not a sales pitch.
        </p>

        <a href="#jv-partner-form" className="btn-primary-white jv-hero-btn">
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
    </section>
  );
};

export default JointVenturesHero;
