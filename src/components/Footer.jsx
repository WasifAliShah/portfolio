import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/wasifalishah', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/wasif-ali-shah', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: 'https://twitter.com/wasifalishah', label: 'Twitter' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              Wasif
              <span className="logo-bracket">/&gt;</span>
            </a>
            <p>Full Stack Web Developer passionate about creating exceptional digital experiences.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="footer-social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Syed Wasif Ali Shah. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FiHeart className="heart-icon" /> using React
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
