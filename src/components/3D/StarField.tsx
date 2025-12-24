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
    const colorArray = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color()
      const rand = Math.random()
      // More realistic star colors based on temperature
      if (rand < 0.5) {
        // White/blue-white stars (hot)
        color.setRGB(0.95, 0.95, 1.0)
      } else if (rand < 0.75) {
        // Yellow-white stars (medium)
        color.setRGB(1.0, 0.98, 0.9)
      } else if (rand < 0.9) {
        // Yellow stars (cooler)
        color.setRGB(1.0, 0.95, 0.8)
      } else {
        // Red stars (coolest)
        color.setRGB(1.0, 0.8, 0.7)
      }
      colorArray[i * 3] = color.r
      colorArray[i * 3 + 1] = color.g
      colorArray[i * 3 + 2] = color.b
    }
    return colorArray
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default StarField

