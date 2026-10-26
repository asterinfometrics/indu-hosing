"use client";

import { useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import "./GalleryLightbox.css";

export type LightboxPhoto = {
    id: number | string;
    title: string;
    category?: string;
    image: { src: string } | string;
};

interface GalleryLightboxProps {
    photos: LightboxPhoto[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
    photos = [],
    currentIndex = 0,
    isOpen = false,
    onClose = () => {},
    onNavigate = () => {},
}: Partial<GalleryLightboxProps> = {}) {
    const total = photos?.length ?? 0;
    const currentPhoto = photos?.[currentIndex];

    const handlePrev = useCallback(() => {
        if (total === 0) return;
        const prevIndex = (currentIndex - 1 + total) % total;
        onNavigate(prevIndex);
    }, [currentIndex, total, onNavigate]);

    const handleNext = useCallback(() => {
        if (total === 0) return;
        const nextIndex = (currentIndex + 1) % total;
        onNavigate(nextIndex);
    }, [currentIndex, total, onNavigate]);

    // Keyboard navigation: Escape to close, Left/Right arrows to navigate
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        // Prevent background scrolling while modal is active
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose, handlePrev, handleNext]);

    if (!isOpen || !currentPhoto) return null;

    const currentImgSrc =
        typeof currentPhoto.image === "string"
            ? currentPhoto.image
            : currentPhoto.image.src;

    return (
        <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                type="button"
                className="lightbox-close-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close lightbox"
            >
                <X size={20} strokeWidth={2.4} />
            </button>

            {/* Lightbox Main Container */}
            <div className="lightbox-content">
                {/* Main Image Stage with Nav Buttons */}
                <div className="lightbox-stage">
                    <button
                        type="button"
                        className="lightbox-nav-btn lightbox-nav-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        aria-label="Previous photo"
                    >
                        <ArrowLeft size={20} strokeWidth={2.4} />
                    </button>

                    <div className="lightbox-image-box">
                        <img
                            key={currentPhoto.id}
                            src={currentImgSrc}
                            alt={currentPhoto.title}
                            className="lightbox-main-image"
                        />
                    </div>

                    <button
                        type="button"
                        className="lightbox-nav-btn lightbox-nav-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        aria-label="Next photo"
                    >
                        <ArrowRight size={20} strokeWidth={2.4} />
                    </button>
                </div>

                {/* Caption Title */}
                <p className="lightbox-caption">{currentPhoto.title}</p>

                {/* Thumbnail Strip */}
                <div
                    className="lightbox-thumbnails-wrapper"
                    role="tablist"
                    aria-label="Gallery thumbnails"
                >
                    <div className="lightbox-thumbnails">
                        {photos.map((photo, index) => {
                            const thumbSrc =
                                typeof photo.image === "string"
                                    ? photo.image
                                    : photo.image.src;
                            const isActive = index === currentIndex;

                            return (
                                <button
                                    key={photo.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`lightbox-thumb-btn ${isActive ? "active" : ""
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate(index);
                                    }}
                                    aria-label={`View ${photo.title}`}
                                >
                                    <img
                                        src={thumbSrc}
                                        alt={photo.title}
                                        className="lightbox-thumb-img"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
