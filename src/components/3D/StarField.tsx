import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'
import * as THREE from 'three'

interface StarFieldProps {
  count?: number
  speed?: number
}

const StarField = ({ count = 5000, speed = 0.1 }: StarFieldProps) => {
  const pointsRef = useRef<Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [count])

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color()
      // Mix of blue, white, and purple stars
      const rand = Math.random()
      if (rand < 0.3) {
        color.setRGB(0.9, 0.9, 1.0) // Blue-white
      } else if (rand < 0.6) {
        color.setRGB(1.0, 1.0, 1.0) // White
      } else {
        color.setRGB(0.8, 0.7, 1.0) // Purple-white
      }
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return colors
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default StarField

