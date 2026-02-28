import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPlay, FiFolder, FiChevronDown } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/WasifAliShah', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/wasif-ali-shah', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'mailto:shahwasif2003@gmail.com', label: 'Email' },
  ]

  const codeLines = [
    { num: 1, content: <><span className="code-comment">// Welcome to my workspace</span></> },
    { num: 2, content: <><span className="code-keyword">import</span> {'{ '}<span className="code-component">Developer</span>{' }'} <span className="code-keyword">from</span> <span className="code-string">'./universe'</span>;</> },
    { num: 3, content: '' },
    { num: 4, content: <><span className="code-keyword">const</span> <span className="code-function">Portfolio</span> = () <span className="code-arrow">=&gt;</span> {'{'}</> },
    { num: 5, content: <>&nbsp;&nbsp;<span className="code-keyword">return</span> (</> },
    { num: 6, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-tag">&lt;Developer</span></> },
    { num: 7, content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-attr">name</span>=<span className="code-string">"Syed Wasif Ali Shah"</span></> },
    { num: 8, content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-attr">role</span>=<span className="code-string">"Full Stack Developer"</span></> },
    { num: 9, content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-attr">passion</span>=<span className="code-string">"AI & Data-Driven Systems"</span></> },
    { num: 10, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-tag">/&gt;</span></> },
    { num: 11, content: <>&nbsp;&nbsp;);</> },
    { num: 12, content: '};' },
  ]

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="hero-greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello, I'm
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Syed Wasif Ali Shah
          </motion.h1>
          
          <motion.h2 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="gradient-text">Full Stack Web Developer | AI & Data-Driven Systems</span>
          </motion.h2>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Experienced in building scalable MERN and Laravel applications with RESTful APIs.
            Skilled in integrating AI/ML models using Python and FastAPI for intelligent, production-ready systems.
          </motion.p>

          <motion.div 
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-code-editor"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="editor-window">
            <div className="editor-header">
              <div className="editor-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="editor-filename">
                <span className="file-dot"></span>
                portfolio.tsx
              </span>
              <div className="editor-icon">{'</>'}</div>
            </div>
            <div className="editor-body">
              {codeLines.map((line, index) => (
                <motion.div 
                  key={index} 
                  className="code-line"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
                >
                  <span className="line-number">{line.num}</span>
                  <span className="line-content">{line.content}</span>
                </motion.div>
              ))}
            </div>
            <div className="editor-footer">
              <a href="#about" className="editor-btn primary">
                <FiPlay /> Run Profile
              </a>
              <a href="#projects" className="editor-btn secondary">
                <FiFolder /> View Projects
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="hero-scroll-arrow"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FiChevronDown />
      </motion.div>
    </section>
  )
}

export default Hero
