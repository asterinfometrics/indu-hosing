import React from 'react';
import howPartnerImg from '../../../assets/joint-ventures/how-partner.webp';
import './HowPartneringWorks.css';
import Image from 'next/image';

interface PartnerStep {
  number: string;
  title: string;
  description: string;
}

const steps: PartnerStep[] = [
  {
    number: '01',
    title: 'Evaluate',
    description: "We assess your land's location, size, and development potential."
  },
  {
    number: '02',
    title: 'Agree',
    description: 'We agree on the sharing ratio and terms together, in plain language — no fine print surprises.'
  },
  {
    number: '03',
    title: 'Design & Approve',
    description: 'Our architects design the project and secure every necessary approval.'
  },
  {
    number: '04',
    title: 'Build',
    description: 'We build with the same quality standards as every Indu Housing project.'
  },
  {
    number: '05',
    title: 'Handover',
    description: 'We deliver every home with the same commitment to quality and excellence.'
  }
];

export const HowPartneringWorks: React.FC = () => {
  return (
    <section className="how-partner-section" id="how-partnering-works">
      <div className="how-partner-container">
        {/* Left Column: Heading and Step-by-Step Process */}
        <div className="how-partner-content">
          {/* Badge */}
          <div className="how-partner-badge">
            <span className="how-partner-badge-dot" aria-hidden="true" />
            <span>How Partnering Works</span>
          </div>

          {/* Headline */}
          <h2 className="how-partner-title">
            From Land to Legacy,<br />
            Step by Step
          </h2>

          {/* Mobile Image Card: directly above steps */}
          <div className="how-partner-image-col how-partner-image-col-mobile">
            <div className="how-partner-image-card">
              <Image
                src={howPartnerImg}
                alt="Architectural exploded 3D building diagram step by step development"
                className="how-partner-img"
              />
            </div>
          </div>

          {/* Steps List */}
          <div className="how-partner-steps">
            {steps.map((step) => (
              <div key={step.number} className="how-partner-step-item">
                <h3 className="how-partner-step-header">
                  <span className="how-partner-step-num">{step.number}</span>
                  <span className="how-partner-step-divider">—</span>
                  <span className="how-partner-step-title">{step.title}</span>
                </h3>
                <p className="how-partner-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Exploded Architectural Model Image (Desktop) */}
        <div className="how-partner-image-col how-partner-image-col-desktop">
          <div className="how-partner-image-card">
            <Image
              src={howPartnerImg}
              alt="Architectural exploded 3D building diagram step by step development"
              className="how-partner-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowPartneringWorks;
