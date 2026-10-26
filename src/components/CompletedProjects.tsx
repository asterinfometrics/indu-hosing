import Link from 'next/link';
import {
  Building2,
  Home,
  VectorPolygon,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import prKrishna from '../assets/home/pr-krishna.webp';
import prRakshan from '../assets/home/pr-rakshan.webp';
import prKilpauk from '../assets/home/pr-kilpauk.webp';
import prBabaGarden from '../assets/home/pr-baba-garden.webp';
import prHamsika from '../assets/home/pr-hamsika.webp';
import prJayanthika from '../assets/home/pr-jayanthika.webp';
import './CompletedProjects.css';
import Image, { type StaticImageData } from 'next/image';

interface ProjectItem {
  id: string;
  name: string;
  location: string;
  type: string;
  typeIcon: 'apartment' | 'house';
  area: string;
  yearOrStatus: string;
  categoryTag: string;
  image: StaticImageData;
  badge: string;
}

export const CompletedProjects = () => {
  const projects: ProjectItem[] = [
    {
      id: 'krishna',
      name: 'Krishna',
      location: 'Besant Nagar, Chennai',
      type: 'Apartment',
      typeIcon: 'apartment',
      area: '17,963 sqft',
      yearOrStatus: '2020',
      categoryTag: 'Multi-unit residential project',
      image: prKrishna,
      badge: 'Completed',
    },
    {
      id: 'rakshan',
      name: 'Rakshan',
      location: 'Pallikaranai, Chennai',
      type: 'Individual house',
      typeIcon: 'house',
      area: '8,710 sqft',
      yearOrStatus: '2022',
      categoryTag: 'Custom-built family home',
      image: prRakshan,
      badge: 'Completed',
    },
    {
      id: 'kilpauk',
      name: 'Kilpauk Guru Mangala',
      location: 'Kilpauk, Chennai',
      type: 'Villa',
      typeIcon: 'house',
      area: '5,309 sqft',
      yearOrStatus: '2021',
      categoryTag: 'Standalone luxury villa',
      image: prKilpauk,
      badge: 'Completed',
    },
    {
      id: 'baba-garden',
      name: "Baba's Garden",
      location: 'Velachery, Chennai',
      type: 'Apartment',
      typeIcon: 'apartment',
      area: '93,210 sqft',
      yearOrStatus: '2023',
      categoryTag: 'Large-scale apartment development',
      image: prBabaGarden,
      badge: 'Completed',
    },
    {
      id: 'hamsika',
      name: 'Hamsika',
      location: 'Choolaimedu, Chennai',
      type: 'Individual house',
      typeIcon: 'house',
      area: '4,010 sqft',
      yearOrStatus: '2019',
      categoryTag: 'Custom-built family home',
      image: prHamsika,
      badge: 'Completed',
    },
    {
      id: 'jayanthikaa',
      name: 'Jayanthikaa',
      location: 'Madipakkam, Chennai',
      type: 'Apartment',
      typeIcon: 'apartment',
      area: '13,845 sqft',
      yearOrStatus: 'In progress',
      categoryTag: 'Multi-unit residential project',
      image: prJayanthika,
      badge: 'In progress',
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header (Centered) */}
        <div className="projects-header">
          <div className="projects-tag">
            <span className="projects-tag-square" aria-hidden="true" />
            <span className="projects-tag-text">Projects</span>
          </div>

          <h2 className="projects-title">Homes we've built</h2>

          <p className="projects-subtitle">
            A look at completed villas, houses, and apartments across Chennai.
          </p>
        </div>

        {/* 3x2 Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              {/* Image Frame */}
              <div className="project-image-wrapper">
                <Image
                  src={project.image}
                  alt={`${project.name} by Indu Housing`}
                  className="project-image"
                  loading="lazy"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="project-badge">{project.badge}</span>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-location">{project.location}</p>

                {/* Specs / Meta Row */}
                <div className="project-specs">
                  <div className="project-spec-item">
                    {project.typeIcon === 'apartment' ? (
                      <Building2 size={15} className="project-spec-icon" />
                    ) : (
                      <Home size={15} className="project-spec-icon" />
                    )}
                    <span>{project.type}</span>
                  </div>

                  <div className="project-spec-item">
                    <VectorPolygon size={15} className="project-spec-icon" />
                    <span>{project.area}</span>
                  </div>

                  <div className="project-spec-item">
                    <Calendar size={14} className="project-spec-icon" />
                    <span>{project.yearOrStatus}</span>
                  </div>
                </div>

                {/* Bottom Category Tag */}
                <div className="project-tag-wrapper">
                  <span className="project-category-tag">
                    {project.categoryTag}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA (Right Aligned) */}
        <div className="projects-actions">
          <Link href="/completed-projects" className="btn-primary-blue">
            <span>View More Projects</span>
            <span className="btn-icon-box">
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
