const oldSteps = [
  { label: "Brief", note: "You explain it. They write it down." },
  { label: "Scope", note: "Weeks of back-and-forth." },
  { label: "Contract", note: "You commit — before seeing anything." },
  { label: "Months of work", note: "You wait. You imagine. You hope." },
  { label: "Reveal", note: "It doesn't look like what you had in mind." },
];

const newSteps = [
  { label: "Brief", note: "We ask the right questions and dig into your vision.", accent: false },
  { label: "Build", note: "Amir builds a working prototype in real time.", accent: false },
  { label: "You see it — week 1", note: "You see, click, and feel it. You give feedback.", accent: true },
  { label: "Refine", note: "Keren translates your feedback. Amir updates live.", accent: false },
  { label: "Approved", note: "You commit only when you're confident it's right.", accent: false },
];

export function PromiseSection() {
  return (
    <section id="promise" className="py-24 px-6 bg-white border-t border-stone-100">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
            A different approach
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            This is not your
            <br />
            usual process.
          </h2>
        </div>

        {/* Comparison columns */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0">

          {/* Left — The old way */}
          <div className="flex-1 opacity-55">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-6">
              The usual way
            </p>
            <div className="space-y-0">
              {oldSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center flex-shrink-0 w-7">
                    <div className="w-2 h-2 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                    {i < oldSteps.length - 1 && (
                      <div className="w-px flex-1 bg-stone-200 my-1" style={{ minHeight: "2.5rem" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6">
                    <p className="text-sm font-semibold text-stone-400 line-through decoration-stone-300">
                      {step.label}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5 italic">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider arrow */}
          <div className="flex md:flex-col items-center justify-center px-6 md:pt-12 flex-shrink-0 self-center md:self-start">
            {/* Horizontal arrow on mobile */}
            <div className="flex md:hidden items-center gap-2 text-teal-500 font-black text-2xl select-none my-4">
              <div className="w-8 h-px bg-teal-300" />
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            {/* Vertical arrow on desktop */}
            <div className="hidden md:flex flex-col items-center gap-2 text-teal-500 select-none">
              <div className="h-8 w-px bg-teal-200" />
              <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="h-8 w-px bg-teal-200" />
            </div>
          </div>

          {/* Right — Two Otters way */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-6">
              Two Otters
            </p>
            <div className="space-y-0">
              {newSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center flex-shrink-0 w-7">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                        step.accent ? "bg-teal-500 ring-4 ring-teal-100" : "bg-stone-900"
                      }`}
                    />
                    {i < newSteps.length - 1 && (
                      <div
                        className={`w-px flex-1 my-1 ${
                          step.accent ? "bg-teal-200" : "bg-stone-200"
                        }`}
                        style={{ minHeight: "2.5rem" }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6">
                    <p
                      className={`text-sm font-bold ${
                        step.accent ? "text-teal-600" : "text-stone-900"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-12 pt-10 border-t border-stone-100">
          <blockquote className="max-w-2xl">
            <p className="text-2xl md:text-3xl font-black text-stone-900 leading-snug">
              &ldquo;The gap between your vision and the final result{" "}
              <span className="text-teal-600">closes the moment you can see and touch</span>{" "}
              the prototype.&rdquo;
            </p>
            <p className="mt-4 text-sm text-stone-400">
              That&apos;s what we built our entire process around.
            </p>
          </blockquote>

          <div className="mt-8">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-colors"
            >
              See exactly how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
