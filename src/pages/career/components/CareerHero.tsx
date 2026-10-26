import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroVector from '../../../assets/career/career-hero-vector.svg';
import './CareerHero.css';
import Image from 'next/image';

export const CareerHero: React.FC = () => {
  return (
    <section className="career-hero-section">
      {/* Background Vector Graphic */}
      <div className="career-hero-vector-wrapper" aria-hidden="true">
        <Image
          src={heroVector}
          alt=""
          className="career-hero-vector"
        />
        <div className="career-hero-gradient-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="career-hero-nav-wrapper">
        <Navbar activePage="career" />
      </div>

      {/* Centered Foreground Hero Content */}
      <div className="career-hero-content">
        <h1 className="career-hero-title">
          Build Chennai&apos;s<br />
          skyline with us.
        </h1>

        <p className="career-hero-subtitle">
          A growing team of architects, engineers and project managers, based in Besant<br className="career-subtitle-break" />
          Nagar, building homes across Chennai since 2003.
        </p>

        <a href="#openings" className="career-hero-btn">
          <span>Apply Now</span>
          <span className="career-hero-btn-icon">
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
    </section>
  );
};

export default CareerHero;
