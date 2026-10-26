import React from 'react';
import { InduCoralHero } from './components/InduCoralHero';
import { WhyInduCoral } from './components/WhyInduCoral';
import { AboutInduCoral } from './components/AboutInduCoral';
import { FloorPlansSection } from './components/FloorPlansSection';
import GallerySection from './components/GallerySection';
import { ConstructionUpdates } from './components/ConstructionUpdates';
import { PrintAdsSection } from './components/PrintAdsSection';
import { FAQ } from '../../components/FAQ';
import { InduCoralBookingForm } from './components/InduCoralBookingForm';
import { Footer } from '../../components/Footer';

export const InduCoral: React.FC = () => {
    return (
        <div className="indu-coral-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Hero Section */}
            <InduCoralHero />

            {/* Main page content sections */}
            <main>
                <WhyInduCoral />
                <AboutInduCoral />
                <FloorPlansSection />
                <GallerySection />
                <ConstructionUpdates />
                <PrintAdsSection />
                <FAQ />
                <InduCoralBookingForm />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default InduCoral;
