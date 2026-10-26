'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const Process = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineTrackRef = useRef<HTMLDivElement | null>(null);
  const lineProgressRef = useRef<HTMLDivElement | null>(null);
  const verticalLineTrackRef = useRef<HTMLDivElement | null>(null);
  const verticalLineProgressRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps: ProcessStep[] = [
    {
      step: 'STEP 01',
      title: 'Free Consultation',
      description: 'We visit and understand your vision and budget.',
    },
    {
      step: 'STEP 02',
      title: 'Design & Planning',
      description: 'Our engineers create a plan tailored to your land.',
    },
    {
      step: 'STEP 03',
      title: 'Construction',
      description: 'Quality materials, modern methods, honest updates.',
    },
    {
      step: 'STEP 04',
      title: 'Handover',
      description: 'We walk the finished home with you, together.',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const timeline = timelineRef.current;
      const lineTrack = lineTrackRef.current;
      const lineProgress = lineProgressRef.current;
      const badges = badgeRefs.current.filter(Boolean) as HTMLDivElement[];
      const stepItems = stepItemRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!section || !timeline || !lineTrack || !lineProgress || badges.length < 4) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', () => {
        // Measure exact badge centers to size and position the connecting line
        const updateLineGeometry = () => {
          const containerRect = timeline.getBoundingClientRect();
          const b0 = badges[0].getBoundingClientRect();
          const b3 = badges[3].getBoundingClientRect();
          const startX = b0.left + b0.width / 2 - containerRect.left;
          const endX = b3.left + b3.width / 2 - containerRect.left;
          const totalWidth = Math.max(endX - startX, 100);

          gsap.set(lineTrack, {
            left: startX,
            width: totalWidth,
          });
        };

        updateLineGeometry();

        // Initial visual states
        // Step 1 starts active
        gsap.set(badges[0], {
          backgroundColor: '#188BDF',
          color: '#ffffff',
          boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
        });
        gsap.set(stepItems[0], { opacity: 1 });

        // Steps 2, 3, 4 start inactive
        for (let i = 1; i < badges.length; i++) {
          gsap.set(badges[i], {
            backgroundColor: '#0E4875',
            color: '#41A6EF',
            boxShadow: 'none',
          });
          gsap.set(stepItems[i], { opacity: 0.5 });
        }

        // Progress fill starts at 0 width
        gsap.set(lineProgress, { scaleX: 0 });

        // Pinned scrub timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1300',
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            onRefresh: updateLineGeometry,
          },
        });

        // Step 1 -> Step 2
        tl.to(lineProgress, {
          scaleX: 0.3333,
          duration: 1,
          ease: 'none',
        })
          .to(
            badges[1],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[1],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Step 2 -> Step 3
          .to(lineProgress, {
            scaleX: 0.6667,
            duration: 1,
            ease: 'none',
          })
          .to(
            badges[2],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[2],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Step 3 -> Step 4
          .to(lineProgress, {
            scaleX: 1.0,
            duration: 1,
            ease: 'none',
          })
          .to(
            badges[3],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[3],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Hold briefly at end before unpinning
          .to({}, { duration: 0.35 });
      });

      mm.add('(max-width: 900px)', () => {
        const lineTrackVertical = verticalLineTrackRef.current;
        const lineProgressVertical = verticalLineProgressRef.current;
        if (!lineTrackVertical || !lineProgressVertical) return;

        // Measure exact badge centers to position vertical connecting line
        const updateVerticalLineGeometry = () => {
          const containerRect = timeline.getBoundingClientRect();
          const b0 = badges[0].getBoundingClientRect();
          const b3 = badges[3].getBoundingClientRect();

          const centerX = b0.left + b0.width / 2 - containerRect.left;
          const startY = b0.top + b0.height / 2 - containerRect.top;
          const endY = b3.top + b3.height / 2 - containerRect.top;
          const totalHeight = Math.max(endY - startY, 40);

          gsap.set(lineTrackVertical, {
            left: centerX - 1,
            top: startY,
            height: totalHeight,
          });
        };

        updateVerticalLineGeometry();

        // Initial visual states for mobile
        // Step 1 starts active
        gsap.set(badges[0], {
          backgroundColor: '#188BDF',
          color: '#ffffff',
          boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
        });
        gsap.set(stepItems[0], { opacity: 1 });

        // Steps 2, 3, 4 start inactive
        for (let i = 1; i < badges.length; i++) {
          gsap.set(badges[i], {
            backgroundColor: '#0E4875',
            color: '#41A6EF',
            boxShadow: 'none',
          });
          gsap.set(stepItems[i], { opacity: 0.45 });
        }

        // Vertical progress starts at scaleY: 0
        gsap.set(lineProgressVertical, { scaleY: 0 });

        // Pinned scrub timeline on mobile
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1200',
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            onRefresh: updateVerticalLineGeometry,
          },
        });

        // Step 1 -> Step 2
        tl.to(lineProgressVertical, {
          scaleY: 0.3333,
          duration: 1,
          ease: 'none',
        })
          .to(
            badges[1],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[1],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Step 2 -> Step 3
          .to(lineProgressVertical, {
            scaleY: 0.6667,
            duration: 1,
            ease: 'none',
          })
          .to(
            badges[2],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[2],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Step 3 -> Step 4
          .to(lineProgressVertical, {
            scaleY: 1.0,
            duration: 1,
            ease: 'none',
          })
          .to(
            badges[3],
            {
              backgroundColor: '#188BDF',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(24, 139, 223, 0.45)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            stepItems[3],
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<'
          )

          // Hold briefly at end before unpinning
          .to({}, { duration: 0.35 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" id="process" ref={sectionRef}>
      <div className="process-container">
        {/* Dark Card Wrapper */}
        <div className="process-card">
          {/* Top Header */}
          <div className="process-header">
            <div className="process-header-left">
              <div className="process-tag">
                <span className="process-tag-square" aria-hidden="true" />
                <span className="process-tag-text">Our Process</span>
              </div>
              <h2 className="process-title">
                Simple, from blueprint to handover.
              </h2>
            </div>

            <p className="process-header-description">
              No stress, no guesswork — just honest guidance and clear communication,
              from your first consultation to the final walkthrough.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="process-timeline" ref={timelineRef}>
            {/* Horizontal Connecting Track & Progress Line (Desktop) */}
            <div className="process-timeline-line" ref={lineTrackRef} aria-hidden="true">
              <div className="process-line-track" />
              <div className="process-line-progress" ref={lineProgressRef} />
            </div>

            {/* Vertical Connecting Track & Progress Line (Mobile) */}
            <div className="process-timeline-line-vertical" ref={verticalLineTrackRef} aria-hidden="true">
              <div className="process-line-track-vertical" />
              <div className="process-line-progress-vertical" ref={verticalLineProgressRef} />
            </div>

            <div className="process-steps-grid">
              {steps.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    stepItemRefs.current[idx] = el;
                  }}
                  className="process-step-item"
                >
                  <div
                    ref={(el) => {
                      badgeRefs.current[idx] = el;
                    }}
                    className="process-step-badge"
                  >
                    {item.step}
                  </div>
                  <div className="process-step-content">
                    <h3 className="process-step-title">{item.title}</h3>
                    <p className="process-step-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
