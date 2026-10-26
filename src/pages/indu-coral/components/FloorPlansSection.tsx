'use client';

import React, { useState } from 'react';
import {
  Car,
  Shield,
  Zap,
  Gamepad2,
  Compass,
  Layers,
  Home,
  Sparkles,
  Building,
  Maximize2,
  MoveHorizontal,
  Trees,
  ArrowUpDown,
  Repeat,
  LayoutGrid,
  Sunset
} from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import stiltPlanImg from '../../../assets/indu-coral/floor-plans/1-Stilt-plan.webp';
import firstFloorImg from '../../../assets/indu-coral/floor-plans/2-First-floor-plan.webp';
import typicalFloorImg from '../../../assets/indu-coral/floor-plans/3-Typical-floor-plan.webp';
import flatAImg from '../../../assets/indu-coral/floor-plans/4-Flat-A.webp';
// import flatBImg from '../../../assets/indu-coral/floor-plans/5-Flat-B.webp';
import flatDImg from '../../../assets/indu-coral/floor-plans/6-Flat-D.webp';
import terraceImg from '../../../assets/indu-coral/floor-plans/7-Terrace-plan.webp';

import './FloorPlansSection.css';

interface FloorPlanHighlight {
  icon: React.ReactNode;
  text: string;
}

interface FloorPlanData {
  id: string;
  tabLabel: string;
  title: string;
  level: string;
  image: StaticImageData;
  alt: string;
  highlights: FloorPlanHighlight[];
}

const floorPlans: FloorPlanData[] = [
  {
    id: 'stilt',
    tabLabel: 'Stilt plan',
    title: 'Stilt plan',
    level: 'Ground level',
    image: stiltPlanImg,
    alt: 'Indu Coral stilt floor plan layout with covered parking and amenities',
    highlights: [
      {
        icon: <Car size={16} strokeWidth={2.2} />,
        text: 'Covered car parking, two driveways'
      },
      {
        icon: <Shield size={16} strokeWidth={2.2} />,
        text: 'Association room and security room'
      },
      {
        icon: <Zap size={16} strokeWidth={2.2} />,
        text: 'Electrical and admin rooms'
      },
      {
        icon: <Gamepad2 size={16} strokeWidth={2.2} />,
        text: "Indoor games room and kids' play area"
      }
    ]
  },
  {
    id: 'first-floor',
    tabLabel: 'First floor',
    title: 'First floor plan',
    level: 'Living spaces begin here',
    image: firstFloorImg,
    alt: 'Indu Coral first floor residential layout',
    highlights: [
      {
        icon: <Building size={16} strokeWidth={2.2} />,
        text: 'Flats A through H on this level'
      },
      {
        icon: <MoveHorizontal size={16} strokeWidth={2.2} />,
        text: '5\' - 6" wide corridors'
      },
      {
        icon: <Trees size={16} strokeWidth={2.2} />,
        text: 'Shared landscaped central courtyard'
      },
      {
        icon: <ArrowUpDown size={16} strokeWidth={2.2} />,
        text: 'Lift and staircase access on both wings'
      }
    ]
  },
  {
    id: 'typical-floor',
    tabLabel: 'Typical floor 2–5',
    title: 'Typical floor (2–5)',
    level: 'Repeats on floors 2, 3, 4 and 5',
    image: typicalFloorImg,
    alt: 'Indu Coral typical floors 2 to 5 architectural floor plan',
    highlights: [
      {
        icon: <Repeat size={16} strokeWidth={2.2} />,
        text: 'Same layout repeats across four floors'
      },
      {
        icon: <LayoutGrid size={16} strokeWidth={2.2} />,
        text: 'Same flat arrangement as the first floor'
      },
      {
        icon: <MoveHorizontal size={16} strokeWidth={2.2} />,
        text: '5\'-6" wide corridors'
      },
      {
        icon: <ArrowUpDown size={16} strokeWidth={2.2} />,
        text: 'Lift and staircase access on both wings'
      }
    ]
  },
  {
    id: 'flat-a',
    tabLabel: 'Flat A',
    title: 'Flat A',
    level: '3 BHK',
    image: flatAImg,
    alt: 'Indu Coral Flat A 3 BHK spacious unit layout',
    highlights: [
      {
        icon: <Home size={16} strokeWidth={2.2} />,
        text: '1,800 sq. ft. saleable area'
      },
      {
        icon: <Maximize2 size={16} strokeWidth={2.2} />,
        text: '1,501 sq. ft. carpet area'
      },
      {
        icon: <Layers size={16} strokeWidth={2.2} />,
        text: '683 sq. ft. UDS'
      },
      {
        icon: <Compass size={16} strokeWidth={2.2} />,
        text: 'North facing'
      }
    ]
  },
  // {
  //   id: 'flat-b',
  //   tabLabel: 'Flat B',
  //   title: 'Flat B',
  //   level: '2 BHK',
  //   image: flatBImg,
  //   alt: 'Indu Coral Flat B layout plan',
  //   highlights: [
  //     {
  //       icon: <Home size={16} strokeWidth={2.2} />,
  //       text: '1,030 sq. ft. saleable area'
  //     },
  //     {
  //       icon: <Maximize2 size={16} strokeWidth={2.2} />,
  //       text: '836 sq. ft. carpet area'
  //     },
  //     {
  //       icon: <Layers size={16} strokeWidth={2.2} />,
  //       text: '391 sq. ft. UDS'
  //     },
  //     {
  //       icon: <Compass size={16} strokeWidth={2.2} />,
  //       text: 'North facing'
  //     }
  //   ]
  // },
  {
    id: 'flat-d',
    tabLabel: 'Flat D',
    title: 'Flat D',
    level: '3 BHK',
    image: flatDImg,
    alt: 'Indu Coral Flat D 2 BHK layout plan',
    highlights: [
      {
        icon: <Home size={16} strokeWidth={2.2} />,
        text: '1,800 sq. ft. saleable area'
      },
      {
        icon: <Maximize2 size={16} strokeWidth={2.2} />,
        text: '1,501 sq. ft. carpet area'
      },
      {
        icon: <Layers size={16} strokeWidth={2.2} />,
        text: '683 sq. ft. UDS'
      },
      {
        icon: <Compass size={16} strokeWidth={2.2} />,
        text: 'East facing'
      }
    ]
  },
  {
    id: 'terrace',
    tabLabel: 'Terrace',
    title: 'Terrace floor plan',
    level: 'Rooftop amenities',
    image: terraceImg,
    alt: 'Indu Coral rooftop amenity deck and terrace floor plan',
    highlights: [
      {
        icon: <Sunset size={16} strokeWidth={2.2} />,
        text: 'Rooftop gazebo and sunset deck'
      },
      {
        icon: <Sparkles size={16} strokeWidth={2.2} />,
        text: 'Yoga deck and open party area'
      },
      {
        icon: <Zap size={16} strokeWidth={2.2} />,
        text: 'Solar panel installation'
      },
      {
        icon: <Trees size={16} strokeWidth={2.2} />,
        text: 'Landscaped open terraces'
      }
    ]
  }
];

export const FloorPlansSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('stilt');

  const currentPlan = floorPlans.find((plan) => plan.id === activeTabId) || floorPlans[0];

  return (
    <section className="floor-plans-section" id="floor-plans">
      <div className="floor-plans-container">
        {/* Section Header */}
        <div className="floor-plans-header">
          <h2 className="floor-plans-title">Floor plans</h2>
          <p className="floor-plans-subtitle">
            Explore every level of Indu Coral, from the stilt floor to individual flat layouts.
          </p>

          {/* Floor Navigation Tabs */}
          <div className="floor-plans-tabs" role="tablist" aria-label="Floor plan levels">
            {floorPlans.map((plan) => {
              const isActive = plan.id === activeTabId;
              return (
                <button
                  key={plan.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`floor-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTabId(plan.id)}
                >
                  {plan.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floor Plan Display Card */}
        <div className="floor-plan-card">
          {/* Left Column: Image Preview */}
          <div className="floor-plan-image-col">
            <div className="floor-plan-image-frame">
              <Image
                src={currentPlan.image}
                alt={currentPlan.alt}
                className="floor-plan-img"
              />
            </div>
          </div>

          {/* Right Column: Floor Details & Highlights */}
          <div className="floor-plan-details-col">
            <span className="floor-plan-kicker">Floor plans</span>
            <h3 className="floor-plan-heading">{currentPlan.title}</h3>
            <p className="floor-plan-level">{currentPlan.level}</p>

            <div className="floor-plan-highlights">
              {currentPlan.highlights.map((highlight, idx) => (
                <div key={idx} className="floor-highlight-item">
                  <span className="floor-highlight-icon-box" aria-hidden="true">
                    {highlight.icon}
                  </span>
                  <span className="floor-highlight-text">{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorPlansSection;
