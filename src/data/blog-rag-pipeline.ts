import { BlogPost } from './blog-types'

export const ragPipelineBlog: BlogPost = {
  id: '7',
  title: 'Building a Production RAG Pipeline from Scratch — Lessons from Kyara',
  slug: 'production-rag-pipeline-kyara-lessons',
  excerpt:
    'How we built production RAG for HR policy Q&A at scale — 10+ enterprise tenants, 200,000+ chunks, 50,000+ queries/month. Chunking, multi-tenant isolation, retrieval quality, and the mistakes that only show up in production.',
  content: `## Why RAG, and why production is different

Retrieval-Augmented Generation (RAG) is the default architecture for enterprise knowledge Q&A in 2026. Demos retrieve three PDF chunks and call it done.

Production means something different:
- Thousands of HR policy documents across 10+ enterprise tenants
- Multi-tenant isolation — Raymond Group's leave policy must never surface for McCormick's employees
- Hallucination guardrails that HR and legal teams actually trust
- Sub-second retrieval on median queries while staying under Azure OpenAI rate limits
- A 40% LLM cost reduction through intelligent caching

At WE-Matter, Kyara's HR Policy Q&A stack serves 10+ enterprise clients on Azure. We process over 50,000 queries/month across 200,000+ indexed document chunks. This post is what we learned shipping RAG for real — not a tutorial on \`similarity_search\`.

---

## Architecture overview

Our pipeline has five stages:

**Ingestion** — PDF/DOCX policies, handbooks, and client-specific addenda
**Chunking** — structure-aware splits (headings, clauses — never fixed 512 tokens)
**Embedding + index** — ChromaDB per-tenant collections
**Retrieval** — hybrid search + metadata filters (client, region, policy type)
**Generation** — LangChain chains with citation requirements and confidence thresholds

\`\`\`
Documents → Chunk → Embed → ChromaDB (per-tenant collection)
                                  ↓
User query → Embed → Retrieve (top-k + rerank) → LLM + citations → Response
\`\`\`

---

## Lesson 1: Chunking beats embedding model choice

We spent two weeks swapping embedding models — \`text-embedding-ada-002\`, \`bge-large\`, a fine-tuned sentence transformer. Accuracy moved less than 2% across all of them.

Then we fixed chunking. Specifically:
- Never split mid-clause in legal/policy text
- Preserve the parent section title inside every chunk as metadata
- Respect document structure (numbered clauses, sub-clauses) as natural boundaries

Answer relevance on our internal eval set moved **~18 percentage points** — from 61% to 79% on a golden set of 200 query-answer pairs built from real HR manager questions.

Here's the structure-aware chunker we settled on:

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter
import re

class PolicyAwareChunker:
    def __init__(self, chunk_size=600, chunk_overlap=80):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\\n\\n", "\\n", ". ", " "],
        )

    def chunk_document(self, text: str, metadata: dict) -> list[dict]:
        section_title = None
        chunks = []

        for block in text.split("\\n\\n"):
            # Detect section headers (e.g. "3.2 Annual Leave Policy")
            if re.match(r"^\\d[\\d\\.]*\\s+[A-Z]", block.strip()):
                section_title = block.strip()
                continue

            raw_chunks = self.splitter.split_text(block)
            for i, chunk in enumerate(raw_chunks):
                chunks.append({
                    "text": chunk,
                    "metadata": {
                        **metadata,
                        "section_title": section_title or "General",
                        "chunk_index": i,
                        "policy_id": metadata.get("policy_id"),
                        "effective_date": metadata.get("effective_date"),
                        "client_id": metadata.get("client_id"),
                    }
                })
        return chunks
\`\`\`

**Rule:** Store \`section_title\`, \`policy_id\`, \`effective_date\`, and \`client_id\` on every chunk. Retrieval without metadata filters causes cross-client leakage in multi-tenant HR. More on that next.

---

## Lesson 2: Multi-tenant isolation is non-negotiable

This one we almost got wrong. One ChromaDB collection per enterprise client. Namespace keys on every write. Pre-retrieval filter on \`client_id\` before vector search.

\`\`\`python
import chromadb

class TenantAwareRetriever:
    def __init__(self, chroma_host: str, chroma_port: int):
        self.client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
        self._collections: dict = {}

    def get_collection(self, client_id: str):
        if client_id not in self._collections:
            self._collections[client_id] = self.client.get_or_create_collection(
                name=f"policies_{client_id}",
                metadata={"hnsw:space": "cosine"}
            )
        return self._collections[client_id]

    def retrieve(self, query_embedding: list, client_id: str, top_k: int = 10):
        collection = self.get_collection(client_id)
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where={"client_id": {"$eq": client_id}},  # belt-and-suspenders filter
            include=["documents", "metadatas", "distances"]
        )
        return results
\`\`\`

In staging, we caught a bug where a test collection shared an index name with a client collection due to a naming convention inconsistency. No data leaked — the isolation caught it — but it was the kind of silent issue that becomes a headline in production. The \`where={"client_id": ...}\` filter is belt-and-suspenders on top of the per-tenant collection. Both are needed.

---

## Lesson 3: Retrieval quality > model size

GPT-4 class models still hallucinate confidently on weak retrieval. We invested in:

**Top-k tuning.** For HR policy Q&A, k=8–12 chunks outperformed k=3 (common tutorial default) by a significant margin. Policy answers often span multiple sections — leave entitlement references probation period, which references employment type, which references the offer letter.

**Score thresholds.** Below a cosine similarity threshold of 0.72, we return: *"I don't have that specific policy on file. Please check with your HR team."* A confident wrong answer is far worse than an honest "I don't know" in an HR context.

**Optional reranking.** For clients with 500+ policy documents, we added a cross-encoder reranker on the top-20 retrieved chunks before passing top-8 to the LLM. Latency cost: ~180ms. Accuracy gain: measurable on edge-case queries. Not worth it for clients with under 100 documents.

Smaller, faster models with good retrieval consistently beat larger models with naive top-3 retrieval on our evals.

---

## Lesson 4: Citations are a product feature, not an afterthought

HR and legal users need source clauses, not fluent prose. Every Kyara response includes:
- Chunk IDs and section titles that sourced the answer
- A link to the source document section
- A confidence label (high / medium / low) based on retrieval score distribution

\`\`\`python
SYSTEM_PROMPT = """
You are an HR policy assistant. Answer ONLY from the provided policy excerpts.
If the context does not contain the answer, say exactly:
"This information is not available in the current policy documents."

Always end your response with:
Sources: [list each policy_id and section_title used]
Confidence: [HIGH if top chunk score > 0.85, MEDIUM if > 0.72, LOW otherwise]
"""
\`\`\`

This prompt constraint also dramatically reduced hallucination rates on edge-case queries where the model would otherwise blend information from its training data with retrieved context.

---

## Lesson 5: RAG observability is different from standard API observability

Standard API monitoring tells you: latency, error rate, status codes. That's necessary but not sufficient for RAG.

We log per request:
- Query embedding latency (p50/p95 — spikes here often indicate embedding service issues)
- Retrieval score distribution (not just top-1 — a tight cluster of 0.73–0.76 scores means the model is guessing)
- Token usage and model route (Azure OpenAI vs Groq fallback)
- User thumbs up/down tied to specific chunk IDs

The most valuable operational practice: a weekly review of **low-score retrievals** (cosine < 0.72). This reliably surfaces two things — bad chunks (usually from malformed PDF extraction) and missing documents (a client uploaded a new policy but didn't trigger re-ingestion).

---

## Lesson 6: Cost and caching

Enterprise HR has highly repetitive queries. "What is the leave policy?" gets asked thousands of times across 10 clients. We cache at two levels:

**Semantic query cache.** Embed normalized common queries on startup. At runtime, check cosine similarity against cached queries before hitting the vector store. If similarity > 0.95, return cached answer. This handles phrasing variants like "how many leaves do I get?" and "annual leave entitlement?"

**FAQ answer cache.** Human-curated for high-confidence, frequently-asked policy questions. Cache invalidated on re-ingest.

Combined, these two layers cut our LLM spend by approximately **40%** without impacting freshness on policy updates, because re-ingest automatically invalidates both caches for the affected client.

---

## Lesson 7: Ingestion pipelines need versioning

When a client uploads Policy v3, we do not overwrite the existing collection in place.

Our ingestion flow:
1. Create a new versioned collection: \`policies_{client_id}_v3\`
2. Run a set of golden eval queries against it (25 queries per client, curated with the client's HR team)
3. If accuracy meets threshold, swap the alias: \`policies_{client_id}_active\` → v3
4. Archive v2 for 30 days before deletion

Rollback saved us twice. Both times: OCR mangling in scanned PDF appendices that passed visual inspection but produced garbage chunks. The eval caught it. In-place overwrite would have silently degraded the system for that client.

---

## What we use (production stack)

| Layer | Choice | Why |
|---|---|---|
| Orchestration | LangChain | Chain composition, prompt management |
| Vector store | ChromaDB (self-hosted on Azure) | Per-tenant collections, cost control |
| API | FastAPI on Azure Container Apps | Auto-scaling, easy CI/CD |
| LLMs | Azure OpenAI (primary) + Groq (latency-sensitive) | Compliance + speed |
| Eval | Golden Q&A sets per client + weekly retrieval review | Ground truth over vibes |
| Monitoring | Azure Monitor + custom structured logs | Retrieval score distributions |

---

## Mistakes we made

1. **Fixed-size chunks on legal text** — destroyed semantic boundaries, killed accuracy
2. **No score threshold** — confident wrong answers destroyed HR trust in week two
3. **Single global collection** — almost shipped cross-tenant retrieval in staging
4. **Skipping human review on first client onboard** — policy nuance varies significantly by country and industry; you cannot eval without ground truth from the actual HR team

---

## Results

Kyara HR Policy Q&A today:
- **10+ enterprise tenants** on isolated collections
- **200,000+ indexed chunks** across all clients
- **50,000+ queries/month** at p50 retrieval latency under 400ms (excluding LLM)
- Measurable reduction in HR ticket volume for policy questions (one client reported 34% drop in policy-related tickets in 90 days)
- Foundation for conversational employee intelligence and adaptive surveys on the same stack

---

## Takeaways for engineers building RAG in 2026

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
      'Production RAG lessons from Kyara: 10+ enterprise tenants, 200k+ chunks, 50k queries/month. LangChain, ChromaDB, multi-tenant isolation, chunking, retrieval quality, and observability.',
    keywords:
      'production RAG pipeline, LangChain, ChromaDB, RAG architecture, enterprise AI, HR policy Q&A, vector database, multi-tenant RAG, prompt engineering, retrieval augmented generation, Kyara, Generative AI production',
  },
}
