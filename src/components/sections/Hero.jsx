import React, { useCallback } from 'react';
import { PROFILE_INFO, SKILLS_LIST } from '../../constants';
import avatarImg from '../../assets/avatar.png';

/**
 * Hero Component (Section)
 * Includes Hero presentation, dynamic circular graphics, and tech skills list.
 */
const Hero = React.memo(() => {
  // Memoized scroll handler for primary CTA button
  const handleScrollToContact = useCallback((e) => {
    e.preventDefault();
    const contactSection = document.getElementById('projects');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container container">
        <div className="hero-grid grid-2">

          {/* Left Hero Details */}
          <div className="hero-content animate-slide-up">
            <div className="hero-badge">
              <span className="badge-line"></span>
              <span className="badge-text">{PROFILE_INFO.helloMessage}</span>
            </div>

            <h1 className="hero-title">
              I'm {PROFILE_INFO.name.split(' ')[0]} <span className="accent-dot">.</span>
            </h1>
            <h2 className="hero-subtitle">{PROFILE_INFO.title}</h2>

            <p className="hero-desc">{PROFILE_INFO.heroSubtitle}</p>

            <div className="hero-actions">
              <a href="#projects" onClick={handleScrollToContact} className="btn btn-primary">
                Got a project?
              </a>
              <a href={PROFILE_INFO.resumeUrl} target='_blank' className="btn btn-secondary">
                My resume
              </a>
            </div>
          </div>

          {/* Right Hero Graphics & Portrait */}
          <div className="hero-visual animate-fade-in">
            <div className="visual-wrapper">
              {/* Back bracket graphic */}
              <div className="vector-bracket bracket-left">&lt;</div>
              <div className="vector-bracket bracket-right">&gt;</div>

              {/* Decorative circular frames */}
              <div className="circle-bg"></div>
              <div className="circle-border"></div>

              {/* Actual Profile Avatar Image */}
              <div className="profile-image-container">
                <img
                  src={avatarImg}
                  alt={PROFILE_INFO.name}
                  className="profile-avatar"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Skills bar at bottom of hero */}
        <div className="skills-bar-container animate-slide-up">
          <div className="skills-bar-inner glass-panel">
            {SKILLS_LIST.map((skill) => (
              <div key={skill.name} className="skills-bar-item">
                <span className="skill-dot"></span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 140px;
          padding-bottom: 80px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: radial-gradient(circle at 75% 30%, rgba(255, 95, 64, 0.05) 0%, transparent 60%);
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          gap: 70px;
          width: 100%;
        }

        .hero-grid {
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .badge-line {
          width: 40px;
          height: 2px;
          background-color: var(--accent-coral);
        }

        .badge-text {
          font-family: var(--font-title);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 1px;
          font-size: 1.1rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }

        .accent-dot {
          color: var(--accent-coral);
        }

        .hero-subtitle {
          font-size: 2.2rem;
          color: var(--text-primary);
          margin-bottom: 25px;
          font-weight: 600;
        }

        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 480px;
          margin-bottom: 35px;
        }

        .hero-actions {
          display: flex;
          gap: 15px;
        }

        /* Hero Visual Circle Graphics */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .visual-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
        }

        .vector-bracket {
          position: absolute;
          font-family: var(--font-title);
          font-size: 3.5rem;
          font-weight: 300;
          color: rgba(255, 95, 64, 0.4);
          user-select: none;
        }

        .bracket-left {
          top: 10%;
          left: -15%;
          transform: rotate(-15deg);
        }

        .bracket-right {
          bottom: 10%;
          right: -15%;
          transform: rotate(15deg);
        }

        .circle-bg {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 95, 64, 0.12) 0%, transparent 70%);
          z-index: 1;
        }

        .circle-border {
          position: absolute;
          inset: 0px;
          border-radius: 50%;
          border: 2px solid rgba(255, 95, 64, 0.35);
          z-index: 2;
          animation: pulseGlow 4s infinite ease-in-out;
        }

        .profile-image-container {
          position: absolute;
          inset: 15px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 3;
          border: 4px solid var(--bg-primary);
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .profile-avatar:hover {
          transform: scale(1.05);
        }

        /* Skills Bar bottom */
        .skills-bar-container {
          width: 100%;
          margin-top: 20px;
        }

        .skills-bar-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          padding: 24px 40px;
          border-radius: 12px;
          gap: 20px;
        }

        .skills-bar-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-coral);
          box-shadow: 0 0 8px var(--accent-coral);
        }

        .skill-name {
          font-family: var(--font-title);
          font-weight: 500;
          font-size: 1.05rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 900px) {
          .hero-section {
            padding-top: 100px;
          }
          .hero-container {
            gap: 40px;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-subtitle {
            font-size: 1.8rem;
          }
          .visual-wrapper {
            width: 260px;
            height: 260px;
            margin-top: 30px;
          }
          .skills-bar-inner {
            padding: 16px 20px;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            align-items: center;
            text-align: center;
          }
          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
            width: 100%;
          }
          .hero-badge {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding-top: 100px;
            padding-bottom: 40px;
          }
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-subtitle {
            font-size: 1.4rem;
            margin-bottom: 15px;
          }
          .hero-desc {
            font-size: 0.95rem;
            margin-bottom: 25px;
          }
          .hero-actions {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
          }
          .visual-wrapper {
            width: 200px;
            height: 200px;
            margin-top: 10px;
          }
          .vector-bracket {
            font-size: 2.5rem;
          }
          .skills-bar-inner {
            padding: 12px 16px;
            gap: 12px;
          }
          .skill-name {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
