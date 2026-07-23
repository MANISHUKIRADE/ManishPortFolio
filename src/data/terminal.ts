export type TerminalLine = {
  id: string
  kind: 'in' | 'out' | 'err' | 'sys'
  text: string
}

export const TERMINAL_BOOT: TerminalLine[] = [
  { id: 'b1', kind: 'sys', text: 'manish@portfolio — session started' },
  { id: 'b2', kind: 'sys', text: 'Type `help` for available commands.' },
]

export const TERMINAL_HELP = [
  'whoami      — identity & focus',
  'stack       — core tech',
  'kyara       — flagship RAG architecture',
  'metrics     — production signals',
  'projects    — jump to work',
  'skills      — jump to skills',
  'career      — jump to experience',
  'blog        — jump to writing',
  'contact     — email / links',
  'resume      — open PDF',
  'theme       — toggle dark/light',
  'clear       — clear screen',
  'help        — this list',
]

export const WHOAMI_LINES = [
  'Manish Ukirade',
  'Senior ML & AI Engineer · 6.7 YOE',
  'RAG · Multi-agent · Production MLOps · Enterprise SSO',
  'SOC 2 Type II · Azure / GCP / AWS',
]

export const STACK_LINES = [
  'Python · LangChain · ChromaDB · FastAPI',
  'TypeScript · React · Node.js',
  'Azure OpenAI · BYO-LLM routing · NL2API',
  'Docker · Kubernetes · CI/CD',
]
