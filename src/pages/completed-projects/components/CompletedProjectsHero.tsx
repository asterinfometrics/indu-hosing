import React from 'react';
import { Navbar } from '../../../components/Navbar';
import img1 from '../../../assets/completed-projects/hero/1.webp';
import img2 from '../../../assets/completed-projects/hero/2.webp';
import img3 from '../../../assets/completed-projects/hero/3.webp';
import img4 from '../../../assets/completed-projects/hero/4.webp';
import img5 from '../../../assets/completed-projects/hero/5.webp';
import besantNagarImg from '../../../assets/completed-projects/projects/besant-nagar.webp';
import mudichurImg from '../../../assets/completed-projects/projects/mudichur.webp';
import diamondImg from '../../../assets/completed-projects/projects/diamond.webp';
import saiSaketaImg from '../../../assets/completed-projects/projects/sai-saketa.webp';
import kilpakImg from '../../../assets/completed-projects/projects/kilpak-guru-mangala.webp';
import tNagarImg from '../../../assets/completed-projects/projects/t-nagar.webp';
import jayanthikaImg from '../../../assets/completed-projects/projects/jayanthika.webp';
import './CompletedProjectsHero.css';
import Image, { type StaticImageData } from 'next/image';

interface HeroProject {
  src: StaticImageData;
  alt: string;
  title: string;
}

const columnOneProjects: HeroProject[] = [
  {
    src: img1,
    alt: 'Completed luxury apartment exterior with warm evening lights',
    title: 'Krishna'
  },
  {
    src: besantNagarImg,
    alt: 'Indhu Besant Nagar premium residential project',
    title: 'Besant Nagar'
  },
  {
    src: img2,
    alt: 'RA Complex modern cantilever architecture with wooden cladding',
    title: 'K-H Complex'
  },
  {
    src: mudichurImg,
    alt: 'Mudichur contemporary completed apartments',
    title: 'Mudichur'
  },
  {
    src: img3,
    alt: 'Completed residential apartments under blue sky',
    title: 'Chand'
  },
  {
    src: diamondImg,
    alt: 'Diamond Enclave residential apartment building',
    title: 'Diamond'
  }
];

const columnTwoProjects: HeroProject[] = [
  {
    src: img4,
    alt: 'Modern contemporary apartment building with blue balconies and stilt parking',
    title: 'Griyasree'
  },
  {
    src: saiSaketaImg,
    alt: 'Sai Saketa completed housing project',
    title: 'Sai Saketa'
  },
  {
    src: img5,
    alt: 'Luxury 3-storey building with slate textured facade and glass balconies',
    title: 'Besant Nagar'
  },
  {
    src: kilpakImg,
    alt: 'Kilpauk Guru Mangala residential apartments',
    title: 'Kilpauk Guru Mangala'
  },
  {
    src: tNagarImg,
    alt: 'T. Nagar prime completed apartment community',
    title: 'T. Nagar'
  },
  {
    src: jayanthikaImg,
    alt: 'Jayanthika luxury residential building',
    title: 'Jayanthikaa'
  }
];

export const CompletedProjectsHero: React.FC = () => {
  return (
    <section className="completed-hero-section">
      {/* Floating Navbar */}
      <div className="completed-hero-nav-wrapper">
        <Navbar activePage="projects" />
      </div>

      {/* Main Hero Container */}
      <div className="completed-hero-container">
        {/* Left Column: Heading and CTA */}
        <div className="completed-hero-content">
          <div className="completed-hero-badge">
            <span className="completed-hero-badge-dot" aria-hidden="true" />
            <span>Completed projects</span>
          </div>

          <h1 className="completed-hero-title">
            39 Projects across Chennai,<br />
            each one still standing
          </h1>

          <a href="#contact" className="btn-primary-blue completed-hero-btn">
            <span>Schedule a Call</span>
            <span className="btn-icon-box" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </div>

        {/* Right Column: 2-Column Infinite Vertical Auto-Scrolling Gallery */}
        <div className="completed-hero-collage" aria-label="Completed projects showcase">
          {/* Column 1 (Scrolls Upwards) */}
          <div className="completed-collage-col col-left">
            <div className="marquee-track marquee-track-up">
              <div className="marquee-group">
                {columnOneProjects.map((project, idx) => (
                  <div key={`col1-a-${idx}`} className="collage-card">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      className="collage-img"
                      loading="eager"
                    />
                    <span className="collage-card-tag">{project.title}</span>
                  </div>
                ))}
              </div>
              <div className="marquee-group" aria-hidden="true">
                {columnOneProjects.map((project, idx) => (
                  <div key={`col1-b-${idx}`} className="collage-card">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      className="collage-img"
                      loading="lazy"
                    />
                    <span className="collage-card-tag">{project.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 (Scrolls Downwards) */}
          <div className="completed-collage-col col-right">
            <div className="marquee-track marquee-track-down">
              <div className="marquee-group">
                {columnTwoProjects.map((project, idx) => (
                  <div key={`col2-a-${idx}`} className="collage-card">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      className="collage-img"
                      loading="eager"
                    />
                    <span className="collage-card-tag">{project.title}</span>
                  </div>
                ))}
              </div>
              <div className="marquee-group" aria-hidden="true">
                {columnTwoProjects.map((project, idx) => (
                  <div key={`col2-b-${idx}`} className="collage-card">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      className="collage-img"
                      loading="lazy"
                    />
                    <span className="collage-card-tag">{project.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedProjectsHero;
