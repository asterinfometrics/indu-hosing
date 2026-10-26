import { PartnerHero } from '@/pages/redevelopment/components/PartnerHero';
import { WhyRedevelop } from '@/pages/redevelopment/components/WhyRedevelop';
import { HowRedevelopmentWorks } from '@/pages/redevelopment/components/HowRedevelopmentWorks';
import { RedevelopmentForm } from '@/pages/redevelopment/components/RedevelopmentForm';
import { Footer } from '@/components/Footer';

export default function RedevelopmentPage() {
    return (
        <div className="redevelopment-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <PartnerHero />
            <main>
                <WhyRedevelop />
                <HowRedevelopmentWorks />
                <RedevelopmentForm />
            </main>
            <Footer />
        </div>
    );
}
