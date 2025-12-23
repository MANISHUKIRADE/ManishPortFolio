import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { useGLTF } from '@react-three/drei'

interface HumanModelProps {
  position?: [number, number, number]
  scale?: number
}

// Fallback simple human model if GLTF loader fails
const SimpleHumanModel = ({ position = [0, 0, 0], scale = 1 }: HumanModelProps) => {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      
      // Slight rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Body/Torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.3}
          roughness={0.7}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.35, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.35, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.15, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.15, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Glow effect around the model */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          emissive="#3b82f6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

const HumanModel = ({ position = [0, 0, 0], scale = 1 }: HumanModelProps) => {
  // Try to load a GLTF model, fallback to simple model
  let gltf: any = null
  try {
    // You can add a GLTF model here if you have one
    // gltf = useGLTF('/models/human.gltf')
  } catch {
    // Fallback to simple model
  }

  if (gltf) {
    return (
      <primitive
        object={gltf.scene}
        position={position}
        scale={scale}
      />
    )
  }

  return <SimpleHumanModel position={position} scale={scale} />
}

export default HumanModel

