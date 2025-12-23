import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points } from 'three'

const InteractiveParticles = () => {
  const pointsRef = useRef<Points>(null)
  const { viewport } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particles = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }

    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate particles
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1

      // React to mouse movement
      const mouseX = mouse.x * viewport.width * 0.5
      const mouseY = mouse.y * viewport.height * 0.5
      
      pointsRef.current.rotation.z += (mouseX * 0.0001)
      pointsRef.current.rotation.x += (mouseY * 0.0001)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#60a5fa"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default InteractiveParticles

