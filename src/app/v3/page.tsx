"use client";

import { useState } from "react";
import { NavV3 } from "@/components/v3/NavV3";
import { HeroV3 } from "@/components/v3/HeroV3";
import { MarqueeV3 } from "@/components/v3/MarqueeV3";
import { PainV3 } from "@/components/v3/PainV3";
import { PromiseV3 } from "@/components/v3/PromiseV3";
import { TiersV3 } from "@/components/v3/TiersV3";
import { AuditSection } from "@/components/AuditSection";
import { ProcessV3 } from "@/components/v3/ProcessV3";
import { AboutV3 } from "@/components/v3/AboutV3";
import { ContactV3 } from "@/components/v3/ContactV3";
import { FooterV3 } from "@/components/v3/FooterV3";
import type { AuditInput, AuditResult, AuditStatus } from "@/types/audit";

export default function V3Page() {
  const [status, setStatus] = useState<AuditStatus>("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: AuditInput) {
    setError(null);
    setResult(null);
    setStatus("amir_thinking");

    const t1 = setTimeout(() => setStatus("keren_thinking"), 6000);
    const t2 = setTimeout(() => setStatus("synthesizing"), 12000);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      clearTimeout(t1);
      clearTimeout(t2);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Unknown error");
      setResult(data.result);
      setStatus("done");
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  return (
    <div style={{ background: "#080808" }}>
      <NavV3 />
      <HeroV3 />
      <MarqueeV3 />
      <PainV3 />
      <PromiseV3 />
      <TiersV3 />

      {/* Audit — dark wrapper */}
      <div
        style={{ background: "#080808" }}
        className="[&_section]:!bg-transparent [&_.bg-white]:!bg-[#0e0e0e] [&_.border-stone-100]:!border-white/5 [&_h2]:!text-white [&_.text-stone-900]:!text-white [&_.text-stone-700]:!text-white/80 [&_.text-stone-600]:!text-white/60 [&_.text-stone-500]:!text-white/40 [&_.text-stone-400]:!text-white/30 [&_.text-teal-600]:![color:#00cc66] [&_.bg-stone-900]:!bg-[#161616] [&_.bg-stone-50]:!bg-[#0e0e0e] [&_.border-stone-200]:!border-white/8"
      >
        <AuditSection
          status={status}
          result={result}
          error={error}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
      </div>

      <ProcessV3 />
      <AboutV3 />
      <ContactV3 />
      <FooterV3 />
    </div>
  );
}
