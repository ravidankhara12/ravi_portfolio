import React from 'react';
import { ABOUT_SERVICES, PORTFOLIO_STATS } from '../../constants';
import useAnimateStats from '../../hooks/useAnimateStats';

/**
 * StatItem Component
 * Animates numeric values using the useAnimateStats hook.
 * Memoized to prevent parent container updates from resetting animations.
 */
const StatItem = React.memo(({ value, suffix, label }) => {
  const [animatedValue, elementRef] = useAnimateStats(value, 1800);

  return (
    <div ref={elementRef} className="stat-item">
      <div className="stat-number">
        {animatedValue}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
});

StatItem.displayName = 'StatItem';

/**
 * ServiceIcon helper to render custom SVG icons based on a key.
 */
const ServiceIcon = ({ type }) => {
  switch (type) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'database':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="12" x2="2" y2="12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="6" y1="16" x2="6.01" y2="16" />
          <line x1="10" y1="16" x2="10.01" y2="16" />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * About Component (Section)
 * Combines Services grid and animated statistics.
 */
const About = React.memo(() => {
  return (
    <section id="about" className="about-section">
      <div className="about-container container">
        <div className="about-grid grid-2">
          
          {/* Left Column: Services list */}
          <div className="services-column">
            <div className="services-timeline">
              {ABOUT_SERVICES.map((service, index) => (
                <div key={service.title} className="service-card glass-panel">
                  <div className="service-timeline-node">
                    <span className="node-dot"></span>
                    {index < ABOUT_SERVICES.length - 1 && <span className="node-line"></span>}
                  </div>
                  
                  <div className="service-icon-box">
                    <ServiceIcon type={service.icon} />
                  </div>
                  <div className="service-details">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Bio and Animated Stats */}
          <div className="bio-column">
            <h2 className="section-title">About me</h2>
            <div className="title-accent-bar"></div>
            
            <p className="bio-paragraph">
              I started my software journey learning technology. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.
            </p>
            <p className="bio-paragraph">
              I focus on writing scalable, clean, and highly performant code. I enjoy leveraging modern front-end concepts and optimization patterns to make interactions feel instantaneous.
            </p>
            
            {/* Stats Grid */}
            <div className="stats-grid">
              {PORTFOLIO_STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          position: relative;
          padding: 100px 0;
        }

        .about-grid {
          align-items: center;
          gap: 60px;
        }

        /* Services Timeline style */
        .services-timeline {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .service-card {
          display: flex;
          align-items: flex-start;
          padding: 24px;
          gap: 20px;
          position: relative;
        }

        .service-timeline-node {
          position: absolute;
          left: -15px;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          display: none; /* fallback timeline graphic if preferred */
        }

        .service-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 8px;
          background: rgba(255, 95, 64, 0.08);
          border: 1px solid var(--border-highlight);
          color: var(--accent-coral);
          flex-shrink: 0;
        }

        .service-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .service-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .service-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
        }

        /* Bio Column styling */
        .bio-column {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .title-accent-bar {
          width: 50px;
          height: 4px;
          background-color: var(--accent-coral);
          margin-bottom: 30px;
          border-radius: 2px;
        }

        .bio-paragraph {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.7;
        }

        /* Stats Grid styling */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stat-number {
          font-family: var(--font-title);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          align-items: baseline;
        }

        .stat-suffix {
          color: var(--accent-coral);
          margin-left: 2px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 6px;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .about-section {
            padding: 60px 0;
          }
          .bio-column {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            text-align: center;
            font-size: 2.2rem;
          }
          .title-accent-bar {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 25px;
          }
        }

        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            text-align: center;
          }
          .stat-item {
            align-items: center;
          }
          .stat-number {
            font-size: 1.6rem;
          }
          .stat-label {
            font-size: 0.75rem;
            margin-top: 4px;
          }
        }

        @media (max-width: 480px) {
          .service-card {
            padding: 16px;
            gap: 14px;
          }
          .service-icon-box {
            width: 46px;
            height: 46px;
          }
          .service-icon-box svg {
            width: 22px;
            height: 22px;
          }
          .service-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </section>
  );
});

About.displayName = 'About';

export default About;
