import React from 'react';
import Link from 'next/link';
import aboutHeroImg from '../../../assets/about-us/about-hero.webp';
import cpVector from '../../../assets/about-us/cp-vector.svg';
import yotVector from '../../../assets/about-us/yot-vector.svg';
import './AboutHero.css';
import Image from 'next/image';

export const AboutHero: React.FC = () => {
  return (
    <section className="about-hero-section">
      <div className="about-hero-container">
        <div className="about-hero-grid">
          {/* Left Column: Heading, Subtitle & Call-to-Action */}
          <div className="about-hero-left">
            <div className="about-hero-badge">
              <span className="about-hero-badge-dot" aria-hidden="true" />
              <span>About Indu Housing</span>
            </div>

            <h1 className="about-hero-title">
              A Chennai<br />
              construction<br />
              company built on<br />
              trust, not pressure
            </h1>

            <p className="about-hero-description">
              Since 2000, we've delivered villas, houses and apartments across Chennai on one principle: honest advice, not hard selling.
            </p>

            <Link href="/contact" className="btn-primary-blue about-hero-btn">
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
            </Link>
          </div>

          {/* Right Column: Hero Image & 2 Stat Cards */}
          <div className="about-hero-right">
            {/* Top Large Hero Image */}
            <div className="about-hero-image-card">
              <Image
                src={aboutHeroImg}
                alt="Indu Housing modern residential building"
                className="about-hero-img"
              />
            </div>

            {/* Bottom 2-Card Row */}
            <div className="about-hero-stats-row">
              {/* Blue Card: Completed Projects */}
              <div className="about-stat-card-blue">
                <div className="about-stat-top">
                  <span className="about-stat-heading-white">Completed projects</span>
                </div>
                <div className="about-stat-bottom">
                  <div className="about-stat-number-white">39+</div>
                  <div className="about-stat-desc-white">
                    Villas, houses and apartments delivered across Chennai.
                  </div>
                </div>
                <Image
                  src={cpVector}
                  alt=""
                  className="about-stat-vector about-stat-vector-cp"
                  aria-hidden="true"
                />
              </div>

              {/* White Card: Years of Trust */}
              <div className="about-stat-card-white">
                <div className="about-stat-top">
                  <span className="about-stat-heading-dark">Years of trust</span>
                </div>
                <div className="about-stat-bottom">
                  <div className="about-stat-number-dark">25+</div>
                  <div className="about-stat-desc-dark">
                    Hands-on construction knowledge since 2000.
                  </div>
                </div>
                <Image
                  src={yotVector}
                  alt=""
                  className="about-stat-vector about-stat-vector-yot"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
