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
      // Slow rotation around its axis
      groupRef.current.rotation.y += delta * 0.2 * speed
      
      // Orbit motion - more realistic elliptical orbit
      const time = state.clock.elapsedTime * speed * 0.3
      const orbitRadius = 2.5
      groupRef.current.position.x = position[0] + Math.cos(time) * orbitRadius
      groupRef.current.position.z = position[2] + Math.sin(time) * orbitRadius
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3
    }

    // Solar panels track sun (simplified - just slow rotation)
    if (solarPanel1Ref.current && solarPanel2Ref.current) {
      solarPanel1Ref.current.rotation.y += delta * 0.1
      solarPanel2Ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main body - smaller and more realistic */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.15, 0.25]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.95}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Solar Panel 1 - more realistic proportions */}
      <mesh ref={solarPanel1Ref} position={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.3]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.1}
          roughness={0.9}
        />
        {/* Solar cells pattern */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.58, 0.01, 0.28]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      </mesh>

      {/* Solar Panel 2 */}
      <mesh ref={solarPanel2Ref} position={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.3]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.1}
          roughness={0.9}
        />
        {/* Solar cells pattern */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.58, 0.01, 0.28]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      </mesh>

      {/* Antenna array - more realistic */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Small antenna dish */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Very subtle reflection from sun - only visible when lit */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.02}
          emissive="#ffffff"
          emissiveIntensity={0.01}
        />
      </mesh>
    </group>
  )
}

export default Satellite

