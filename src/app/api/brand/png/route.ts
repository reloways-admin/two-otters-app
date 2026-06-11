import { Resvg } from '@resvg/resvg-js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PNG_WIDTH = 2000

function safeName(raw: string | null): string {
  return (raw || 'asset').replace(/\.svg$/i, '').replace(/[^\w\-.]+/g, '_').slice(0, 80) || 'asset'
}

/** Load the SVG bytes from a local /public file (?path) or a Drive file (?id). */
async function loadSvg(url: URL): Promise<Buffer | null> {
  const local = url.searchParams.get('path')
  if (local) {
    const base = path.basename(local)
    if (!base.toLowerCase().endsWith('.svg')) return null
    return fs.readFile(path.join(process.cwd(), 'public', base))
  }
  const id = url.searchParams.get('id')
  if (id) {
    if (!/^[\w-]+$/.test(id)) return null
    const key = process.env.GOOGLE_DRIVE_API_KEY
    if (!key) return null
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${key}`)
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  }
  return null
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const svg = await loadSvg(url)
    if (!svg) return new Response('Bad request', { status: 400 })

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: PNG_WIDTH },
      background: 'rgba(0,0,0,0)', // transparent
    })
    const png = resvg.render().asPng()
    const name = safeName(url.searchParams.get('name'))

    return new Response(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${name}.png"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (err) {
    console.error('[brand/png]', err)
    return new Response('Failed to render PNG', { status: 500 })
  }
}
