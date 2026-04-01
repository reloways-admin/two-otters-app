export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-white -z-10" />
      {/* Faint grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Large watermark — bottom-right */}
      <span
        className="absolute bottom-0 right-0 text-[18vw] font-black text-stone-50 select-none leading-none pointer-events-none -z-10 translate-y-6"
        aria-hidden="true"
      >
        🦦🦦
      </span>

      <div className="max-w-5xl">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-6">
          Two Otters Studio
        </p>

        {/* Main headline — left-aligned, commanding */}
        <h1 className="text-6xl md:text-8xl font-black text-stone-900 leading-[1.0] tracking-tight">
          You know
          <br />
          what you want.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
            We&apos;ll show it to you.
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-8 text-lg md:text-xl text-stone-500 max-w-lg leading-relaxed">
          Most studios ask you to imagine the result. We build it in two weeks —
          so you can see, feel, and change it before you commit to anything.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#tiers"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-colors"
          >
            How it works
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#audit"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-stone-300 text-stone-600 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            Try for free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>

        {/* Subtle trust signals */}
        <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free audit — no email required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Working prototype in 2 weeks
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No commitment until you see it
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#tiers"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-300 hover:text-stone-500 transition-colors animate-bounce hidden md:block"
        aria-label="Scroll down"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
