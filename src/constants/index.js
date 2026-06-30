export const PROFILE_INFO = {
  name: "Ravi Dankhara",
  title: "Full-Stack Web Developer",
  helloMessage: "Hello. I'm Ravi",
  heroSubtitle: "I design and build clean, modern, and high-performance digital experiences. Specializing in React.js, Node.js, Express.js, and PHP.",
  email: import.meta.env.VITE_TO_EMAIL,
  linkedin: "https://www.linkedin.com/in/ravi-dankhara-009070218",
  resumeUrl: "https://drive.google.com/file/d/1IrvtLDjngHtvu3jij5rNdD_D24xfhEyZ/view?usp=drive_link",
};

export const SKILLS_LIST = [
  { name: "React.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Javascript", category: "Languages" },
  { name: "HTML5 & CSS3", category: "Frontend" },
  { name: "Git & GitHub", category: "Tools" }
];

export const ABOUT_SERVICES = [
  {
    icon: "code",
    title: "Frontend Engineering",
    desc: "Building highly interactive, component-driven, and state-managed user interfaces using React.js, modern CSS/HTML, and custom animations."
  },
  {
    icon: "database",
    title: "Backend Development",
    desc: "Designing secure, modular API routes, middleware validation, and database operations utilizing Node.js, Express.js, and PHP."
  },
  {
    icon: "cloud",
    title: "API Design & Services",
    desc: "Building robust RESTful endpoints, database schema migrations, and handling secure token auth patterns for modern apps."
  }
];

export const PORTFOLIO_STATS = [
  { value: 3, suffix: "+", label: "Completed Projects" },
  { value: 95, suffix: "%", label: "Client satisfaction" },
  { value: 5, suffix: "+", label: "Years of experience" }
];

export const PROJECTS_DATA = [
  {
    id: "employee-management",
    title: "Employee Management",
    tags: ["PHP", "Laravel"],
    desc: "A secure human resource and workforce management system built on Laravel. Streamlines personnel records, leave management, time tracking, payroll reporting, and role-based access control.",
  },
  {
    id: "Admin",
    title: "Admin",
    tags: ["React js", "Tailwind CSS"],
    desc: "Designed the user interface and frontend layout architecture for a modern administrative dashboard. Focused on clean typography, responsive design systems, and smooth interface components utilizing Tailwind CSS.",
  },
  {
    id: "contractor-foreman",
    title: "Contractor Foreman",
    tags: ["React.js", "Tailwind CSS", "React Router 7 Framework"],
    desc: "The official web portal and client panel for Contractor Foreman, the leading construction management SaaS. Built to streamline field and office communication with features for estimates, time cards, daily logs, and scheduling.",
    demoUrl: "http://contractorforeman.com/"
  },
  {
    id: "rb-creation",
    title: "RB Creation",
    tags: ["React js", "Tailwind CSS"],
    desc: "A professional informational web portal for a construction and building company. Designed to showcase company expertise, past projects, and available services while providing a streamlined interface for client inquiries.",
    demoUrl: "https://rb-creation.netlify.app/"
  },
];
