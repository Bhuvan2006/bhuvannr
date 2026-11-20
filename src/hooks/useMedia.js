import { useEffect, useState } from 'react';

export function useMedia(query, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useIsMobile = () => useMedia('(max-width: 820px)');
export const useIsTouch = () => useMedia('(hover: none), (pointer: coarse)');
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
