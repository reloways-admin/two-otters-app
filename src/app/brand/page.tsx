'use client'

import { useEffect, useState } from 'react'
import BrandHeader from '@/components/brand/BrandHeader'
import FigmaEmbed from '@/components/brand/FigmaEmbed'
import { FOUNDATIONS, FoundationCard, FoundationView } from '@/components/brand/Foundations'
import { getBrandContent } from './content'
import type { DriveAsset, DriveNode } from '@/lib/brand-drive'
import '../v6/styles.css'
import './styles.css'

const content = getBrandContent()
const { ui } = content

type Status = 'loading' | 'ready' | 'error'

function prettyName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
}
function sectionTitle(node: DriveNode): string {
  return content.sections[node.path]?.title ?? node.name
}
function findNode(node: DriveNode, path: string): DriveNode | null {
  if (node.path === path) return node
  for (const c of node.children) {
    const f = findNode(c, path)
    if (f) return f
  }
  return null
}

/* ── sidebar tree ── */
function TreeItem({
  node,
  selectedPath,
  onSelect,
  depth,
}: {
  node: DriveNode
  selectedPath: string
  onSelect: (p: string) => void
  depth: number
}) {
  return (
    <li>
      <button
        className={`bk-tree-btn${node.path === selectedPath ? ' sel' : ''}`}
        style={{ paddingInlineStart: 14 + depth * 14 }}
        onClick={() => onSelect(node.path)}
      >
        {sectionTitle(node)}
      </button>
      {node.children.length > 0 && (
        <ul className="bk-tree-sub">
          {node.children.map((c) => (
            <TreeItem key={c.path} node={c} selectedPath={selectedPath} onSelect={onSelect} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

/* ── asset thumbnail with badge fallback ── */
function Thumb({ asset }: { asset: DriveAsset }) {
  const [err, setErr] = useState(false)
  if (asset.thumbnailUrl && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset.thumbnailUrl} alt="" className="bk-thumb-img" loading="lazy" onError={() => setErr(true)} />
    )
  }
  return <span className="bk-badge">{(asset.ext || asset.name.split('.').pop() || 'file').toUpperCase()}</span>
}

/* ── asset card ── */
function AssetCard({ asset, nodePath, configured }: { asset: DriveAsset; nodePath: string; configured: boolean }) {
  const item = content.items[`${nodePath}/${asset.name}`] ?? {}
  const isSvg = asset.mimeType === 'image/svg+xml' || /\.svg$/i.test(asset.name)
  const pngName = encodeURIComponent(prettyName(asset.name))
  const pngHref = isSvg
    ? configured
      ? `/api/brand/png?id=${encodeURIComponent(asset.id)}&name=${pngName}`
      : `/api/brand/png?path=${encodeURIComponent(asset.id)}&name=${pngName}`
    : null
  return (
    <div className="bk-card">
      <div className="bk-thumb">
        <Thumb asset={asset} />
      </div>
      <div className="bk-card-body">
        <p className="bk-card-title">{item.title ?? prettyName(asset.name)}</p>
        {item.desc && <p className="bk-card-desc">{item.desc}</p>}
        <div className="bk-card-actions">
          <a className="bk-btn" href={asset.downloadUrl} download={asset.name}>
            ⬇ {isSvg ? 'SVG' : ui.download}
          </a>
          {pngHref && (
            <a className="bk-btn bk-btn--ghost" href={pngHref}>
              ⬇ PNG
            </a>
          )}
          <a className="bk-link" href={asset.viewUrl} target="_blank" rel="noopener noreferrer">
            {ui.openDrive}
          </a>
          {item.figmaUrl && (
            <a className="bk-link" href={item.figmaUrl} target="_blank" rel="noopener noreferrer">
              {ui.openFigma}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* representative thumbnail for an area — first asset with a preview, recursed */
function firstThumb(node: DriveNode): string | null {
  for (const a of node.assets) if (a.thumbnailUrl) return a.thumbnailUrl
  for (const c of node.children) {
    const t = firstThumb(c)
    if (t) return t
  }
  return null
}

function FolderThumb({ src }: { src: string | null }) {
  const [err, setErr] = useState(false)
  if (src && !err) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="bk-folder-thumb-img" loading="lazy" onError={() => setErr(true)} />
  }
  return (
    <span className="bk-folder-emoji" aria-hidden="true">
      📁
    </span>
  )
}

/* ── area / folder card with thumbnail + summary ── */
function FolderCard({ node, onSelect }: { node: DriveNode; onSelect: (p: string) => void }) {
  const sec = content.sections[node.path]
  const count = node.assets.length + node.children.length
  return (
    <button className="bk-folder-card" onClick={() => onSelect(node.path)}>
      <span className="bk-folder-thumb">
        <FolderThumb src={firstThumb(node)} />
      </span>
      <span className="bk-folder-text">
        <span className="bk-folder-name">{sectionTitle(node)}</span>
        {sec?.summary && <span className="bk-folder-summary">{sec.summary}</span>}
        <span className="bk-folder-count">{count} פריטים</span>
      </span>
    </button>
  )
}

export default function BrandKitPage() {
  const [root, setRoot] = useState<DriveNode | null>(null)
  const [folderUrl, setFolderUrl] = useState<string | null>(null)
  const [configured, setConfigured] = useState(true)
  const [status, setStatus] = useState<Status>('loading')
  const [selectedPath, setSelectedPath] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const select = (p: string) => {
    setSelectedPath(p)
    setMenuOpen(false)
  }

  useEffect(() => {
    let alive = true
    fetch('/api/brand/tree')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return
        if (d.error) {
          setStatus('error')
          return
        }
        setRoot(d.root)
        setFolderUrl(d.folderUrl)
        setConfigured(d.configured)
        setStatus('ready')
      })
      .catch(() => alive && setStatus('error'))
    return () => {
      alive = false
    }
  }, [])

  const isFoundation = selectedPath.startsWith('_')
  const selected = root && !isFoundation ? findNode(root, selectedPath) ?? root : null
  const isRoot = selectedPath === ''
  const sec = selected ? content.sections[selected.path] : undefined

  return (
    <main className="bk" dir="rtl" lang="he">
      <BrandHeader
        title={content.pageTitle}
        folderUrl={folderUrl}
        downloadAllLabel={ui.downloadAll}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
      />

      {menuOpen && <div className="bk-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <div className="bk-body">
        {/* Sidebar */}
        <aside className={`bk-sidebar${menuOpen ? ' bk-sidebar--open' : ''}`}>
          <button
            className={`bk-tree-btn bk-tree-home${isRoot ? ' sel' : ''}`}
            onClick={() => select('')}
          >
            {content.pageTitle}
          </button>

          <p className="bk-tree-group">יסודות</p>
          <ul className="bk-tree">
            {FOUNDATIONS.map((f) => (
              <li key={f.key}>
                <button
                  className={`bk-tree-btn${f.key === selectedPath ? ' sel' : ''}`}
                  style={{ paddingInlineStart: 14 }}
                  onClick={() => select(f.key)}
                >
                  {f.title}
                </button>
              </li>
            ))}
          </ul>

          {root && root.children.length > 0 && (
            <>
              <p className="bk-tree-group">נכסים</p>
              <ul className="bk-tree">
                {root.children.map((c) => (
                  <TreeItem key={c.path} node={c} selectedPath={selectedPath} onSelect={select} depth={0} />
                ))}
              </ul>
            </>
          )}
        </aside>

        {/* Content pane */}
        <section className="bk-pane">
          {status === 'loading' && <p className="bk-muted">{ui.loading}</p>}
          {status === 'error' && <p className="bk-muted">{ui.error}</p>}

          {status === 'ready' && isFoundation && <FoundationView pathKey={selectedPath} />}

          {status === 'ready' && !isFoundation && selected && (
            <>
              {!configured && <div className="bk-notice">{ui.notConfigured}</div>}

              {isRoot ? (
                <>
                  <h1 className="bk-h1">{content.pageTitle}</h1>
                  <p className="bk-intro">{content.intro}</p>
                  {configured && <p className="bk-sync">{ui.updatedNote}</p>}

                  <h2 className="bk-overview-h2">יסודות</h2>
                  <div className="bk-folders">
                    {FOUNDATIONS.map((f) => (
                      <FoundationCard key={f.key} f={f} onSelect={select} />
                    ))}
                  </div>

                  {selected.children.length > 0 && <h2 className="bk-overview-h2">נכסים</h2>}
                  <div className="bk-folders">
                    {selected.children.map((c) => (
                      <FolderCard key={c.path} node={c} onSelect={select} />
                    ))}
                  </div>
                  {selected.assets.length > 0 && (
                    <div className="bk-grid">
                      {selected.assets.map((a) => (
                        <AssetCard key={a.id} asset={a} nodePath={selected.path} configured={configured} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="bk-h1">{sectionTitle(selected)}</h1>
                  {sec?.intro && <p className="bk-intro">{sec.intro}</p>}
                  {sec?.figmaUrl && (
                    <a className="bk-link bk-link--lg" href={sec.figmaUrl} target="_blank" rel="noopener noreferrer">
                      {ui.openFigma} ↗
                    </a>
                  )}
                  {sec?.figmaEmbed && <FigmaEmbed url={sec.figmaEmbed} title={sectionTitle(selected)} />}

                  {selected.children.length > 0 && (
                    <div className="bk-folders">
                      {selected.children.map((c) => (
                        <FolderCard key={c.path} node={c} onSelect={select} />
                      ))}
                    </div>
                  )}

                  {selected.assets.length > 0 ? (
                    <div className="bk-grid">
                      {selected.assets.map((a) => (
                        <AssetCard key={a.id} asset={a} nodePath={selected.path} configured={configured} />
                      ))}
                    </div>
                  ) : (
                    selected.children.length === 0 && <p className="bk-muted">{ui.empty}</p>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}
