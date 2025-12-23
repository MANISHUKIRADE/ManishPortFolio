import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text3D } from '@react-three/drei'

interface AnimatedText3DProps {
  text: string
  position?: [number, number, number]
  size?: number
  color?: string
}

const AnimatedText3D = ({ 
  text, 
  position = [0, 0, 0], 
  size = 0.5,
  color = '#3b82f6'
}: AnimatedText3DProps) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Float animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
      
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={size}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Text3D>
    </mesh>
  )
}

export default AnimatedText3D

