import { ReactNode } from 'react'

const renderInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="text-white font-semibold">
        {part.replace(/\*\*/g, '')}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

const renderLine = (line: string, key: string | number) => {
  const trimmed = line.trim()

  if (trimmed.startsWith('# ')) {
    return (
      <h1 key={key} className="text-2xl sm:text-3xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">
        {trimmed.replace(/^#+\s/, '')}
      </h1>
    )
  }
  if (trimmed.startsWith('## ')) {
    return (
      <h2 key={key} className="text-xl sm:text-2xl font-bold text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
        {trimmed.replace(/^#+\s/, '')}
      </h2>
    )
  }
  if (trimmed.startsWith('### ')) {
    return (
      <h3 key={key} className="text-lg sm:text-xl font-bold text-white mt-3 sm:mt-4 mb-1 sm:mb-2">
        {trimmed.replace(/^#+\s/, '')}
      </h3>
    )
  }
  if (trimmed === '---') {
    return <hr key={key} className="border-slate-700 my-6" />
  }
  if (trimmed.startsWith('- ')) {
    return (
      <li key={key} className="ml-4 sm:ml-6 mb-1 sm:mb-2 list-disc text-sm sm:text-base">
        {renderInline(trimmed.replace(/^-\s/, ''))}
      </li>
    )
  }
  if (/^\d+\.\s/.test(trimmed)) {
    return (
      <li key={key} className="ml-4 sm:ml-6 mb-1 sm:mb-2 list-decimal text-sm sm:text-base">
        {renderInline(trimmed.replace(/^\d+\.\s/, ''))}
      </li>
    )
  }
  if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
    return (
      <p key={key} className="font-bold text-white my-3 sm:my-4 text-base sm:text-lg">
        {trimmed.replace(/\*\*/g, '')}
      </p>
    )
  }
  if (!trimmed) {
    return <div key={key} className="h-2 sm:h-4" />
  }

  return (
    <p key={key} className="mb-3 sm:mb-4 text-sm sm:text-base">
      {renderInline(trimmed)}
    </p>
  )
}

const renderTable = (rows: string[][], key: string | number) => {
  if (rows.length < 2) return null
  const hasSeparator = rows[1]?.every((cell) => /^-+$/.test(cell.trim()))
  const header = rows[0]
  const body = hasSeparator ? rows.slice(2) : rows.slice(1)

  return (
    <div key={key} className="my-6 overflow-x-auto rounded-lg border border-slate-700/50">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-800/80 text-cyan-300 font-mono text-xs uppercase">
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="px-4 py-3 border-b border-slate-700">
                {cell.trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-800/80 last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top">
                  {renderInline(cell.trim())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const renderTextBlock = (text: string, blockKey: string | number) => {
  const lines = text.split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (line.trim().startsWith('|')) {
      const tableRows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableRows.push(
          lines[i]
            .trim()
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim())
        )
        i++
      }
      elements.push(renderTable(tableRows, `${blockKey}-table-${i}`))
      continue
    }
    elements.push(renderLine(line, `${blockKey}-line-${i}`))
    i++
  }

  return <div key={blockKey}>{elements}</div>
}

const BlogMarkdown = ({ content }: { content: string }) => {
  const parts = content.split(/```(\w*)\n?([\s\S]*?)```/g)
  const blocks: ReactNode[] = []

  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      if (parts[i].trim()) {
        blocks.push(renderTextBlock(parts[i], `text-${i}`))
      }
    } else if (i % 3 === 2) {
      const lang = parts[i - 1]
      const code = parts[i].trimEnd()
      blocks.push(
        <pre
          key={`code-${i}`}
          className="my-6 p-4 rounded-lg bg-slate-950 border border-cyan-500/20 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-100/90 leading-relaxed"
        >
          {lang && (
            <span className="block text-[10px] uppercase tracking-widest text-cyan-400/60 mb-3">
              {lang}
            </span>
          )}
          <code>{code}</code>
        </pre>
      )
    }
  }

  return <div className="text-slate-300 leading-relaxed text-sm sm:text-base">{blocks}</div>
}

export default BlogMarkdown
