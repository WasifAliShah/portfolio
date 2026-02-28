import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: 'Backend Developer Intern',
      company: 'Common Criteria Pakistan',
      location: 'Islamabad, Pakistan',
      period: 'Jul 2025 - Sep 2025',
      description: [
        'Designed and deployed 5+ Laravel backend modules, optimizing complex SQL querying and logic to improve overall system response time by ~20%',
        'Co-developed an internal HRMS and Document Management System (DMS), engineering a recursive directory upload feature that enables direct folder ingestion',
      ],
      technologies: ['Laravel', 'PHP', 'MySQL', 'Git', 'REST APIs']
    }
  ]

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-company">
                    <FiBriefcase /> {exp.company}
                  </span>
                </div>
                
                <div className="timeline-meta">
                  <span><FiCalendar /> {exp.period}</span>
                  <span><FiMapPin /> {exp.location}</span>
                </div>

                <ul className="timeline-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="timeline-tech">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="timeline-dot"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
