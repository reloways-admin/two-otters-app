export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-500 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-stone-400 font-semibold">
          <span>🦦🦦</span>
          <span>Two Otters Studio</span>
        </div>

        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} Two Otters Studio. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-xs">
          <a href="#how-it-works" className="hover:text-stone-300 transition-colors">How it works</a>
          <a href="#about" className="hover:text-stone-300 transition-colors">About</a>
          <a href="#contact" className="hover:text-stone-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
