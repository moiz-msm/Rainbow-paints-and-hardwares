import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import {
  getRouteKey,
  getSavedScrollPosition,
  markRestoringScroll,
  saveScrollPosition,
} from '../utils/scrollRestoration';

const RESTORE_TIMEOUT_MS = 2500;
const STABLE_LOCK_MS = 280;
const SCROLL_TOLERANCE_PX = 4;

const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Space',
  ' ',
  'Home',
  'End',
]);

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeKey = getRouteKey(location.pathname, location.search);

  const activeEntryRef = useRef<{ key: string; routeKey: string; pathname: string }>({
    key: location.key,
    routeKey,
    pathname: location.pathname,
  });
  const isTransitioningRef = useRef(false);
  const lastRenderedKeyRef = useRef<string | null>(null);

  // Synchronously signal eager mounting for LazySection during render on POP
  // before <AnimatedRoutes /> renders in the same commit.
  if (lastRenderedKeyRef.current !== location.key) {
    lastRenderedKeyRef.current = location.key;
    if (navigationType === 'POP') {
      const savedY = getSavedScrollPosition(location.key, routeKey);
      markRestoringScroll(savedY && savedY > 0 ? savedY : null);
    } else {
      markRestoringScroll(null);
    }
  }

  // Disable browser's competing native scroll restoration so async/lazy pages
  // don't jump around before React finishes hydrating the destination route.
  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) {
      return;
    }
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  // Continuously save scroll position for the active history entry.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const recordCurrentScroll = () => {
      rafId = null;
      if (isTransitioningRef.current) return;
      const { key, routeKey: activeRoute } = activeEntryRef.current;
      saveScrollPosition(key, activeRoute, window.scrollY);
    };

    const handleScroll = () => {
      if (isTransitioningRef.current) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(recordCurrentScroll);
      }
    };

    const handlePageHide = () => {
      const { key, routeKey: activeRoute } = activeEntryRef.current;
      saveScrollPosition(key, activeRoute, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pagehide', handlePageHide);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const prevPathname = activeEntryRef.current.pathname;
    const pathnameChanged = prevPathname !== location.pathname;

    // Update active entry immediately so future scrolls belong to this history entry.
    activeEntryRef.current = {
      key: location.key,
      routeKey,
      pathname: location.pathname,
    };

    // Guard against scroll events fired during DOM shrink or programmatic scrollTo.
    isTransitioningRef.current = true;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let timeoutId: number | null = null;
    let stableTimerId: number | null = null;
    let rafId: number | null = null;
    let hashTimerId: number | null = null;

    const cleanupRestoration = () => {
      if (cancelled) return;
      cancelled = true;
      isTransitioningRef.current = false;
      markRestoringScroll(null);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (stableTimerId !== null) {
        window.clearTimeout(stableTimerId);
        stableTimerId = null;
      }
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (hashTimerId !== null) {
        window.clearTimeout(hashTimerId);
        hashTimerId = null;
      }
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      window.removeEventListener('pointerdown', handleUserInterrupt);
      window.removeEventListener('keydown', handleKeyInterrupt);
    };

    const handleUserInterrupt = () => {
      cleanupRestoration();
      // Immediately record user's manual scroll position on next tick
      saveScrollPosition(location.key, routeKey, window.scrollY);
    };

    const handleKeyInterrupt = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) {
        handleUserInterrupt();
      }
    };

    if (navigationType === 'POP') {
      const targetY = getSavedScrollPosition(location.key, routeKey);

      if (targetY !== null && targetY > 0) {
        window.addEventListener('wheel', handleUserInterrupt, { passive: true });
        window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
        window.addEventListener('pointerdown', handleUserInterrupt, { passive: true });
        window.addEventListener('keydown', handleKeyInterrupt);

        const tryRestore = () => {
          if (cancelled) return;

          const maxScrollY = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const scrollTarget = Math.min(targetY, maxScrollY);
          window.scrollTo({
            top: scrollTarget,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
          });

          const reachedTarget =
            maxScrollY >= targetY - SCROLL_TOLERANCE_PX &&
            Math.abs(window.scrollY - targetY) <= SCROLL_TOLERANCE_PX;

          if (reachedTarget) {
            if (stableTimerId === null) {
              stableTimerId = window.setTimeout(() => {
                // Re-verify one last time in case images shifted height slightly
                if (!cancelled && Math.abs(window.scrollY - targetY) > SCROLL_TOLERANCE_PX) {
                  window.scrollTo({
                    top: targetY,
                    left: 0,
                    behavior: 'instant' as ScrollBehavior,
                  });
                }
                cleanupRestoration();
              }, STABLE_LOCK_MS);
            }
          } else if (stableTimerId !== null) {
            window.clearTimeout(stableTimerId);
            stableTimerId = null;
          }
        };

        const scheduleRestore = () => {
          if (cancelled) return;
          if (rafId !== null) window.cancelAnimationFrame(rafId);
          rafId = window.requestAnimationFrame(tryRestore);
        };

        // Run immediately and also observe layout growth (lazy routes, images, Firestore)
        tryRestore();
        scheduleRestore();

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(scheduleRestore);
          resizeObserver.observe(document.documentElement);
          if (document.body) {
            resizeObserver.observe(document.body);
          }
        }

        if (typeof MutationObserver !== 'undefined' && document.body) {
          mutationObserver = new MutationObserver(scheduleRestore);
          mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }

        timeoutId = window.setTimeout(() => {
          tryRestore();
          cleanupRestoration();
        }, RESTORE_TIMEOUT_MS);

        return cleanupRestoration;
      }

      // Saved scroll was 0 or unavailable on POP
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      rafId = window.requestAnimationFrame(() => {
        isTransitioningRef.current = false;
        markRestoringScroll(null);
      });
      return cleanupRestoration;
    }

    // PUSH or REPLACE navigation
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      hashTimerId = window.setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        isTransitioningRef.current = false;
      }, 100);
      return cleanupRestoration;
    }

    // Only scroll to top when pathname changes (or on fresh PUSH to a new entry).
    // Replacing query params on the same pathname (e.g. brand filter) keeps scroll steady.
    if (pathnameChanged || navigationType === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }

    rafId = window.requestAnimationFrame(() => {
      isTransitioningRef.current = false;
    });

    return cleanupRestoration;
  }, [location.key, location.pathname, location.hash, routeKey, navigationType]);

  return null;
}
