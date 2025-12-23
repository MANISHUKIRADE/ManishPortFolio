import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface PlanetProps {
  position?: [number, number, number]
  size?: number
  color?: string
  speed?: number
  rings?: boolean
}

const Planet = ({ 
  position = [0, 0, 0], 
  size = 1, 
  color = '#8b5cf6',
  speed = 0.5,
  rings = false
}: PlanetProps) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rings */}
      {rings && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={position}>
          <torusGeometry args={[size * 1.5, size * 0.1, 16, 100]} />
          <meshStandardMaterial
            color="#64748b"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Atmosphere glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  )
}

export default Planet

