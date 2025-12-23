import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

interface AnimatedHumanProps {
  position?: [number, number, number]
  scale?: number
}

const AnimatedHuman = ({ position = [0, 0, 0], scale = 1 }: AnimatedHumanProps) => {
  const groupRef = useRef<Group>(null)
  const headRef = useRef<Mesh>(null)
  const leftArmRef = useRef<Mesh>(null)
  const rightArmRef = useRef<Mesh>(null)
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

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
      
      // Slight rotation based on mouse
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + mouse.x * 0.1
    }

    // Animate head to look at mouse
    if (headRef.current) {
      headRef.current.rotation.y = mouse.x * 0.2
      headRef.current.rotation.x = mouse.y * 0.1
    }

    // Animate arms (waving motion)
    if (leftArmRef.current && rightArmRef.current) {
      const wave = Math.sin(state.clock.elapsedTime * 2) * 0.3
      leftArmRef.current.rotation.z = 0.3 + wave * 0.2
      rightArmRef.current.rotation.z = -0.3 - wave * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.55, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.55, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body/Torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.9, 0.35]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.4}
          roughness={0.6}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.4, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.18, 0.7, 0.18]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.4, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.18, 0.7, 0.18]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.4, 0.25, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.4, 0.25, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#fdbcb4"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.18, -0.4, 0]}>
        <boxGeometry args={[0.18, 0.8, 0.18]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.18, -0.4, 0]}>
        <boxGeometry args={[0.18, 0.8, 0.18]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.18, -0.9, 0.1]}>
        <boxGeometry args={[0.2, 0.15, 0.3]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0.18, -0.9, 0.1]}>
        <boxGeometry args={[0.2, 0.15, 0.3]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Glow effect around the model */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Particles around the character */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.8
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.7 + Math.sin(i) * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default AnimatedHuman

