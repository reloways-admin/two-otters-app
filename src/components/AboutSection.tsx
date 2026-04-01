export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
            Meet the team
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900">
            Two perspectives.
            <br />
            <span className="text-stone-400 font-medium">One outcome.</span>
          </h2>
          <p className="mt-4 text-stone-500 max-w-xl mx-auto">
            Two Otters was built around one idea: you should never have to imagine
            the result. We think with you, not for you — and we show it to you fast.
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Amir */}
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden group hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300">
            {/* Teal header */}
            <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-600" />
            <div className="p-8">
              <div className="flex items-start gap-5 mb-6">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl flex-shrink-0">
                  🦦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Amir</h3>
                  <p className="text-teal-600 text-sm font-medium">UX, UI & Product Design</p>
                  <p className="text-stone-400 text-xs mt-0.5">10+ years · Israel & Germany</p>
                </div>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                When you show Amir what you&apos;re building, his first question isn&apos;t
                &ldquo;what should it look like?&rdquo; — it&apos;s &ldquo;what happens when the developer gets
                this?&rdquo; He thinks in systems: how the component fits the page, how
                the page fits the flow, how the flow fits your product. And he builds fast.
              </p>

              <div className="space-y-2.5">
                {[
                  "Visual hierarchy & layout structure",
                  "Component design & design system thinking",
                  "User flow & navigation logic",
                  "Developer handoff readiness",
                  "Quick wins with big impact",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 pl-4 border-l-2 border-teal-200 text-sm text-stone-500 italic">
                &ldquo;What happens when the developer gets this?&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Keren */}
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden group hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300">
            {/* Amber header */}
            <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600" />
            <div className="p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl flex-shrink-0">
                  🦦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Keren</h3>
                  <p className="text-amber-600 text-sm font-medium">Strategy & Messaging</p>
                  <p className="text-stone-400 text-xs mt-0.5">Brand · Positioning · Narrative</p>
                </div>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Keren listens to what you say and hears what you mean. When a client says
                &ldquo;I don&apos;t like this button,&rdquo; Keren hears &ldquo;the message isn&apos;t landing.&rdquo;
                She ensures that what gets built is not just visually right — but
                strategically aligned with what you&apos;re actually trying to do.
              </p>

              <div className="space-y-2.5">
                {[
                  "Value proposition clarity (5-second test)",
                  "Messaging & audience fit",
                  "User journey narrative & story",
                  "Strategic alignment with business goals",
                  "Emotional clarity & resonance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 pl-4 border-l-2 border-amber-200 text-sm text-stone-500 italic">
                &ldquo;What&apos;s the real question behind the question?&rdquo;
              </blockquote>
            </div>
          </div>

        </div>

        {/* Together statement */}
        <div className="mt-10 rounded-2xl bg-stone-900 text-white p-8 md:p-12 text-center">
          <p className="text-2xl md:text-3xl font-bold leading-snug max-w-2xl mx-auto">
            Together, we are the first people who will{" "}
            <span className="text-teal-400">fully understand what is in your head</span>{" "}
            — and show it back to you within two weeks.
          </p>
          <p className="mt-4 text-stone-400 text-sm max-w-xl mx-auto">
            Most studios do one or the other. We do both — and we work together on every project
            so nothing gets lost between design and strategy.
          </p>
        </div>

      </div>
    </section>
  );
}
