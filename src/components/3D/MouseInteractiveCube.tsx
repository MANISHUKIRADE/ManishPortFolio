import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh } from 'three'

interface MouseInteractiveCubeProps {
  position?: [number, number, number]
  color?: string
}

const MouseInteractiveCube = ({ position = [0, 0, 0], color = '#3b82f6' }: MouseInteractiveCubeProps) => {
  const meshRef = useRef<Mesh>(null)
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

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5

      // Follow mouse position
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      
      meshRef.current.position.x = position[0] + x * 0.1
      meshRef.current.position.y = position[1] + y * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export default MouseInteractiveCube

