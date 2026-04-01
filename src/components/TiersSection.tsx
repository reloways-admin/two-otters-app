/** Connector element between tier cards */
function TierConnector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-5 bg-stone-200" />
      <svg
        className="w-4 h-4 text-stone-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export function TiersSection() {
  return (
    <section id="tiers" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
            Three ways to work with us
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            Start anywhere.
            <br />
            <span className="text-stone-400 font-medium">Each step stands alone.</span>
          </h2>
          <p className="mt-4 text-stone-500 max-w-xl">
            You can stop at any stage. Every engagement delivers standalone value — no lock-in,
            no wasted investment.
          </p>
        </div>

        {/* ── TIER 1 — Free Audit ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-stone-100 bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

            {/* Left: label + badge */}
            <div className="flex-shrink-0 sm:w-44">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                01 / Free
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-600 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
                Instant · Free
              </span>
            </div>

            {/* Right: content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-stone-700 mb-1">AI Audit</h3>
              <p className="text-sm text-stone-400 mb-3">See how we think — for free.</p>
              <p className="text-sm text-stone-600 leading-relaxed mb-5">
                Drop your product — a screenshot, PDF, or description. Agent Amir reviews the UX.
                Agent Keren adds the strategic layer. Real, dual-perspective insights in under
                30 seconds. No email required.
              </p>

              {/* Deliverable tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["UX review", "Strategy audit", "Quick wins", "Red flags"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA — ghost */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-colors"
              >
                Try the audit
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        <TierConnector />

        {/* ── TIER 2 — Discovery Sprint ────────────────────────────────────── */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-9 shadow-lg shadow-stone-200/60 relative overflow-hidden">
          {/* Teal accent bar — only on Tier 2 */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500 rounded-t-2xl" />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mt-2">

            {/* Left */}
            <div className="flex-shrink-0 sm:w-44">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
                02 / Sprint
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-medium">
                Most popular
              </span>
              <p className="mt-2 text-sm font-semibold text-stone-900">2 weeks</p>
            </div>

            {/* Right */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-stone-900 mb-1">Discovery Sprint</h3>
              <p className="text-sm text-stone-500 mb-3">Two weeks. A working prototype.</p>
              <p className="text-sm text-stone-600 leading-relaxed mb-5">
                We work intensively with you. Amir builds the prototype in real time while Keren
                translates your feedback into strategy. You walk out after two weeks with something
                you can click, test, and show to anyone.{" "}
                <span className="text-stone-900 font-medium">
                  &ldquo;You can take it and go.&rdquo;
                </span>{" "}
                But you probably won&apos;t want to.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {["Clickable prototype", "UX + Strategy", "Real-time iteration", "Yours to keep"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-stone-800 text-white border border-stone-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA — solid dark */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-colors"
              >
                Book a sprint
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        <TierConnector />

        {/* ── TIER 3 — Full Build ──────────────────────────────────────────── */}
        <div className="rounded-2xl bg-stone-900 p-12 shadow-2xl shadow-stone-900/30">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

            {/* Left */}
            <div className="flex-shrink-0 sm:w-44">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                03 / Full build
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-medium border border-teal-500/30">
                Full engagement
              </span>
              <p className="mt-2 text-sm font-semibold text-stone-300">Ongoing</p>
            </div>

            {/* Right */}
            <div className="flex-1">
              <h3 className="text-4xl font-black text-white mb-1">Full Build</h3>
              <p className="text-sm text-stone-300 mb-3">
                Design system. Dev-ready handoff. Complete product language.
              </p>
              <p className="text-sm text-stone-400 leading-relaxed mb-5">
                Amir and Keren in full collaboration. A scalable component library, a unique product
                language built for your brand, responsive layouts across every screen, and developer
                documentation so precise your engineers will thank you. The handoff is the product.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Design system", "Figma library", "Dev handoff docs", "Ongoing support"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-teal-900/60 text-teal-300 border border-teal-800"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA — teal accent (appears only here) */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-400 transition-colors"
              >
                Start the full build
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-stone-400 text-sm mt-10">
          Not sure where to start?{" "}
          <a href="#audit" className="text-stone-600 font-medium underline underline-offset-2 hover:text-teal-600 transition-colors">
            Try the free audit.
          </a>{" "}
          It&apos;s instant.
        </p>

      </div>
    </section>
  );
}
