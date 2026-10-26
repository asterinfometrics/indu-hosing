import { InduCoralHero } from '@/pages/indu-coral/components/InduCoralHero';
import { WhyInduCoral } from '@/pages/indu-coral/components/WhyInduCoral';
import { AboutInduCoral } from '@/pages/indu-coral/components/AboutInduCoral';
import { FloorPlansSection } from '@/pages/indu-coral/components/FloorPlansSection';
import { FAQ } from '@/components/FAQ';
import { InduCoralBookingForm } from '@/pages/indu-coral/components/InduCoralBookingForm';
import { Footer } from '@/components/Footer';
import GallerySection from '@/pages/indu-coral/components/GallerySection';
import { ConstructionUpdates } from '@/pages/indu-coral/components/ConstructionUpdates';
import { PrintAdsSection } from '@/pages/indu-coral/components/PrintAdsSection';

export default function InduCoralPage() {
    return (
        <div className="indu-coral-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <InduCoralHero />
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
            <Footer />
        </div>
    );
}
