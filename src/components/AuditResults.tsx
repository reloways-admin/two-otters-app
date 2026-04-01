"use client";

import type { AuditResult, Finding, FindingCategory } from "@/types/audit";

interface Props {
  result: AuditResult;
  onReset: () => void;
}

const CATEGORY_LABELS: Record<FindingCategory, { label: string; color: string }> = {
  red_flag:     { label: "Red flag",     color: "text-red-600 bg-red-50 border-red-200" },
  observation:  { label: "Observation",  color: "text-stone-600 bg-stone-50 border-stone-200" },
  quick_win:    { label: "Quick win",    color: "text-green-700 bg-green-50 border-green-200" },
  strength:     { label: "Strength",     color: "text-teal-700 bg-teal-50 border-teal-200" },
  strategic_gap:{ label: "Strategic gap",color: "text-amber-700 bg-amber-50 border-amber-200" },
};

function FindingCard({ finding }: { finding: Finding }) {
  const { label, color } = CATEGORY_LABELS[finding.category];
  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-start gap-2">
        <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${color} flex-shrink-0`}>
          {label}
        </span>
      </div>
      <p className="mt-2 font-semibold text-sm">{finding.title}</p>
      <p className="mt-1 text-sm opacity-80">{finding.description}</p>
      {finding.buildingOn && (
        <p className="mt-2 text-xs italic opacity-60">
          Building on: &ldquo;{finding.buildingOn}&rdquo;
        </p>
      )}
    </div>
  );
}

export function AuditResults({ result, onReset }: Props) {
  return (
    <div className="space-y-10">
      {/* Amir's card */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block" />
          <h2 className="font-bold text-teal-700 text-lg">Amir&apos;s Take — UX & Design</h2>
        </div>
        <p className="text-stone-600 text-sm mb-4">{result.amir.summary}</p>
        <div className="space-y-3">
          {result.amir.findings.map((f, i) => (
            <FindingCard key={i} finding={f} />
          ))}
        </div>
      </section>

      {/* Keren's card */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          <h2 className="font-bold text-amber-700 text-lg">Keren&apos;s Take — Strategy & Messaging</h2>
        </div>
        <p className="text-stone-600 text-sm mb-4">{result.keren.summary}</p>
        <div className="space-y-3">
          {result.keren.findings.map((f, i) => (
            <FindingCard key={i} finding={f} />
          ))}
        </div>
      </section>

      {/* Synthesis */}
      <section className="bg-stone-900 text-white rounded-2xl p-8">
        <p className="text-2xl text-center mb-6">🦦🦦</p>
        <h2 className="font-bold text-lg mb-6 text-center">Two Otters Recommendation</h2>
        <div className="space-y-5">
          {result.synthesis.actionItems.map((item) => (
            <div key={item.priority} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">
                {item.priority}
              </span>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-stone-400 text-sm mt-0.5">{item.rationale}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-stone-300 text-sm text-center italic">
          {result.synthesis.closingNote}
        </p>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-white font-semibold mb-3">
            Liked what you saw? Let&apos;s go deeper.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Book a Discovery Sprint
          </a>
        </div>
      </section>

      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm text-stone-400 hover:text-stone-600 underline"
        >
          Audit another product
        </button>
      </div>
    </div>
  );
}
