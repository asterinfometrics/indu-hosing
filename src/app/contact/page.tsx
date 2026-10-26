import { ContactHero } from '@/pages/contact/components/ContactHero';
import { ContactFormSection } from '@/pages/contact/components/ContactFormSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
    return (
        <div className="contact-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <ContactHero />
            <main>
                <ContactFormSection />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}
