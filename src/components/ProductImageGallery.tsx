import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Expand, Heart, X, ImageOff } from 'lucide-react';
import { ProductGalleryImage } from '../data/richProductContent';

interface ProductImageGalleryProps {
  images: ProductGalleryImage[];
  productName: string;
  brand: string;
  isPopular?: boolean;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductImageGallery({
  images,
  productName,
  brand,
  isPopular,
  isWishlisted,
  onToggleWishlist,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setIsZoomed(false);
    setFailedImages({});
  }, [productName]);

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentImage?.enableZoom) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Trigger horizontal slide swipe only if clearly horizontal (>40px)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
  };

  if (!currentImage) return null;

  return (
    <div className="w-full min-w-0 flex flex-col gap-2.5 sm:gap-3">
      {/* Main Viewport Stage (Touch-Swipeable on Mobile) */}
      <div
        className={`relative w-full bg-white rounded-2xl aspect-square overflow-hidden border border-zinc-200 shadow-sm group select-none ${
          currentImage.enableZoom ? 'md:cursor-zoom-in cursor-pointer' : 'cursor-pointer'
        }`}
        onMouseEnter={() => {
          if (currentImage.enableZoom) setIsZoomed(true);
        }}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Top Utility Controls */}
        <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 flex items-center gap-2 pointer-events-none">
          {isPopular && (
            <span className="bg-ivory/90 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md">
              Best Seller
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="Open fullscreen gallery"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/80 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Expand className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/80 flex items-center justify-center text-zinc-700 hover:text-rose-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Active Image or Resilient Fallback */}
        {failedImages[activeIndex] ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-royale-surface text-ivory/60 p-6 sm:p-8 text-center">
            <ImageOff className="w-10 h-10 mb-3 text-gold" />
            <p className="text-sm font-serif text-ivory">{productName}</p>
            <p className="text-xs text-zinc-500 mt-1">{brand} · {currentImage.label}</p>
          </div>
        ) : (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            referrerPolicy="no-referrer"
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailedImages((prev) => ({ ...prev, [activeIndex]: true }))}
            className={`w-full h-full transition-opacity duration-200 ${
              currentImage.objectFit === 'contain' ? 'object-contain p-3 sm:p-5 lg:p-6' : 'object-cover'
            } ${isZoomed && currentImage.enableZoom ? 'md:opacity-0 opacity-100' : 'opacity-100'}`}
          />
        )}

        {/* Desktop Hover Zoom Lens */}
        {currentImage.enableZoom && !failedImages[activeIndex] && (
          <div
            className={`hidden md:block absolute inset-0 bg-white bg-no-repeat pointer-events-none transition-opacity duration-150 ${
              isZoomed ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${currentImage.src})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: currentImage.objectFit === 'contain' ? '165%' : '185%',
            }}
          />
        )}

        {/* Previous / Next Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/80 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/80 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Counter Overlay */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/65 backdrop-blur-sm text-white text-[11px] sm:text-xs font-mono tabular-nums px-2.5 py-1 rounded-md pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Quiet Unboxed Caption Row */}
      <div className="flex items-start sm:items-center justify-between gap-2 px-0.5 text-[11px] sm:text-xs text-zinc-600">
        <span className="leading-snug line-clamp-2 sm:truncate min-w-0">{currentImage.caption}</span>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="text-gold hover:text-ivory font-medium whitespace-nowrap shrink-0 transition-colors pt-0.5 sm:pt-0"
        >
          Expand
        </button>
      </div>

      {/* Interactive Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-0.5 w-full min-w-0" role="tablist" aria-label="Product gallery thumbnails">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                className="group min-w-0 flex flex-col gap-1 sm:gap-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded-lg sm:rounded-xl transition-all"
              >
                <div
                  className={`relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-white border transition-all duration-150 ${
                    isActive
                      ? 'border-gold ring-2 ring-gold/30'
                      : 'border-zinc-200 opacity-80 hover:opacity-100 hover:border-zinc-400'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full ${
                      img.objectFit === 'contain' ? 'object-contain p-1 sm:p-1.5' : 'object-cover'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] leading-tight truncate w-full text-center transition-colors ${
                    isActive ? 'text-ivory font-semibold' : 'text-zinc-500 group-hover:text-ivory'
                  }`}
                >
                  {img.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen High-Res Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image gallery`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between text-white/85 mb-3 sm:mb-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              {images.length > 1 && (
                <>
                  <span className="font-mono tabular-nums text-white/60 shrink-0">
                    {activeIndex + 1} / {images.length}
                  </span>
                  <span aria-hidden="true" className="text-white/40 shrink-0">·</span>
                </>
              )}
              <span className="truncate">{currentImage.caption}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen gallery"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 ml-3"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative w-full max-w-5xl flex-1 max-h-[72vh] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              referrerPolicy="no-referrer"
              className={`max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl ${
                currentImage.objectFit === 'contain' ? 'bg-white p-4 sm:p-6' : ''
              }`}
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous fullscreen image"
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next fullscreen image"
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full py-1 px-1" onClick={(e) => e.stopPropagation()}>
              {images.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    idx === activeIndex ? 'border-gold opacity-100 scale-105' : 'border-transparent opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${
                      img.objectFit === 'contain' ? 'object-contain p-1 bg-white' : 'object-cover'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
