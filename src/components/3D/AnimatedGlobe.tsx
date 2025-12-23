import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Sphere } from '@react-three/drei'

const AnimatedGlobe = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        emissive="#1e40af"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  )
}

export default AnimatedGlobe

