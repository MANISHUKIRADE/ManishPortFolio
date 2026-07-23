# Portfolio High-Tech Upgrade — Implementation Plan

> **For agentic workers:** Execute inline in this session. Checkbox steps track progress.

**Goal:** Ship the approved design spec: amber accent tokens, theme toggle, cmdk, architecture diagram, metrics strip, hero typewriter specialties, hybrid background, scroll reveals — without Three.js/particles on the critical path.

**Architecture:** CSS `data-theme` tokens + ThemeProvider; surgical retrofit of existing 7 sections; demote 3D imports.

**Tech Stack:** Vite, React 18, Tailwind 3, cmdk, Geist Sans, JetBrains Mono, existing Framer Motion (constrained).

## Global Constraints

- Accent amber only on interactive states (`#F59E0B` dark / `#D97706` light)
- Reveal ≤150ms ease-out; respect `prefers-reduced-motion`
- Lighthouse Performance ≥ 90; no Three.js on initial render
- Architecture diagram stacks vertically &lt;768px
- Do not commit unless user asks

---

### Task 1: Tokens + ThemeProvider + SiteBackground

**Files:**
- Create: `src/providers/ThemeProvider.tsx`
- Create: `src/components/SiteBackground.tsx`
- Create: `src/components/ui/TechGrid.tsx`
- Modify: `src/index.css`, `tailwind.config.js`, `src/config/site.ts`, `src/main.tsx`, `index.html`, `src/App.tsx`

- [x] Add CSS variables for dark/light + Tailwind `accent` colors
- [x] ThemeProvider with localStorage `portfolio-theme`
- [x] SiteBackground with CssStarfield; TechGrid for hero/arch
- [x] Wire App; remove InteractiveBackground

### Task 2: Command palette + ThemeToggle + Navbar

**Files:**
- Create: `src/components/CommandPalette.tsx`, `src/components/ui/ThemeToggle.tsx`
- Modify: `src/components/Navbar.tsx`, `src/App.tsx`

- [x] cmdk dialog with section nav, resume, theme toggle
- [x] ⌘K / Ctrl+K global shortcut
- [x] Navbar amber accents + ThemeToggle + ⌘K hint

### Task 3: Hero + Typewriter + Reveal + Metrics + Architecture

**Files:**
- Create: `src/components/ui/Reveal.tsx`, `src/components/MetricsStrip.tsx`, `src/components/ArchitectureDiagram.tsx`, `src/data/metrics.ts`, `src/data/architecture-kyara.ts`
- Modify: `src/components/HeroSection.tsx`, `src/components/ui/TypewriterText.tsx`, `src/components/CapabilitiesSection.tsx`, `src/components/ProjectsSection.tsx`

- [x] Looping specialty typewriter; remove SpaceScene/blobs
- [x] MetricsStrip in Capabilities
- [x] ArchitectureDiagram under KYARA project
- [x] Reveal wrapper available for sections

### Task 4: Verify build

- [x] `npm run build` passes
- [x] Fix type/lint errors
