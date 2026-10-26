import Link from 'next/link';
import logoWhite from '../assets/logo/logo-white.png';
import baiLogo from '../assets/home/bai.png';
import credaiLogo from '../assets/home/credai.png';
import './Footer.css';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-card">
        {/* Main 5-Column Grid */}
        <div className="footer-top-grid">
          {/* Column 1: Brand & Associations */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-logo-link" aria-label="Indu Housing Home">
              <Image
                src={logoWhite}
                alt="Indu Housing Logo"
                className="footer-logo-img"
              />
            </Link>

            <p className="footer-brand-desc">
              Building trusted homes across Chennai since 2000. Independent villas,
              individual houses, and apartments — delivered with honest guidance.
            </p>

            <div className="footer-brand-bottom">
              {/* Social Icons */}
              <div className="footer-socials" aria-label="Social media links">
                <a
                  href="https://www.facebook.com/share/1EWkLxfPkc/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/induhousing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="LinkedIn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/induhousing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919841885651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.861.884 2.802.884h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.771-5.775-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.18-.54-1.9-1.04-2.91-2.996-3.005-3.123-.095-.127-.775-1.029-.775-1.962 0-.933.489-1.393.663-1.583.174-.19.38-.238.506-.238.127 0 .253.002.364.007.118.005.276-.044.432.332.16.386.544 1.326.592 1.424.048.098.08.213.016.34-.064.127-.096.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.057 1.316.726.647 1.338.847 1.528.942.19.095.302.079.413-.048.111-.127.476-.554.603-.744.127-.19.254-.158.428-.095.175.063 1.11.523 1.3.618.19.095.317.143.364.222.048.079.048.46-.096.865z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.14-.49-4.41-1.33l-.32-.21-2.97.78.79-2.89-.23-.36C3.98 14.88 3.5 13.5 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5z" />
                  </svg>
                </a>
              </div>

              {/* Associations: BAI & CREDAI */}
              <div className="footer-assocs">
                <Image
                  src={baiLogo}
                  alt="Builders' Association of India (BAI)"
                  className="footer-assoc-bai"
                />
                <Image
                  src={credaiLogo}
                  alt="CREDAI Chennai"
                  className="footer-assoc-credai"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">About</Link>
              </li>
              <li>
                <Link href="/career" className="footer-link">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">Contact</Link>
              </li>
              <li>
                <Link href="/joint-ventures" className="footer-link">Joint Ventures</Link>
              </li>
              <li>
                <Link href="/redevelopment" className="footer-link">Redevelopment</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div className="footer-col">
            <h4 className="footer-col-title">Projects</h4>
            <ul className="footer-links">
              <li>
                <Link href="/completed-projects" className="footer-link">Completed Projects</Link>
              </li>
              <li>
                <Link href="/indu-coral" className="footer-link">On going Projects</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              <li>
                <Link href="/#services" className="footer-link">Independent Villas</Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link">Individual Houses</Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link">Building Apartments</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Get in Touch */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Get in Touch</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-row">
                <a href="tel:+91908790022" className="footer-contact-link">
                  +91 9087 90022
                </a>
                <span className="footer-contact-sep">/</span>
                <a href="tel:+919884085599" className="footer-contact-link">
                  +91 9884085599
                </a>
              </div>
              <a href="mailto:info@induhousing.com" className="footer-contact-link">
                info@induhousing.com
              </a>
              <p className="footer-contact-address">
                Old No. T-67-B, New No.32, 32nd<br />
                Cross Street, Besant Nagar, Chennai,<br />
                Tamil Nadu – 600090.
              </p>
            </div>
          </div>
        </div>


        {/* Bottom Bar: Copyright */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; 2026 Indu Housing Development. All rights reserved.
          </p>
          <p className="footer-devby">
            Designed &amp; Developed by{' '}
            <a
              href="https://www.asterinfometrics.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-devby-link"
            >
              ASTER INFOMETRICS PVT LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
