# Portfolio High-Tech Credibility Upgrade — Design Spec

**Date:** 2026-07-23  
**Status:** Approved for planning (pending user review of this doc)  
**Stack:** Vite + React 18 + Tailwind 3 + Framer Motion (existing)  
**Approach:** Token + surgical upgrade (Approach 1)

## Goal

Upgrade the ML/AI engineer portfolio to read as senior and systems-oriented: evidence over decoration, one accent used sparingly, interactive proof (cmdk, architecture diagram, real metrics), without a generic SaaS-template look. Keep Lighthouse Performance ≥ 90.

## Locked decisions

| Decision | Choice |
|----------|--------|
| Background | Hybrid: global static `CssStarfield` + faint grid only behind hero and architecture diagram |
| Sections | Keep all 7 (Hero → Capabilities → Projects → Skills → Career → Blog → Contact); upgrade in place |
| Accent | Amber: dark `#F59E0B` / hover `#FBBF24` / muted `#78350F`; light `#D97706` / hover `#F59E0B` / muted `#FEF3C7` |
| Base | Near-black `#030712` (existing `nexus-950`) |
| Typography | Geist Sans (body/headlines) + JetBrains Mono (labels/code/metadata/cmdk/metrics) |
| 3D / particles | Remove from render path (SpaceScene, InteractiveBackground particles, floating blobs). Leave unused `3D/*` files unimported for a later cleanup PR |
| Chatbot | Keep `ChatbotWidget` as-is for this upgrade |
| Implementation | Approach 1 — CSS tokens + ThemeProvider, then retrofit features |

## Out of scope

- Rewriting Blog/Skills/Career content
- New backend for chat or live metrics APIs
- Deleting the `src/components/3D` tree (demote only)
- Replacing the chatbot with a new terminal widget

## Architecture

```
App
├── ThemeProvider          # data-theme on <html>, localStorage key `portfolio-theme`
├── SEO
├── SiteBackground         # CssStarfield + optional grid slots via props/CSS
├── Navbar                 # + ThemeToggle + ⌘K hint
├── CommandPalette         # cmdk, portal
├── main
│   ├── HeroSection            # typewriter specialties, faint grid, no 3D
│   ├── CapabilitiesSection    # hosts MetricsStrip
│   ├── ProjectsSection        # hosts ArchitectureDiagram for flagship
│   ├── SkillsSection (lazy)
│   ├── CareerJourneySection (lazy)
│   ├── BlogSection (lazy)
│   └── ContactSection
└── ChatbotWidget
```

### New modules

| Path | Responsibility |
|------|----------------|
| `src/providers/ThemeProvider.tsx` | Dark default, light toggle, persist, `useTheme` |
| `src/components/SiteBackground.tsx` | Replaces InteractiveBackground usage |
| `src/components/CommandPalette.tsx` | cmdk navigation + resume + theme |
| `src/components/ArchitectureDiagram.tsx` | Data-driven node graph; responsive layout |
| `src/components/MetricsStrip.tsx` | Numeric proof row |
| `src/components/ui/ThemeToggle.tsx` | Accessible toggle button |
| `src/components/ui/Reveal.tsx` | IntersectionObserver fade/slide ≤150ms |
| `src/data/architecture-kyara.ts` | Nodes, edges, tooltip tech copy |
| `src/data/metrics.ts` | Metric definitions (placeholders until owner supplies) |
| CSS variables in `index.css` + Tailwind mapping | Semantic tokens |

### Dependencies to add

- `cmdk` — command palette
- Geist Sans — via `geist` package or CDN `@font-face` (prefer self-hosted / npm for perf)

Existing: Framer Motion (constrain to ≤150ms ease-out or prefer CSS transitions in `Reveal`), JetBrains Mono, Lucide.

## Design tokens

### Dark (default)

- `--bg`: `#030712`
- `--surface`: `#0a0f1a`
- `--surface-2`: `#111827`
- `--text`: `#e2e8f0`
- `--muted`: `#94a3b8`
- `--border`: `#1e293b`
- `--accent`: `#F59E0B`
- `--accent-hover`: `#FBBF24`
- `--accent-muted`: `#78350F`

### Light

- `--bg`: `#F8FAFC`
- `--surface`: `#FFFFFF`
- `--surface-2`: `#F1F5F9`
- `--text`: `#0f172a`
- `--muted`: `#64748b`
- `--border`: `#E2E8F0`
- `--accent`: `#D97706`
- `--accent-hover`: `#F59E0B`
- `--accent-muted`: `#FEF3C7`

### Accent usage rules

Used for: link/button hover & focus, cmdk active row, architecture node hover, typewriter cursor, focus rings.

Not used for: large fills, gradient headlines, every icon, decorative glows.

Replace existing cyan/`primary-*` interactive usage with the accent token.

## Feature specs

### 1. Theme toggle

- Default: dark
- Persist: `localStorage['portfolio-theme']` = `dark` | `light`
- Apply via `document.documentElement.setAttribute('data-theme', theme)` — CSS selectors `[data-theme="dark"]` / `[data-theme="light"]`
- Instant swap (no color transition)
- First visit is always dark; do not auto-follow `prefers-color-scheme` in this upgrade (optional later)

### 2. Command palette

- Trigger: `⌘K` / `Ctrl+K`; close: `Esc` or overlay click
- Library: `cmdk`
- Items (existing section ids): Home (`#home`), Capabilities (`#capabilities`), Projects (`#projects`), Skills (`#skills`), Career (`#career`), Blog (`#blog`), Contact (`#contact`), Resume (`/Manish_Ukirde_Resume_v2.pdf`), Toggle theme
- A11y: `role="dialog"`, `aria-label="Command palette"`, focus trap, restore focus on close
- Navbar: subtle `⌘K` / `Ctrl+K` hint; hide on very small viewports if cramped
- Centralize resume path in `src/config/site.ts` as `RESUME_PATH` for Hero, Contact, and cmdk

### 3. Architecture diagram

- Pipeline nodes (order): Ingestion → Embedding → Vector store → LLM routing (multi-tenant BYO) → Response
- Data file supplies label, short subtitle, tooltip tech details per node
- Desktop (≥768px): horizontal flow with connectors
- Mobile (&lt;768px): vertical stack with ↓ connectors
- Interaction: hover (pointer) and keyboard focus show tooltip; Tab through nodes
- Visual: semantic HTML + CSS (buttons/list), not a screenshot; faint grid behind this block; amber border on hover/focus
- Placement: inside Projects section for the flagship (HR / KYARA-style) project
- Lazy-load the diagram component from ProjectsSection

### 4. Hero typewriter

- Cycle strings: `RAG Systems` → `Multi-Agent Orchestration` → `Production MLOps` → `Enterprise SSO`
- Reuse / extend `TypewriterText`
- `prefers-reduced-motion: reduce` → show first string, no cycle
- Remove SpaceScene, holographic blobs, particle reliance from hero

### 5. Metrics strip

- Hosted in Capabilities (or top of that section)
- Values from `data/metrics.ts` — placeholders until real numbers supplied (e.g. NL2API error reduction, tenant count, YOE, SOC 2)
- Mono for values; short labels under each
- No vague adjectives (“improved accuracy”) without numbers

### 6. Scroll reveals

- `Reveal` wraps section blocks or cards
- Animation: opacity 0→1 + `translateY(8px)`→0, duration ≤150ms, `ease-out` only
- IntersectionObserver once (no re-trigger spam)
- Disabled entirely under `prefers-reduced-motion`

### 7. Site background

- Global: existing `CssStarfield` (static, low opacity)
- Faint CSS grid overlay only on hero and architecture diagram containers
- No canvas particle network; no Three.js on critical path

## Accessibility

- Visible focus rings using `--accent`
- Skip-to-main link
- Command palette fully keyboard operable
- Architecture nodes focusable with accessible descriptions (`aria-describedby` or tooltip pattern)
- Respect `prefers-reduced-motion` for typewriter, reveals, any grid drift

## Performance

- No Three.js on initial route render
- Lazy: Skills, Career, Blog (existing); also ArchitectureDiagram and CommandPalette where practical
- Fonts: subset/display swap; avoid blocking
- Target Lighthouse Performance ≥ 90 on mobile simulation

## Error / edge handling

- Missing resume file: Resume cmdk item still links to `RESUME_PATH`; 404 is a deploy concern, not runtime logic
- Empty metrics placeholders: render `—` (em dash) consistently; do not invent fake precision
- Theme localStorage parse failure: fall back to dark
- cmdk with no matches: show empty state string

## Testing / verification

- Manual: keyboard-only nav through palette and arch diagram
- Manual: theme persists across reload
- Manual: mobile &lt;768 architecture stacks vertically
- Manual: `prefers-reduced-motion` emulation in DevTools
- `npm run build` succeeds; spot-check Lighthouse after main visual changes

## Success criteria

- Portfolio feels dark-technical with a single amber signal color on interaction
- Flagship project communicates system design via interactive diagram
- ⌘K navigation works; light mode persists
- No particle/3D hero; Lighthouse Performance ≥ 90
- Metrics are numeric (or clearly placeholder), not buzzword claims
