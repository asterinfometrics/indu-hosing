import React from 'react';
import {
  Calendar,
} from 'lucide-react';
import faqPattern from '../../../assets/home/faq-pattern.svg';
import logoWhite from '../../../assets/logo/logo-white.png';
import './AboutInduCoral.css';
import Image from 'next/image';

interface SpecItem {
  icon: string;
  label: string;
}

const specifications: SpecItem[] = [
  { icon: '/icons/cctv.png', label: '24×7 CCTV' },
  { icon: '/icons/red-brick.png', label: 'Red brick walls' },
  { icon: '/icons/ev-charging.png', label: 'EV Charging' },
  { icon: '/icons/lift.png', label: 'Automatic lift' },
  { icon: '/icons/generator.png', label: 'Generator backup' },
  { icon: '/icons/solar-power.png', label: 'Solar power' },
  { icon: '/icons/gym.png', label: 'Gym' },
  { icon: '/icons/indoor-games.png', label: 'Indoor games' },
  { icon: '/icons/kids-play.png', label: "Kids' play area" },
  { icon: '/icons/senior-sitout.png', label: 'Senior sit-out' },
  { icon: '/icons/rooftop.png', label: 'Rooftop deck' },
  { icon: '/icons/vastu.png', label: 'Vastu compliant' },
  { icon: '/icons/rcc.png', label: 'RCC structure' },
  { icon: '/icons/parking.png', label: 'Covered parking' },
  { icon: '/icons/water-storage.png', label: 'Water storage' },
  { icon: '/icons/video-door-phone.png', label: 'Video door phone' },
  { icon: '/icons/marble-flooring.png', label: 'Italian marble flooring' },
  { icon: '/icons/teak-door.png', label: 'Teak wood main door' },
];

export const AboutInduCoral: React.FC = () => {
  return (
    <section className="about-coral-section" id="about-indu-coral">
      <div className="about-coral-container">
        {/* Left Column: About description & Specifications */}
        <div className="about-coral-left-col">
          {/* About Indu Coral info */}
          <div className="about-coral-info">
            <h2 className="about-coral-title">About Indu Coral</h2>
            <p className="about-coral-desc">
              Indu Coral is a stilt + 5 floor residential development offering 2 and 3 BHK homes from 1,030 to 1,800 sq. ft.
              Designed to be 100% Vastu compliant, every home comes with dedicated EV charging, 24×7 CCTV coverage, and access to a full rooftop amenity deck.
            </p>

            <ul className="about-coral-bullets" aria-label="Key features">
              <li>
                <span className="about-coral-bullet-square" aria-hidden="true" />
                <span>TNRERA registered — TNRERA/29/BLG/0303/2025, dated 09.09.2025</span>
              </li>
              <li>
                <span className="about-coral-bullet-square" aria-hidden="true" />
                <span>EV charging point for every apartment, individually metered</span>
              </li>
              <li>
                <span className="about-coral-bullet-square" aria-hidden="true" />
                <span>Rooftop gazebo, yoga deck, and open party area</span>
              </li>
              <li>
                <span className="about-coral-bullet-square" aria-hidden="true" />
                <span>Gym, indoor games room, kids' play area, and senior citizens' sit-out</span>
              </li>
            </ul>
          </div>

          {/* Specifications Grid */}
          <div className="about-coral-specs">
            <h3 className="about-coral-specs-title">Specification</h3>
            <div className="about-coral-specs-grid">
              {specifications.map((item, index) => (
                <div key={index} className="about-coral-spec-pill">
                  <span className="about-coral-spec-icon-box" aria-hidden="true">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={18}
                      height={18}
                      className="about-coral-spec-icon-img"
                    />
                  </span>
                  <span className="about-coral-spec-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: CTA Cards (Book Site Visit & Talk to Our Team) */}
        <div className="about-coral-right-col">
          {/* Card 1: Book your site visit */}
          <div
            className="coral-cta-card site-visit-card"
            style={{ '--pattern-url': `url(${faqPattern.src})` } as React.CSSProperties}
          >
            <div
              className="coral-cta-pattern"
              style={{ backgroundImage: `url(${faqPattern.src})` }}
              aria-hidden="true"
            />
            <div className="coral-cta-content">
              <div className="coral-calendar-icon-box" aria-hidden="true">
                <Calendar size={24} color="#0A63AD" strokeWidth={2.2} />
              </div>
              <h3 className="coral-cta-title">Book your site visit</h3>
              <p className="coral-cta-desc">
                See Indu Coral in person — no pressure, just a walk-through with our team.
              </p>
              <a href="#contact" className="coral-site-visit-btn">
                <span>Book Your Site Visit</span>
                <span className="coral-btn-arrow-box" aria-hidden="true">
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
          </div>

          {/* Card 2: Talk to our team */}
          <div
            className="coral-cta-card team-contact-card"
            style={{ '--pattern-url': `url(${faqPattern.src})` } as React.CSSProperties}
          >
            <div
              className="coral-cta-pattern"
              style={{ backgroundImage: `url(${faqPattern.src})` }}
              aria-hidden="true"
            />
            <div className="coral-cta-content">
              <div className="coral-team-badge">TALK TO OUR TEAM</div>
              <p className="coral-team-desc">
                No hard selling, no hidden surprises — just honest answers about Indu Coral.
              </p>

              {/* Inner White Box */}
              <div className="coral-team-white-box">
                <div className="coral-logo-circle" aria-hidden="true">
                  <Image src={logoWhite} alt="Indu Housing" className="coral-team-logo" />
                </div>
                <div className="coral-team-name">Indu Housing team</div>
                <a href="mailto:marketing@induhousing.com" className="coral-team-email">
                  marketing@induhousing.com
                </a>
                <br />
                <p style={{ color: '#0A63AD', fontWeight: '600' }}>+91 9087 990022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInduCoral;
