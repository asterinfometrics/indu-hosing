import { CareerHero } from '@/pages/career/components/CareerHero';
import { ApplySection } from '@/pages/career/components/ApplySection';
import WhyPartner from '@/pages/joint-ventures/components/WhyPartner';
import { Footer } from '@/components/Footer';

export default function CareerPage() {
    return (
        <div className="career-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <CareerHero />
            <WhyPartner />
            <main id="openings">
                <ApplySection />
            </main>
            <Footer />
        </div>
    );
}
