import Image, { type StaticImageData } from 'next/image';
import { Star } from 'lucide-react';
import quoteImg from '../assets/home/quote.svg';
import avatar1 from '../assets/home/avatar-1.jpg';
import avatar2 from '../assets/home/avatar-2.jpg';
import avatar3 from '../assets/home/avatar-3.jpg';
import avatar4 from '../assets/home/avatar-4.png';
import avatar5 from '../assets/home/avatar-5.jpg';
import './Testimonials.css';

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: StaticImageData;
}

export const Testimonials = () => {
  const row1Testimonials: TestimonialItem[] = [
    {
      id: 'r1-1',
      quote:
        '"Every communication with Indu Housing was transparent and professional - rare today. Thanks, Mr. Babu Vijay."',
      name: 'Rajiv & R. Seethalakshmi',
      location: 'Chennai',
      avatar: avatar4,
    },
    {
      id: 'r1-2',
      quote:
        '"Excellent expertise and commitment, evident from first consultation to final results. Highly recommend Indu Housing for reliable consultancy."',
      name: 'Kamath',
      location: 'Chennai',
      avatar: avatar2,
    },
    {
      id: 'r1-3',
      quote:
        '"Indu Housing helped me finish everything promptly, with personalized guidance throughout. Happy and satisfied with the service."',
      name: 'Hemanath',
      location: 'Chennai',
      avatar: avatar1,
    },
    {
      id: 'r1-4',
      quote:
        '"Indu Housing\'s team was courteous and professional - on-time work, with quality craftsmanship and good after-sale service."',
      name: 'Thirumalai Ramalingam',
      location: 'Chennai',
      avatar: avatar2,
    },
    {
      id: 'r1-5',
      quote:
        '"I highly recommend Indu Housing. They offer reliable construction at a reasonable price that is rare to find together."',
      name: 'Subash',
      location: 'Chennai',
      avatar: avatar5,
    },
  ];

  const row2Testimonials: TestimonialItem[] = [
    {
      id: 'r2-1',
      quote:
        '"We compared three builders before choosing them, and the difference was how much they actually listened before proposing anything."',
      name: 'Homeowner',
      location: 'Chennai',
      avatar: avatar1,
    },
    {
      id: 'r2-2',
      quote:
        '"What stood out was how often they checked in - not just at milestones, but whenever something needed a decision from us."',
      name: 'Individual house homeowner,',
      location: 'Velachery',
      avatar: avatar4,
    },
    {
      id: 'r2-3',
      quote:
        '"As an investor, I\'m happy with the appreciation Indu Housing properties have seen. Good quality and locations with strong resale value."',
      name: 'Saran',
      location: 'Chennai',
      avatar: avatar1,
    },
    {
      id: 'r2-4',
      quote:
        '"Building on our own plot meant a lot of decisions were on us, but they guided us through each one without ever making us feel rushed."',
      name: 'Individual house homeowner',
      location: 'Anna Nagar',
      avatar: avatar4,
    },
    {
      id: 'r2-5',
      quote:
        '"From day one they were completely upfront about timelines and costs. Not a single hidden charge when we took handover."',
      name: 'Individual house homeowner',
      location: 'Anna Nagar',
      avatar: avatar5,
    },
  ];

  // Helper function to render a single testimonial card
  const renderCard = (item: TestimonialItem, indexKey: string) => (
    <div key={indexKey} className="testimonial-card">
      {/* Background Soft Quote Image */}
      <Image
        src={quoteImg}
        alt=""
        className="testimonial-quote-image"
        aria-hidden="true"
      />

      {/* 5 Gold Rating Stars */}
      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>

      {/* Quote Text */}
      <p className="testimonial-text">{item.quote}</p>

      {/* Author Details */}
      <div className="testimonial-author">
        <Image
          src={item.avatar}
          alt={item.name}
          className="testimonial-avatar"
          loading="lazy"
        />
        <h4 className="testimonial-name">{item.name}</h4>
        <span className="testimonial-location">{item.location}</span>
      </div>
    </div>
  );

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Centered Header */}
        <div className="testimonials-header">
          <div className="testimonials-tag">
            <span className="testimonials-tag-square" aria-hidden="true" />
            <span className="testimonials-tag-text">Testimonials</span>
          </div>

          <h2 className="testimonials-title">
            Trusted by Chennai Families<br />
            for Over 25 Years
          </h2>

          <p className="testimonials-subtitle">
            Don't take our word for it — hear directly from the families we've
            built homes for, from first consultation to final handover.
          </p>
        </div>

        {/* Dual-Row Testimonials Track with Side Fade */}
        <div className="testimonials-track-wrapper">
          {/* Row 1: Scrolling Left */}
          <div className="testimonials-row testimonials-row-left">
            <div className="testimonials-group">
              {row1Testimonials.map((item, idx) =>
                renderCard(item, `r1-a-${idx}`)
              )}
            </div>
            <div className="testimonials-group" aria-hidden="true">
              {row1Testimonials.map((item, idx) =>
                renderCard(item, `r1-b-${idx}`)
              )}
            </div>
          </div>

          {/* Row 2: Scrolling Right / Alternating */}
          <div className="testimonials-row testimonials-row-right">
            <div className="testimonials-group">
              {row2Testimonials.map((item, idx) =>
                renderCard(item, `r2-a-${idx}`)
              )}
            </div>
            <div className="testimonials-group" aria-hidden="true">
              {row2Testimonials.map((item, idx) =>
                renderCard(item, `r2-b-${idx}`)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
