import { useCallback, useEffect, useRef, useState } from 'react';
import type { SectionId } from './types';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'resume-theme';

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  // `?theme=dark` wins so a specific rendition can be linked or screenshotted.
  const fromUrl = new URLSearchParams(window.location.search).get('theme');
  if (fromUrl === 'light' || fromUrl === 'dark') return fromUrl;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    meta?.setAttribute('content', theme === 'dark' ? '#18120f' : '#fff8f5');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}

/**
 * Tracks which section is in view and scrolls to a section on demand.
 * While a click-triggered smooth scroll is running the observer stays locked,
 * otherwise the indicator would race through every section on the way down.
 */
export function useScrollSpy(ids: readonly SectionId[], offset = 88) {
  const [active, setActive] = useState<SectionId>(ids[0]);
  const lockUntil = useRef(0);

  // The navigation set changes with the breakpoint; drop a section that is no
  // longer navigable so the indicator never points at a missing item.
  useEffect(() => {
    if (!ids.includes(active)) setActive(ids[0]);
  }, [ids, active]);

  useEffect(() => {
    const compute = () => {
      if (Date.now() < lockUntil.current) return;

      const line = window.scrollY + offset + 16;
      const entries = ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
        })
        .filter((entry): entry is { id: SectionId; top: number } => entry !== null)
        .sort((a, b) => a.top - b.top);

      if (entries.length === 0) return;

      let current = entries[0].id;
      for (const entry of entries) {
        if (entry.top <= line) current = entry.id;
      }

      // At the very bottom the last section may never cross the line itself.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 160 && window.scrollY >= scrollable - 8) {
        current = entries[entries.length - 1].id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => compute();

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // The résumé data arrives after first paint; re-run when the page grows.
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, [ids, offset]);

  const go = useCallback(
    (id: SectionId) => {
      lockUntil.current = Date.now() + 850;
      setActive(id);
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    },
    [offset],
  );

  return { active, go };
}

/** True once the page is scrolled past `threshold`, for the app-bar hairline. */
export function useScrolled(threshold = 6) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/** Reactive `matchMedia`, used to pick the navigation model per breakpoint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
