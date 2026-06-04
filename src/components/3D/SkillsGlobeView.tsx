import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import EarthGlobe from './EarthGlobe'
import { useInViewPause } from '../../hooks/useInViewPause'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const SkillsGlobeView = () => {
  const [ref, active] = useInViewPause<HTMLDivElement>({ threshold: 0.15 })
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div
        ref={ref}
        className="w-full h-full flex items-center justify-center text-slate-500 text-sm"
      >
        Global engineering footprint
      </div>
    )
  }

  return (
    <div ref={ref} className="w-full h-full">
      {active && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.25]}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, 10, 10]} intensity={0.8} color="#93c5fd" />
          <EarthGlobe />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      )}
    </div>
  )
}

export default SkillsGlobeView
