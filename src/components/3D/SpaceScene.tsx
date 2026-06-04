import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import StarField from './StarField'
import Planet from './Planet'
import Satellite from './Satellite'
import Asteroid from './Asteroid'

interface SpaceSceneProps {
  /** Full hero scene with planets; subtle is stars + minimal objects */
  variant?: 'hero' | 'subtle'
  className?: string
}

const SpaceScene = ({ variant = 'hero', className = '' }: SpaceSceneProps) => {
  const isHero = variant === 'hero'
  const starCount = isHero ? 12000 : 6000

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#e0f2fe" />
        <pointLight position={[-8, 4, 6]} intensity={0.35} color="#22d3ee" />
        <pointLight position={[0, -8, 2]} intensity={0.15} color="#2dd4bf" />

        <StarField count={starCount} speed={isHero ? 0.02 : 0.01} />
        {isHero && <StarField count={4000} speed={0.008} />}

        {isHero && (
          <>
            {/* Cyan-tinted gas giant — ties space to nexus palette */}
            <Planet position={[-4.5, 2, -5]} size={1.1} color="#5b8a9a" speed={0.25} rings />
            <Planet position={[5, -1.2, -6]} size={0.75} color="#3d6b5c" speed={0.35} />
            <Planet position={[-6, -2, -4.5]} size={0.55} color="#7a4a6a" speed={0.4} />

            <Satellite position={[0, 3.2, -3]} speed={0.7} />
            <Satellite position={[3.2, -2, -4]} speed={1} />
            <Satellite position={[-3, 0.8, -5]} speed={0.55} />

            <Asteroid position={[2, 2, -2]} size={0.18} speed={1.4} />
            <Asteroid position={[-2, -1, -3]} size={0.14} speed={1.6} />
            <Asteroid position={[4, 0.2, -4]} size={0.2} speed={1.1} />
          </>
        )}

        {!isHero && (
          <Planet position={[6, 1, -7]} size={0.5} color="#4a7c8a" speed={0.2} />
        )}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isHero ? 0.25 : 0.15}
        />
      </Canvas>
    </div>
  )
}

export default SpaceScene
