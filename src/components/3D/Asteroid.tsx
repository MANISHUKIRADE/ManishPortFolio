import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

interface AsteroidProps {
  position?: [number, number, number]
  size?: number
  speed?: number
}

const Asteroid = ({ position = [0, 0, 0], size = 0.3, speed = 1 }: AsteroidProps) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Random rotation
      meshRef.current.rotation.x += delta * 0.5 * speed
      meshRef.current.rotation.y += delta * 0.7 * speed
      meshRef.current.rotation.z += delta * 0.3 * speed

      // Float motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
    }
  })

  // Create irregular shape
  const shape = useRef(new THREE.IcosahedronGeometry(size, 0)).current

  return (
    <mesh ref={meshRef} position={position} geometry={shape}>
      <meshStandardMaterial
        color="#475569"
        metalness={0.2}
        roughness={0.8}
        emissive="#334155"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

export default Asteroid

