/**
 * Brand Kit — Google Drive source.
 *
 * Reads a link-shared Drive folder (the single source of truth for brand assets)
 * via the Drive REST API + an API key, and returns it as a nested tree.
 *
 * Configure with two env vars:
 *   GOOGLE_DRIVE_API_KEY   — Google Cloud API key, restricted to the Drive API
 *   BRAND_DRIVE_FOLDER_ID  — id of the shared root folder
 *
 * When not configured, callers fall back to a local mock tree (dev preview).
 */

export interface DriveAsset {
  id: string
  name: string
  mimeType: string
  ext?: string
  sizeBytes?: number
  thumbnailUrl: string | null
  downloadUrl: string
  viewUrl: string
}

export interface DriveNode {
  id: string
  name: string
  path: string // "" for root, "Logos", "Logos/Primary", …
  children: DriveNode[]
  assets: DriveAsset[]
}

export class NotConfiguredError extends Error {
  constructor() {
    super('Brand Drive is not configured (missing GOOGLE_DRIVE_API_KEY / BRAND_DRIVE_FOLDER_ID)')
    this.name = 'NotConfiguredError'
  }
}

const API = 'https://www.googleapis.com/drive/v3/files'
const MAX_DEPTH = 4
const MAX_FOLDERS = 200
const TTL_MS = 5 * 60 * 1000

const FOLDER_MIME = 'application/vnd.google-apps.folder'

export function isConfigured(): boolean {
  return !!(process.env.GOOGLE_DRIVE_API_KEY && process.env.BRAND_DRIVE_FOLDER_ID)
}

function thumbFor(id: string, mimeType: string): string | null {
  return mimeType.startsWith('image/')
    ? `https://drive.google.com/thumbnail?id=${id}&sz=w500`
    : null
}

interface RawFile {
  id: string
  name: string
  mimeType: string
  size?: string
  webViewLink?: string
  fileExtension?: string
}

async function listChildren(folderId: string, key: string): Promise<RawFile[]> {
  const out: RawFile[] = []
  let pageToken: string | undefined
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'nextPageToken,files(id,name,mimeType,size,webViewLink,fileExtension)',
      orderBy: 'folder,name',
      pageSize: '200',
      key,
    })
    if (pageToken) params.set('pageToken', pageToken)
    const res = await fetch(`${API}?${params.toString()}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Drive API ${res.status}: ${body.slice(0, 300)}`)
    }
    const json = (await res.json()) as { files?: RawFile[]; nextPageToken?: string }
    out.push(...(json.files ?? []))
    pageToken = json.nextPageToken
  } while (pageToken)
  return out
}

function toAsset(f: RawFile): DriveAsset {
  return {
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    ext: f.fileExtension,
    sizeBytes: f.size ? Number(f.size) : undefined,
    thumbnailUrl: thumbFor(f.id, f.mimeType),
    downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`,
    viewUrl: f.webViewLink ?? `https://drive.google.com/file/d/${f.id}/view`,
  }
}

let folderCount = 0

async function buildNode(
  id: string,
  name: string,
  path: string,
  depth: number,
  key: string,
): Promise<DriveNode> {
  const children: RawFile[] = await listChildren(id, key)
  const subfolders = children.filter((c) => c.mimeType === FOLDER_MIME)
  const files = children.filter((c) => c.mimeType !== FOLDER_MIME)

  const childNodes: DriveNode[] = []
  if (depth < MAX_DEPTH) {
    for (const sub of subfolders) {
      if (folderCount >= MAX_FOLDERS) break
      folderCount++
      childNodes.push(
        await buildNode(sub.id, sub.name, path ? `${path}/${sub.name}` : sub.name, depth + 1, key),
      )
    }
  }

  return {
    id,
    name,
    path,
    children: childNodes,
    assets: files.map(toAsset),
  }
}

let cache: { at: number; tree: DriveNode } | null = null

export async function getBrandTree(opts?: { fresh?: boolean }): Promise<DriveNode> {
  const key = process.env.GOOGLE_DRIVE_API_KEY
  const rootId = process.env.BRAND_DRIVE_FOLDER_ID
  if (!key || !rootId) throw new NotConfiguredError()

  if (!opts?.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.tree

  folderCount = 0
  const tree = await buildNode(rootId, 'Brand Kit', '', 0, key)
  cache = { at: Date.now(), tree }
  return tree
}

/* ──────────────────────────────────────────────────────────────────────────
 * Dev mock — used when Drive isn't configured yet, so the page is previewable
 * with real Two Otters assets from /public. Same shape as a real Drive tree;
 * URLs point at local files.
 * ────────────────────────────────────────────────────────────────────────── */

function mockAsset(file: string): DriveAsset {
  const ext = file.split('.').pop() ?? ''
  const mime =
    ext === 'svg'
      ? 'image/svg+xml'
      : ext === 'png'
        ? 'image/png'
        : ext === 'jpg' || ext === 'jpeg'
          ? 'image/jpeg'
          : ext === 'avif'
            ? 'image/avif'
            : 'application/octet-stream'
  const src = `/${file}`
  return {
    id: file,
    name: file,
    mimeType: mime,
    ext,
    thumbnailUrl: mime.startsWith('image/') ? src : null,
    downloadUrl: src,
    viewUrl: src,
  }
}

export function getMockTree(): DriveNode {
  const section = (name: string, files: string[]): DriveNode => ({
    id: `mock-${name}`,
    name,
    path: name,
    children: [],
    assets: files.map(mockAsset),
  })

  return {
    id: 'mock-root',
    name: 'Brand Kit',
    path: '',
    assets: [],
    children: [
      section('Logos', [
        'logo-2otters-black-vertical.svg',
        'logo-2otters-white-vertical.svg',
        'logo-black.svg',
        'logo-white.svg',
        'logo.svg',
      ]),
      section('Illustrations', [
        'spiral.svg',
        'hands.svg',
        'otter-hand.svg',
        'amir-tag-english.svg',
        'keren-tag-english.svg',
      ]),
      section('Icons', [
        'target.svg',
        'lightning.svg',
        'stamp.svg',
        'mobile.svg',
        'a-to-b.svg',
        'language-english.svg',
        'language-hebrew.svg',
      ]),
      section('Brand elements', ['swoosh-v01.svg', 'eyes-v01.png', 'checkmark.png', 'crossmark.png']),
      section('Images', ['amir.png', 'keren.png', 'working.png', 'holding.png', 'space.png']),
    ],
  }
}
