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
    { name: 'Asia', lat: 30, lon: 100, distance: 5, duration: 2000 },
    { name: 'India', lat: 20.5937, lon: 78.9629, distance: 3.5, duration: 2500 },
    { name: 'Maharashtra', lat: 19.7515, lon: 75.7139, distance: 2.5, duration: 2500 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, distance: 1.8, duration: 3000 },
  ]
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const animateToLocation = (index: number) => {
      if (index >= locations.length) {
        setTimeout(() => {
          animateToLocation(0)
        }, 2000)
        return
      }
      
      const location = locations[index]
      const targetPos = latLongToPosition(location.lat, location.lon, location.distance)
      targetPosition.current = targetPos
      
      timeoutId = setTimeout(() => {
        setTimeout(() => {
          animateToLocation(index + 1)
        }, 500)
      }, location.duration)
    }
    
    const initialDelay = setTimeout(() => {
      animateToLocation(0)
    }, 1000)
    
    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timeoutId)
    }
  }, [])
  
  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Earth component with texture
function EarthWithTexture() {
  const meshRef = useRef<Mesh>(null)
  
  // Load Earth texture
  const earthTexture = useTexture('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth, slow rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <>
      {/* Main Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          emissive="#1a237e"
          emissiveIntensity={0.05}
        />
      </Sphere>
      
      {/* Inner Glow Layer */}
      <Sphere args={[2.02, 64, 64]}>
        <meshStandardMaterial
          color="#4a90e2"
          transparent
          opacity={0.1}
          emissive="#4a90e2"
          emissiveIntensity={0.15}
        />
      </Sphere>
      
      {/* Outer Atmosphere Layer 1 */}
      <Sphere args={[2.08, 64, 64]}>
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          emissive="#60a5fa"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Outer Atmosphere Layer 2 */}
      <Sphere args={[2.12, 64, 64]}>
        <meshStandardMaterial
          color="#93c5fd"
          transparent
          opacity={0.05}
          emissive="#93c5fd"
          emissiveIntensity={0.08}
        />
      </Sphere>
    </>
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
    <>
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.7}
          metalness={0.1}
          emissive="#1a237e"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Atmosphere layers for fallback */}
      <Sphere args={[2.05, 64, 64]}>
        <meshStandardMaterial
          color="#4a90e2"
          transparent
          opacity={0.12}
          emissive="#4a90e2"
          emissiveIntensity={0.15}
        />
      </Sphere>
      
      <Sphere args={[2.1, 64, 64]}>
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.06}
          emissive="#60a5fa"
          emissiveIntensity={0.1}
        />
      </Sphere>
    </>
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
    </group>
  )
}

export default EarthGlobe
