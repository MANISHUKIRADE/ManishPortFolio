import { useEffect, useCallback, useState } from 'react'
import { Command } from 'cmdk'
import { RESUME_PATH } from '../config/site'
import { useTheme } from '../providers/ThemeProvider'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const { toggleTheme, theme } = useTheme()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  const run = useCallback(
    (fn: () => void) => {
      fn()
      onOpenChange(false)
    },
    [onOpenChange]
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close command palette"
        onClick={() => onOpenChange(false)}
      />
      <Command
        label="Command palette"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface shadow-2xl"
        loop
      >
        <div className="flex items-center border-b border-border px-3">
          <span className="font-mono text-accent mr-2" aria-hidden="true">
            ›
          </span>
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search navigation…"
            className="w-full bg-transparent py-3.5 text-sm text-text outline-none placeholder:text-muted font-mono"
          />
          <kbd className="hidden sm:inline font-mono text-[10px] text-muted border border-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted font-mono">
            No results.
          </Command.Empty>
          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted">
            {SECTIONS.map((section) => (
              <Command.Item
                key={section.id}
                value={section.label}
                onSelect={() => run(() => scrollToId(section.id))}
                className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted aria-selected:bg-accent-muted/40 aria-selected:text-accent data-[selected=true]:bg-accent-muted/40 data-[selected=true]:text-accent outline-none"
              >
                {section.label}
                <span className="font-mono text-[10px] text-muted">↵</span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className="mt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted">
            <Command.Item
              value="Resume PDF"
              onSelect={() =>
                run(() => {
                  window.open(RESUME_PATH, '_blank', 'noopener,noreferrer')
                })
              }
              className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted aria-selected:bg-accent-muted/40 aria-selected:text-accent data-[selected=true]:bg-accent-muted/40 data-[selected=true]:text-accent outline-none"
            >
              Resume
              <span className="font-mono text-[10px] text-muted">↗ pdf</span>
            </Command.Item>
            <Command.Item
              value="Focus terminal"
              onSelect={() =>
                run(() => {
                  scrollToId('home')
                  window.setTimeout(() => {
                    const input = document.querySelector<HTMLInputElement>(
                      '[aria-label="Interactive portfolio terminal"] input'
                    )
                    input?.focus()
                  }, 400)
                })
              }
              className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted aria-selected:bg-accent-muted/40 aria-selected:text-accent data-[selected=true]:bg-accent-muted/40 data-[selected=true]:text-accent outline-none"
            >
              Focus terminal
              <span className="font-mono text-[10px] text-muted">›_</span>
            </Command.Item>
            <Command.Item
              value="Toggle theme"
              onSelect={() => run(() => toggleTheme())}
              className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted aria-selected:bg-accent-muted/40 aria-selected:text-accent data-[selected=true]:bg-accent-muted/40 data-[selected=true]:text-accent outline-none"
            >
              Toggle theme
              <span className="font-mono text-[10px] text-muted">
                {theme === 'dark' ? '→ light' : '→ dark'}
              </span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}

export default CommandPalette
