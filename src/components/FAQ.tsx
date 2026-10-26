'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import logoImg from '../assets/logo/logo.png';
import faqPattern from '../assets/home/faq-pattern.svg';
import './FAQ.css';
import Image from 'next/image';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: '1. What kind of homes does Indu Housing build?',
      answer:
        'We specialize in standalone luxury villas, personalized single-family homes, and multi-unit residential apartment developments designed around your family’s layout and lifestyle.',
    },
    {
      id: 2,
      question: '2 . How long does a typical project take to complete?',
      answer:
        'Independent homes and villas typically take 8 to 12 months, while larger multi-unit apartment complexes take between 14 and 20 months with transparent timeline milestones throughout.',
    },
    {
      id: 3,
      question: '3. Do you handle building approvals and government permissions?',
      answer:
        'Yes, we provide end-to-end liaison services for CMDA/DTCP plan sanctions, local municipal clearances, utility connections, and full statutory compliance.',
    },
    {
      id: 4,
      question: '4. Can I customize the design of my home?',
      answer:
        'Absolutely. Our in-house civil engineers and architecture team work with you to tailor floor plans, room configurations, and material finishes according to your taste and Vastu requirements.',
    },
    {
      id: 5,
      question: '5 . What happens during the free consultation?',
      answer:
        'Our senior engineers visit your site or meet at our office to understand your vision, assess plot parameters, discuss feasibility, and provide clear guidance without hard selling.',
    },
    {
      id: 6,
      question: '6. Is your ongoing project, Indu Coral, RERA registered?',
      answer:
        'Yes, Indu Coral in Besant Nagar is fully registered with TNRERA and adheres to all structural, fire, and municipal regulatory guidelines.',
    },
    {
      id: 7,
      question: '7. What support do I get after handover?',
      answer:
        'We provide a comprehensive handover walkthrough, warranty coverage for workmanship, and reliable post-completion maintenance support whenever you need assistance.',
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Left Column: Header + CTA Card */}
        <div className="faq-left-col">
          <div className="faq-tag">
            <span className="faq-tag-square" aria-hidden="true" />
            <span className="faq-tag-text">Frequently Asked Questions</span>
          </div>

          <h2 className="faq-title">
            Answers to Your Home-<br />
            Building Questions
          </h2>

          {/* CTA Blue Card with Geometric Pattern */}
          <div className="faq-cta-card">
            {/* Pattern Overlay */}
            <div
              className="faq-cta-pattern"
              style={{ backgroundImage: `url(${faqPattern.src})` }}
              aria-hidden="true"
            />

            <div className="faq-cta-content">
              {/* White Logo Circle */}
              <div className="faq-logo-circle">
                <Image
                  src={logoImg}
                  alt="Indu Housing"
                  className="faq-logo-img"
                />
              </div>

              <h3 className="faq-cta-title">Still have questions?</h3>
              <p className="faq-cta-subtitle">
                Talk to our team for honest answers — no obligation, no hard selling.
              </p>

              <Link href="/contact" className="btn-primary-white faq-cta-button">
                <span>Talk to our Team</span>
                <span className="btn-icon-box">
                  <ArrowRight size={15} strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="faq-right-col">
          <div className="faq-accordion-list">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isOpen ? (
                        <Minus size={18} strokeWidth={2.2} />
                      ) : (
                        <Plus size={18} strokeWidth={2.2} />
                      )}
                    </span>
                  </button>

                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
