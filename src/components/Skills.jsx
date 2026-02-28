import { useRef, useEffect, useMemo, useLayoutEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaLaravel, FaGitAlt, 
  FaDocker, FaHtml5, FaCss3Alt, FaAws
} from 'react-icons/fa'
import { 
  SiMongodb, SiDotnet, SiMysql, SiTailwindcss, SiFastapi, 
  SiExpress, SiPostgresql, SiTypescript, SiFirebase
} from 'react-icons/si'
import './Skills.css'

// Organized by position on sphere
const skills = [
  // Top pole
  { name: 'React', icon: FaReact, color: '#61dafb', position: 'top' },
  
  // Upper ring - Frontend (4 items)
  { name: 'JavaScript', icon: FaJs, color: '#f7df1e', ring: 0 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', ring: 0 },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4', ring: 0 },
  { name: 'HTML/CSS', icon: FaHtml5, color: '#e34f26', ring: 0 },
  
  // Middle ring - Backend (5 items)
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063', ring: 1 },
  { name: 'Python', icon: FaPython, color: '#3776ab', ring: 1 },
  { name: 'Laravel', icon: FaLaravel, color: '#ff2d20', ring: 1 },
  { name: '.NET', icon: SiDotnet, color: '#512bd4', ring: 1 },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', ring: 1 },
  
  // Lower ring - Database & DevOps (4 items)
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', ring: 2 },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', ring: 2 },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1', ring: 2 },
  { name: 'Docker', icon: FaDocker, color: '#2496ed', ring: 2 },
  
  // Bottom pole
  { name: 'Git', icon: FaGitAlt, color: '#f05032', position: 'bottom' },
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

// Calculate ring-based positions for organized skill placement
const getSkillPositions = (skillsArray, radius) => {
  // Group skills by ring
  const rings = [[], [], []]
  skillsArray.forEach((skill, idx) => {
    if (skill.ring !== undefined) {
      rings[skill.ring].push(idx)
    }
  })
  
  const positions = []
  
  // Ring heights (latitude): upper, middle, lower
  const ringLatitudes = [0.55, 0, -0.55]
  
  skillsArray.forEach((skill, idx) => {
    // Handle pole positions
    if (skill.position === 'top') {
      positions.push({ x: 0, y: radius * 0.95, z: 0 })
      return
    }
    if (skill.position === 'bottom') {
      positions.push({ x: 0, y: -radius * 0.95, z: 0 })
      return
    }
    
    const ring = skill.ring
    const itemsInRing = rings[ring]
    const indexInRing = itemsInRing.indexOf(idx)
    const totalInRing = itemsInRing.length
    
    // Evenly space around the ring with offset per ring
    const ringOffset = ring * (Math.PI / 4)
    const theta = (2 * Math.PI * indexInRing / totalInRing) + ringOffset
    
    const y = ringLatitudes[ring] * radius
    const ringRadius = Math.sqrt(1 - ringLatitudes[ring] ** 2) * radius
    
    positions.push({
      x: ringRadius * Math.cos(theta),
      y: y,
      z: ringRadius * Math.sin(theta)
    })
  })
  
  return positions
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
  const isVisibleRef = useRef(false)
  
  // DOM refs for direct manipulation (no React re-renders)
  const svgRef = useRef(null)
  const skillsCloudRef = useRef(null)
  const globeContainerRef = useRef(null)
  
  // Detect mobile for responsive sizing
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const globeRadius = isMobile ? 150 : 220
  const icoRadius = isMobile ? 130 : 180
  
  const icosahedron = useMemo(() => generateIcosahedron(icoRadius, 1), [icoRadius])  // Reduced subdivisions for performance
  const particles = useMemo(() => generateParticles(15), [])  // Reduced for performance
  const skillPositions = useMemo(() => getSkillPositions(skills, globeRadius), [globeRadius])

  // Track visibility for animation pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    
    if (globeContainerRef.current) {
      observer.observe(globeContainerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  // High-performance animation loop with direct DOM updates
  useLayoutEffect(() => {
    let animationId
    let lastTime = 0
    let linesCache = null
    let itemsCache = null
    const isMobileDevice = window.innerWidth <= 768
    const radius = isMobileDevice ? 150 : 220
    const icoRadiusAnim = isMobileDevice ? 130 : 180
    const DEG_TO_RAD = Math.PI / 180
    // Mobile: reduce update frequency for better performance
    const opacityUpdateInterval = isMobileDevice ? 8 : 4
    const lineOpacityInterval = isMobileDevice ? 6 : 3
    const maxRotX = isMobileDevice ? 30 : 60  // Constrain vertical motion on mobile
    
    // Pre-allocate transform string builder
    let frameCount = 0
    
    const animate = (currentTime) => {
      // Always schedule next frame first for consistent timing
      animationId = requestAnimationFrame(animate)
      
      // Skip first frame to establish timing
      if (lastTime === 0) {
        lastTime = currentTime
        return
      }
      
      // Skip if not visible (saves CPU)
      if (!isVisibleRef.current) {
        lastTime = currentTime
        return
      }
      
      const deltaTime = currentTime - lastTime
      // Cap deltaTime to prevent huge jumps
      const cappedDelta = Math.min(deltaTime, 50)
      const timeScale = cappedDelta / 16.667 // Normalize to 60fps
      
      const vel = velocityRef.current
      const rot = rotationRef.current
      
      // Physics update (frame-rate independent)
      if (!isDraggingRef.current) {
        rot.y += 0.15 * timeScale
        if (Math.abs(vel.x) > 0.01 || Math.abs(vel.y) > 0.01) {
          rot.x = Math.max(-maxRotX, Math.min(maxRotX, rot.x + vel.x * timeScale))
          rot.y += vel.y * timeScale
          const friction = Math.pow(0.92, timeScale)
          vel.x *= friction
          vel.y *= friction
        }
      }
      
      // Pre-calculate trig values (big perf win)
      const radX = rot.x * DEG_TO_RAD
      const radY = rot.y * DEG_TO_RAD
      const cosX = Math.cos(radX)
      const sinX = Math.sin(radX)
      const cosY = Math.cos(radY)
      const sinY = Math.sin(radY)
      
      // Inline rotation function with cached trig
      const rotatePointFast = (x, y, z) => {
        const x1 = x * cosY - z * sinY
        const z1 = x * sinY + z * cosY
        const y1 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        return { x: x1, y: y1, z: z2 }
      }
      
      // Cache DOM queries (only once)
      if (svgRef.current && !linesCache) {
        linesCache = svgRef.current.querySelectorAll('line')
      }
      if (skillsCloudRef.current && !itemsCache) {
        itemsCache = skillsCloudRef.current.querySelectorAll('.skill-item')
      }
      
      // Update SVG lines
      if (linesCache) {
        const edges = icosahedron.edges
        const verts = icosahedron.vertices
        const len = edges.length
        for (let i = 0; i < len; i++) {
          const edge = edges[i]
          const v1 = verts[edge[0]]
          const v2 = verts[edge[1]]
          const p1 = rotatePointFast(v1[0], v1[1], v1[2])
          const p2 = rotatePointFast(v2[0], v2[1], v2[2])
          
          const line = linesCache[i]
          if (line) {
            line.setAttribute('x1', p1.x)
            line.setAttribute('y1', p1.y)
            line.setAttribute('x2', p2.x)
            line.setAttribute('y2', p2.y)
            // Update opacity less frequently (every 3 frames on desktop, 6 on mobile)
            if (frameCount % lineOpacityInterval === 0) {
              line.setAttribute('opacity', ((p1.z + p2.z) / 2 + icoRadiusAnim) / (icoRadiusAnim * 2) * 0.6 + 0.15)
            }
          }
        }
      }
      
      // Update skill items
      if (itemsCache) {
        const len = skillPositions.length
        for (let i = 0; i < len; i++) {
          const pos = skillPositions[i]
          const rotated = rotatePointFast(pos.x, pos.y, pos.z)
          // Scale with reduced range to minimize size changes
          const scale = (rotated.z + radius) / (radius * 2) * 0.4 + 0.6
          
          const item = itemsCache[i]
          if (item) {
            item.style.transform = `translate3d(${rotated.x}px, ${rotated.y}px, 0) scale(${scale})`
            // Update opacity/zIndex less frequently (every 4 frames desktop, 8 mobile)
            if (frameCount % opacityUpdateInterval === 0) {
              item.style.opacity = (rotated.z + radius) / (radius * 2) * 0.6 + 0.4
              item.style.zIndex = (rotated.z + radius) | 0
            }
          }
        }
      }
      
      frameCount++
      lastTime = currentTime
    }
    
    // Start animation immediately
    isVisibleRef.current = true // Start visible to render initial state
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [icosahedron, skillPositions])

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
          ref={globeContainerRef}
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
