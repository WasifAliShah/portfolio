import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiServer, FiDatabase, FiCloud } from 'react-icons/fi'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    { icon: <FiCode />, title: 'Frontend', desc: 'React, Tailwind, Bootstrap' },
    { icon: <FiServer />, title: 'Backend', desc: 'Node.js, Laravel, .NET' },
    { icon: <FiDatabase />, title: 'Database', desc: 'MongoDB, PostgreSQL, MySQL' },
    { icon: <FiCloud />, title: 'AI/ML', desc: 'Python, FastAPI, Deep Learning' },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          >
            <p>
              Passionate full-stack developer with expertise in modern web technologies. 
              I specialize in creating robust, scalable applications that solve real-world problems.
            </p>
            <p>
              Translating complex business requirements into robust technical solutions. 
              Currently focused on Microservices, Real-time Systems, and AI Integration.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Learning</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Major Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number caffeine">∞</span>
                <span className="stat-label">Caffeine</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-highlights"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          >
            {highlights.map((item, index) => (
              <motion.div 
                key={index} 
                className="highlight-card"
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ duration: 0.15 }}
              >
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
