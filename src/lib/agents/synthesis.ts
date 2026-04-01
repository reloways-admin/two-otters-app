/**
 * Synthesis pass — merges Amir + Keren into a unified Two Otters recommendation
 */

import type { AmirAnalysis, KerenAnalysis } from "@/types/audit";

export const SYNTHESIS_SYSTEM_PROMPT = `You are the synthesis engine for Two Otters Studio.
You have received a UX/design analysis from Agent Amir and a strategy/messaging analysis from Agent Keren.
Your job is to distill both perspectives into a unified, prioritized set of action items.

Be opinionated. This is not a summary — it is a recommendation.
The client should walk away knowing exactly what to do first.

Return a JSON object matching this exact schema:

{
  "actionItems": [
    {
      "priority": 1,
      "title": "Short, imperative title (max 8 words)",
      "rationale": "1–2 sentences. Why this is the most important thing to fix."
    }
  ],
  "closingNote": "1–2 sentences. A warm, encouraging close that hints at how working with Two Otters could take this further."
}

Rules:
- Include exactly 3 prioritized action items
- Order by impact — highest first
- The closingNote should feel like Amir and Keren speaking together, not a marketing pitch
- Respond ONLY with the JSON object — no markdown, no preamble`;

export function buildSynthesisUserMessage(
  amir: AmirAnalysis,
  keren: KerenAnalysis
): string {
  const lines: string[] = [];

  lines.push("--- Agent Amir's UX/Design Analysis ---");
  lines.push(`Summary: ${amir.summary}`);
  amir.findings.forEach((f, i) => {
    lines.push(`${i + 1}. [${f.category}] ${f.title}: ${f.description}`);
  });

  lines.push("\n--- Agent Keren's Strategy Analysis ---");
  lines.push(`Summary: ${keren.summary}`);
  keren.findings.forEach((f, i) => {
    const building = f.buildingOn ? ` (building on: "${f.buildingOn}")` : "";
    lines.push(`${i + 1}. [${f.category}] ${f.title}: ${f.description}${building}`);
  });

  lines.push(
    "\nPlease synthesize both analyses into 3 prioritized action items and a closing note."
  );

  return lines.join("\n");
}
