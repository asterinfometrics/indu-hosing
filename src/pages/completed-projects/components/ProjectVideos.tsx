'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import krishnaImg from '../../../assets/completed-projects/projects/krishna.webp';
import chandImg from '../../../assets/completed-projects/projects/chand.webp';
import diamondImg from '../../../assets/completed-projects/projects/diamond.webp';
import './ProjectVideos.css';

interface ProjectVideoItem {
  id: string;
  title: string;
  location: string;
  image: StaticImageData;
  youtubeUrl: string;
  isFeatured?: boolean;
}

const projectVideos: ProjectVideoItem[] = [
  {
    id: 'krishna',
    title: 'Krishna',
    location: 'Besant Nagar, Chennai',
    image: krishnaImg,
    youtubeUrl: 'https://youtu.be/QR-FbOPcupU?si=LEZ4vKhUpHrC86ed'
  },
  {
    id: 'chand',
    title: 'Chand',
    location: 'Besant Nagar, Chennai',
    image: chandImg,
    youtubeUrl: 'https://youtu.be/ujz0ExZCLyM?si=TLZm_NbkLQAGbaGn',

    isFeatured: true
  },
  {
    id: 'diamond',
    title: 'Diamond',
    location: 'Besant Nagar, Chennai',
    image: diamondImg,
    youtubeUrl: 'https://youtu.be/jPp0rIX-rr0?si=rp-FYThQ02A4vpSr',

  }
];

export const ProjectVideos: React.FC = () => {
  return (
    <section className="project-videos-section" id="project-videos">
      <div className="project-videos-container">
        {/* Header */}
        <div className="project-videos-header">
          <div className="project-videos-header-left">
            <div className="project-videos-badge">
              <span className="project-videos-badge-dot" aria-hidden="true" />
              <span>Project videos</span>
            </div>

            <h2 className="project-videos-title">
              See our completed projects on video
            </h2>

            <p className="project-videos-desc">
              Three finished redevelopment projects in Besant Nagar. Videos open on YouTube.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@InduHousingdevelopment"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-blue project-videos-cta"
            aria-label="Visit our YouTube channel"
          >
            <span>Visit our YouTube channel</span>
            <span className="btn-icon-box">
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </a>
        </div>

        {/* 3-Card Grid */}
        <div className="project-videos-grid">
          {projectVideos.map((video) => (
            <article key={video.id} className="project-video-card">
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-video-thumb-link"
                aria-label={`Watch ${video.title} on YouTube`}
              >
                <div className="project-video-thumb-wrapper">
                  <Image
                    src={video.image}
                    alt={`${video.title} completed project in ${video.location}`}
                    className="project-video-img"
                    sizes="(max-width: 767px) 100vw, (max-width: 1200px) 33vw, 420px"
                  />
                  <div
                    className={`project-video-play-btn ${video.isFeatured ? 'project-video-play-btn--featured' : ''
                      }`}
                  >
                    <Play size={20} fill="#ffffff" color="#ffffff" className="project-play-icon" />
                  </div>
                </div>
              </a>

              <div className="project-video-info">
                <h3 className="project-video-card-title">{video.title}</h3>
                <p className="project-video-card-location">{video.location}</p>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-video-watch-link"
                >
                  <span>Watch on YouTube</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectVideos;
