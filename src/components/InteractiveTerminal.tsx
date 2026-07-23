import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import {
  STACK_LINES,
  TERMINAL_BOOT,
  TERMINAL_HELP,
  WHOAMI_LINES,
  type TerminalLine,
} from '../data/terminal'
import { metrics } from '../data/metrics'
import { RESUME_PATH, SITE_EMAIL } from '../config/site'
import { useTheme } from '../providers/ThemeProvider'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
}

type InteractiveTerminalProps = {
  className?: string
  compact?: boolean
}

const InteractiveTerminal = ({ className = '', compact = false }: InteractiveTerminalProps) => {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { toggleTheme, theme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const [lines, setLines] = useState<TerminalLine[]>(TERMINAL_BOOT)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const lineCounter = useRef(10)

  const push = useCallback((kind: TerminalLine['kind'], text: string) => {
    lineCounter.current += 1
    setLines((prev) => [...prev, { id: `l${lineCounter.current}`, kind, text }])
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [lines])

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim()
      if (!cmd) return

      push('in', `› ${cmd}`)
      setHistory((h) => [...h.filter((x) => x !== cmd), cmd])
      setHistIdx(-1)

      const [name, ...args] = cmd.toLowerCase().split(/\s+/)
      const arg = args.join(' ')

      switch (name) {
        case 'help':
        case '?':
          TERMINAL_HELP.forEach((t) => push('out', t))
          break
        case 'whoami':
          WHOAMI_LINES.forEach((t) => push('out', t))
          break
        case 'stack':
          STACK_LINES.forEach((t) => push('out', t))
          break
        case 'kyara':
          push('out', 'KYARA — Generative AI HR platform')
          push('out', 'ingestion → embedding → vector store → BYO-LLM routing → response')
          push('out', 'LangChain · ChromaDB · NL2API · multi-tenant Azure')
          push('sys', 'Opening architecture…')
          scrollToId('projects')
          break
        case 'metrics':
          metrics.forEach((m) => push('out', `${m.value.padEnd(8)} ${m.label}`))
          break
        case 'projects':
        case 'skills':
        case 'career':
        case 'blog':
        case 'contact':
        case 'capabilities':
        case 'home':
          push('sys', `cd /${name}`)
          scrollToId(name === 'home' ? 'home' : name)
          break
        case 'open':
          if (!arg) {
            push('err', 'usage: open <section>')
            break
          }
          push('sys', `cd /${arg}`)
          scrollToId(arg === 'about' ? 'capabilities' : arg)
          break
        case 'resume':
          push('sys', `fetch ${RESUME_PATH}`)
          window.open(RESUME_PATH, '_blank', 'noopener,noreferrer')
          break
        case 'email':
        case 'mail':
          push('out', SITE_EMAIL)
          break
        case 'theme': {
          const next = theme === 'dark' ? 'light' : 'dark'
          toggleTheme()
          push('sys', `theme → ${next}`)
          break
        }
        case 'clear':
        case 'cls':
          setLines([])
          break
        case 'ls':
          push('out', 'home  capabilities  projects  skills  career  blog  contact  resume')
          break
        case 'pwd':
          push('out', '/home/manish/portfolio')
          break
        case 'echo':
          push('out', arg || '')
          break
        default:
          push('err', `command not found: ${name}. Try \`help\`.`)
      }
    },
    [push, theme, toggleTheme]
  )

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = input
    setInput('')
    run(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const next = histIdx + 1
      if (next >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(next)
        setInput(history[next] ?? '')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmds = [
        'help',
        'whoami',
        'stack',
        'kyara',
        'metrics',
        'projects',
        'skills',
        'career',
        'blog',
        'contact',
        'resume',
        'theme',
        'clear',
      ]
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-border bg-bg/90 text-left shadow-lg ${className}`}
      role="region"
      aria-label="Interactive portfolio terminal"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted truncate">
          manish@portfolio:~
        </span>
        <button
          type="button"
          className="ml-auto font-mono text-[10px] text-muted hover:text-accent transition-colors"
          onClick={() => inputRef.current?.focus()}
        >
          focus
        </button>
      </div>

      <div
        ref={scrollerRef}
        id={listId}
        className={`overflow-y-auto px-3 py-3 font-mono text-xs sm:text-sm leading-relaxed ${
          compact ? 'h-48' : 'h-56 sm:h-64'
        }`}
        aria-live="polite"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={
              line.kind === 'in'
                ? 'text-accent'
                : line.kind === 'err'
                  ? 'text-red-400'
                  : line.kind === 'sys'
                    ? 'text-muted'
                    : 'text-text'
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-border bg-surface/50 px-3 py-2.5"
      >
        <label htmlFor={`${listId}-input`} className="sr-only">
          Terminal command
        </label>
        <span className="font-mono text-accent shrink-0" aria-hidden="true">
          ›
        </span>
        <input
          id={`${listId}-input`}
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          placeholder={reducedMotion ? 'help' : 'try help, whoami, kyara…'}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-text outline-none placeholder:text-muted/60"
        />
        <kbd className="hidden sm:inline font-mono text-[10px] text-muted border border-border rounded px-1.5 py-0.5">
          ↵
        </kbd>
      </form>
    </div>
  )
}

export default InteractiveTerminal
