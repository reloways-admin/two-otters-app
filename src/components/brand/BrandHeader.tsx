'use client'

export default function BrandHeader({
  title,
  folderUrl,
  downloadAllLabel,
  menuOpen,
  onMenuToggle,
}: {
  title: string
  folderUrl: string | null
  downloadAllLabel: string
  menuOpen: boolean
  onMenuToggle: () => void
}) {
  return (
    <header className="bk-header">
      <div className="bk-header-start">
        <button
          className="bk-burger"
          aria-label="תפריט"
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <span className={`bk-burger-bar${menuOpen ? ' open' : ''}`} />
          <span className={`bk-burger-bar${menuOpen ? ' open' : ''}`} />
          <span className={`bk-burger-bar${menuOpen ? ' open' : ''}`} />
        </button>
        <a className="bk-header-brand" href="/v6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-2otters-black-vertical.svg" alt="Two Otters Studio" className="bk-header-logo" />
          <span className="bk-header-title">{title}</span>
        </a>
      </div>
      {folderUrl && (
        <a className="bk-header-cta" href={folderUrl} target="_blank" rel="noopener noreferrer">
          {downloadAllLabel}
        </a>
      )}
    </header>
  )
}
