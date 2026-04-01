// ─── Input ───────────────────────────────────────────────────────────────────

export type AuditInputType = "file" | "text" | "url";

export interface AuditInput {
  type: AuditInputType;
  // For file uploads: base64-encoded content + MIME type
  fileData?: string;
  fileMimeType?: string;
  fileName?: string;
  // For text / URL
  textDescription?: string;
  url?: string;
  // Optional context
  goal?: string;
  audience?: string;
}

// ─── Findings ────────────────────────────────────────────────────────────────

export type FindingCategory =
  | "red_flag"
  | "observation"
  | "quick_win"
  | "strength"
  | "strategic_gap";

export interface Finding {
  category: FindingCategory;
  title: string;
  description: string;
  /** Optional: reference to an observation from the other agent */
  buildingOn?: string;
}

// ─── Agent Results ────────────────────────────────────────────────────────────

export interface AmirAnalysis {
  summary: string;
  findings: Finding[];
}

export interface KerenAnalysis {
  summary: string;
  findings: Finding[];
}

export interface SynthesisResult {
  actionItems: {
    priority: number;
    title: string;
    rationale: string;
  }[];
  closingNote: string;
}

// ─── Full Audit ───────────────────────────────────────────────────────────────

export interface AuditResult {
  amir: AmirAnalysis;
  keren: KerenAnalysis;
  synthesis: SynthesisResult;
}

// ─── API Request / Response ───────────────────────────────────────────────────

export interface AuditRequest {
  input: AuditInput;
}

export interface AuditResponse {
  result?: AuditResult;
  error?: string;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type AuditStatus =
  | "idle"
  | "uploading"
  | "amir_thinking"
  | "keren_thinking"
  | "synthesizing"
  | "done"
  | "error";
