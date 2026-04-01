const steps = [
  {
    number: "01",
    title: "Vision Extraction",
    agent: null,
    description:
      "We get into your head. Visual examples, strategic questions, no generic briefs. We help you discover exactly what you want — even when you don't know how to articulate it. Output: a sharp, clear strategic brief.",
  },
  {
    number: "02",
    title: "Rapid Build",
    agent: "Amir",
    agentColor: "text-teal-600",
    description:
      "Amir builds a working, clickable prototype directly from the brief. AI makes it fast. His expertise — UX, component thinking, dev-side awareness — makes it right. You get something you can navigate and feel, not a static deck.",
  },
  {
    number: "03",
    title: "Real-Time Refine",
    agent: "Keren + Amir",
    agentColor: "text-amber-600",
    description:
      "You see the prototype and give feedback. Keren translates what you're really saying — \"I don't like this button\" often means \"the message isn't landing.\" Amir updates in real time. You leave the session with something approved.",
  },
  {
    number: "04",
    title: "Handoff Ready",
    agent: null,
    description:
      "Approved prototype. Strategic documentation. Figma-packaged and dev-ready. Your engineering team receives everything organised, annotated, and clear — so the handoff doesn't become a separate project.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">

        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
            The process
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            Here&apos;s exactly
            <br />
            what happens.
          </h2>
          <p className="mt-4 text-stone-500 max-w-lg">
            The methodology is spiral, not linear. Steps run in parallel,
            feedback comes in real time, and the prototype is the strategy.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-stone-100" aria-hidden="true" />

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-8">

                {/* Step indicator */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black z-10">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pb-2 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-stone-900">{step.title}</h3>
                    {step.agent && (
                      <span className={`text-xs font-medium ${step.agentColor}`}>
                        — {step.agent}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{step.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* CTA nudge */}
        <div className="mt-14 pt-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            The simplest way to start is the free audit.
            <br className="hidden sm:block" /> No commitment. Just insight.
          </p>
          <a
            href="#audit"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            Try the free audit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
