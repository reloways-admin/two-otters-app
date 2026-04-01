"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    number: "01",
    label: "Free",
    name: "AI Audit",
    tagline: "See how we think — for free.",
    description:
      "Drop your product — a screenshot, PDF, or description. Agent Amir reviews the UX. Agent Keren adds the strategic layer. Real insights in under 30 seconds. No email required.",
    tags: ["UX review", "Strategy audit", "Quick wins", "Red flags"],
    cta: { label: "Try the audit", href: "#audit", style: "ghost" },
    badge: "Instant · Free",
    badgeStyle: "teal",
    bg: "bg-stone-900",
    border: "border-white/5",
  },
  {
    number: "02",
    label: "Sprint",
    name: "Discovery Sprint",
    tagline: "Two weeks. A working prototype.",
    description:
      "We work intensively with you. Amir builds the prototype in real time while Keren translates your feedback into strategy. You walk out with something you can click, test, and show anyone. Take it and go. But you probably won't want to.",
    tags: ["Clickable prototype", "UX + Strategy", "Real-time iteration", "Yours to keep"],
    cta: { label: "Book a sprint", href: "#contact", style: "solid" },
    badge: "Most popular · 2 weeks",
    badgeStyle: "white",
    bg: "bg-stone-800",
    border: "border-white/10",
    featured: true,
  },
  {
    number: "03",
    label: "Full build",
    name: "Full Build",
    tagline: "Design system to dev-ready handoff.",
    description:
      "Amir and Keren in full collaboration. A scalable component library, a unique product language, responsive layouts, and developer documentation so precise your engineers will thank you. The handoff is the product.",
    tags: ["Design system", "Figma library", "Dev handoff docs", "Ongoing support"],
    cta: { label: "Start the full build", href: "#contact", style: "teal" },
    badge: "Full engagement",
    badgeStyle: "teal-dark",
    bg: "bg-stone-950",
    border: "border-teal-900/40",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function TiersV2() {
  return (
    <section id="tiers" className="py-28 px-6 bg-stone-950 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4">
            Three ways to work with us
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            Start anywhere.
            <br />
            <span className="text-stone-500 font-medium text-4xl md:text-5xl">Each step stands alone.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-3"
        >
          {tiers.map((tier) => (
            <motion.div key={tier.number} variants={cardVariants}>
              {/* Connector between cards */}
              {tier.number !== "01" && (
                <div className="flex flex-col items-center py-1">
                  <div className="w-px h-4 bg-white/10" />
                  <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}

              <div
                className={`rounded-2xl border ${tier.bg} ${tier.border} overflow-hidden ${
                  tier.featured ? "ring-1 ring-white/10" : ""
                }`}
              >
                {/* Teal accent bar only on featured */}
                {tier.featured && (
                  <div className="h-[2px] bg-gradient-to-r from-teal-500 to-teal-400" />
                )}

                <div className="p-7 md:p-9">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                    {/* Left */}
                    <div className="flex-shrink-0 sm:w-40">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">
                        {tier.number} / {tier.label}
                      </p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        tier.badgeStyle === "teal"
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          : tier.badgeStyle === "white"
                          ? "bg-white text-stone-900"
                          : tier.badgeStyle === "teal-dark"
                          ? "bg-teal-900/40 text-teal-400 border border-teal-800/50"
                          : "bg-white/5 text-stone-400"
                      }`}>
                        {tier.badgeStyle === "teal" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
                        )}
                        {tier.badge}
                      </span>
                    </div>

                    {/* Right */}
                    <div className="flex-1">
                      <h3 className={`font-black mb-1 tracking-tight ${
                        tier.featured
                          ? "text-3xl text-white"
                          : tier.number === "03"
                          ? "text-4xl text-white"
                          : "text-xl text-stone-300"
                      }`}>
                        {tier.name}
                      </h3>
                      <p className="text-xs text-stone-500 mb-4">{tier.tagline}</p>
                      <p className="text-sm text-stone-400 leading-relaxed mb-5">
                        {tier.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tier.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              tier.number === "03"
                                ? "bg-teal-900/40 text-teal-400 border border-teal-800/40"
                                : tier.featured
                                ? "bg-white/10 text-stone-300 border border-white/5"
                                : "bg-white/5 text-stone-500 border border-white/5"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={tier.cta.href}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                          tier.cta.style === "teal"
                            ? "bg-teal-500 text-white hover:bg-teal-400"
                            : tier.cta.style === "solid"
                            ? "bg-white text-stone-950 hover:bg-stone-100"
                            : "border border-white/10 text-stone-300 hover:border-teal-500/50 hover:text-teal-400"
                        }`}
                      >
                        {tier.cta.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-stone-600 text-sm mt-10"
        >
          Not sure where to start?{" "}
          <a href="#audit" className="text-stone-400 font-medium underline underline-offset-4 hover:text-teal-400 transition-colors">
            Try the free audit.
          </a>
          {" "}It&apos;s instant.
        </motion.p>
      </div>
    </section>
  );
}
