import React from 'react';
import { PartnerHero } from './components/PartnerHero';
import { WhyRedevelop } from './components/WhyRedevelop';
import { HowRedevelopmentWorks } from './components/HowRedevelopmentWorks';
import { RedevelopmentForm } from './components/RedevelopmentForm';
import { Footer } from '../../components/Footer';

export const Redevelopment: React.FC = () => {
  return (
    <div className="redevelopment-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section with integrated floating Navbar and crane background */}
      <PartnerHero />

      {/* Main Content Sections */}
      <main>
        <WhyRedevelop />
        <HowRedevelopmentWorks />
        <RedevelopmentForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Redevelopment;
