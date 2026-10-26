'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import './PrintAdLightbox.css';

export interface PrintAdModalItem {
  id: string;
  date: string;
  shortDate: string;
  publication: string;
  publications?: string[];
  files?: string[];
  title: string;
  thumbnail: any;
  popupImage: any;
  pdfUrl?: string;
}

interface PrintAdLightboxProps {
  ads?: PrintAdModalItem[];
  currentIndex?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: (index: number) => void;
}

export default function PrintAdLightbox({
  ads = [],
  currentIndex = 0,
  isOpen = false,
  onClose = () => {},
  onNavigate = () => {},
}: PrintAdLightboxProps) {
  const total = ads.length;
  const currentAd = ads[currentIndex];
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

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

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Scroll active thumbnail into view smoothly
  useEffect(() => {
    if (!isOpen || !thumbsContainerRef.current) return;
    const activeThumb = thumbsContainerRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex, isOpen]);

  if (!isOpen || !currentAd) return null;

  const currentImgSrc =
    typeof currentAd.popupImage === 'string'
      ? currentAd.popupImage
      : currentAd.popupImage?.src || currentAd.thumbnail?.src || currentAd.thumbnail;

  // Generate and download a standard PDF based on the currently displayed ad image
  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading || !currentAd) return;

    setIsDownloading(true);

    try {
      // 1. Load the active ad image into an Image object
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load ad image for PDF'));
        img.src = currentImgSrc;
      });

      // 2. Render to canvas to obtain clean JPEG data
      const canvas = document.createElement('canvas');
      const w = img.naturalWidth || 1200;
      const h = img.naturalHeight || 1600;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D canvas context');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const jpegBlob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to encode image to JPEG'));
          },
          'image/jpeg',
          0.94
        );
      });

      const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

      // 3. Page dimensions in standard PDF points (A4 width = 595.28 pt)
      const ptWidth = 595.28;
      const ptHeight = Number(((595.28 * h) / w).toFixed(2));

      // 4. Construct standard PDF-1.4 file
      const enc = new TextEncoder();
      const contentStream = `q\n${ptWidth} 0 0 ${ptHeight} 0 0 cm\n/Im1 Do\nQ\n`;
      const contentBytes = enc.encode(contentStream);

      const header = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
      const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
      const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
      const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptWidth} ${ptHeight}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`;
      const obj4Header = `4 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`;
      const obj4Footer = `\nendstream\nendobj\n`;
      const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
      const obj5Footer = `\nendstream\nendobj\n`;

      const headerBytes = enc.encode(header);
      const obj1Bytes = enc.encode(obj1);
      const obj2Bytes = enc.encode(obj2);
      const obj3Bytes = enc.encode(obj3);
      const obj4HBytes = enc.encode(obj4Header);
      const obj4FBytes = enc.encode(obj4Footer);
      const obj5HBytes = enc.encode(obj5Header);
      const obj5FBytes = enc.encode(obj5Footer);

      const offset1 = headerBytes.length;
      const offset2 = offset1 + obj1Bytes.length;
      const offset3 = offset2 + obj2Bytes.length;
      const offset4 = offset3 + obj3Bytes.length;
      const offset5 = offset4 + obj4HBytes.length + contentBytes.length + obj4FBytes.length;
      const startXref = offset5 + obj5HBytes.length + jpegBytes.length + obj5FBytes.length;

      const pad = (n: number) => n.toString().padStart(10, '0');
      const xref =
        `xref\n` +
        `0 6\n` +
        `0000000000 65535 f \n` +
        `${pad(offset1)} 00000 n \n` +
        `${pad(offset2)} 00000 n \n` +
        `${pad(offset3)} 00000 n \n` +
        `${pad(offset4)} 00000 n \n` +
        `${pad(offset5)} 00000 n \n` +
        `trailer\n` +
        `<< /Size 6 /Root 1 0 R >>\n` +
        `startxref\n` +
        `${startXref}\n` +
        `%%EOF\n`;
      const xrefBytes = enc.encode(xref);

      const pdfBlob = new Blob(
        [
          headerBytes,
          obj1Bytes,
          obj2Bytes,
          obj3Bytes,
          obj4HBytes,
          contentBytes,
          obj4FBytes,
          obj5HBytes,
          jpegBytes,
          obj5FBytes,
          xrefBytes,
        ],
        { type: 'application/pdf' }
      );

      // Clean filename for the active ad
      const datePart = (currentAd.date || currentAd.shortDate || 'Ad').replace(/[^a-zA-Z0-9]/g, '-');
      const filename = `Indu-Coral-${currentAd.publication || 'Print-Ad'}-${datePart}.pdf`;

      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 30000);
    } catch (err) {
      console.error('Error generating PDF from image:', err);
      // Fallback: download the ad image file
      const link = document.createElement('a');
      link.href = currentImgSrc;
      link.download = `Indu-Coral-Print-Ad-${currentAd.shortDate}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="print-ad-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Print Advertisement Lightbox"
      onClick={onClose}
    >
      {/* 1. Top Header Bar */}
      <header className="print-ad-modal-header">
        <div className="print-ad-modal-counter">
          Print ad {currentIndex + 1} of {total}
        </div>

        <div className="print-ad-modal-actions">
          {/* "Download PDF ->" Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadPdf(e);
            }}
            disabled={isDownloading}
            className="print-ad-download-pdf-btn"
            aria-label="Download advertisement PDF"
          >
            <span>{isDownloading ? 'Preparing PDF...' : 'Download PDF'}</span>
            <span className="print-ad-pdf-icon-box" aria-hidden="true">
              <ArrowRight size={13} strokeWidth={2.4} />
            </span>
          </button>

          {/* Close "X" Button */}
          <button
            type="button"
            className="print-ad-modal-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close lightbox"
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>
      </header>

      {/* 2. Center Stage: Left Arrow, Main Poster Image, Right Arrow */}
      <div className="print-ad-modal-stage">
        {/* Left Arrow Button */}
        <button
          type="button"
          className="print-ad-stage-nav-btn print-ad-stage-prev"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous advertisement"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        {/* Center Poster Image */}
        <div className="print-ad-stage-img-wrap">
          <img
            key={currentAd.id}
            src={currentImgSrc}
            alt={currentAd.title}
            className="print-ad-stage-img"
          />
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="print-ad-stage-nav-btn print-ad-stage-next"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next advertisement"
        >
          <ArrowRight size={20} strokeWidth={2.4} />
        </button>
      </div>

      {/* 3. Footer: Caption & Thumbnail Strip */}
      <footer className="print-ad-modal-footer">
        {/* Caption */}
        <div className="print-ad-modal-caption-wrap">
          <h3 className="print-ad-modal-title">
            {currentAd.publication}, {currentAd.date}
          </h3>
        </div>

        {/* Thumbnails Strip: All thumbnails show their image */}
        <div
          ref={thumbsContainerRef}
          className="print-ad-modal-thumbnails-strip"
          role="tablist"
          aria-label="Newspaper advertisements thumbnails"
        >
          {ads.map((ad, idx) => {
            const isActive = idx === currentIndex;
            const thumbImgSrc =
              typeof ad.thumbnail === 'string'
                ? ad.thumbnail
                : ad.thumbnail?.src || ad.popupImage?.src || ad.popupImage;

            return (
              <button
                key={ad.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`print-ad-thumb-col ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(idx);
                }}
                aria-label={`View ad from ${ad.date}`}
              >
                {/* Document Card Shape showing the ad image */}
                <div className="print-ad-thumb-card">
                  <img
                    src={thumbImgSrc}
                    alt={ad.title || `Print ad ${ad.shortDate}`}
                    className="print-ad-thumb-img"
                    loading="eager"
                  />
                  {!isActive && (
                    <div className="print-ad-thumb-dim-overlay" aria-hidden="true" />
                  )}
                </div>

                {/* Short Date Label */}
                <span className="print-ad-thumb-label">{ad.shortDate}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
