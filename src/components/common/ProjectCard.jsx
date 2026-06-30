import React from 'react';

/**
 * ProjectCard Component (Common, Memoized)
 * Renders individual project as a beautiful card inside a grid.
 */
const ProjectCard = React.memo(({ project }) => {
  return (
    <div className="project-card glass-panel animate-fade-in">
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
      </div>

      <div className="project-card-body">
        <p className="project-description">{project.desc}</p>

        {/* Project Tag Badges */}
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-card-footer">
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm card-link">
            View Live <span className="arrow-diagonal">↗</span>
          </a>
        ) : (
          <span className="no-demo-badge">-</span>
        )}
      </div>

      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          padding: 28px;
          border-radius: 12px;
          height: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          justify-content: space-between;
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-coral-glow);
          box-shadow: 0 10px 30px rgba(255, 95, 64, 0.08);
        }

        .project-card-header {
          margin-bottom: 15px;
        }

        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .project-card-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .project-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .project-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: 40px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-card-footer {
          display: flex;
          align-items: center;
        }

        .card-link {
          width: 100%;
          text-align: center;
          display: inline-block;
        }

        .no-demo-badge {
          font-size: 0.75rem;
          color: var(--text-secondary);
          opacity: 0.7;
          font-style: italic;
          font-weight: 500;
        }

        .arrow-diagonal {
          font-size: 0.75rem;
          margin-left: 4px;
        }

        @media (max-width: 600px) {
          .project-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
