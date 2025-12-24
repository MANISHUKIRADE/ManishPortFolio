import { useRef, Suspense, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { Sphere, useTexture } from '@react-three/drei'

// Convert lat/long to 3D position on sphere
function latLongToPosition(lat: number, lon: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  
  return new Vector3(x, y, z)
}

// Camera controller for progressive zoom
function CameraController() {
  const { camera } = useThree()
  const targetPosition = useRef(new Vector3(0, 0, 5))
  
  // Locations: Asia → India → Maharashtra → Mumbai
  const locations = [
    { name: 'Asia', lat: 30, lon: 100, distance: 5, duration: 2000 }, // Asia center
    { name: 'India', lat: 20.5937, lon: 78.9629, distance: 3.5, duration: 2500 }, // India center
    { name: 'Maharashtra', lat: 19.7515, lon: 75.7139, distance: 2.5, duration: 2500 }, // Maharashtra center
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, distance: 1.8, duration: 3000 }, // Mumbai
  ]
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const animateToLocation = (index: number) => {
      if (index >= locations.length) {
        // Loop back to start after a pause
        setTimeout(() => {
          animateToLocation(0)
        }, 2000)
        return
      }
      
      const location = locations[index]
      const targetPos = latLongToPosition(location.lat, location.lon, location.distance)
      targetPosition.current = targetPos
      
      // Move to next location after animation completes
      timeoutId = setTimeout(() => {
        setTimeout(() => {
          animateToLocation(index + 1)
        }, 500)
      }, location.duration)
    }
    
    // Start animation after initial delay
    const initialDelay = setTimeout(() => {
      animateToLocation(0)
    }, 1000)
    
    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timeoutId)
    }
  }, [])
  
  useFrame(() => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Earth component with texture
function EarthWithTexture() {
  const meshRef = useRef<Mesh>(null)
  
  // Load Earth texture - using a reliable CDN
  const earthTexture = useTexture('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')

  useFrame((state) => {
    if (meshRef.current) {
      // Very slow rotation so it doesn't interfere with zoom
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  )
}

// Fallback Earth without texture
function EarthFallback() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#4a90e2"
        roughness={0.8}
        metalness={0.2}
        emissive="#2c5aa0"
        emissiveIntensity={0.1}
      />
    </Sphere>
  )
}

const EarthGlobe = () => {
  return (
    <group>
      {/* Camera controller for progressive zoom */}
      <CameraController />
      
      {/* Main Earth Sphere with Suspense for texture loading */}
      <Suspense fallback={<EarthFallback />}>
        <EarthWithTexture />
      </Suspense>
      
      {/* Atmosphere Glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshStandardMaterial
          color="#4a90e2"
          transparent
          opacity={0.15}
          emissive="#4a90e2"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Outer Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

export default EarthGlobe
