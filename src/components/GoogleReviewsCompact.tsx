import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { GOOGLE_REVIEWS_CONFIG } from "../data/googleReviews";

interface CompactReview {
  name: string;
  text: string;
  city: string;
}

export default function GoogleReviewsCompact() {
  const [reviewsList, setReviewsList] = useState<CompactReview[]>(() => {
    return GOOGLE_REVIEWS_CONFIG.curatedReviews.map(r => ({
      name: r.authorName.split(" ")[0] + (r.authorName.split(" ")[1] ? ` ${r.authorName.split(" ")[1][0]}.` : ""),
      text: r.text.length > 110 ? r.text.slice(0, 107) + "..." : r.text,
      city: "Verified Brand Review"
    }));
  });
  const [rating, setRating] = useState(GOOGLE_REVIEWS_CONFIG.rating);
  const [reviewsCount, setReviewsCount] = useState(GOOGLE_REVIEWS_CONFIG.totalReviewsCount);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!GOOGLE_REVIEWS_CONFIG.useLiveFeed || !GOOGLE_REVIEWS_CONFIG.apiKey || !GOOGLE_REVIEWS_CONFIG.placeId) {
      return;
    }

    const loadLiveReviews = () => {
      try {
        const dummyElement = document.createElement("div");
        const service = new (window as any).google.maps.places.PlacesService(dummyElement);

        service.getDetails(
          {
            placeId: GOOGLE_REVIEWS_CONFIG.placeId,
            fields: ["rating", "user_ratings_total", "reviews"]
          },
          (place: any, status: any) => {
            if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
              if (place.rating) setRating(place.rating);
              if (place.user_ratings_total) setReviewsCount(place.user_ratings_total);

              if (place.reviews && place.reviews.length > 0) {
                const mapped: CompactReview[] = place.reviews.map((r: any) => ({
                  name: r.author_name ? (r.author_name.split(" ")[0] + (r.author_name.split(" ")[1] ? ` ${r.author_name.split(" ")[1][0]}.` : "")) : "Google User",
                  text: r.text && r.text.length > 110 ? r.text.slice(0, 107) + "..." : (r.text || "Highly recommended store!"),
                  city: "Google Reviewer"
                }));
                setReviewsList(mapped);
              }
            }
          }
        );
      } catch (err) {
        console.error("Failed to fetch live reviews in compact component", err);
      }
    };

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

  useEffect(() => {
    if (reviewsList.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % reviewsList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reviewsList]);

  const handleNext = () => {
    if (reviewsList.length === 0) return;
    setIndex((p) => (p + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    if (reviewsList.length === 0) return;
    setIndex((p) => (p - 1 + reviewsList.length) % reviewsList.length);
  };

  if (reviewsList.length === 0) return null;

  return (
    <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 mt-4 relative overflow-hidden shadow-sm">
      {/* Mini Google Branding Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-205/60 mb-3">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.08 3.67-5.17 3.67-8.46z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.11C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.6H1.29a11.94 11.94 0 0 0 0 10.8l3.98-3.11z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
          </svg>
          <span className="text-[11px] font-bold text-zinc-800 tracking-wide font-sans">Google Business</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-zinc-900">{rating.toFixed(1)}/5</span>
          <span className="text-[9px] text-zinc-500 font-medium font-sans">({reviewsCount}+ reviews)</span>
        </div>
      </div>

      {/* Testimonial mini-showcase with transition container */}
      <div className="relative min-h-[55px] flex flex-col justify-center">
        <p className="text-xs text-zinc-700 leading-relaxed font-sans pr-8 italic">
          "{reviewsList[index]?.text}"
        </p>

        {/* Carousel buttons to navigate */}
        {reviewsList.length > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <button 
              onClick={handlePrev}
              className="p-0.5 hover:bg-zinc-200 rounded text-zinc-500 hover:text-zinc-800 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
            </button>
            <button 
              onClick={handleNext}
              className="p-0.5 hover:bg-zinc-200 rounded text-zinc-500 hover:text-zinc-800 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>
        )}

        {/* Reviewer credit line & CTA */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-205/40 pt-2 font-mono text-[10px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-zinc-700">{reviewsList[index]?.name}</span>
            <span className="opacity-60">•</span>
            <span>{reviewsList[index]?.city}</span>
            <span className="opacity-60">•</span>
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-[9px] flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5" /> Verified Buyer
            </span>
          </div>

          <a 
            href={GOOGLE_REVIEWS_CONFIG.reviewLink}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold hover:text-amber-600 font-bold tracking-tight uppercase flex items-center gap-1 transition-colors text-[9px]"
          >
            Review Us on Google
          </a>
        </div>
      </div>
    </div>
  );
}
