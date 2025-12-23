import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface FloatingGeometryProps {
  type: 'torus' | 'sphere' | 'octahedron'
  position?: [number, number, number]
  color?: string
  speed?: number
}

const FloatingGeometry = ({ 
  type, 
  position = [0, 0, 0], 
  color = '#8b5cf6',
  speed = 1 
}: FloatingGeometryProps) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Float animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
      
      // Rotation
      meshRef.current.rotation.x += delta * 0.5 * speed
      meshRef.current.rotation.y += delta * 0.3 * speed
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
      {type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
      {type === 'octahedron' && <octahedronGeometry args={[0.5]} />}
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

export default FloatingGeometry

