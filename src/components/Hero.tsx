'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Navbar } from './Navbar';
import heroBg from '../assets/hero/hero-background.webp';
import cloudImg from '../assets/hero/cloud.png';
import heroBuilding from '../assets/hero/hero-building.webp';
import './Hero.css';

// Tracks whether the hero entrance animation has played during this visit
let hasHeroAnimated = false;

// Reset hero animation when needed
export const resetHeroAnimation = () => {
  hasHeroAnimated = false;
};

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (hasHeroAnimated) return;

    const timer = setTimeout(() => {
      hasHeroAnimated = true;
    }, 100);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.55,
        onComplete: () => {
          hasHeroAnimated = true;
        },
      });

      tl.fromTo(
        '.hero-giant-watermark span',
        { y: 140, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-cloud-left',
          { x: -160, opacity: 0 },
          { x: 0, opacity: 0.95, duration: 1, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-cloud-right',
          { x: 160, opacity: 0 },
          { x: 0, opacity: 0.95, duration: 1, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          '.navbar-wrapper',
          { y: -70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set('.navbar-wrapper', { clearProps: 'transform' });
            },
          },
          '<'
        )
        .fromTo(
          ['.hero-title', '.hero-subtitle', '.hero-cta-btn'],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set('.hero-cta-btn', { clearProps: 'transform' });
            },
          },
          '-=0.3'
        );
    }, heroRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      {/* Background Layers */}
      <div className="hero-background-wrapper">
        <Image
          src={heroBg}
          alt="Sky Background"
          className="hero-bg-layer"
          fill
          priority
          sizes="100vw"
        />

        <Image
          src={cloudImg}
          alt=""
          className="hero-cloud hero-cloud-left"
          aria-hidden="true"
          width={cloudImg.width}
          height={cloudImg.height}
          priority
        />

        <Image
          src={cloudImg}
          alt=""
          className="hero-cloud hero-cloud-right"
          aria-hidden="true"
          width={cloudImg.width}
          height={cloudImg.height}
          priority
        />
      </div>

      {/* Giant Watermark */}
      <div className="hero-giant-watermark" aria-hidden="true">
        <span>INDU HOUSING</span>
      </div>

      {/* Building Cutout */}
      <div className="hero-building-wrapper">
        <Image
          src={heroBuilding}
          alt="Indu Housing Modern Residences"
          className="hero-building-layer"
          width={heroBuilding.width}
          height={heroBuilding.height}
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay" aria-hidden="true" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Homes Built on Trust, Since 2000
        </h1>

        <p className="hero-subtitle">
          Independent villas, individual houses &amp; apartments across Chennai –
          <br className="hero-break" />
          39 projects delivered with honest guidance at every step.
        </p>

        <Link
          href="/completed-projects"
          className="btn-primary-white hero-cta-btn"
        >
          <span className="hero-cta-text">Explore Properties</span>

          <span className="btn-icon-box hero-cta-icon-box">
            <svg
              className="hero-cta-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
};