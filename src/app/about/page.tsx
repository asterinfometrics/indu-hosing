import { Navbar } from '@/components/Navbar';
import { AboutHero } from '@/pages/about/components/AboutHero';
import { OurStory } from '@/pages/about/components/OurStory';
import { VisionMission } from '@/components/VisionMission';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Process } from '@/components/Process';
import { OurJourney } from '@/pages/about/components/OurJourney';
import { FAQ } from '@/components/FAQ';
import { AboutForm } from '@/pages/about/components/AboutForm';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
    return (
        <div className="about-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <div style={{ paddingTop: '16px', paddingBottom: '8px' }}>
                <Navbar activePage="about" />
            </div>
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
            <Footer />
        </div>
    );
}
