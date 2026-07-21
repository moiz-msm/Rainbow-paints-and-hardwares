import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  fallback,
  rootMargin = "300px",
  className = "",
}: LazySectionProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin]);

  // Use a minimal, non-blocking height placeholder to prevent layout shifts
  const defaultFallback = (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-royale-bg/10 animate-pulse rounded-xl my-4">
      <div className="w-6 h-6 border-2 border-gold/40 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div ref={containerRef} className={`w-full min-h-[50px] ${className}`}>
      {isIntersecting ? children : fallback || defaultFallback}
    </div>
  );
}
