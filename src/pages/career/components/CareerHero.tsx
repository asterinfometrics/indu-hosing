import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroVector from '../../../assets/career/career-hero-vector.svg';
import './CareerHero.css';
import Image from 'next/image';

export const CareerHero: React.FC = () => {
  return (
    <section className="Career-hero-section">
      {/* Background Vector Graphic */}
      <div className="Career-hero-vector-wrapper" aria-hidden="true">
        <Image
          src={heroVector}
          alt=""
          className="Career-hero-vector"
        />
        <div className="Career-hero-gradient-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="Career-hero-nav-wrapper">
        <Navbar activePage="Career" />
      </div>

      {/* Centered Foreground Hero Content */}
      <div className="Career-hero-content">
        <h1 className="Career-hero-title">
          Build Chennai&apos;s<br />
          skyline with us.
        </h1>

        <p className="Career-hero-subtitle">
          A growing team of architects, engineers and project managers, based in Besant<br className="Career-subtitle-break" />
          Nagar, building homes across Chennai since 2000.
        </p>

        <a href="#openings" className="Career-hero-btn">
          <span>Apply Now</span>
          <span className="Career-hero-btn-icon">
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
