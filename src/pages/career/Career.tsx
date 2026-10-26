import React from 'react';
import { CareerHero } from './components/CareerHero';
import { Footer } from '../../components/Footer';
import WhyPartner from '../joint-ventures/components/WhyPartner';
import { ApplySection } from './components/ApplySection';

export const Career: React.FC = () => {
  return (
    <div className="career-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <CareerHero />

      <WhyPartner/>

      {/* Main Content Sections */}
      <main id="openings">
        <ApplySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Career;
