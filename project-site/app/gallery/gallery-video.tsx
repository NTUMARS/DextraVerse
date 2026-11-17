'use client';

import { useEffect, useRef } from 'react';

/** A muted looping clip that only plays while it is on screen. */
export function GalleryVideo({ src, poster, label, fit }: { src: string; poster: string; label: string; fit: 'cover' | 'contain' }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} muted loop playsInline preload="none" src={src} poster={poster} aria-label={label} style={{ objectFit: fit }}/>;
}
