import React from 'react';
import howRedevelopImg from '../../../assets/partner/how-redevelop.webp';
import './HowRedevelopmentWorks.css';
import Image from 'next/image';
interface RedevelopmentStep {
  number: string;
  title: string;
  description: string;
}

const steps: RedevelopmentStep[] = [
  {
    number: '01',
    title: 'Assess',
    description: 'We evaluate your existing structure, land size, and rebuilding potential.'
  },
  {
    number: '02',
    title: 'Agree',
    description: 'We agree on the sharing ratio and terms together, in plain language – no fine print surprises.'
  },
  {
    number: '03',
    title: 'Design & Approve',
    description: 'Our architects design the new structure and secure every necessary approval.'
  },
  {
    number: '04',
    title: 'Demolish & Build',
    description: 'We clear the old structure and build to the same quality standards as every Indu Housing project.'
  },
  {
    number: '05',
    title: 'Handover',
    description: 'You receive your share of the newly built space, ready to occupy or sell.'
  }
];

export const HowRedevelopmentWorks: React.FC = () => {
  return (
    <section className="how-redevelop-section">
      <div className="how-redevelop-container">
        {/* Left Column: Heading and Step-by-Step Process */}
        <div className="how-redevelop-content">
          {/* Badge */}
          <div className="how-redevelop-badge">
            <span className="how-redevelop-badge-dot" aria-hidden="true" />
            <span>How Redevelopment Works</span>
          </div>

          {/* Headline */}
          <h2 className="how-redevelop-title">
            From Old to New,<br />
            Step by Step
          </h2>

          {/* Mobile Image Card: directly above steps */}
          <div className="how-redevelop-image-col how-redevelop-image-col-mobile">
            <div className="how-redevelop-image-card">
              <Image
                src={howRedevelopImg}
                alt="Architectural exploded 3D building diagram step by step redevelopment"
                className="how-redevelop-img"
              />
            </div>
          </div>

          {/* Steps List */}
          <div className="how-redevelop-steps">
            {steps.map((step) => (
              <div key={step.number} className="how-redevelop-step-item">
                <h3 className="how-redevelop-step-header">
                  <span className="how-redevelop-step-num">{step.number}</span>
                  <span className="how-redevelop-step-divider">—</span>
                  <span className="how-redevelop-step-title">{step.title}</span>
                </h3>
                <p className="how-redevelop-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Exploded Architectural Model Image (Desktop) */}
        <div className="how-redevelop-image-col how-redevelop-image-col-desktop">
          <div className="how-redevelop-image-card">
            <Image
              src={howRedevelopImg}
              alt="Architectural exploded 3D building diagram step by step redevelopment"
              className="how-redevelop-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowRedevelopmentWorks;
