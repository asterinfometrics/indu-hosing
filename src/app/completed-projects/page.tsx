import { CompletedProjectsHero } from '@/pages/completed-projects/components/CompletedProjectsHero';
import { CompletedProjectsGrid } from '@/pages/completed-projects/components/CompletedProjectsGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Process } from '@/components/Process';
import { FAQ } from '@/components/FAQ';
import { CompletedProjectsForm } from '@/pages/completed-projects/components/CompletedProjectsForm';
import { Footer } from '@/components/Footer';

export default function CompletedProjectsPage() {
    return (
        <div className="completed-projects-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <CompletedProjectsHero />
            <main>
                <CompletedProjectsGrid />
                <WhyChooseUs />
                <Process />
                <FAQ />
                <CompletedProjectsForm />
            </main>
            <Footer />
        </div>
    );
}
