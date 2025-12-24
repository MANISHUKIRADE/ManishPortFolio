import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import StarField from './3D/StarField'
import { OrbitControls } from '@react-three/drei'

const BlogSection = () => {
  const handleResumeDownload = () => {
    // Create a download link for resume
    const link = document.createElement('a')
    link.href = '/Resume.pdf' // Resume file in public folder
    link.download = 'Manish_Ukirade_Resume.pdf'
    link.click()
  }

  return (
    <section id="blog" className="relative py-12 px-4 overflow-hidden min-h-[400px] flex items-center">
      {/* Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
          <StarField count={5000} speed={0.03} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-purple-400 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Resume
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Download My Resume
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Get my complete professional profile and experience
          </p>
        </motion.div>

        {/* Resume Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeDownload}
            className="relative group cursor-pointer max-w-lg mx-auto p-8 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                  'linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                  'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 group-hover:opacity-30 transition-opacity"
              >
                <Download className="w-12 h-12 text-purple-400" />
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Download Resume</h3>
                <p className="text-sm text-slate-400">Click to download my complete professional profile</p>
              </div>
              
              <motion.div
                animate={{ 
                  x: [0, 8, 0],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600/20 rounded-lg border border-purple-500/30"
              >
                <Download className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Download PDF</span>
              </motion.div>
            </div>
            
            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)',
                filter: 'blur(30px)',
              } as React.CSSProperties}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection
