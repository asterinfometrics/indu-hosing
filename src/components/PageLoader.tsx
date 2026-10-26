'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logoWhite from '../assets/logo/logo-white.png';
import { resetHeroAnimation } from './Hero';
import './PageLoader.css';

export const PageLoader: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Reset hero animation flag
    resetHeroAnimation();

    // Hold loading screen briefly
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 300);

    // Unmount after curtain animation
    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <aside
      className={`page-loader-overlay ${
        isExiting ? 'page-loader--exit' : ''
      }`}
      aria-label="Loading page"
      aria-live="polite"
    >
      <div className="page-loader-content">
        <Image
          src={logoWhite}
          alt="Indu Housing"
          className="page-loader-logo"
          width={logoWhite.width}
          height={logoWhite.height}
          priority
        />

        <p className="page-loader-tagline">
          Homes Built on Trust, Since 2000
        </p>
      </div>
    </aside>
  );
};

export default PageLoader;