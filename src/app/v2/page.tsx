"use client";

import { useState } from "react";
import { NavV2 } from "@/components/v2/NavV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { MarqueeV2 } from "@/components/v2/MarqueeV2";
import { PainV2 } from "@/components/v2/PainV2";
import { PromiseV2 } from "@/components/v2/PromiseV2";
import { TiersV2 } from "@/components/v2/TiersV2";
import { AuditSection } from "@/components/AuditSection";
import { ProcessV2 } from "@/components/v2/ProcessV2";
import { BentoV2 } from "@/components/v2/BentoV2";
import { ContactV2 } from "@/components/v2/ContactV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import type { AuditInput, AuditResult, AuditStatus } from "@/types/audit";

export default function V2Page() {
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
    <div className="bg-stone-950">
      <NavV2 />
      <HeroV2 />
      <MarqueeV2 />
      <PainV2 />
      <PromiseV2 />
      <TiersV2 />

      {/* Audit section — dark variant override via className on wrapper */}
      <div className="[&_section]:bg-stone-950 [&_section]:text-white [&_h2]:text-white [&_p.text-stone-500]:text-stone-400 [&_.bg-white]:bg-stone-900 [&_.border-stone-100]:border-white\/5 [&_.text-stone-900]:text-white [&_.text-stone-700]:text-stone-200 [&_.text-stone-600]:text-stone-300">
        <AuditSection
          status={status}
          result={result}
          error={error}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
      </div>

      <ProcessV2 />
      <BentoV2 />
      <ContactV2 />
      <FooterV2 />
    </div>
  );
}
