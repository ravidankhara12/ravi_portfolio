import React from 'react';
import { PROFILE_INFO } from '../../constants';

/**
 * Footer Component (Layout)
 * Displays social media icons, designer credentials, and copyright information.
 * Uses React.memo since it is a static layout component.
 */
const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-logo">{PROFILE_INFO.name}</h3>
        <p className="footer-credits">
          Designed with ❤️. All rights reserved.
        </p>

        <div className="footer-socials">
          <a href={`mailto:${PROFILE_INFO.email}`} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Email">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 40px 20px;
          text-align: center;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .footer-logo {
          font-family: var(--font-title);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-credits {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .footer-socials {
          display: flex;
          gap: 15px;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-normal);
        }

        .social-icon-btn:hover {
          color: var(--accent-coral);
          border-color: var(--accent-coral-glow);
          background: rgba(255, 95, 64, 0.05);
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
