import React, { useCallback, useState, useEffect } from 'react';
import { PROFILE_INFO } from '../../constants';

/**
 * Navbar Component (Layout)
 * Responsive navigation bar with glassmorphic style.
 * Uses React.memo to prevent re-renders when the parent state changes, unless activeSection changes.
 */
const Navbar = React.memo(({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Memoized scroll handler to smooth-scroll to sections
  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu when item clicked
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Projects', target: 'projects' },
    { label: 'Contacts', target: 'contacts' },
  ];

  return (
    <header className="navbar-header glass-panel">
      <div className="navbar-container">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
          {PROFILE_INFO.name}
        </a>

        {/* Hamburger Menu Toggle Button */}
        <button
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => handleNavClick(e, item.target)}
              className={`nav-link ${activeSection === item.target ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 1000;
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
          display: flex;
          align-items: center;
          padding: 0 40px;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-logo {
          font-family: var(--font-title);
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--text-primary);
        }

        .navbar-links {
          display: flex;
          gap: 30px;
          height: fit-content;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          padding: 5px 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent-coral);
          transition: var(--transition-fast);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          z-index: 1100;
          transition: var(--transition-fast);
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-toggle:hover {
          color: var(--accent-coral);
        }

        @media (max-width: 768px) {
          .navbar-header {
            padding: 0 20px;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .navbar-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 17, 28, 0.96);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;
            padding: 40px;
            z-index: 999;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0.3s ease;
            border-bottom: 1px solid var(--border-color);
          }

          .navbar-links.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-link {
            font-size: 1.5rem;
            font-family: var(--font-title);
            font-weight: 600;
          }
        }

        @media (max-width: 480px) {
          .navbar-header {
            padding: 0 16px;
          }
          
          .navbar-logo {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
