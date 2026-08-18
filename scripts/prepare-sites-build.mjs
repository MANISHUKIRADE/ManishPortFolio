import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const serverDir = resolve('dist/server')
const entry = resolve(serverDir, 'index.js')

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') return response

    const url = new URL(request.url)
    if (url.pathname.includes('.')) return response

    url.pathname = '/'
    return env.ASSETS.fetch(new Request(url, request))
  },
}
`

await mkdir(serverDir, { recursive: true })
await writeFile(entry, worker, 'utf8')
