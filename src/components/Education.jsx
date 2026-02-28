import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward, FiBook, FiCalendar } from 'react-icons/fi'
import './Education.css'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: 'Air University',
      period: '2022 - 2026',
      description: 'Focused on software engineering, web development, AI/ML, and computer systems. Developed strong foundations in algorithms, data structures, databases, and full-stack development.',
      achievements: ['GPA: 3.22/4.00', 'Full Stack Development', 'AI & Deep Learning']
    }
  ]

  const certifications = [
    {
      name: 'Supervised Machine Learning: Regression and Classification',
      issuer: 'DeepLearning.AI',
      date: 'Nov 2025',
      icon: '🤖'
    },
    {
      name: 'Python Data Structures',
      issuer: 'University of Michigan',
      date: 'Nov 2023',
      icon: '🐍'
    },
    {
      name: 'Introduction to Programming Using Python',
      issuer: 'University of Michigan',
      date: 'Apr 2023',
      icon: '💻'
    }
  ]

  return (
    <section id="education" className="education" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education & Certifications</h2>
        </motion.div>

        <div className="education-content">
          <motion.div 
            className="education-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="education-section-title">
              <FiBook /> Education
            </h3>
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-header">
                  <h4>{edu.degree}</h4>
                  <span className="education-period">
                    <FiCalendar /> {edu.period}
                  </span>
                </div>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-description">{edu.description}</p>
                <div className="education-achievements">
                  {edu.achievements.map((achievement, i) => (
                    <span key={i} className="achievement-badge">
                      <FiAward /> {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="certifications-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="education-section-title">
              <FiAward /> Certifications
            </h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="certification-card"
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                >
                  <span className="cert-icon">{cert.icon}</span>
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
