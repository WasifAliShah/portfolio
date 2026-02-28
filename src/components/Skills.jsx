import { useRef, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaLaravel, FaGitAlt, 
  FaDocker, FaHtml5, FaCss3Alt, FaDatabase
} from 'react-icons/fa'
import { 
  SiMongodb, SiDotnet, SiMysql, SiTailwindcss, SiFastapi, 
  SiExpress, SiPostgresql, SiTypescript
} from 'react-icons/si'
import './Skills.css'

const skills = [
  { name: 'React', icon: FaReact, color: '#61dafb' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063' },
  { name: 'Python', icon: FaPython, color: '#3776ab' },
  { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'Laravel', icon: FaLaravel, color: '#ff2d20' },
  { name: '.NET', icon: SiDotnet, color: '#512bd4' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Git', icon: FaGitAlt, color: '#f05032' },
  { name: 'Docker', icon: FaDocker, color: '#2496ed' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
  { name: 'REST APIs', icon: FaDatabase, color: '#6366f1' },
]

// Generate icosahedron vertices and edges
// Generate subdivided icosahedron for more edges
const generateIcosahedron = (radius, subdivisions = 2) => {
  const t = (1 + Math.sqrt(5)) / 2
  
  // Initial icosahedron vertices
  let vertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ]
  
  // Initial faces
  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ]
  
  // Midpoint cache
  const getMidpoint = (v1Idx, v2Idx, midpointCache) => {
    const key = v1Idx < v2Idx ? `${v1Idx}_${v2Idx}` : `${v2Idx}_${v1Idx}`
    if (midpointCache[key] !== undefined) return midpointCache[key]
    
    const v1 = vertices[v1Idx]
    const v2 = vertices[v2Idx]
    const mid = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2, (v1[2] + v2[2]) / 2]
    
    vertices.push(mid)
    midpointCache[key] = vertices.length - 1
    return midpointCache[key]
  }
  
  // Subdivide faces
  for (let i = 0; i < subdivisions; i++) {
    const newFaces = []
    const midpointCache = {}
    
    for (const face of faces) {
      const a = getMidpoint(face[0], face[1], midpointCache)
      const b = getMidpoint(face[1], face[2], midpointCache)
      const c = getMidpoint(face[2], face[0], midpointCache)
      
      newFaces.push([face[0], a, c])
      newFaces.push([face[1], b, a])
      newFaces.push([face[2], c, b])
      newFaces.push([a, b, c])
    }
    faces = newFaces
  }
  
  // Normalize and scale vertices to sphere
  vertices = vertices.map(v => {
    const len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    return v.map(c => (c / len) * radius)
  })
  
  // Extract unique edges
  const edges = new Set()
  faces.forEach(face => {
    edges.add([Math.min(face[0], face[1]), Math.max(face[0], face[1])].join(','))
    edges.add([Math.min(face[1], face[2]), Math.max(face[1], face[2])].join(','))
    edges.add([Math.min(face[2], face[0]), Math.max(face[2], face[0])].join(','))
  })
  
  return { vertices, edges: [...edges].map(e => e.split(',').map(Number)) }
}

// Calculate spherical positions for skills
const getSphericalPosition = (index, total, radius) => {
  const phi = Math.acos(1 - 2 * (index + 0.5) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * index
  
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }
}

// Generate random particles (reduced for performance)
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    duration: Math.random() * 30 + 20
  }))
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Use refs for smooth animation (avoids state update delays)
  const rotationRef = useRef({ x: 15, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  
  // DOM refs for direct manipulation (no React re-renders)
  const svgRef = useRef(null)
  const skillsCloudRef = useRef(null)
  
  const icosahedron = useMemo(() => generateIcosahedron(180), [])
  const particles = useMemo(() => generateParticles(25), [])  // Reduced for performance
  const skillPositions = useMemo(() => 
    skills.map((_, index) => getSphericalPosition(index, skills.length, 220)), 
  [])

  // 3D rotation transform function
  const rotatePoint = useRef((x, y, z, rotX, rotY) => {
    const radX = (rotX * Math.PI) / 180
    const radY = (rotY * Math.PI) / 180
    
    let x1 = x * Math.cos(radY) - z * Math.sin(radY)
    let z1 = x * Math.sin(radY) + z * Math.cos(radY)
    let y1 = y * Math.cos(radX) - z1 * Math.sin(radX)
    let z2 = y * Math.sin(radX) + z1 * Math.cos(radX)
    
    return { x: x1, y: y1, z: z2 }
  }).current

  // High-performance animation loop with direct DOM updates
  useEffect(() => {
    let animationId
    let lastTime = performance.now()
    let linesCache = null
    let itemsCache = null
    const radius = 220
    const targetFPS = 60
    const frameTime = 1000 / targetFPS
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      const timeScale = deltaTime / frameTime // Normalize to 60fps
      
      const vel = velocityRef.current
      const rot = rotationRef.current
      
      // Physics update (frame-rate independent)
      if (!isDraggingRef.current) {
        rot.y += 0.3 * timeScale
        if (Math.abs(vel.x) > 0.01 || Math.abs(vel.y) > 0.01) {
          rot.x = Math.max(-60, Math.min(60, rot.x + vel.x * timeScale))
          rot.y += vel.y * timeScale
          const friction = Math.pow(0.94, timeScale)
          vel.x *= friction
          vel.y *= friction
        }
      }
      
      // Cache DOM queries (only once)
      if (svgRef.current && !linesCache) {
        linesCache = svgRef.current.querySelectorAll('line')
      }
      if (skillsCloudRef.current && !itemsCache) {
        itemsCache = skillsCloudRef.current.querySelectorAll('.skill-item')
      }
      
      // Direct SVG line updates
      if (linesCache) {
        const edges = icosahedron.edges
        const verts = icosahedron.vertices
        for (let i = 0; i < edges.length; i++) {
          const edge = edges[i]
          const v1 = verts[edge[0]]
          const v2 = verts[edge[1]]
          const p1 = rotatePoint(v1[0], v1[1], v1[2], rot.x, rot.y)
          const p2 = rotatePoint(v2[0], v2[1], v2[2], rot.x, rot.y)
          const opacity = ((p1.z + p2.z) / 2 + 180) / 360 * 0.6 + 0.15
          
          const line = linesCache[i]
          if (line) {
            line.setAttribute('x1', p1.x)
            line.setAttribute('y1', p1.y)
            line.setAttribute('x2', p2.x)
            line.setAttribute('y2', p2.y)
            line.setAttribute('opacity', opacity)
          }
        }
      }
      
      // Direct skill item updates
      if (itemsCache) {
        for (let i = 0; i < skillPositions.length; i++) {
          const pos = skillPositions[i]
          const rotated = rotatePoint(pos.x, pos.y, pos.z, rot.x, rot.y)
          const scale = (rotated.z + radius) / (radius * 2) * 0.6 + 0.4
          const opacity = (rotated.z + radius) / (radius * 2) * 0.8 + 0.2
          
          const item = itemsCache[i]
          if (item) {
            item.style.transform = `translate3d(${rotated.x}px, ${rotated.y}px, 0) scale(${scale})`
            item.style.opacity = opacity
            item.style.zIndex = Math.round(rotated.z + radius)
          }
        }
      }
      
      lastTime = currentTime
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [icosahedron, skillPositions, rotatePoint])

  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    velocityRef.current = { x: 0, y: 0 }
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - lastMouseRef.current.x
    const deltaY = e.clientY - lastMouseRef.current.y
    
    // Smooth velocity accumulation
    velocityRef.current = {
      x: deltaY * -0.08,
      y: deltaX * 0.08
    }
    
    rotationRef.current = {
      x: Math.max(-60, Math.min(60, rotationRef.current.x - deltaY * 0.5)),
      y: rotationRef.current.y + deltaX * 0.5
    }
    
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const handleTouchStart = (e) => {
    isDraggingRef.current = true
    velocityRef.current = { x: 0, y: 0 }
    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return
    const deltaX = e.touches[0].clientX - lastMouseRef.current.x
    const deltaY = e.touches[0].clientY - lastMouseRef.current.y
    
    velocityRef.current = {
      x: deltaY * -0.08,
      y: deltaX * 0.08
    }
    
    rotationRef.current = {
      x: Math.max(-60, Math.min(60, rotationRef.current.x - deltaY * 0.5)),
      y: rotationRef.current.y + deltaX * 0.5
    }
    
    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
  }

  const radius = 220

  return (
    <section id="skills" className="skills" ref={ref}>
      {/* Particles background */}
      <div className="particles-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </motion.div>

        <motion.div 
          className="globe-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Icosahedron wireframe */}
          <svg ref={svgRef} className="icosahedron-svg" viewBox="-250 -250 500 500">
            {icosahedron.edges.map((edge, i) => (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={0}
                y2={0}
                stroke="var(--primary)"
                strokeWidth="1"
                opacity={0.3}
              />
            ))}
          </svg>

          {/* Skills distributed on sphere */}
          <div ref={skillsCloudRef} className="skills-cloud">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              
              return (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{
                    transform: 'translate(0px, 0px) scale(0.7)',
                    opacity: 0.5,
                  }}
                >
                  <Icon className="skill-icon" style={{ color: skill.color }} />
                  <span className="skill-name">{skill.name}</span>
                </div>
              )
            })}
          </div>

          <div className="globe-hint">
            <span>🌐 Drag to explore skills universe</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
