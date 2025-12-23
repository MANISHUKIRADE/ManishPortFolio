import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollReactiveSceneProps {
  scrollY: number
}

const ScrollReactiveScene = ({ scrollY }: ScrollReactiveSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // React to scroll
      groupRef.current.rotation.y = scrollY * 0.001
      groupRef.current.position.y = scrollY * 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {/* Add your scroll-reactive elements here */}
    </group>
  )
}

export default ScrollReactiveScene

