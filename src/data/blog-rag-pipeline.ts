import { BlogPost } from './blog-types'

export const ragPipelineBlog: BlogPost = {
  id: '7',
  title: 'Building a Production RAG Pipeline from Scratch — Lessons from Kyara',
  slug: 'production-rag-pipeline-kyara-lessons',
  excerpt:
    'How we built production RAG for HR policy Q&A at scale — chunking, embeddings, LangChain, ChromaDB, retrieval quality, and the mistakes that only show up after 10+ enterprise deployments.',
  content: `# Building a Production RAG Pipeline from Scratch — Lessons from Kyara

## Why RAG, and why production is different

Retrieval-Augmented Generation (RAG) is the default architecture for enterprise knowledge Q&A in 2026. Demos retrieve three PDF chunks and call it done. Production means thousands of policy documents, multi-tenant isolation, hallucination guardrails, and latency budgets HR teams actually tolerate.

At WE-Matter, Kyara's HR Policy Q&A stack serves **10+ enterprise clients on Azure**. This post is what we learned shipping RAG for real — not a tutorial on \`similarity_search\`.

## Architecture overview

Our pipeline has five stages:

1. **Ingestion** — PDF/DOCX policies, handbooks, and client-specific addenda
2. **Chunking** — structure-aware splits (headings, clauses, not fixed 512 tokens)
3. **Embedding + index** — ChromaDB per-tenant collections
4. **Retrieval** — hybrid search + metadata filters (client, region, policy type)
5. **Generation** — LangChain chains with citation requirements and confidence thresholds

\`\`\`
Documents → Chunk → Embed → ChromaDB
                              ↓
User query → Retrieve (top-k + rerank) → LLM + citations → Response
\`\`\`

## Lesson 1: Chunking beats embedding model choice

We tried swapping embedding models before fixing chunking. Accuracy moved <2%. Fixing chunk boundaries — never splitting mid-clause, preserving section titles in metadata — moved **answer relevance ~18%** in internal evals.

**Rule:** Store \`section_title\`, \`policy_id\`, and \`effective_date\` on every chunk. Retrieval without metadata filters causes cross-client leakage in multi-tenant HR.

## Lesson 2: Multi-tenant isolation is non-negotiable

One Chroma collection per enterprise client. Namespace keys on every write. Pre-retrieval filter on \`client_id\` before vector search.

We caught a staging bug where a test collection shared an index name — the kind of issue that becomes a headline if it reaches production.

## Lesson 3: Retrieval quality > model size

GPT-4 class models still hallucinate on weak retrieval. We invested in:

- **Top-k tuning** (8–12 chunks for policy Q&A)
- **Score thresholds** — below threshold → "I don't have that policy on file" instead of guessing
- **Optional reranking** for long policy libraries

Smaller, faster models with good retrieval often beat larger models with naive top-3 search.

## Lesson 4: Citations are a product feature, not an afterthought

HR and legal users need **source clauses**, not fluent prose. Every response includes:

- Quoted chunk IDs
- Links to source document sections
- Confidence label (high / medium / low)

Prompt engineering enforced: *"Answer only from provided context. If context is insufficient, say so."*

## Lesson 5: Observability for RAG is different

Log per request:

- Query embedding latency
- Retrieval scores (distribution, not just top-1)
- Token usage and model route
- User thumbs up/down tied to chunk IDs

We built a weekly review of **low-score retrievals** — the fastest way to find bad chunks or missing documents.

## Lesson 6: Cost and caching

Enterprise HR has repeated questions ("leave policy", "probation period"). We cache:

- Embedding of normalized frequent queries
- Full responses for approved FAQ keys (human-curated)

Caching cut LLM spend roughly **40%** without hurting freshness on policy updates (cache invalidation on re-ingest).

## Lesson 7: Ingestion pipelines need versioning

When a client uploads Policy v3, we version the collection, run eval queries against golden sets, then swap alias — not in-place overwrite.

Rollback saved us twice when OCR mangled a scanned PDF appendix.

## What we use (production stack)

| Layer | Choice |
|-------|--------|
| Orchestration | LangChain |
| Vector store | ChromaDB |
| API | FastAPI on Azure |
| LLMs | Azure OpenAI + Groq for latency-sensitive paths |
| Eval | Golden Q&A sets per client + weekly retrieval review |

## Mistakes we made

1. **Fixed-size chunks** on legal text — destroyed semantic boundaries
2. **No score threshold** — confident wrong answers are worse than "I don't know"
3. **Single global collection** — almost shipped cross-tenant retrieval
4. **Skipping human review on first client onboard** — policy nuance varies by country

## Results

Kyara HR Policy Q&A today:

- **10+ enterprise tenants** on isolated indexes
- Sub-second retrieval on median queries (excluding LLM latency)
- Measurable reduction in HR ticket volume for policy questions
- Foundation for conversational employee intelligence and adaptive surveys on the same stack

## Takeaways for engineers interviewing in 2026

Hiring managers are not asking "have you used LangChain?" They are asking:

- How do you chunk and version documents?
- How do you prevent cross-tenant leakage?
- How do you know retrieval failed before the LLM answers?
- What do you log in production?

If you can answer those with war stories, you are ahead of most RAG demos on GitHub.

---

*Built by Manish Ukirade — Senior ML & AI Engineer. Production RAG on Kyara, WE-Matter.*`,
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  author: 'Manish Ukirade',
  date: '2026-06-01',
  readTime: '16 min read',
  tags: ['RAG', 'LangChain', 'ChromaDB', 'Generative AI', 'Production', 'LLM', 'Vector Databases'],
  category: 'AI Engineering',
  seo: {
    metaDescription:
      'Production RAG lessons from Kyara: LangChain, ChromaDB, multi-tenant HR policy Q&A, chunking, retrieval quality, and observability for enterprise Generative AI.',
    keywords:
      'production RAG pipeline, LangChain, ChromaDB, RAG architecture, enterprise AI, HR policy Q&A, vector database, prompt engineering, retrieval augmented generation, Kyara, Generative AI production',
  },
}
