'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  productAlt?: string;
}

export default function ImageGallery({ images, productName, productAlt }: ImageGalleryProps) {
  const baseAlt = productAlt ?? productName;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasImages = images && images.length > 0;
  const lightboxRef = useFocusTrap<HTMLDivElement>(lightboxOpen);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, images.length]);

  const nextImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const totalImages = hasImages ? images.length : 0;

  return (
    <div className="space-y-6">
      {/* Main image - Portrait aspect ratio */}
      <div className="relative aspect-[4/3] bg-[var(--surface)] rounded-3xl overflow-hidden group border-2 border-[var(--card-border)]/10">
        {hasImages ? (
          <Image
            src={images[currentIndex]}
            alt={`${baseAlt} (image ${currentIndex + 1} of ${totalImages})`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-600 text-sm">Image Coming Soon</span>
          </div>
        )}

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />

        {/* Zoom trigger — a sibling of the nav controls, so their clicks never
            bubble into it. Covers the image area. */}
        {hasImages && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-haspopup="dialog"
            aria-label={`View larger image of ${productName}`}
            className="absolute inset-0 cursor-zoom-in"
          >
            <span className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300">
              <ZoomIn className="w-4 h-4 text-[var(--accent-strong)]" />
            </span>
          </button>
        )}

        {/* Navigation - always visible on mobile, revealed on hover or keyboard focus on desktop */}
        {totalImages > 1 && (
          <div className="absolute inset-x-0 bottom-0 p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-500">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevImage}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-[var(--accent)]/10 hover:shadow-lg transition-all duration-300 shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--accent-strong)]" />
              </button>

              {/* Animated dots */}
              <div className="flex">
                {Array.from({ length: totalImages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    aria-current={currentIndex === i ? 'true' : undefined}
                    className="flex items-center justify-center p-2"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-500 ${
                        currentIndex === i
                          ? 'bg-[var(--accent)] w-6'
                          : 'bg-white/60 hover:bg-[var(--accent)]/50 w-2'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={nextImage}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-[var(--accent)]/10 hover:shadow-lg transition-all duration-300 shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-[var(--accent-strong)]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Announce image changes to screen readers */}
      {totalImages > 1 && (
        <p className="sr-only" role="status" aria-live="polite">
          Image {currentIndex + 1} of {totalImages}
        </p>
      )}

      {/* Thumbnails - refined styling */}
      {hasImages && totalImages > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : undefined}
              className={`
                relative aspect-square rounded-2xl overflow-hidden border-2
                transition-all duration-500
                ${currentIndex === index
                  ? 'border-[var(--card-border)] ring-2 ring-[var(--accent)] ring-offset-2 shadow-sm shadow-[var(--accent)]/10'
                  : 'border-[var(--card-border)]/10 opacity-70 hover:opacity-100 hover:border-[var(--card-border)]/30'
                }
              `}
            >
              <Image
                src={image}
                alt={`${baseAlt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox — backdrop click is pointer convenience; Escape and the
          labeled Close button are the keyboard paths */}
      {lightboxOpen && hasImages && createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image viewer`}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            data-autofocus
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image — stops backdrop-close clicks from firing when clicking the image */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${baseAlt} (image ${currentIndex + 1} of ${totalImages})`}
              width={1500}
              height={1200}
              className="object-contain w-full h-full max-h-[90vh] rounded-2xl"
            />
          </div>

          {/* Arrow navigation (only if multiple images) */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                type="button"
                className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
