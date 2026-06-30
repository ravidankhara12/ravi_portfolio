import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to animate a numerical value from 0 to a target value.
 * Triggers animation only when the element is scrolled into view.
 * 
 * @param {number} targetValue The target number to count up to
 * @param {number} duration Animation duration in milliseconds
 * @returns {[number, React.RefObject]} The animated current value and the element ref
 */
export default function useAnimateStats(targetValue, duration = 1500) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value based on progress fraction
      setCurrentValue(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [hasAnimated, targetValue, duration]);

  return [currentValue, elementRef];
}
