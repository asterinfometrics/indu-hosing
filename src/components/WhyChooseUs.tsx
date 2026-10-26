import whyUsImg from '../assets/home/why-us-1.webp';
import './WhyChooseUs.css';
import Image from 'next/image';

export const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'In-House Civil Engineers',
      description:
        'Every project is planned and supervised by our own engineers.',
    },
    {
      id: 2,
      title: 'Thoughtful Architecture',
      description:
        'Designs shaped around how your family actually lives.',
    },
    {
      id: 3,
      title: 'Careful Structural Planning',
      description:
        'Every foundation built for long-term safety and durability.',
    },
    {
      id: 4,
      title: 'Reliable Project Delivery',
      description:
        '39 homes completed since 2000, with honest updates throughout.',
    },
  ];

  return (
    <section className="why-us-section" id="why-choose-us">
      <div className="why-us-container">
        {/* Left Column: Heading + Description + Image with Rating */}
        <div className="why-us-left">
          <div className="why-us-tag">
            <span className="why-us-tag-square" aria-hidden="true" />
            <span className="why-us-tag-text">Why choose us</span>
          </div>

          <h2 className="why-us-title">
            Why Chennai Families Trust
            <br />
            Us With Their Homes
          </h2>

          <p className="why-us-description">
            No hard selling, no hidden surprises — just honest guidance and
            quality construction, from your first consultation to the final
            handover.
          </p>

          <div className="why-us-image-wrapper">
            <Image
              src={whyUsImg}
              alt="Happy Chennai family holding a model house"
              className="why-us-image"
            />

            {/* Rating Badge */}
            <div className="why-us-rating-badge">
              <div className="why-us-rating-score">
                <span className="why-us-score-text">5.0</span>

                <svg
                  className="why-us-star-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>

              <p className="why-us-rating-sub">
                39 homes Delivered Since 2000
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Feature Cards Grid */}
        <div className="why-us-right">
          <div className="why-us-features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="why-us-feature-card">
                <div className="why-us-icon-container">
                  <div className="why-us-icon-ring">
                    <div className="why-us-icon-badge">
                      {/* Feature-specific SVG icons */}
                      {feature.id === 1 && (
                        /* Civil Engineer: Hard Hat */
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M2.5 18h19" />
                          <path d="M4 18v-2a8 8 0 0 1 16 0v2" />
                          <path d="M12 8v6" />
                          <path d="M8 10.2a8 8 0 0 0 0 5.8" />
                          <path d="M16 10.2a8 8 0 0 1 0 5.8" />
                          <path d="M2 18h20v2H2z" />
                        </svg>
                      )}

                      {feature.id === 2 && (
                        /* Architecture: Designed House */
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m3 10 9-7 9 7" />
                          <path d="M5 9v12h14V9" />
                          <path d="M9 21v-7h6v7" />
                          <path d="M8 10h2" />
                          <path d="M14 10h2" />
                          <path d="M12 3V1" />
                        </svg>
                      )}

                      {feature.id === 3 && (
                        /* Structural Planning: Building Framework */
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 21V3h16v18" />
                          <path d="M4 8h16" />
                          <path d="M4 14h16" />
                          <path d="M9 3v18" />
                          <path d="M15 3v18" />
                          <path d="M2 21h20" />
                        </svg>
                      )}

                      {feature.id === 4 && (
                        /* Reliable Delivery: Clipboard Check */
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect
                            x="5"
                            y="4"
                            width="14"
                            height="18"
                            rx="2"
                          />
                          <path d="M9 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5" />
                          <path d="m8 13 2.5 2.5L16 10" />
                          <path d="M8 18h3" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <div className="why-us-feature-body">
                  <h3 className="why-us-feature-title">
                    {feature.title}
                  </h3>

                  <p className="why-us-feature-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};