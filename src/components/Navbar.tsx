'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo/logo.png';
import './Navbar.css';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  activePage?:
  | 'home'
  | 'about'
  | 'projects'
  | 'partner'
  | 'career'
  | 'contact';
}

export const Navbar = ({ activePage }: NavbarProps) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname() ?? '/';

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Sticky navbar on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = headerRef.current;

      if (!el) return;

      if (window.scrollY > 80) {
        el.classList.add('navbar-wrapper--sticky');
      } else {
        el.classList.remove('navbar-wrapper--sticky');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsProjectsOpen(false);
    setIsPartnerOpen(false);
  }, [pathname]);

  const currentActive: NonNullable<NavbarProps['activePage']> =
    activePage ??
    (pathname.startsWith('/about')
      ? 'about'
      : pathname.startsWith('/redevelopment') ||
        pathname.startsWith('/joint-ventures')
        ? 'partner'
        : pathname.startsWith('/contact')
          ? 'contact'
          : pathname.startsWith('/career')
            ? 'career'
            : pathname.startsWith('/indu-coral') ||
              pathname.startsWith('/completed-projects')
              ? 'projects'
              : 'home');
  return (
    <header className="navbar-wrapper" ref={headerRef}>
      <nav className="navbar-card" aria-label="Main Navigation">

        {/* Brand / Logo */}
        <Link href="/" className="navbar-brand">
          <Image
            src={logoImg}
            alt="Indu Housing"
            className="navbar-logo"
            priority
            width={logoImg.width}
            height={logoImg.height}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link
              href="/"
              className={`navbar-link ${currentActive === 'home' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              href="/about"
              className={`navbar-link ${currentActive === 'about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>

          {/* Projects Dropdown */}
          <li
            className="navbar-item dropdown-item"
            onMouseEnter={() => setIsProjectsOpen(true)}
            onMouseLeave={() => setIsProjectsOpen(false)}
          >
            <button
              type="button"
              className={`navbar-link dropdown-toggle ${currentActive === 'projects' ? 'active' : ''}`}
              aria-expanded={isProjectsOpen}
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            >
              <span>Projects</span>

              <svg
                className={`chevron-icon ${isProjectsOpen ? 'open' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isProjectsOpen && (
              <div className="navbar-dropdown">
                <Link
                  href="/indu-coral"
                  className="dropdown-link"
                  onClick={() => setIsProjectsOpen(false)}
                >
                  Ongoing Projects
                </Link>

                <Link
                  href="/completed-projects"
                  className="dropdown-link"
                  onClick={() => setIsProjectsOpen(false)}
                >
                  Completed Projects
                </Link>
              </div>
            )}
          </li>

          {/* Partner Dropdown */}
          <li
            className="navbar-item dropdown-item"
            onMouseEnter={() => setIsPartnerOpen(true)}
            onMouseLeave={() => setIsPartnerOpen(false)}
          >
            <button
              type="button"
              className={`navbar-link dropdown-toggle ${currentActive === 'partner' ? 'active' : ''}`}
              aria-expanded={isPartnerOpen}
              onClick={() => setIsPartnerOpen(!isPartnerOpen)}
            >
              <span>Partner with us</span>

              <svg
                className={`chevron-icon ${isPartnerOpen ? 'open' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isPartnerOpen && (
              <div className="navbar-dropdown">
                <Link
                  href="/joint-ventures"
                  className="dropdown-link"
                  onClick={() => setIsPartnerOpen(false)}
                >
                  Joint Ventures
                </Link>

                <Link
                  href="/redevelopment"
                  className="dropdown-link"
                  onClick={() => setIsPartnerOpen(false)}
                >
                  Redevelopment
                </Link>
              </div>
            )}
          </li>

          <li className="navbar-item">
            <Link
              href="/career"
              className={`navbar-link ${currentActive === 'career' ? 'active' : ''}`}
            >
              Career
            </Link>
          </li>
        </ul>

        {/* Contact Us Action Button */}
        <div className="navbar-actions">
          <Link href="/contact" className="navbar-cta-btn">
            CONTACT US
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                size={24}
                strokeWidth={2.2}
                className="navbar-toggle-icon navbar-toggle-icon-active"
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={2.2}
                className="navbar-toggle-icon"
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <Link
            href="/"
            className={`mobile-nav-link ${currentActive === 'home' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`mobile-nav-link ${currentActive === 'about' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          <Link
            href="/indu-coral"
            className={`mobile-nav-link ${pathname.startsWith('/indu-coral') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Ongoing Projects
          </Link>

          <Link
            href="/completed-projects"
            className={`mobile-nav-link ${pathname.startsWith('/completed-projects') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Completed Projects
          </Link>

          <Link
            href="/joint-ventures"
            className={`mobile-nav-link ${pathname.startsWith('/joint-ventures') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Joint Ventures
          </Link>

          <Link
            href="/redevelopment"
            className={`mobile-nav-link ${pathname.startsWith('/redevelopment') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Redevelopment
          </Link>

          <Link
            href="/career"
            className={`mobile-nav-link ${currentActive === 'career' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Career
          </Link>

          <Link
            href="/contact"
            className={`mobile-contact-btn ${currentActive === 'contact' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </header>
  );
};