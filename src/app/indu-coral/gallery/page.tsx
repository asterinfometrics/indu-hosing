import { Navbar } from '@/components/Navbar';
import InduCoralGallery from '@/pages/indu-coral/GalleryPage';
import { Footer } from '@/components/Footer';

export const metadata = {
    title: 'Indu Coral Gallery | Indu Housing Development',
    description: 'Explore interior and exterior views of Indu Coral residences in Besant Nagar, Chennai.',
};

export default function GalleryPage() {
    return (
        <div className="indu-coral-gallery-route" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <div style={{ paddingTop: '16px', paddingBottom: '8px' }}>
                <Navbar activePage="projects" />
            </div>
            <InduCoralGallery />
            <Footer />
        </div>
    );
}
