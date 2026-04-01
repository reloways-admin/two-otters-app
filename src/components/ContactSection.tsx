export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-stone-900 text-white">
      <div className="max-w-4xl mx-auto">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-2xl mb-6">🦦🦦</p>

            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Two weeks from now,
              <br />
              <span className="text-teal-400">you&apos;ll have something real.</span>
            </h2>

            <p className="mt-6 text-stone-400 text-base leading-relaxed">
              Book a Discovery Sprint. We work together intensively for two weeks.
              You walk out with a working, clickable prototype — something you can
              test, show to investors, and hand to a development team.
            </p>

            <p className="mt-4 text-stone-400 text-base leading-relaxed">
              Take it wherever you want. But most people don&apos;t want to stop here.
            </p>

            {/* Trust signals */}
            <div className="mt-8 space-y-2.5">
              {[
                "We respond within 24 hours",
                "First conversation is free — no pitch decks",
                "No commitment until you see the prototype",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-stone-400">
                  <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact options */}
          <div className="flex flex-col gap-4">

            {/* Email CTA */}
            <a
              href="mailto:hello@twootterstudio.com"
              className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-teal-500 hover:bg-teal-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-400 group-hover:bg-teal-300 flex items-center justify-center flex-shrink-0 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Send us an email</p>
                <p className="text-teal-100 text-xs">hello@twootterstudio.com</p>
              </div>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/972000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">WhatsApp us</p>
                <p className="text-stone-400 text-xs">Quick questions welcome</p>
              </div>
            </a>

            {/* Or just try the audit */}
            <p className="text-center text-stone-500 text-xs pt-2">
              Not ready to commit?{" "}
              <a href="#audit" className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors">
                Start with the free audit.
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
