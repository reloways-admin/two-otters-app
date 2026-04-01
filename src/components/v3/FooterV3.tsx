export function FooterV3() {
  return (
    <footer className="py-8 px-6" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span>🦦🦦</span>
          <span className="font-black text-white text-sm">Two Otters Studio</span>
        </div>
        <p className="font-mono text-[11px] text-white/20">
          &copy; {new Date().getFullYear()} Two Otters Studio
        </p>
        <div className="flex items-center gap-6 text-[11px] text-white/25">
          {[
            { label: "Services", href: "#tiers" },
            { label: "Process", href: "#how-it-works" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
