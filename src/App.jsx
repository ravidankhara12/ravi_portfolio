import React, { useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import useActiveSection from './hooks/useActiveSection';

/**
 * App Component
 * Core entry point for the React application.
 * Utilizes useMemo to ensure stable reference for target viewport sections.
 */
function App() {
  // Memoized array of section elements for active highlighting.
  // Stays static across runs to avoid Observer reconstruction cycles.
  const sectionIds = useMemo(() => ['home', 'about', 'projects', 'contacts'], []);
  
  // Custom hook to detect which section is current
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="app-layout animate-fade-in">
      {/* Floating Sticky Header */}
      <Navbar activeSection={activeSection} />
      
      {/* Main Sections */}
      <main className="main-content">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer Info */}
      <Footer />

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
