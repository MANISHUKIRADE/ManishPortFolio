import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface RotatingCubeProps {
  position?: [number, number, number]
}

const RotatingCube = ({ position = [0, 0, 0] }: RotatingCubeProps) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    console.log('delta', state)
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.8}
        roughness={0.2}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export default RotatingCube

