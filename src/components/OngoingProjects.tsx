import Link from 'next/link';
import { CheckCheck, ArrowRight } from 'lucide-react';
import onProject1 from '../assets/home/on-project-1.webp';
import './OngoingProjects.css';
import Image from 'next/image';

export const OngoingProjects = () => {
  const highlights = [
    '40 RESIDENCES — 2 & 3 BHK',
    '1,030 – 1,800 SQ. FT.',
    'STILT + 5 FLOORS',
    'TNRERA REGISTERED',
  ];

  const brochureUrl =
    '/BROCHURE%20A3_compressed_compressed%20(1)_compressed_compressed_compressed_compressed.pdf';

  return (
    <section className="ongoing-section" id="ongoing-projects">
      <div className="ongoing-container">
        {/* Section Tag */}
        <div className="ongoing-tag">
          <span className="ongoing-tag-square" aria-hidden="true" />
          <span className="ongoing-tag-text">Ongoing Projects</span>
        </div>

        {/* Project Card */}
        <article className="ongoing-card">
          {/* Left Column: Details */}
          <div className="ongoing-content">
            <div className="ongoing-badge">Now selling</div>

            <h2 className="ongoing-title">
              Indu Coral: Coastal Living
              <br />
              in Besant Nagar
            </h2>

            <p className="ongoing-description">
              40 thoughtfully designed 2 & 3 BHK residences in one of
              Chennai's most sought-after coastal neighborhoods -
              where the sea's calm meets the city's convenience.
            </p>

            <ul
              className="ongoing-highlights"
              aria-label="Project Highlights"
            >
              {highlights.map((item, idx) => (
                <li key={idx} className="ongoing-highlight-item">
                  <span
                    className="ongoing-check-icon"
                    aria-hidden="true"
                  >
                    <CheckCheck
                      size={20}
                      strokeWidth={2.4}
                      color="#ffffff"
                    />
                  </span>

                  <span className="ongoing-highlight-text">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="ongoing-actions">
              <Link href="/indu-coral" className="btn-primary-blue">
                <span>View Projects Details</span>

                <span className="btn-icon-box">
                  <ArrowRight size={15} strokeWidth={2.2} />
                </span>
              </Link>

              <a
                href={brochureUrl}
                download="Indu-Coral-Brochure.pdf"
                className="btn-secondary"
              >
                Download brochure
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="ongoing-image-wrapper">
            <Image
              src={onProject1}
              alt="Indu Coral luxury apartments in Besant Nagar Chennai"
              className="ongoing-image"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
};
