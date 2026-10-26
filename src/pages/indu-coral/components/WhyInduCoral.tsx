import React from 'react';
import { Home, Building2, BedDouble, Car, Compass, ShieldCheck } from 'lucide-react';
import whyCoralImg from '../../../assets/indu-coral/why-indu-coral.webp';
import './WhyInduCoral.css';
import Image from 'next/image';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const leftFeatures: FeatureCard[] = [
  {
    icon: <Home size={22} strokeWidth={2.2} color="#ffffff" />,
    title: '40 exclusive residences',
    description: 'A boutique community, not a mega development.'
  },
  {
    icon: <Building2 size={22} strokeWidth={2.2} color="#ffffff" />,
    title: 'G+5 contemporary architecture',
    description: "Modern design suited to Chennai's coastal climate."
  },
  {
    icon: <BedDouble size={22} strokeWidth={2.2} color="#ffffff" />,
    title: '2 & 3 BHK homes',
    description: 'Flexible layouts for growing families.'
  }
];

const rightFeatures: FeatureCard[] = [
  {
    icon: <Car size={22} strokeWidth={2.2} color="#ffffff" />,
    title: '2 car park & balcony',
    description: 'Private parking and outdoor space with every home.'
  },
  {
    icon: <Compass size={22} strokeWidth={2.2} color="#ffffff" />,
    title: '100% Vastu compliant',
    description: 'Every layout designed to Vastu principles.'
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={2.2} color="#ffffff" />,
    title: '100% privacy',
    description: 'Designed with resident privacy in mind.'
  }
];

export const WhyInduCoral: React.FC = () => {
  return (
    <section className="why-coral-section" id="why-indu-coral">
      <div className="why-coral-container">
        {/* Centered Section Header */}
        <div className="why-coral-header">
          <div className="why-coral-badge">
            <span className="why-coral-badge-dot" aria-hidden="true" />
            <span>Why Indu Coral</span>
          </div>
          <h2 className="why-coral-title">What Coral gets right</h2>
        </div>

        {/* 3-Column Layout: Left Cards, Middle Image, Right Cards */}
        <div className="why-coral-grid">
          {/* Left Cards Column */}
          <div className="why-coral-cards-col">
            {leftFeatures.map((item, index) => (
              <div key={index} className="why-coral-card">
                <div className="why-coral-icon-box" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="why-coral-card-title">{item.title}</h3>
                <p className="why-coral-card-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Middle Image Column */}
          <div className="why-coral-image-col">
            <div className="why-coral-image-card">
              <Image
                src={whyCoralImg}
                alt="Indu Coral rooftop evening view and architectural rendering"
                className="why-coral-img"
              />
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="why-coral-cards-col">
            {rightFeatures.map((item, index) => (
              <div key={index} className="why-coral-card">
                <div className="why-coral-icon-box" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="why-coral-card-title">{item.title}</h3>
                <p className="why-coral-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInduCoral;
