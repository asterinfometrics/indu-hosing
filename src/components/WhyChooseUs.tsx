import whyUsImg from '../assets/home/why-us-1.webp';
import './WhyChooseUs.css';
import Image from 'next/image';
import icon1 from '../assets/icons/icons1.png';
import icon2 from '../assets/icons/icons2.png';
import icon3 from '../assets/icons/icons3.png';
import icon4 from '../assets/icons/icons4.png';

export const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: icon1,
      title: 'In-House Civil Engineers',
      description:
        'Every project is planned and supervised by our own engineers.',
    },
    {
      id: 2,
      icon: icon2,
      title: 'Thoughtful Architecture',
      description:
        'Designs shaped around how your family actually lives.',
    },
    {
      id: 3,
      icon: icon3,
      title: 'Careful Structural Planning',
      description:
        'Every foundation built for long-term safety and durability.',
    },
    {
      id: 4,
      icon: icon4,
      title: 'Reliable Project Delivery',
      description:
        '39 Projects completed since 2000, with honest updates throughout.',
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
                39 Projects Delivered Since 2000
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
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="why-us-icon-img"
                      />
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