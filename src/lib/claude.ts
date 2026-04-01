/**
 * Claude API client + audit orchestration
 *
 * Flow:
 *   1. Call Agent Amir  (UX/design)
 *   2. Call Agent Keren (strategy, receives Amir's output)
 *   3. Call Synthesis   (unified recommendations)
 */

import Anthropic from "@anthropic-ai/sdk";
import type { AuditInput, AuditResult, AmirAnalysis, KerenAnalysis } from "@/types/audit";
import { AMIR_SYSTEM_PROMPT, buildAmirUserMessage } from "./agents/amir";
import { KEREN_SYSTEM_PROMPT, buildKerenUserMessage } from "./agents/keren";
import { SYNTHESIS_SYSTEM_PROMPT, buildSynthesisUserMessage } from "./agents/synthesis";

const MODEL = "claude-opus-4-6";

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}

function parseJSON<T>(raw: string): T {
  // Strip any accidental markdown fences
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(cleaned) as T;
}

async function callAmir(
  client: Anthropic,
  input: AuditInput
): Promise<AmirAnalysis> {
  const hasImage = !!input.fileData && input.fileMimeType?.startsWith("image/");

  const userText = buildAmirUserMessage({
    description: input.textDescription,
    goal: input.goal,
    audience: input.audience,
    hasImage,
  });

  const userContent: Anthropic.MessageParam["content"] = hasImage
    ? [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: input.fileMimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: input.fileData!,
          },
        },
        { type: "text", text: userText },
      ]
    : userText;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: AMIR_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
  });

  const raw = response.content.find((b) => b.type === "text")?.text ?? "";
  return parseJSON<AmirAnalysis>(raw);
}

async function callKeren(
  client: Anthropic,
  input: AuditInput,
  amirAnalysis: AmirAnalysis
): Promise<KerenAnalysis> {
  const hasImage = !!input.fileData && input.fileMimeType?.startsWith("image/");

  const userText = buildKerenUserMessage(amirAnalysis, {
    description: input.textDescription,
    goal: input.goal,
    audience: input.audience,
    hasImage,
  });

  const userContent: Anthropic.MessageParam["content"] = hasImage
    ? [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: input.fileMimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: input.fileData!,
          },
        },
        { type: "text", text: userText },
      ]
    : userText;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: KEREN_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
  });

  const raw = response.content.find((b) => b.type === "text")?.text ?? "";
  return parseJSON<KerenAnalysis>(raw);
}

async function callSynthesis(
  client: Anthropic,
  amir: AmirAnalysis,
  keren: KerenAnalysis
): Promise<AuditResult["synthesis"]> {
  const userText = buildSynthesisUserMessage(amir, keren);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    system: SYNTHESIS_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userText }],
  });

  const raw = response.content.find((b) => b.type === "text")?.text ?? "";
  return parseJSON<AuditResult["synthesis"]>(raw);
}

export async function runAudit(input: AuditInput): Promise<AuditResult> {
  const client = getClient();

  const amir = await callAmir(client, input);
  const keren = await callKeren(client, input, amir);
  const synthesis = await callSynthesis(client, amir, keren);

  return { amir, keren, synthesis };
}
