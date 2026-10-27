'use client';

import React, { useState } from 'react';
import { Building2, Home, Maximize2, Calendar } from 'lucide-react';

import chandImg from '../../../assets/completed-projects/projects/chand.webp';
import khComplexImg from '../../../assets/completed-projects/projects/k-h-complex.webp';
import diamondImg from '../../../assets/completed-projects/projects/diamond.webp';
import krishnaImg from '../../../assets/completed-projects/projects/krishna.webp';
import rakshanImg from '../../../assets/completed-projects/projects/rakshan.webp';
import kilpakGuruMangalaImg from '../../../assets/completed-projects/projects/kilpak-guru-mangala.webp';
import saiEnclaveImg from '../../../assets/completed-projects/projects/sai-enclave.webp';
import besantNagarImg from '../../../assets/completed-projects/projects/besant-nagar.webp';
import aksharaImg from '../../../assets/completed-projects/projects/akshara.webp';
import swathamImg from '../../../assets/completed-projects/projects/swatham.webp';
import subhikshamImg from '../../../assets/completed-projects/projects/subhiksham.webp';
import shriwinImg from '../../../assets/completed-projects/projects/Shirwin.webp';
import babasGardenImg from '../../../assets/completed-projects/projects/babas-garden.webp';
import hamsikaImg from '../../../assets/completed-projects/projects/hamsika.webp';
import jayanthikaImg from '../../../assets/completed-projects/projects/jayanthika.webp';
import asithyaImg from '../../../assets/completed-projects/projects/asithya.webp';
import griyasreeImg from '../../../assets/completed-projects/projects/griyasree.webp';
import saiSaketaImg from '../../../assets/completed-projects/projects/sai-saketa.webp';
import sukthikaImg from '../../../assets/completed-projects/projects/sukthika.webp';
import harshithaImg from '../../../assets/completed-projects/projects/harshitha.webp';
import sriKrishImg from '../../../assets/completed-projects/projects/sri-krish.webp';
import athruthaImg from '../../../assets/completed-projects/projects/athrutha.webp';
import harithraImg from '../../../assets/completed-projects/projects/harithra.webp';
import sobithaImg from '../../../assets/completed-projects/projects/sobitha.webp';
import iyyapanthangalImg from '../../../assets/completed-projects/projects/iyyapanthangal.webp';
import badhriImg from '../../../assets/completed-projects/projects/badhri.webp';
import induPrathoshImg from '../../../assets/completed-projects/projects/indu-prathosh.webp';
import tNagarImg from '../../../assets/completed-projects/projects/t-nagar.webp';
import eastTambaramImg from '../../../assets/completed-projects/projects/east-tambaram.webp';
import perungudiImg from '../../../assets/completed-projects/projects/perungudi.webp';
import alapakkamImg from '../../../assets/completed-projects/projects/alapakkam.webp';
import mudichurImg from '../../../assets/completed-projects/projects/mudichur.webp';
import perumbakkamImg from '../../../assets/completed-projects/projects/perumbakkam.webp';

import './CompletedProjectsGrid.css';
import Image, { type StaticImageData } from 'next/image';

export type ProjectCategory = 'all' | 'residential' | 'commercial';

export interface CompletedProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'residential' | 'commercial';
  propertyType: string;
  propertyTypeIcon: 'apartment' | 'house' | 'villa' | 'commercial';
  year: string;
  tag: string;
  image: StaticImageData;
}

const initialCompletedProjects: CompletedProjectItem[] = [
  {
    id: 'chand',
    title: 'Chand',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Mid-rise apartment residence',
    image: chandImg
  },
  {
    id: 'k-h-complex',
    title: 'K-H Complex',
    location: 'Alwarpet, Chennai',
    category: 'commercial',
    propertyType: 'Commercial',
    propertyTypeIcon: 'commercial',
    year: '2023',
    tag: 'Commercial complex with retail frontage',
    image: khComplexImg
  },
  {
    id: 'diamond',
    title: 'Diamond',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'Compact apartment residence',
    image: diamondImg
  },
  {
    id: 'krishna',
    title: 'Krishna',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2020',
    tag: 'Multi-unit residential project',
    image: krishnaImg
  },
  {
    id: 'rakshan',
    title: 'Rakshan',
    location: 'Pallikaranai, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2022',
    tag: 'Custom-built family home',
    image: rakshanImg
  },
  {
    id: 'kilpauk-guru-mangala',
    title: 'Kilpauk Guru Mangala',
    location: 'Kilpauk, Chennai',
    category: 'residential',
    propertyType: 'Villa',
    propertyTypeIcon: 'villa',
    year: '2021',
    tag: 'Standalone luxury villa',
    image: kilpakGuruMangalaImg
  },
  {
    id: 'sai-enclave',
    title: 'Sai Enclave',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Mid-rise apartment residence',
    image: saiEnclaveImg
  },
  {
    id: 'besant-nagar',
    title: 'Besant Nagar',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'Compact apartment residence',
    image: besantNagarImg
  },
  {
    id: 'akshara',
    title: 'Akshara',
    location: 'Alwarpet, Chennai',
    category: 'commercial',
    propertyType: 'Commercial',
    propertyTypeIcon: 'commercial',
    year: '2013',
    tag: 'Commercial complex with retail frontage',
    image: aksharaImg
  },
  {
    id: 'swatham',
    title: 'Swatham',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'Compact apartment residence',
    image: swathamImg
  },
  {
    id: 'subhiksham',
    title: 'Subhiksham',
    location: 'Besant Nagar, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Mid-rise apartment residence',
    image: subhikshamImg
  },
  {
    id: 'shriwin',
    title: 'Shriwin',
    location: 'Alwarpet, Chennai',
    category: 'commercial',
    propertyType: 'Commercial',
    propertyTypeIcon: 'commercial',
    year: '2010',
    tag: 'Commercial complex with retail frontage',
    image: shriwinImg
  },
  {
    id: 'babas-garden',
    title: "Baba's Garden",
    location: 'Velachery, Chennai',
    category: 'residential',
    propertyType: 'Apartment',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Large-scale apartment development',
    image: babasGardenImg
  },
  {
    id: 'hamsika',
    title: 'Hamsika',
    location: 'Choolaimedu, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2019',
    tag: 'Custom-built family home',
    image: hamsikaImg
  },
  {
    id: 'jayanthikaa',
    title: 'Jayanthikaa',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2008',
    tag: 'Multi-unit residential project',
    image: jayanthikaImg
  },
  {
    id: 'asithya',
    title: 'Asithya',
    location: 'Pallikaranai, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Compact residential building',
    image: asithyaImg
  },
  {
    id: 'griyasree',
    title: 'Griyasree',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'Compact residential building',
    image: griyasreeImg
  },
  {
    id: 'sai-saketa',
    title: 'Sai Saketa',
    location: 'Medavakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2006',
    tag: '10-duplex individual house cluster',
    image: saiSaketaImg
  },
  {
    id: 'sukthika',
    title: 'Sukthika',
    location: 'Thoraipakkam, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'G+1 residential building in Thoraipakkam',
    image: sukthikaImg
  },
  {
    id: 'harshitha',
    title: 'Harshitha',
    location: 'Medavakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2019',
    tag: '5-duplex individual house cluster',
    image: harshithaImg
  },
  {
    id: 'sri-krish',
    title: 'Sri Krish,',
    location: 'Choolaimedu, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2005',
    tag: 'G+1 residential building in Choolaimedu',
    image: sriKrishImg
  },
  {
    id: 'athrutha',
    title: 'Athrutha',
    location: 'Thoraipakkam, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'G+1 residential building in Thoraipakkam',
    image: athruthaImg
  },
  {
    id: 'harithra',
    title: 'Harithra',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2019',
    tag: '4 duplex + 2 house cluste',
    image: harithraImg
  },
  {
    id: 'sobitha',
    title: 'Sobitha',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2004',
    tag: 'G+1 residential building in Madipakkam',
    image: sobithaImg
  },
  {
    id: 'iyyapanthangal',
    title: 'Iyappanthangal',
    location: 'Iyappanthangal, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2003',
    tag: 'Commercial complex with retail frontage',
    image: iyyapanthangalImg
  },
  {
    id: 'badhri',
    title: 'Badhri',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2019',
    tag: 'Compact apartment residence',
    image: badhriImg
  },
  {
    id: 'indu-prathosh',
    title: 'Indu Prathosh',
    location: 'Madipakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2023',
    tag: 'Mid-rise apartment residence',
    image: induPrathoshImg
  },
  {
    id: 't-nagar',
    title: 'T. Nagar',
    location: 'T. Nagar, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'G+1 residential building in T. Nagar',
    image: tNagarImg
  },
  {
    id: 'east-tambaram',
    title: 'East Tambaram',
    location: 'East Tambaram, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'Ground floor residential building in East Tambaram',
    image: eastTambaramImg
  },
  {
    id: 'perungudi',
    title: 'Perungudi',
    location: 'Perungudi, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2002',
    tag: 'G+1 residential building in Perungudi',
    image: perungudiImg
  },
  {
    id: 'alappakkam',
    title: 'Alappakkam',
    location: 'Alappakkam, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2019',
    tag: 'G+1 residential building in Alappakkam',
    image: alapakkamImg
  },
  {
    id: 'mudichur',
    title: 'Mudichur',
    location: 'Mudichur, Chennai',
    category: 'residential',
    propertyType: 'Residential',
    propertyTypeIcon: 'apartment',
    year: '2023',
    tag: 'Ground floor residential building in Mudichur',
    image: mudichurImg
  },
  {
    id: 'perumbakkam',
    title: 'Perumbakkam',
    location: 'Perumbakkam, Chennai',
    category: 'residential',
    propertyType: 'Individual house',
    propertyTypeIcon: 'house',
    year: '2001',
    tag: 'Duplex individual house in Perumbakkam',
    image: perumbakkamImg
  }
];

export const CompletedProjectsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = initialCompletedProjects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'house':
      case 'villa':
        return <Home size={15} strokeWidth={2.2} className="meta-icon" />;
      case 'commercial':
      case 'apartment':
      default:
        return <Building2 size={15} strokeWidth={2.2} className="meta-icon" />;
    }
  };

  return (
    <section className="completed-grid-section" id="projects-list">
      <div className="completed-grid-container">
        {/* Section Header */}
        <div className="completed-grid-header">
          <h2 className="completed-grid-title">Homes we've built</h2>
          <p className="completed-grid-subtitle">
            A look at completed villas, houses, and apartments across Chennai.
          </p>

          {/* Category Filter Pills */}
          <div className="completed-filter-bar" role="tablist" aria-label="Project filter">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`filter-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              ALL
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'residential'}
              className={`filter-tab-btn ${activeCategory === 'residential' ? 'active' : ''}`}
              onClick={() => setActiveCategory('residential')}
            >
              RESIDENTIAL
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'commercial'}
              className={`filter-tab-btn ${activeCategory === 'commercial' ? 'active' : ''}`}
              onClick={() => setActiveCategory('commercial')}
            >
              COMMERCIAL
            </button>
          </div>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="completed-projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="completed-project-card">
              {/* Image Preview with Completed Badge */}
              <div className="project-card-image-wrap">
                <Image
                  src={project.image}
                  alt={`${project.title} completed architectural project in ${project.location}`}
                  className="project-card-img"
                  loading="lazy"
                />
                <span className="project-status-badge">Completed</span>
              </div>

              {/* Card Details */}
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-location">{project.location}</p>

                {/* Meta Information Row */}
                <div className="project-card-meta-row">
                  <div className="meta-item">
                    {renderTypeIcon(project.propertyTypeIcon)}
                    <span>{project.propertyType}</span>
                  </div>

                  <div className="meta-divider" aria-hidden="true" />
                  <div className="meta-divider" aria-hidden="true" />

                  <div className="meta-item">
                    <Calendar size={15} strokeWidth={2.2} className="meta-icon" />
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Sub-tag row aligned right */}
                <div className="project-card-tag-wrap">
                  <span className="project-card-tag">{project.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjectsGrid;
