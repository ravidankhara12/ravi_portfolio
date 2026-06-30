import { useEffect, useState } from 'react';

/**
 * Custom hook to track which section is currently active in the viewport.
 * Uses IntersectionObserver for high performance.
 * 
 * @param {string[]} sectionIds Array of section element IDs
 * @param {number} threshold Trigger threshold for visibility ratio
 * @returns {string} The active section ID
 */
export default function useActiveSection(sectionIds, threshold = 0.2) {
  const [activeSection, setActiveSection] = useState('');

  // Serialize array elements to form a stable string dependency key
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px', // Centered viewport focus range
      threshold,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIdsKey, threshold]);

  return activeSection;
}
