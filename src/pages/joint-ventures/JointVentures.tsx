import React from 'react';
import { JointVenturesHero } from './components/JointVenturesHero';
import { WhyPartner } from './components/WhyPartner';
import { HowPartneringWorks } from './components/HowPartneringWorks';
import { JointVenturesForm } from './components/JointVenturesForm';
import { Footer } from '../../components/Footer';

export const JointVentures: React.FC = () => {
    return (
        <div className="joint-ventures-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Hero Section */}
            <JointVenturesHero />

            {/* Main page content sections */}
            <main>
                {/* Why Partner Section */}
                <WhyPartner />

                {/* How Partnering Works Section */}
                <HowPartneringWorks />

                {/* Partner Form Section */}
                <JointVenturesForm />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default JointVentures;
