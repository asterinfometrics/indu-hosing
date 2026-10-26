import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroVector from '../../../assets/partner/hero-vector.svg';
import './PartnerHero.css';
import Image from 'next/image';
export const PartnerHero: React.FC = () => {
  return (
    <section className="partner-hero-section">
      {/* Background Vector Graphic */}
      <div className="partner-hero-vector-wrapper" aria-hidden="true">
        <Image
          src={heroVector}
          alt=""
          className="partner-hero-vector"
        />
        <div className="partner-hero-gradient-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="partner-hero-nav-wrapper">
        <Navbar activePage="partner" />
      </div>

      {/* Centered Foreground Hero Content */}
      <div className="partner-hero-content">
        <h1 className="partner-hero-title">
          Your Old Home Deserves<br />
          a New Life.
        </h1>

        <p className="partner-hero-subtitle">
          Rebuild your aging property into something modern and larger — without funding the construction yourself.
        </p>

        <a href="#rd-partner-form" className="btn-primary-white partner-hero-btn">
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
    </section>
  );
};

export default PartnerHero;
