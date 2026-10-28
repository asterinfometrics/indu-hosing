import React from 'react';
import { CompletedProjectsHero } from './components/CompletedProjectsHero';
import { CompletedProjectsGrid } from './components/CompletedProjectsGrid';
import { ProjectVideos } from './components/ProjectVideos';
import { WhyChooseUs } from '../../components/WhyChooseUs';
import { Process } from '../../components/Process';
import { FAQ } from '../../components/FAQ';
import { CompletedProjectsForm } from './components/CompletedProjectsForm';
import { Footer } from '../../components/Footer';

export const CompletedProjectsPage: React.FC = () => {
    return (
        <div className="completed-projects-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Hero Section with 5-image collage */}
            <CompletedProjectsHero />

            {/* Main page content */}
            <main>
                <CompletedProjectsGrid />
                <ProjectVideos />
                <WhyChooseUs />
                <Process />
                <FAQ />
                <CompletedProjectsForm />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CompletedProjectsPage;
