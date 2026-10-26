import React from 'react';
import { Navbar } from '../../../components/Navbar';
import heroVector from '../../../assets/contact/hero-vector.svg';
import './ContactHero.css';
import Image from 'next/image';

export const ContactHero: React.FC = () => {
  return (
    <section className="contact-hero-section">
      {/* Background Vector Graphic */}
      <div className="contact-hero-vector-wrapper" aria-hidden="true">
        <Image
          src={heroVector}
          alt=""
          className="contact-hero-vector"
        />
        <div className="contact-hero-gradient-overlay" />
      </div>

      {/* Floating Navbar */}
      <div className="contact-hero-nav-wrapper">
        <Navbar />
      </div>

      {/* Centered Foreground Hero Content */}
      <div className="contact-hero-content">
        <h1 className="contact-hero-title">
          Let's talk about<br />
          your next home
        </h1>

        <p className="contact-hero-subtitle">
          Whether you're exploring a home, checking on Indu Coral, or just have a question — reach out and get a straight answer from our team, not a script.
        </p>

        <a href="#contact-form" className="btn-primary-white contact-hero-btn">
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

export default ContactHero;
