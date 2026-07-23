import CssStarfield from './ui/CssStarfield'

/** Global static starfield — no canvas particles, no Three.js */
const SiteBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-bg" />
    <CssStarfield className="opacity-30" />
  </div>
)

export default SiteBackground
