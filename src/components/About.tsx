'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import aboutImg1 from '../assets/home/about-1.webp';
import aboutImg2 from '../assets/home/about-2.webp';
import aboutImg3 from '../assets/home/about-3.webp';
import bgPattern from '../assets/home/about-bg-pattern.svg';

import './About.css';

export const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Top Header Section */}
        <div className="about-header">
          <div className="about-tag">
            <span
              className="about-tag-square"
              aria-hidden="true"
            />
            <span className="about-tag-text">
              About Indu Housing
            </span>
          </div>

          <div className="about-header-content">
            <h2 className="about-title">
              Indu Housing is a Chennai builder trusted for
              craftsmanship, transparency, and 39 homes delivered
            </h2>

            <p className="about-description">
              With a strong presence in competitive markets, our team
              of experienced advisors understands that real estate is
              more than a transaction — it is a long-term investment
              and a life decision. That is why we focus on transparency,
              accuracy, and tailored solutions for every client.
            </p>

            <Link href="/about" className="btn-secondary about-cta-btn">
              More About Us
            </Link>
          </div>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="about-grid">

          {/* Column 1: Image Top, Stat Bottom */}
          <div className="about-column">
            <div className="about-image-card">
              <Image
                src={aboutImg1}
                alt="Indu Housing Premium Apartment Exterior"
                className="about-image"
                width={aboutImg1.width}
                height={aboutImg1.height}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div
              className="about-stat-card"
              style={
                {
                  '--pattern-url': `url("${bgPattern.src}")`,
                } as React.CSSProperties
              }
            >
              <div
                className="about-stat-pattern"
                aria-hidden="true"
              />

              <div className="about-stat-content">
                <span className="about-stat-number">
                  3.75L+
                </span>
                <span className="about-stat-label">
                  Sq. Ft. Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Stat Top, Image Bottom */}
          <div className="about-column about-column-reverse-mobile">
            <div
              className="about-stat-card"
              style={
                {
                  '--pattern-url': `url("${bgPattern.src}")`,
                } as React.CSSProperties
              }
            >
              <div
                className="about-stat-pattern"
                aria-hidden="true"
              />

              <div className="about-stat-content">
                <span className="about-stat-number">
                  39
                </span>
                <span className="about-stat-label">
                  Projects Completed
                </span>
              </div>
            </div>

            <div className="about-image-card">
              <Image
                src={aboutImg2}
                alt="Luxury Modern Interior Living Space"
                className="about-image"
                width={aboutImg2.width}
                height={aboutImg2.height}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Column 3: Image Top, Stat Bottom */}
          <div className="about-column">
            <div className="about-image-card">
              <Image
                src={aboutImg3}
                alt="Coral Luxury Living with EV Charging"
                className="about-image"
                width={aboutImg3.width}
                height={aboutImg3.height}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div
              className="about-stat-card"
              style={
                {
                  '--pattern-url': `url("${bgPattern.src}")`,
                } as React.CSSProperties
              }
            >
              <div
                className="about-stat-pattern"
                aria-hidden="true"
              />

              <div className="about-stat-content">
                <span className="about-stat-number">
                  25+
                </span>
                <span className="about-stat-label">
                  Years of Trust Since 2000
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;