/**
 * History-keyed scroll position and page view-state restoration utility.
 * Preserves exact scroll position and listing state (filters, sort, pagination,
 * horizontal filter rails) when navigating Back/Forward (POP) across SPA routes.
 */

const SCROLL_STORAGE_KEY = 'rp_scroll_positions_v1';
const STATE_STORAGE_KEY = 'rp_page_states_v1';
const MAX_ENTRIES = 80;

interface StoredMap<T> {
  byKey: Record<string, T>;
  byRoute: Record<string, T>;
  order: string[];
}

export interface CatalogPageState {
  activeCategoryFilter?: string;
  activeBrand?: string;
  sortOption?: string;
  currentPage?: number;
  categoryRailScrollLeft?: number;
  brandRailScrollLeft?: number;
}

const emptyMap = <T,>(): StoredMap<T> => ({
  byKey: {},
  byRoute: {},
  order: [],
});

let scrollCache: StoredMap<number> | null = null;
let stateCache: StoredMap<CatalogPageState> | null = null;

// Synchronous flag read during render by LazySection so Back navigation to a
// scrolled position mounts lazy sections immediately instead of collapsing height.
let activeRestoreTargetY: number | null = null;

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

function loadMap<T>(storageKey: string): StoredMap<T> {
  if (!isBrowser()) return emptyMap<T>();
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return emptyMap<T>();
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.byKey && parsed.byRoute) {
      return {
        byKey: parsed.byKey,
        byRoute: parsed.byRoute,
        order: Array.isArray(parsed.order) ? parsed.order : [],
      };
    }
  } catch {
    // Ignore storage access or malformed JSON errors
  }
  return emptyMap<T>();
}

function persistMap<T>(storageKey: string, map: StoredMap<T>): void {
  if (!isBrowser()) return;
  try {
    while (map.order.length > MAX_ENTRIES) {
      const oldestKey = map.order.shift();
      if (oldestKey) {
        delete map.byKey[oldestKey];
      }
    }
    sessionStorage.setItem(storageKey, JSON.stringify(map));
  } catch {
    // Ignore quota or private-mode errors
  }
}

function getScrollCache(): StoredMap<number> {
  if (!scrollCache) {
    scrollCache = loadMap<number>(SCROLL_STORAGE_KEY);
  }
  return scrollCache;
}

function getStateCache(): StoredMap<CatalogPageState> {
  if (!stateCache) {
    stateCache = loadMap<CatalogPageState>(STATE_STORAGE_KEY);
  }
  return stateCache;
}

export function getRouteKey(pathname: string, search: string): string {
  return `${pathname}${search || ''}`;
}

export function saveScrollPosition(locationKey: string, routeKey: string, y: number): void {
  if (!isBrowser() || !Number.isFinite(y)) return;
  const clampedY = Math.max(0, Math.round(y));
  const cache = getScrollCache();
  if (locationKey) {
    cache.byKey[locationKey] = clampedY;
    const existingIdx = cache.order.indexOf(locationKey);
    if (existingIdx !== -1) cache.order.splice(existingIdx, 1);
    cache.order.push(locationKey);
  }
  if (routeKey) {
    cache.byRoute[routeKey] = clampedY;
  }
  persistMap(SCROLL_STORAGE_KEY, cache);
}

export function getSavedScrollPosition(locationKey: string, routeKey: string): number | null {
  if (!isBrowser()) return null;
  const cache = getScrollCache();
  if (locationKey && typeof cache.byKey[locationKey] === 'number') {
    return cache.byKey[locationKey];
  }
  if (routeKey && typeof cache.byRoute[routeKey] === 'number') {
    return cache.byRoute[routeKey];
  }
  return null;
}

export function markRestoringScroll(targetY: number | null): void {
  activeRestoreTargetY = targetY && targetY > 0 ? targetY : null;
}

export function isRestoringScroll(): boolean {
  return activeRestoreTargetY !== null && activeRestoreTargetY > 0;
}

export function getRestoringScrollTarget(): number | null {
  return activeRestoreTargetY;
}

export function saveCatalogPageState(
  locationKey: string,
  routeKey: string,
  state: CatalogPageState
): void {
  if (!isBrowser()) return;
  const cache = getStateCache();
  if (locationKey) {
    cache.byKey[locationKey] = state;
    const existingIdx = cache.order.indexOf(locationKey);
    if (existingIdx !== -1) cache.order.splice(existingIdx, 1);
    cache.order.push(locationKey);
  }
  if (routeKey) {
    cache.byRoute[routeKey] = state;
  }
  persistMap(STATE_STORAGE_KEY, cache);
}

export function getSavedCatalogPageState(
  locationKey: string,
  routeKey: string
): CatalogPageState | null {
  if (!isBrowser()) return null;
  const cache = getStateCache();
  if (locationKey && cache.byKey[locationKey]) {
    return cache.byKey[locationKey];
  }
  if (routeKey && cache.byRoute[routeKey]) {
    return cache.byRoute[routeKey];
  }
  return null;
}
