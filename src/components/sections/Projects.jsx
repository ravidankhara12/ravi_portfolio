import React, { useState, useMemo, useCallback } from 'react';
import { PROJECTS_DATA } from '../../constants';
import ProjectCard from '../common/ProjectCard';

/**
 * Projects Component (Section)
 * Contains the list of showcase portfolio projects.
 * Demonstrates useMemo for extraction of tags and list filtering, 
 * and useCallback for tag change event handlers.
 */
const Projects = React.memo(() => {
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract all unique project tags. Memoized so it only computes once.
  const allTags = useMemo(() => {
    const tags = new Set();
    PROJECTS_DATA.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags)];
  }, []);

  // Filter projects list. Memoized based on the selectedTag state.
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter(project => project.tags.includes(selectedTag));
  }, [selectedTag]);

  // Memoized event handler for switching filter tags
  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container container">

        {/* Section Title */}
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="title-accent-bar"></div>
        </div>

        {/* Filter Tags Toolbar */}
        <div className="tags-filter-bar">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`filter-tag-btn ${selectedTag === tag ? 'active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="projects-list">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="empty-projects">
              No projects found for selected tech stack.
            </div>
          )}
        </div>

      </div>

      <style>{`
        .projects-section {
          background-color: var(--bg-primary);
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .tags-filter-bar {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 50px;
        }

        .filter-tag-btn {
          font-family: var(--font-title);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 8px 18px;
          border-radius: 40px;
          cursor: pointer;
          transition: var(--transition-normal);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-tag-btn:hover {
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-tag-btn.active {
          color: #ffffff;
          background: var(--accent-coral);
          border-color: var(--accent-coral);
          box-shadow: 0 4px 12px var(--accent-coral-glow);
        }

        .projects-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        @media (max-width: 640px) {
          .projects-section {
            padding-top: 60px;
            padding-bottom: 60px;
          }
          .tags-filter-bar {
            gap: 8px;
            margin-bottom: 30px;
          }
          .filter-tag-btn {
            padding: 6px 14px;
            font-size: 0.8rem;
          }
          .projects-list {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .empty-projects {
          text-align: center;
          color: var(--text-secondary);
          padding: 40px 0;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
