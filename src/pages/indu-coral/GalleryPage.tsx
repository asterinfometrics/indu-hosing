
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./GalleryPage.css";
import GalleryLightbox from "./components/GalleryLightbox";

import gallery1 from "@/assets/gallerypage/Image.webp";
import gallery2 from "@/assets/gallerypage/Image1.webp";
import gallery3 from "@/assets/gallerypage/Image4.webp";
import gallery4 from "@/assets/gallerypage/Image7.webp";
import gallery5 from "@/assets/gallerypage/Image9.webp";
import gallery6 from "@/assets/gallerypage/Image5.webp";
import gallery7 from "@/assets/gallerypage/Image6.webp";
import gallery8 from "@/assets/gallerypage/Image10.webp";
import gallery9 from "@/assets/gallerypage/Image2.webp";


type Photo = {
    id: number;
    title: string;
    category: "exterior" | "interior";
    image: { src: string } | string;
    layout?: string;
};

const photos: Photo[] = [
    {
        id: 1,
        title: "Front elevation",
        category: "exterior",
        image: gallery1,
        layout: "featured",
    },
    {
        id: 2,
        title: "Entrance and driveway",
        category: "exterior",
        image: gallery2,
    },
    {
        id: 3,
        title: "Balconies and facade detail",
        category: "exterior",
        image: gallery5,
        layout: "tall",
    },
    {
        id: 4,
        title: "Entrance with EV charging",
        category: "exterior",
        image: gallery9,
    },
    {
        id: 5,
        title: "Living room",
        category: "interior",
        image: gallery3,
        layout: "tall",
    },
    {
        id: 6,
        title: "Living room and dining area",
        category: "interior",
        image: gallery6,
    },
    {
        id: 7,
        title: "Living room with corner sofa",
        category: "interior",
        image: gallery7,
    },
    {
        id: 8,
        title: "Kitchen and dining",
        category: "interior",
        image: gallery4,
    },
    {
        id: 9,
        title: "Materials and finishes",
        category: "interior",
        image: gallery8,
    },
];


const filters = ["ALL 9", "EXTERIOR 4", "INTERIOR 5"];

function PhotoCard({
    photo,
    className = "",
    onClick,
}: {
    photo: Photo;
    className?: string;
    onClick?: () => void;
}) {
    const imgSrc =
        typeof photo.image === "string"
            ? photo.image
            : photo.image.src;

    return (
        <article
            className={`photo-card ${className}`}
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label={`View larger photo: ${photo.title}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
        >
            <div className="photo-frame">
                <img
                    src={imgSrc}
                    alt={photo.title}
                    loading={photo.id === 1 ? "eager" : "lazy"}
                    decoding="async"
                    onError={() => {
                        console.error(
                            `Failed to load gallery image: ${photo.title}`,
                            imgSrc
                        );
                    }}
                />

                <div className="photo-overlay" aria-hidden="true" />

                <div className="photo-caption">
                    <span className="photo-category">
                        {photo.category === "exterior" ? "Exterior" : "Interior"}
                    </span>

                    <span className="photo-title">{photo.title}</span>
                </div>
            </div>

            <h2 className="photo-bottom-title">{photo.title}</h2>
        </article>
    );
}

export default function InduCoralGallery() {
    const [activeFilter, setActiveFilter] = useState("ALL 9");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const isAll = activeFilter === "ALL 9";
    const isExterior = activeFilter === "EXTERIOR 4";
    const isInterior = activeFilter === "INTERIOR 5";

    const filteredPhotos = photos.filter((photo) => {
        if (isAll) return true;
        if (isExterior) return photo.category === "exterior";
        if (isInterior) return photo.category === "interior";
        return false;
    });

    const exteriorPhotos = filteredPhotos.filter(
        (photo) => photo.category === "exterior"
    );

    const interiorPhotos = filteredPhotos.filter(
        (photo) => photo.category === "interior"
    );

    return (
        <main className="indu-page">
            <div className="page-container">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/indu-coral">Projects</Link>
                    <span>/</span>
                    <Link href="/indu-coral">Indu Coral</Link>
                    <span>/</span>
                    <span style={{ color: "#000000" }}>Gallery</span>

                    <Link className="back-link" href="/indu-coral">
                        <ArrowLeft size={18} strokeWidth={2.2} />
                        <span>Back to Indu Coral</span>
                    </Link>
                </nav>

                <header className="page-header">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        INDU CORAL
                    </span>

                    <h1>Indu Coral Gallery</h1>

                    <p style={{ fontFamily: "var(--font-body)", color: '#1a1a17' }}>
                        Exterior and interior views of our G+5 residences in Besant Nagar.
                    </p>

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
                                className={`filter-tab-btn ${activeFilter === filter ? "active" : ""
                                    }`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                {(isAll || isExterior) && (
                    <section className="gallery-section">
                        <div className="section-heading">
                            <h2>
                                Exterior{" "}
                                <span
                                    style={{
                                        color: "#757575",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    4 images
                                </span>
                            </h2>
                        </div>

                        {exteriorPhotos.length > 0 && (
                            <div className="exterior-gallery">
                                <PhotoCard
                                    photo={exteriorPhotos[0]}
                                    className="featured-photo"
                                    onClick={() => {
                                        const idx = photos.findIndex(p => p.id === exteriorPhotos[0].id);
                                        if (idx !== -1) setLightboxIndex(idx);
                                    }}
                                />

                                <div className="exterior-secondary">
                                    {exteriorPhotos.slice(1).map((photo) => (
                                        <PhotoCard
                                            key={photo.id}
                                            photo={photo}
                                            className={
                                                photo.layout === "tall" ? "exterior-tall" : ""
                                            }
                                            onClick={() => {
                                                const idx = photos.findIndex(p => p.id === photo.id);
                                                if (idx !== -1) setLightboxIndex(idx);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {(isAll || isInterior) && (
                    <section className="gallery-section interior-section">
                        <div className="section-heading">
                            <h2>
                                Interior{" "}
                                <span
                                    style={{
                                        color: "#757575",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    5 images
                                </span>
                            </h2>
                        </div>

                        <div className="interior-gallery">
                            {interiorPhotos.map((photo, index) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    className={index === 0 ? "interior-tall" : ""}
                                    onClick={() => {
                                        const idx = photos.findIndex(p => p.id === photo.id);
                                        if (idx !== -1) setLightboxIndex(idx);
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <GalleryLightbox
                photos={photos}
                currentIndex={lightboxIndex ?? 0}
                isOpen={lightboxIndex !== null}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(newIndex) => setLightboxIndex(newIndex)}
            />
        </main>
    );
}
