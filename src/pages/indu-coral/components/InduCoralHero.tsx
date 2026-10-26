import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroBgImg from '../../../assets/indu-coral/hero-bg.webp';
import './InduCoralHero.css';
import Image from 'next/image';

export const InduCoralHero: React.FC = () => {
  return (
    <section className="indu-coral-hero-section">
      {/* Background Image Container with Gradient Overlay */}
      <div className="indu-coral-hero-bg-wrapper">
        <Image
          src={heroBgImg}
          alt="Indu Coral residential building in Besant Nagar at sunset"
          className="indu-coral-hero-bg-img"
        />
        <div className="indu-coral-hero-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="indu-coral-hero-nav-wrapper">
        <Navbar activePage="projects" />
      </div>

      {/* Hero Bottom Content */}
      <div className="indu-coral-hero-container">
        {/* Top Content Row: Title on Left & Description on Right */}
        <div className="indu-coral-hero-top-row">
          <div className="indu-coral-hero-title-col">
            <h1 className="indu-coral-hero-title">
              Indu Coral – homes on<br />
              Besant Nagar's coast
            </h1>
          </div>

          <div className="indu-coral-hero-desc-col">
            <p className="indu-coral-hero-desc">
              40 residences, 2 and 3 BHK, from 1,030 to 1,800 sq. ft. TNRERA
              registered, built by the team behind 39 completed projects across
              Chennai.
            </p>

            {/* Mobile Badges: directly below description content */}
            <div className="indu-coral-hero-badges indu-coral-hero-badges-mobile">
              <div className="indu-coral-spec-badge">
                TNRERA/29/BLG/0303/2025
              </div>
              <div className="indu-coral-spec-badge">
                STILT + 5 FLOORS
              </div>
              <div className="indu-coral-spec-badge">
                2 & 3 BHK
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="indu-coral-hero-divider" aria-hidden="true" />

        {/* Bottom Actions Row: CTA Button on Left & Badges on Right */}
        <div className="indu-coral-hero-bottom-row">
          {/* Left CTA Button */}
          <div className="indu-coral-hero-cta-wrap">
            <a href="#contact" className="indu-coral-btn-cta">
              <span className="indu-coral-btn-text">Request Project Details</span>
              <span className="indu-coral-btn-icon-box">
                <svg
                  width="16"
                  height="16"
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

          {/* Right Spec Badges (Desktop) */}
          <div className="indu-coral-hero-badges indu-coral-hero-badges-desktop">
            <div className="indu-coral-spec-badge">
              TNRERA/29/BLG/0303/2025
            </div>
            <div className="indu-coral-spec-badge">
              STILT + 5 FLOORS
            </div>
            <div className="indu-coral-spec-badge">
              2 & 3 BHK
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InduCoralHero;
