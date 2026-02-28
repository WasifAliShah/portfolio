import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiFolder } from 'react-icons/fi'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredProjects = [
    {
      title: 'AUIS Nexus Management System',
      description: 'Architected a MERN stack platform currently adopted by a university society, centralizing management for 20+ members via Admin Dashboard. Implemented RESTful APIs with Role-Based Access Control and optimized MongoDB indexing for secure, scalable workflows.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
      language: 'React',
      languageColor: '#61dafb',
      github: 'https://github.com/WasifAliShah/AUIS-NEXUS',
    },
    {
      title: 'QuickBite Restaurant Ordering',
      description: 'Developed a full-stack MERN restaurant application featuring dynamic daily menus, cart management, and scheduled checkout. Built RESTful APIs and integrated MongoDB for real-time order processing, delivery scheduling, and automated menu updates.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      language: 'React',
      languageColor: '#61dafb',
      github: 'https://github.com/WasifAliShah/QuickBite',
    },
    {
      title: 'The Masjid Community Platform',
      description: 'Built a centralized administration system using .NET to digitize fundraising and volunteer coordination. Structured a normalized relational database schema that ensured data integrity and reduced record-keeping errors by 95%.',
      technologies: ['.NET', 'C#', 'SQL Server', 'Entity Framework', 'ASP.NET MVC'],
      language: 'C#',
      languageColor: '#178600',
      github: 'https://github.com/WasifAliShah/The-Masjid',
    },
    {
      title: 'Deep Learning Action Recognition',
      description: 'Developed a hybrid Deep Learning model achieving 92% accuracy on the Stanford-40 dataset. Deployed via a FastAPI backend to serve real-time analytics, reducing inference latency by 30% for rapid image classification.',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'Deep Learning'],
      language: 'Python',
      languageColor: '#3572A5',
      github: 'https://github.com/WasifAliShah/Action-Recognition',
    },
  ]

  const repositories = [
    { name: 'SpotTube-Downloader', language: 'Python', updatedAgo: '2 weeks ago' },
    { name: 'COMMECT', language: 'Dart', updatedAgo: 'Jan 26' },
    { name: 'The-Masjid', language: 'C#', updatedAgo: 'Jan 26' },
    { name: 'Action-Recognition', language: 'Python', updatedAgo: 'Jan 4' },
    { name: 'cmd_clone', language: 'C++', updatedAgo: 'Oct 2025' },
    { name: 'FYP-AI-module', language: 'Python', updatedAgo: 'Oct 2025' },
    { name: 'AUIS-NEXUS', language: 'JavaScript', updatedAgo: 'Jun 2025' },
    { name: 'Monthly-Expense-Visualization', language: 'Jupyter Notebook', updatedAgo: 'Sep 2024' },
    { name: 'AquaAlert', language: 'Python', updatedAgo: 'Aug 2024' },
    { name: 'Task-Scheduler', language: 'C++', updatedAgo: 'Jun 2024' },
  ]

  const getLanguageColor = (lang) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'Java': '#b07219',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'C#': '#178600',
      'React': '#61dafb',
      'PHP': '#4F5D95',
      'Dart': '#00B4AB',
      'C++': '#f34b7d',
      'Jupyter Notebook': '#DA5B0B',
      'HTML': '#e34c26',
    }
    return colors[lang] || '#6e7681'
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some things I've built</p>
        </motion.div>

        <div className="projects-layout">
          {/* Repositories Sidebar */}
          <motion.div 
            className="repositories-sidebar"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sidebar-header">
              <FiFolder className="sidebar-icon" />
              <span>Repositories</span>
              <span className="repo-count">17</span>
            </div>
            <ul className="repo-list">
              {repositories.map((repo, index) => (
                <li key={index} className="repo-item">
                  <a 
                    href={`https://github.com/WasifAliShah/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="repo-name">{repo.name}</span>
                    <span className="repo-badge">Public</span>
                  </a>
                  <div className="repo-meta">
                    <span 
                      className="repo-language"
                      style={{ '--lang-color': getLanguageColor(repo.language) }}
                    >
                      {repo.language}
                    </span>
                    <span className="repo-updated">Updated {repo.updatedAgo}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a 
              href="https://github.com/WasifAliShah?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-all-repos"
            >
              View all repositories →
            </a>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="pinned-projects">
            <div className="pinned-grid">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="pinned-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <div className="pinned-card-header">
                    <div className="pinned-card-title">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        {project.title}
                      </a>
                    </div>
                    <span className="public-badge">Public</span>
                  </div>
                  
                  <p className="pinned-description">{project.description}</p>
                  
                  <div className="pinned-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="pinned-footer">
                    <div className="pinned-stats">
                      <span 
                        className="pinned-language"
                        style={{ '--lang-color': project.languageColor }}
                      >
                        {project.language}
                      </span>
                    </div>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <FiGithub /> View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
