"use client";

import { useState } from "react";
import Link from "next/link";
import "./GallerySection.css";
import { ArrowRight } from "lucide-react";
import GalleryLightbox from "./GalleryLightbox";

// Local gallery images
import gallery1 from "@/assets/gallery/Image.webp";
import gallery2 from "@/assets/gallery/Image (1).webp";
import gallery3 from "@/assets/gallery/Image (2).webp";
import gallery4 from "@/assets/gallery/Image (3).webp";
import gallery5 from "@/assets/gallery/Image (4).webp";
import gallery6 from "@/assets/gallery/Image (5).webp";
import gallery7 from "@/assets/gallery/Image (6).webp";
import gallery8 from "@/assets/gallery/Image (8).webp";
import gallery9 from "@/assets/gallery/Image (7).webp";

const galleryPhotos = [
    {
        id: 1,
        title: "Front elevation",
        category: "EXTERIOR",
        image: gallery1,
    },
    {
        id: 2,
        title: "Entrance and driveway",
        category: "EXTERIOR",
        image: gallery2,
    },
    {
        id: 3,
        title: "Living room",
        category: "INTERIOR",
        image: gallery3,
    },
    {
        id: 4,
        title: "Kitchen and dining",
        category: "INTERIOR",
        image: gallery4,
    },
    {
        id: 5,
        title: "Balconies and facade detail",
        category: "EXTERIOR",
        image: gallery5,
    },
    {
        id: 6,
        title: "Living room with corner sofa",
        category: "INTERIOR",
        image: gallery6,
    },
    {
        id: 7,
        title: "Living room with TV unit",
        category: "INTERIOR",
        image: gallery7,
    },
    {
        id: 8,
        title: "Materials and finishes",
        category: "INTERIOR",
        image: gallery8,
    },
    {
        id: 9,
        title: "EV charging",
        category: "EXTERIOR",
        image: gallery9,
    },
];

const filters = ["ALL", "INTERIOR", "EXTERIOR"];

export default function GallerySection() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [showAll, setShowAll] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredPhotos = galleryPhotos.filter((photo) => {
        return (
            activeFilter === "ALL" ||
            photo.category === activeFilter
        );
    });

    const visiblePhotos = showAll
        ? filteredPhotos
        : filteredPhotos.slice(0, 9);

    const handlePhotoClick = (photoId: number) => {
        const index = galleryPhotos.findIndex((p) => p.id === photoId);
        if (index !== -1) {
            setLightboxIndex(index);
        }
    };

    return (
        <main className="gallery-page">
            <section className="gallery-section">
                <header className="gallery-header">
                    <div className="why-coral-header">
                        <div className="why-coral-badge">
                            <span
                                className="why-coral-badge-dot"
                                aria-hidden="true"
                            />
                            <span>Gallery</span>
                        </div>

                        <h2 className="why-coral-title">
                            A closer look at Indu Coral
                        </h2>

                        <br />

                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: "500",
                                color: '#757575'
                            }}
                        >
                            Exterior and interior views of our G+5
                            residences in Besant Nagar.
                        </p>
                    </div>

                    <div
                        className="completed-filter-bar"
                        role="tablist"
                        aria-label="Project filter"
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                role="tab"
                                type="button"
                                aria-selected={activeFilter === filter}
                                className={`filter-tab-btn ${
                                    activeFilter === filter ? "active" : ""
                                }`}
                                onClick={() => {
                                    setActiveFilter(filter);
                                    setShowAll(false);
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="gallery-grid">
                    {visiblePhotos.map((photo) => (
                        <article
                            className="gallery-card"
                            key={photo.id}
                            onClick={() => handlePhotoClick(photo.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handlePhotoClick(photo.id);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`View larger photo: ${photo.title}`}
                        >
                            <div className="gallery-image-wrapper">
                                <img
                                    className="gallery-image"
                                    src={photo.image.src}
                                    alt={photo.title}
                                    loading={
                                        photo.id <= 3 ? "eager" : "lazy"
                                    }
                                />
                            </div>

                            <p className="gallery-caption">
                                {photo.title}
                            </p>
                        </article>
                    ))}
                </div>

                {filteredPhotos.length > 0 && (
                    <div className="coral-booking-submit-row">
                        <Link
                            href="/indu-coral/gallery"
                            className="btn-primary-blue coral-booking-submit-btn"
                            style={{ textDecoration: 'none' }}
                        >
                            <span>View all photos</span>

                            <span className="btn-icon-box">
                                <ArrowRight
                                    size={15}
                                    strokeWidth={2.2}
                                />
                            </span>
                        </Link>
                    </div>
                )}
            </section>

            {/* Lightbox Popup matching reference design */}
            <GalleryLightbox
                photos={galleryPhotos}
                currentIndex={lightboxIndex ?? 0}
                isOpen={lightboxIndex !== null}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(newIndex) => setLightboxIndex(newIndex)}
            />
        </main>
    );
}
