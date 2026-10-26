import React from 'react';
import { Navbar } from '../../components/Navbar';
import { AboutHero } from './components/AboutHero';
import { OurStory } from './components/OurStory';
import { VisionMission } from '../../components/VisionMission';
import { WhyChooseUs } from '../../components/WhyChooseUs';
import { Process } from '../../components/Process';
import { OurJourney } from './components/OurJourney';
import { FAQ } from '../../components/FAQ';
import { AboutForm } from './components/AboutForm';
import { Footer } from '../../components/Footer';

export const AboutUs: React.FC = () => {
    return (
        <div className="about-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Floating Navbar */}
            <div style={{ paddingTop: '16px', paddingBottom: '8px' }}>
                <Navbar activePage="about" />
            </div>

            {/* Main Content */}
            <main>
                <AboutHero />
                <OurStory />
                <VisionMission />
                <WhyChooseUs />
                <Process />
                <OurJourney />
                <FAQ />
                <AboutForm />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUs;
