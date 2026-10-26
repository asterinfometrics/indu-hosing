'use client';

import React from 'react';
import Image from 'next/image';

import vmImg1 from '../assets/home/vm-1.webp';
import vmImg2 from '../assets/home/vm-2.webp';
import vmIcon1 from '../assets/home/vm-icon-1.svg';
import vmIcon2 from '../assets/home/vm-icon-2.svg';
import vmIcon3 from '../assets/home/vm-icon-3.svg';
import vmBgPattern from '../assets/home/vm-bg-pattern.svg';

import './VisionMission.css';

export const VisionMission = () => {
  return (
    <section className="vm-section" id="vision-mission">
      <div className="vm-container">
        {/* Section Header */}
        <div className="vm-header">
          <div className="vm-tag">
            <span className="vm-tag-square" aria-hidden="true" />
            <span className="vm-tag-text">Vision &amp; mission</span>
          </div>

          <h2 className="vm-title">
            We turn your ideas into homes
            <br />
            built with honesty, and made to last.
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="vm-grid">
          {/* Column 1: Vision Card */}
          <div className="vm-card vm-vision-card">
            <div className="vm-vision-content">
              <h3 className="vm-card-title">Vision</h3>

              <p className="vm-card-description">
                To be Chennai&apos;s most trusted name in home construction not
                the loudest voice in the market, but the one families remember
                for honest advice, dependable craftsmanship, and homes that
                stand strong long after the sale is done. Every project we take
                on is a chance to earn that trust again.
              </p>
            </div>

            <div className="vm-image-container vm-image-box-1">
              <Image
                src={vmImg1}
                alt="Balcony ocean view at sunset"
                className="vm-image"
                width={vmImg1.width}
                height={vmImg1.height}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="vm-image-gradient-top" />

              <div className="vm-image-overlay-text-top">
                <h4>
                  Building Chennai&apos;s future,
                  <br />
                  one home at a time
                </h4>
              </div>
            </div>
          </div>

          {/* Column 2: Center Feature Image Card */}
          <div className="vm-card vm-center-feature-card">
            <Image
              src={vmImg2}
              alt="Built with integrity - Modern luxury residence"
              className="vm-image vm-center-image"
              width={vmImg2.width}
              height={vmImg2.height}
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="vm-center-gradient-bottom" />

            <div className="vm-center-overlay-content">
              <h3 className="vm-center-title">Built with integrity</h3>
              <p className="vm-center-subtitle">Honest advice, always.</p>
            </div>
          </div>

          {/* Column 3: Mission Card */}
          <div className="vm-card vm-mission-card">
            <h3 className="vm-card-title">Mission</h3>

            <div className="vm-mission-features">
              {/* Feature 1 */}
              <div
                className="vm-feature-item"
                style={
                  {
                    '--pattern-url': `url("${vmBgPattern.src}")`,
                  } as React.CSSProperties
                }
              >
                <div className="vm-feature-pattern" aria-hidden="true" />

                <div className="vm-feature-content">
                  <div className="vm-feature-icon-wrapper">
                    <Image
                      src={vmIcon1}
                      alt=""
                      className="vm-feature-icon"
                      width={vmIcon1.width}
                      height={vmIcon1.height}
                    />
                  </div>

                  <h4 className="vm-feature-title">People first</h4>

                  <p className="vm-feature-description">
                    We build relationships as strong as our homes — honest
                    advice over hard selling, every time.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div
                className="vm-feature-item"
                style={
                  {
                    '--pattern-url': `url("${vmBgPattern.src}")`,
                  } as React.CSSProperties
                }
              >
                <div className="vm-feature-pattern" aria-hidden="true" />

                <div className="vm-feature-content">
                  <div className="vm-feature-icon-wrapper">
                    <Image
                      src={vmIcon2}
                      alt=""
                      className="vm-feature-icon"
                      width={vmIcon2.width}
                      height={vmIcon2.height}
                    />
                  </div>

                  <h4 className="vm-feature-title">Proven process</h4>

                  <p className="vm-feature-description">
                    From consultation to handover, our disciplined process
                    keeps every project on time and on track.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div
                className="vm-feature-item"
                style={
                  {
                    '--pattern-url': `url("${vmBgPattern.src}")`,
                  } as React.CSSProperties
                }
              >
                <div className="vm-feature-pattern" aria-hidden="true" />

                <div className="vm-feature-content">
                  <div className="vm-feature-icon-wrapper">
                    <Image
                      src={vmIcon3}
                      alt=""
                      className="vm-feature-icon vm-feature-icon-wide"
                      width={vmIcon3.width}
                      height={vmIcon3.height}
                    />
                  </div>

                  <h4 className="vm-feature-title">Modern technology</h4>

                  <p className="vm-feature-description">
                    Modern construction methods and high-quality materials,
                    built to stand the test of time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
