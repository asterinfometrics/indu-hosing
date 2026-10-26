import { JointVenturesHero } from '@/pages/joint-ventures/components/JointVenturesHero';
import { WhyPartner } from '@/pages/joint-ventures/components/WhyPartner';
import { HowPartneringWorks } from '@/pages/joint-ventures/components/HowPartneringWorks';
import { JointVenturesForm } from '@/pages/joint-ventures/components/JointVenturesForm';
import { Footer } from '@/components/Footer';

export default function JointVenturesPage() {
    return (
        <div className="joint-ventures-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <JointVenturesHero />
            <main>
                <WhyPartner />
                <HowPartneringWorks />
                <JointVenturesForm />
            </main>
            <Footer />
        </div>
    );
}
