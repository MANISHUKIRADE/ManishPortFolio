import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'

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
  color = '#4a5568',
  speed = 0.5,
  rings = false
}: PlanetProps) => {
  const meshRef = useRef<Mesh>(null)
  const cloudRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * (speed * 0.8)
    }
  })

  // Create a more realistic planet texture using noise
  const createPlanetTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Base color
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 512, 512)

    // Add surface variation
    const imageData = ctx.getImageData(0, 0, 512, 512)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 0.3 - 0.15
      data[i] = Math.max(0, Math.min(255, data[i] + noise * 255))     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255)) // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255)) // B
    }

    ctx.putImageData(imageData, 0, 0)
    return new THREE.CanvasTexture(canvas)
  }

  const planetTexture = createPlanetTexture()

  return (
    <>
      {/* Main planet sphere */}
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture || undefined}
          color={color}
          metalness={0.1}
          roughness={0.9}
          flatShading={false}
        />
      </mesh>

      {/* Cloud layer (for gas giants or planets with atmosphere) */}
      {rings && (
        <mesh ref={cloudRef} position={position}>
          <sphereGeometry args={[size * 1.02, 64, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
      )}

      {/* Rings - more realistic */}
      {rings && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={position}>
            <torusGeometry args={[size * 1.8, size * 0.05, 16, 100]} />
            <meshStandardMaterial
              color="#8b7355"
              metalness={0.3}
              roughness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={position}>
            <torusGeometry args={[size * 2.2, size * 0.03, 16, 100]} />
            <meshStandardMaterial
              color="#6b5d4f"
              metalness={0.3}
              roughness={0.8}
              transparent
              opacity={0.5}
            />
          </mesh>
        </>
      )}

      {/* Subtle atmosphere glow - only visible from certain angles */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.05, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

export default Planet

