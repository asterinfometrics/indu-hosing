import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { VisionMission } from '@/components/VisionMission';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Services } from '@/components/Services';
import { OngoingProjects } from '@/components/OngoingProjects';
import { CompletedProjects } from '@/components/CompletedProjects';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
    return (
        <div className="home-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <Hero />
            <About />
            <VisionMission />
            <WhyChooseUs />
            <Services />
            <OngoingProjects />
            <CompletedProjects />
            <Process />
            <Testimonials />
            <FAQ />
            <Contact />
            <Footer />
        </div>
    );
}
