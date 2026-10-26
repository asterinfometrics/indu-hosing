
'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import './ConstructionUpdates.css';

import octImg from '../../../assets/indu-coral/construction/october-2026.webp';
import sepImg from '../../../assets/indu-coral/construction/september-2026.webp';
import augImg from '../../../assets/indu-coral/construction/august-2026.webp';
import julImg from '../../../assets/indu-coral/construction/july-2026.webp';
import junImg from '../../../assets/indu-coral/construction/june-2026.webp';

import popup1 from '../../../assets/indu-coral/construction/popup1.png';
import popup2 from '../../../assets/indu-coral/construction/popup2.png';
import popup3 from '../../../assets/indu-coral/construction/popup3.png';
import popup4 from '../../../assets/indu-coral/construction/popup4.png';
import popup5 from '../../../assets/indu-coral/construction/popup5.png';

import GalleryLightbox, { LightboxPhoto } from './GalleryLightbox';

interface UpdateItem {
  id: string;
  image: StaticImageData;
  popupImage: StaticImageData;
  month: string;
  subtitle: string;
  title: string;
  isLatest?: boolean;
}

const updates: UpdateItem[] = [
  {
    id: 'oct-2026',
    image: octImg,
    popupImage: popup1,
    month: 'October 2026',
    subtitle: 'Construction Progress',
    title: 'October 2026',
    isLatest: true,
  },
  {
    id: 'sep-2026',
    image: sepImg,
    popupImage: popup2,
    month: 'September 2026',
    subtitle: 'Construction Progress',
    title: 'September 2026',
  },
  {
    id: 'aug-2026',
    image: augImg,
    popupImage: popup3,
    month: 'August 2026',
    subtitle: 'Construction Progress',
    title: 'August 2026',
  },
  {
    id: 'jul-2026',
    image: julImg,
    popupImage: popup4,
    month: 'July 2026',
    subtitle: 'Construction Progress',
    title: 'July 2026',
  },
  {
    id: 'jun-2026',
    image: junImg,
    popupImage: popup5,
    month: 'June 2026',
    subtitle: 'Construction Progress',
    title: 'June 2026',
  },
];

export const ConstructionUpdates: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const latestUpdate = updates[0];
  const previousUpdates = updates.slice(1);

  const lightboxPhotos: LightboxPhoto[] = updates.map((item) => ({
    id: item.id,
    title: `Indu Coral — ${item.month}`,
    category: item.subtitle,
    image: item.popupImage,
  }));

  return (
    <section className="construction-section" id="construction-updates">
      <div className="construction-container">
        {/* Header */}
        <div className="construction-header">
          <div className="construction-badge">
            <span className="construction-badge-dot" aria-hidden="true" />
            <span>Project status</span>
          </div>

          <h2 className="construction-title">
            Construction updates from the site
          </h2>

          <p className="construction-desc">
            Photos from Indu Coral in Besant Nagar, showing construction progress month by month.
          </p>

          <div className="construction-last-updated">
            Last updated: October 2026
          </div>
        </div>

        {/* Main Grid: 1 Featured Left + 2x2 Grid Right */}
        <div className="construction-grid">
          {/* Featured Large Card (Left) */}
          <div
            className="construction-featured-card"
            onClick={() => setLightboxIndex(0)}
            role="button"
            tabIndex={0}
            aria-label={`View full photo for ${latestUpdate.month}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setLightboxIndex(0);
              }
            }}
          >
            <div className="construction-featured-img-wrap">
              <span className="construction-badge-latest">Latest update</span>
              <Image
                src={latestUpdate.image}
                alt={`Indu Coral construction progress - ${latestUpdate.month}`}
                className="construction-featured-img"
                priority
              />
              <div className="construction-card-overlay" aria-hidden="true" />
              <div className="construction-card-hover-info construction-card-hover-info--featured">
                <span className="construction-card-subtitle">{latestUpdate.subtitle}</span>
                <h3 className="construction-card-title">{latestUpdate.title}</h3>
              </div>
            </div>
            <span className="construction-month-label">{latestUpdate.month}</span>
          </div>

          {/* 2x2 Grid (Right) */}
          <div className="construction-side-grid">
            {previousUpdates.map((item, idx) => (
              <div
                key={item.id}
                className="construction-card"
                onClick={() => setLightboxIndex(idx + 1)}
                role="button"
                tabIndex={0}
                aria-label={`View full photo for ${item.month}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setLightboxIndex(idx + 1);
                  }
                }}
              >
                <div className="construction-card-img-wrap">
                  <Image
                    src={item.image}
                    alt={`Indu Coral construction progress - ${item.month}`}
                    className="construction-card-img"
                  />
                  <div className="construction-card-overlay" aria-hidden="true" />
                  <div className="construction-card-hover-info">
                    <span className="construction-card-subtitle">{item.subtitle}</span>
                    <h3 className="construction-card-title">{item.title}</h3>
                  </div>
                </div>
                <span className="construction-month-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal matching GallerySection ("A closer look at Indu Coral") */}
      <GalleryLightbox
        photos={lightboxPhotos}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
};

export default ConstructionUpdates;
