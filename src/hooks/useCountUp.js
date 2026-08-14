/**
 * useCountUp
 * Animates a number from 0 to `end` when `isActive` becomes true.
 * Used for the stats section in About.
 */
import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 1800, isActive = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasRunRef.current) return;
    hasRunRef.current = true;

    const startValue = 0;
    const endValue = end;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.round(startValue + (endValue - startValue) * easedProgress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive, end, duration]);

  return count;
}
