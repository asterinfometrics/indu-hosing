'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import service1Img from '../assets/home/service-1.webp';
import service2Img from '../assets/home/service-2.webp';
import service3Img from '../assets/home/service-3.webp';

import './Services.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  number: string;
  tagline: string;
  subTagline: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
}

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  const services: ServiceItem[] = [
    {
      id: 'villas',
      number: '//01',
      tagline: 'PRIVATE',
      subTagline: 'INDEPENDENT & CUSTOM-BUILT',
      title: 'Independent Villas',
      description:
        "Standalone luxury homes built end-to-end — from foundation to final finish — designed around your family's layout and lifestyle.",
      image: service1Img,
      alt: 'Independent Villas by Indu Housing',
    },
    {
      id: 'houses',
      number: '//02',
      tagline: 'PERSONAL',
      subTagline: 'SINGLE-FAMILY HOMES',
      title: 'Individual Houses',
      description:
        'Personalized single-family homes built with modern methods and high-quality materials, tailored to your vision and budget.',
      image: service2Img,
      alt: 'Individual Houses by Indu Housing',
    },
    {
      id: 'apartments',
      number: '//03',
      tagline: 'MULTI-UNIT',
      subTagline: 'FULLY MANAGED, START TO FINISH',
      title: 'Building Apartments',
      description:
        'Multi-unit residential apartments delivered with disciplined project management and transparent communication from start to finish.',
      image: service3Img,
      alt: 'Building Apartments by Indu Housing',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

    if (!section || cards.length < 3) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', () => {
        // Set transform origins & performance hints
        gsap.set(cards, {
          transformOrigin: 'center top',
          willChange: 'transform',
        });

        // Card 1 starts active in the deck
        gsap.set(cards[0], {
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
        });

        // Cards 2 & 3 start below the viewport
        gsap.set(cards[1], {
          yPercent: 120,
          scale: 1,
          opacity: 0,
          zIndex: 2,
        });

        gsap.set(cards[2], {
          yPercent: 120,
          scale: 1,
          opacity: 0,
          zIndex: 3,
        });

        // Stacking scrub timeline pinned to section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1500',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: Card 2 slides in over Card 1; Card 1 recedes slightly
        tl.to(
          cards[1],
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          0
        )
          .to(
            cards[1],
            {
              opacity: 1,
              ease: 'power1.out',
              duration: 0.35,
            },
            0
          )
          .to(
            cards[0],
            {
              scale: 0.94,
              y: -30,
              ease: 'none',
              duration: 1,
            },
            0
          );

        // Step 2: Card 3 slides in over Card 2
        tl.to(
          cards[2],
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          1
        )
          .to(
            cards[2],
            {
              opacity: 1,
              ease: 'power1.out',
              duration: 0.35,
            },
            1
          )
          .to(
            cards[1],
            {
              scale: 0.94,
              y: -30,
              ease: 'none',
              duration: 1,
            },
            1
          )
          .to(
            cards[0],
            {
              scale: 0.88,
              y: -60,
              ease: 'none',
              duration: 1,
            },
            1
          );

        // Brief hold so the 3rd card can be viewed before unpinning
        tl.to({}, { duration: 0.3 });
      });

      // ==========================================
      // Tablet & Mobile (max-width: 900px)
      // ==========================================
      mm.add('(max-width: 900px)', () => {
        // Set transform origins & performance hints
        gsap.set(cards, {
          transformOrigin: 'center top',
          willChange: 'transform',
        });

        // Card 1 starts active in the deck
        gsap.set(cards[0], {
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
        });

        // Cards 2 & 3 start below the viewport
        gsap.set(cards[1], {
          yPercent: 120,
          scale: 1,
          opacity: 0,
          zIndex: 2,
        });

        gsap.set(cards[2], {
          yPercent: 120,
          scale: 1,
          opacity: 0,
          zIndex: 3,
        });

        // Responsive mobile scrub timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1100',
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: Card 2 slides in over Card 1
        tl.to(
          cards[1],
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          0
        )
          .to(
            cards[1],
            {
              opacity: 1,
              ease: 'power1.out',
              duration: 0.35,
            },
            0
          )
          .to(
            cards[0],
            {
              scale: 0.95,
              y: -16,
              ease: 'none',
              duration: 1,
            },
            0
          );

        // Step 2: Card 3 slides in over Card 2
        tl.to(
          cards[2],
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          1
        )
          .to(
            cards[2],
            {
              opacity: 1,
              ease: 'power1.out',
              duration: 0.35,
            },
            1
          )
          .to(
            cards[1],
            {
              scale: 0.95,
              y: -16,
              ease: 'none',
              duration: 1,
            },
            1
          )
          .to(
            cards[0],
            {
              scale: 0.90,
              y: -32,
              ease: 'none',
              duration: 1,
            },
            1
          );

        // Brief hold so the 3rd card can be viewed before unpinning
        tl.to({}, { duration: 0.3 });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section" id="services">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-tag">
            <span className="services-tag-square" aria-hidden="true" />
            <span className="services-tag-text">Services</span>
          </div>

          <h2 className="services-title">
            From Blueprint to Handover
            <br />
            We Build Your Dream Home
          </h2>
        </div>

        {/* Services Cards Deck */}
        <div className="services-deck services-list">
          {services.map((item, index) => (
            <article
              key={item.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{ '--card-index': index } as React.CSSProperties}
              className="service-card"
            >
              {/* Left Column: Number & Classification */}
              <div className="service-card-meta">
                <span className="service-card-number">{item.number}</span>

                <div className="service-card-classification">
                  <span className="service-card-tagline">
                    {item.tagline}
                  </span>
                  <span className="service-card-subtagline">
                    {item.subTagline}
                  </span>
                </div>
              </div>

              {/* Center Column: Image */}
              <div className="service-card-image-wrapper">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="service-card-image"
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>

              {/* Right Column: Title & Description */}
              <div className="service-card-content">
                <h3 className="service-card-title">{item.title}</h3>
                <p className="service-card-description">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;