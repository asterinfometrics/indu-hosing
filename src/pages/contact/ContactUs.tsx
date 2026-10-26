import React from 'react';
import { ContactHero } from './components/ContactHero';
import { ContactFormSection } from './components/ContactFormSection';
import { FAQ } from '../../components/FAQ';
import { Footer } from '../../components/Footer';

export const ContactUs: React.FC = () => {
    return (
        <div className="contact-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Contact Hero with integrated floating Navbar and vector background */}
            <ContactHero />

            {/* Contact Form and Map Section */}
            <main>
                <ContactFormSection />
                <FAQ />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ContactUs;
