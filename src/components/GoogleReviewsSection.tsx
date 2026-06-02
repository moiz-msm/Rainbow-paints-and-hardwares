import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, CheckCircle, ExternalLink, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GOOGLE_REVIEWS_CONFIG } from "../data/googleReviews";

interface Review {
  id: string;
  authorName: string;
  avatarColor: string;
  avatarUrl?: string;
  rating: number;
  time: string;
  text: string;
  isLocalGuide?: boolean;
  isVerified?: boolean;
  helpfulCount: number;
  serviceMentioned?: string;
}

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(GOOGLE_REVIEWS_CONFIG.curatedReviews);
  const [businessName, setBusinessName] = useState(GOOGLE_REVIEWS_CONFIG.businessName);
  const [aggregateRating, setAggregateRating] = useState(GOOGLE_REVIEWS_CONFIG.rating);
  const [totalReviewsCount, setTotalReviewsCount] = useState(GOOGLE_REVIEWS_CONFIG.totalReviewsCount);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Dynamic live-fetch loader
  useEffect(() => {
    if (!GOOGLE_REVIEWS_CONFIG.useLiveFeed || !GOOGLE_REVIEWS_CONFIG.apiKey || !GOOGLE_REVIEWS_CONFIG.placeId) {
      return;
    }

    setIsLoadingLive(true);

    const loadLiveReviews = () => {
      try {
        const dummyElement = document.createElement("div");
        const service = new (window as any).google.maps.places.PlacesService(dummyElement);

        service.getDetails(
          {
            placeId: GOOGLE_REVIEWS_CONFIG.placeId,
            fields: ["name", "rating", "user_ratings_total", "reviews"]
          },
          (place: any, status: any) => {
            setIsLoadingLive(false);
            if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
              if (place.name) setBusinessName(place.name);
              if (place.rating) setAggregateRating(place.rating);
              if (place.user_ratings_total) setTotalReviewsCount(place.user_ratings_total);

              if (place.reviews && place.reviews.length > 0) {
                const avatarColors = [
                  "bg-emerald-600 text-white",
                  "bg-amber-600 text-white",
                  "bg-purple-600 text-white",
                  "bg-blue-600 text-white",
                  "bg-rose-600 text-white",
                  "bg-violet-600 text-white"
                ];

                const mapped: Review[] = place.reviews.map((r: any, idx: number) => ({
                  id: `live-${idx}`,
                  authorName: r.author_name || "Google User",
                  avatarColor: avatarColors[idx % avatarColors.length],
                  avatarUrl: r.profile_photo_url,
                  rating: r.rating || 5,
                  time: r.relative_time_description || "Recently",
                  text: r.text || "",
                  isVerified: true,
                  helpfulCount: Math.floor(Math.random() * 5) + 1
                }));
                setReviews(mapped);
              }
            }
          }
        );
      } catch (err) {
        console.error("Failed to fetch live reviews from Google Places API", err);
        setIsLoadingLive(false);
      }
    };

    // Load Google Maps API Script
    if ((window as any).google && (window as any).google.maps) {
      loadLiveReviews();
    } else {
      const scriptId = "google-maps-places-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_REVIEWS_CONFIG.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", loadLiveReviews);
    }
  }, []);

  const handleHelpfulClick = (id: string) => {
    if (helpfulClicked[id]) return;
    setHelpfulClicked(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="google-reviews" className="py-6 sm:py-8 bg-royale-bg relative overflow-hidden">
      {/* Hide scrollbar helper styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 gap-6 text-center">
          <div className="max-w-xl text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight text-center">
              Google <span className="text-gradient italic">Reviews</span>
            </h2>
            <p className="text-gold text-[10px] sm:text-xs font-sans font-light text-center">
              Discover why painters, structural engineers, and elite homeowners trust Rainbow Paint and Hardwares for pristine products.
            </p>
          </div>

          {/* Luxury Google Brand summary badge on the right */}
          <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] min-w-[280px]">
            <div className="p-2.5 bg-white border border-zinc-100 rounded-xl shadow-xs shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.08 3.67-5.17 3.67-8.46z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.11C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.6H1.29a11.94 11.94 0 0 0 0 10.8l3.98-3.11z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-ivory font-sans font-bold text-lg leading-none">{aggregateRating.toFixed(1)}</span>
                <div className="flex text-amber-500 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-ivory/70 text-[11px] font-medium leading-tight">
                {totalReviewsCount}+ Verified Reviews
              </p>
            </div>
            <a
              href={GOOGLE_REVIEWS_CONFIG.reviewLink}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3.5 py-2 bg-ivory hover:opacity-90 text-royale-bg text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs hover:shadow-md shrink-0 text-center"
            >
              Write Review
            </a>
          </div>
        </div>

        {/* Carousel Tracks */}
        <div className="relative">
          {isLoadingLive ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-ivory/60 font-mono tracking-widest uppercase">Fetching original feedback feed...</p>
            </div>
          ) : (
            <div className="relative w-full py-2">
              {/* Luxury fade overlays for seamless visual clipping */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-royale-bg to-transparent pointer-events-none z-10 opacity-40 sm:opacity-90" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-royale-bg to-transparent pointer-events-none z-10 opacity-40 sm:opacity-90" />

              <div 
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing py-4 px-2 sm:px-8"
              >
                {reviews.map((review) => (
                  <div key={review.id} className="shrink-0 w-[285px] sm:w-[360px] md:w-[410px] snap-start">
                    <div className="bg-royale-surface hover:bg-white transition-all duration-300 border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[330px] relative group shadow-[0_4px_25px_rgba(0,0,0,0.012)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.04)] sm:hover:-translate-y-1">
                      
                      {/* Quote mark icon decorative */}
                      <div className="absolute top-6 right-6 opacity-[0.06] text-amber-500 pointer-events-none group-hover:scale-110 group-hover:opacity-[0.1] transition-all duration-300">
                        <Quote className="w-12 h-12 stroke-none fill-current" />
                      </div>

                      <div>
                        {/* Rating and date row */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex gap-0.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-zinc-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-zinc-400 font-medium font-mono">{review.time}</span>
                        </div>

                        {/* Card review text */}
                        <p className="text-ivory/80 text-xs sm:text-[13px] leading-relaxed mb-6 italic font-light font-serif line-clamp-5 whitespace-pre-line group-hover:text-ivory transition-colors">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author Info row at the bottom */}
                      <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          {review.avatarUrl ? (
                            <img 
                              src={review.avatarUrl} 
                              alt={review.authorName} 
                              loading="lazy"
                              decoding="async"
                              className="w-8 h-8 rounded-full border border-zinc-100 select-none pointer-events-none" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-semibold text-xs tracking-wider shrink-0 select-none ${review.avatarColor}`}>
                              {review.authorName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-ivory tracking-wide flex items-center gap-1.5 truncate">
                              {review.authorName}
                              {review.isVerified && (
                                <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-50/40" />
                              )}
                            </h4>
                            <span className="text-[9px] text-ivory/60 font-medium tracking-wider uppercase block mt-0.5">
                              {review.isLocalGuide ? "Local Guide" : "Verified Customer"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
