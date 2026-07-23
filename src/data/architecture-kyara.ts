export type ArchNode = {
  id: string
  label: string
  subtitle: string
  tech: string
}

export const kyaraArchitecture: ArchNode[] = [
  {
    id: 'ingestion',
    label: 'Ingestion',
    subtitle: 'docs / HR APIs',
    tech: 'PDF/DOCX parsers · HRIS connectors · chunking pipeline · PII-aware preprocessing',
  },
  {
    id: 'embedding',
    label: 'Embedding',
    subtitle: 'vectorize',
    tech: 'text-embedding-3-large · Azure OpenAI · chunk 512 / overlap 64 · batch embed jobs',
  },
  {
    id: 'vector-store',
    label: 'Vector store',
    subtitle: 'retrieve',
    tech: 'ChromaDB · metadata filters (tenant, policy type) · hybrid keyword + dense retrieval',
  },
  {
    id: 'llm-routing',
    label: 'LLM routing',
    subtitle: 'BYO multi-tenant',
    tech: 'LangChain · NL2API intent classification · per-tenant BYO-LLM routing · Azure / OpenAI',
  },
  {
    id: 'response',
    label: 'Response',
    subtitle: 'grounded output',
    tech: 'Citation-backed answers · sliding-window memory · streaming · audit logging',
  },
]
