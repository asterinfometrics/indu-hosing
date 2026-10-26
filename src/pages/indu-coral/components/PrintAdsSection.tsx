'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './PrintAdsSection.css';

// Import authentic newspaper ad assets matching user's design
import adCrop1 from '@/assets/indu-coral/print-ads/ad-crop-1.webp';
import adCrop2 from '@/assets/indu-coral/print-ads/ad-crop-2.webp';
import adCrop3 from '@/assets/indu-coral/print-ads/ad-crop-3.webp';
import adCrop4 from '@/assets/indu-coral/print-ads/ad-crop-4.webp';
import adCrop5 from '@/assets/indu-coral/print-ads/ad-crop-5.webp';
import adCrop6 from '@/assets/indu-coral/print-ads/ad-crop-6.webp';
import adCrop7 from '@/assets/indu-coral/print-ads/ad-crop-7.webp';
import adCrop8 from '@/assets/indu-coral/print-ads/ad-crop-8.webp';
import adCrop9 from '@/assets/indu-coral/print-ads/ad-crop-9.webp';
import PrintAdLightbox, { PrintAdModalItem } from './PrintAdLightbox';

const printAds: PrintAdModalItem[] = [
  {
    id: 'ad-10-oct-2026',
    date: '10 October 2026',
    shortDate: '10 Oct',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 101026.pdf', 'toi 101026.pdf'],
    title: 'Indu Coral — Space, Thoughtfully Composed',
    thumbnail: adCrop1,
    popupImage: adCrop1,
  },
  {
    id: 'ad-26-sep-2026',
    date: '26 September 2026',
    shortDate: '26 Sep',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 260926.pdf', 'toi 260926.pdf'],
    title: 'Indu Coral — Come See What Experience Builds',
    thumbnail: adCrop2,
    popupImage: adCrop2,
  },
  {
    id: 'ad-29-aug-2026',
    date: '29 August 2026',
    shortDate: '29 Aug',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 290826.pdf', 'toi 290826.pdf'],
    title: 'Indu Coral — Redevelopment Is Our Expertise',
    thumbnail: adCrop3,
    popupImage: adCrop3,
  },
  {
    id: 'ad-22-aug-2026',
    date: '22 August 2026',
    shortDate: '22 Aug',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 220826.pdf', 'toi 220826.pdf'],
    title: 'Indu Coral — Besant Nagar Premium Coastal Living',
    thumbnail: adCrop4,
    popupImage: adCrop4,
  },
  {
    id: 'ad-08-aug-2026',
    date: '8 August 2026',
    shortDate: '8 Aug',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 080826.pdf', 'toi 080826.pdf'],
    title: 'Indu Coral — Coastal Architecture & Finishes',
    thumbnail: adCrop5,
    popupImage: adCrop5,
  },
  {
    id: 'ad-25-jul-2026',
    date: '25 July 2026',
    shortDate: '25 Jul',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 250726.pdf', 'toi 250726.pdf'],
    title: 'Indu Coral — Prime Living by Elliot’s Beach',
    thumbnail: adCrop6,
    popupImage: adCrop6,
  },
  {
    id: 'ad-11-jul-2026',
    date: '11 July 2026',
    shortDate: '11 Jul',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 110726.pdf', 'toi 110726.pdf'],
    title: 'Indu Coral — Exclusive Coastal Sanctuary',
    thumbnail: adCrop7,
    popupImage: adCrop7,
  },
  {
    id: 'ad-04-jul-2026',
    date: '4 July 2026',
    shortDate: '4 Jul',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 040726.pdf', 'toi 040726.pdf'],
    title: 'Indu Coral — Sophistication, Perfectly Addressed',
    thumbnail: adCrop8,
    popupImage: adCrop8,
  },
  {
    id: 'ad-16-jun-2026',
    date: '16 June 2026',
    shortDate: '16 Jun',
    publication: 'The Hindu',
    publications: ['The Hindu', 'The Times of India'],
    files: ['hindu 160626.pdf', 'toi 160626.pdf'],
    title: 'Indu Coral — Exclusive Launch Preview',
    thumbnail: adCrop9,
    popupImage: adCrop9,
  },
];

export const PrintAdsSection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Slider refs & state for drag ("hand move card") and arrow controls
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update arrow availability
  const checkScrollBounds = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScrollBounds();
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => checkScrollBounds();
    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [checkScrollBounds]);

  // Arrow button click handlers (scroll by 1 card width + gap, or full viewport width on mobile)
  const handleScrollLeft = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.querySelector('.print-ad-card') as HTMLElement | null;
    const isSingleCard = card ? card.offsetWidth >= track.clientWidth * 0.8 : false;
    const scrollDistance = isSingleCard ? track.clientWidth : (card ? card.offsetWidth + 24 : 320);
    track.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.querySelector('.print-ad-card') as HTMLElement | null;
    const isSingleCard = card ? card.offsetWidth >= track.clientWidth * 0.8 : false;
    const scrollDistance = isSingleCard ? track.clientWidth : (card ? card.offsetWidth + 24 : 320);
    track.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  // Drag-to-scroll handlers ("keep hand move card also")
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setStartScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !trackRef.current) return;
    e.preventDefault();
    const currentX = e.pageX - trackRef.current.offsetLeft;
    const walk = (currentX - startX) * 1.3;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    trackRef.current.scrollLeft = startScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      setHasDragged(false);
    }, 50);
  };

  // Card click handler (prevent popup if user was dragging)
  const handleCardClick = (index: number) => {
    if (hasDragged) return;
    setLightboxIndex(index);
  };

  return (
    <section className="print-ads-section" id="print-ads" aria-label="Print advertisements">
      <div className="print-ads-container">
        {/* Section Header */}
        <div className="print-ads-header">
          <div className="print-ads-header-left">
            <div className="print-ads-badge">
              <span className="print-ads-badge-dot" aria-hidden="true" />
              <span>Print ads</span>
            </div>

            <h2 className="print-ads-title">Indu Coral in the newspapers</h2>

            <p className="print-ads-desc">
              Our ads in The Hindu and The Times of India, newest first.
            </p>
          </div>

          <button
            type="button"
            className="btn-primary-blue coral-booking-submit-btn print-ads-view-all-btn"
            onClick={() => setLightboxIndex(0)}
            style={{ textDecoration: 'none' }}
            aria-label="View all ads"
          >
            <span>View all ads</span>
            <span className="btn-icon-box">
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </button>
        </div>

        {/* Carousel Slider with Navigation Arrows */}
        <div className="print-ads-carousel-wrapper">
          {/* Draggable Cards Track */}
          <div
            ref={trackRef}
            className={`print-ads-track ${isMouseDown ? 'is-dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            role="region"
            aria-label="Newspaper advertisements carousel"
            tabIndex={0}
          >
            {/* Left Arrow Button */}
            <button
              type="button"
              className="print-ads-nav-btn print-ads-nav-prev"
              onClick={handleScrollLeft}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Scroll to previous ads"
            >
              <ArrowLeft size={20} strokeWidth={2.2} />
            </button>

            {printAds.map((ad, idx) => (
              <article
                key={ad.id}
                className="print-ad-card"
                aria-label={`${ad.title}, published ${ad.date}`}
              >
                {/* Visual Ad Sheet / Poster Frame */}
                <div
                  className="print-ad-sheet"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  aria-label={`Open advertisement popup for ${ad.date}`}
                >
                  <div className="print-ad-poster-wrapper">
                    <img
                      src={typeof ad.thumbnail === 'string' ? ad.thumbnail : ad.thumbnail.src}
                      alt={ad.title}
                      className="print-ad-poster-img"
                      loading={idx <= 3 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                {/* Metadata Below Card */}
                <div className="print-ad-meta">
                  <span className="print-ad-date">{ad.date}</span>

                  {/* <div className="print-ad-tags">
                    {(ad.publications || [ad.publication]).map((pub, pubIdx) => (
                      <span key={pubIdx} className="print-ad-tag">
                        {pub}
                      </span>
                    ))}
                  </div> */}

                  <button
                    type="button"
                    className="print-ad-view-link"
                    onClick={() => handleCardClick(idx)}
                    aria-label={`View ad from ${ad.date}`}
                  >
                    <span>View ad</span>
                    <span className="print-ad-view-arrow" aria-hidden="true">
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </span>
                  </button>
                </div>
              </article>
            ))}

            {/* Right Arrow Button */}
            <button
              type="button"
              className="print-ads-nav-btn print-ads-nav-next"
              onClick={handleScrollRight}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Scroll to next ads"
            >
              <ArrowRight size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal matching uploaded screenshot */}
      <PrintAdLightbox
        ads={printAds}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
};

export default PrintAdsSection;
