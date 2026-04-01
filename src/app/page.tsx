"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { PainSection } from "@/components/PainSection";
import { PromiseSection } from "@/components/PromiseSection";
import { TiersSection } from "@/components/TiersSection";
import { AuditSection } from "@/components/AuditSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import type { AuditInput, AuditResult, AuditStatus } from "@/types/audit";

export default function HomePage() {
  const [status, setStatus] = useState<AuditStatus>("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: AuditInput) {
    setError(null);
    setResult(null);
    setStatus("amir_thinking");

    // Stagger loading states while the real API call runs
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

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Unknown error");
      }

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
    <>
      <Nav />
      <HeroSection />
      <PainSection />
      <PromiseSection />
      <TiersSection />
      <AuditSection
        status={status}
        result={result}
        error={error}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
      <HowItWorksSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
