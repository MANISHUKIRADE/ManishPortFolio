import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

interface SatelliteProps {
  position?: [number, number, number]
  speed?: number
}

const Satellite = ({ position = [0, 0, 0], speed = 1 }: SatelliteProps) => {
  const groupRef = useRef<Group>(null)
  const solarPanel1Ref = useRef<Mesh>(null)
  const solarPanel2Ref = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate around its axis
      groupRef.current.rotation.y += delta * 0.5 * speed
      
      // Orbit motion
      const time = state.clock.elapsedTime * speed
      groupRef.current.position.x = position[0] + Math.cos(time) * 2
      groupRef.current.position.z = position[2] + Math.sin(time) * 2
    }

    // Rotate solar panels
    if (solarPanel1Ref.current && solarPanel2Ref.current) {
      solarPanel1Ref.current.rotation.y += delta * 0.3
      solarPanel2Ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.5]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.1}
          emissive="#60a5fa"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Solar Panel 1 */}
      <mesh ref={solarPanel1Ref} position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Solar Panel 2 */}
      <mesh ref={solarPanel2Ref} position={[0.5, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

export default Satellite

