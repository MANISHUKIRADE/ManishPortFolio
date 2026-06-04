import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import StarField from './StarField'
import Planet from './Planet'
import Satellite from './Satellite'
import Asteroid from './Asteroid'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

interface SpaceSceneProps {
  variant?: 'hero' | 'subtle'
  className?: string
  active?: boolean
}

const SpaceScene = ({ variant = 'hero', className = '', active = true }: SpaceSceneProps) => {
  const isHero = variant === 'hero'
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const handler = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  if (reducedMotion || !active) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(34,211,238,0.1), transparent), #030712',
        }}
      />
    )
  }

  const starCount = isMobile ? 2500 : isHero ? 6000 : 3000
  const showDetails = isHero && !isMobile
  const frameloop = active && tabVisible ? 'always' : 'demand'

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.25]}
        frameloop={frameloop}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#e0f2fe" />
        <pointLight position={[-8, 4, 6]} intensity={0.35} color="#22d3ee" />

        <StarField count={starCount} speed={isHero ? 0.02 : 0.01} />

        {showDetails && (
          <>
            <Planet position={[-4.5, 2, -5]} size={1.1} color="#5b8a9a" speed={0.25} rings />
            <Planet position={[5, -1.2, -6]} size={0.75} color="#3d6b5c" speed={0.35} />
            <Planet position={[-6, -2, -4.5]} size={0.55} color="#7a4a6a" speed={0.4} />
            <Satellite position={[0, 3.2, -3]} speed={0.7} />
            <Satellite position={[3.2, -2, -4]} speed={1} />
            <Asteroid position={[2, 2, -2]} size={0.18} speed={1.4} />
            <Asteroid position={[-2, -1, -3]} size={0.14} speed={1.6} />
          </>
        )}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={tabVisible}
          autoRotateSpeed={isHero ? 0.2 : 0.12}
        />
      </Canvas>
    </div>
  )
}

export default SpaceScene
