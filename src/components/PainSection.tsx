const pains = [
  {
    trigger: "Again?",
    headline: "You paid. You waited.\nIt wasn't what you imagined.",
    subtext:
      "Agencies deliver something. It just never quite matches what was in your head. So now you're starting over — and you're not willing to go through that again.",
  },
  {
    trigger: "I can't explain it.",
    headline: "You know exactly what you want.\nYou just can't make anyone else see it.",
    subtext:
      "You leave every meeting with the feeling they didn't really get it. What comes out doesn't look like what you imagined. Again.",
  },
  {
    trigger: "I don't have time for this.",
    headline: "You don't have eight months\nfor another process.",
    subtext:
      "You have a business to run. Every month the product isn't live is money and momentum slipping away.",
  },
  {
    trigger: "Not again.",
    headline: "You already invested.\nYou're not doing it again without seeing it first.",
    subtext:
      "A process that ends in a PDF and a list of tickets is not a process. You want to see the result before you commit.",
  },
];

export function PainSection() {
  return (
    <section className="py-24 px-6 bg-stone-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
            Sound familiar?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            You&apos;ve been here before.
          </h2>
        </div>

        {/* Pain cards — 2 col on md, 4 col on lg */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((pain) => (
            <div
              key={pain.trigger}
              className="bg-white rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Large quotation mark motif */}
              <span
                className="absolute -top-4 -left-2 text-[9rem] font-black text-teal-50 select-none leading-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Trigger badge */}
              <p className="relative text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">
                {pain.trigger}
              </p>

              {/* Headline */}
              <h3 className="relative text-xl font-bold text-stone-900 leading-snug mb-3 whitespace-pre-line">
                {pain.headline}
              </h3>

              {/* Subtext */}
              <p className="relative text-sm text-stone-500 leading-relaxed">
                {pain.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge line */}
        <p className="mt-12 text-center text-stone-400 text-base">
          There is a better way — and it starts with seeing, not imagining.{" "}
          <a
            href="#promise"
            className="text-stone-700 font-semibold underline underline-offset-2 hover:text-teal-600 transition-colors"
          >
            Here&apos;s how.
          </a>
        </p>

      </div>
    </section>
  );
}
