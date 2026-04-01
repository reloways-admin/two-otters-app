"use client";

import { useState, useRef, useEffect } from "react";
import { LoadingState } from "./LoadingState";
import { AuditResults } from "./AuditResults";
import type { AuditInput, AuditResult, AuditStatus } from "@/types/audit";

interface Props {
  status: AuditStatus;
  result: AuditResult | null;
  error: string | null;
  onReset: () => void;
  onSubmit: (input: AuditInput) => void;
}

/** Audit form — drag-drop, text input, optional context fields */
function AuditForm({ onSubmit }: { onSubmit: (input: AuditInput) => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [showContext, setShowContext] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setText("");
    setShowContext(true);
  }

  function handleTextChange(val: string) {
    setText(val);
    if (val.length > 10) setShowContext(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file && !text.trim()) return;

    const input: AuditInput = { type: file ? "file" : "text" };

    if (file) {
      const buffer = await file.arrayBuffer();
      input.fileData = Buffer.from(buffer).toString("base64");
      input.fileMimeType = file.type;
      input.fileName = file.name;
    } else {
      input.textDescription = text.trim();
    }

    if (goal.trim()) input.goal = goal.trim();
    if (audience.trim()) input.audience = audience.trim();

    onSubmit(input);
  }

  const canSubmit = file || text.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md shadow-stone-100/80 border border-stone-100 overflow-hidden"
    >
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer transition-colors p-5 border-b border-stone-100 ${
          dragging ? "bg-teal-50" : file ? "bg-teal-50/50" : "hover:bg-stone-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                {file.type.startsWith("image/") ? "🖼" : "📄"}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">{file.name}</p>
                <p className="text-xs text-stone-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFile(null); setShowContext(false); }}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700">Drop a screenshot or PDF</p>
              <p className="text-xs text-stone-400">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Text input */}
      {!file && (
        <div className="px-5 py-4 border-b border-stone-100">
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Or describe your product, idea, or what you're building..."
            rows={3}
            className="w-full text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none resize-none bg-transparent"
          />
        </div>
      )}

      {/* Context fields — revealed progressively */}
      {showContext && (
        <div className="px-5 py-4 border-b border-stone-100 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
              What&apos;s the goal?{" "}
              <span className="font-normal text-stone-400">optional</span>
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. More signups"
              className="w-full text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none border border-stone-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
              Who&apos;s the audience?{" "}
              <span className="font-normal text-stone-400">optional</span>
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. B2B SaaS founders"
              className="w-full text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none border border-stone-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      )}

      {/* Submit row */}
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        {!showContext && !file && (
          <button
            type="button"
            onClick={() => setShowContext(true)}
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
          >
            + Add context
          </button>
        )}
        {(showContext || file) && (
          <p className="text-xs text-stone-400">
            Powered by{" "}
            <span className="text-teal-600 font-medium">Agent Amir</span> &{" "}
            <span className="text-amber-600 font-medium">Agent Keren</span>
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Get your free audit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}

/**
 * Full audit section — shows the form in idle state, then loading and results.
 * Automatically scrolls into view when status moves away from idle.
 */
export function AuditSection({ status, result, error, onReset, onSubmit }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (status !== "idle" && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  return (
    <section
      id="audit"
      ref={ref}
      className="py-20 px-6 bg-stone-50 scroll-mt-16"
    >
      <div className="max-w-2xl mx-auto">

        {/* Section header — always visible */}
        {status === "idle" && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
              01 / Free Audit
            </p>
            <h2 className="text-3xl font-black text-stone-900">
              Try it now.
              <br />
              <span className="text-stone-400 font-medium text-2xl">No email. No commitment.</span>
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Drop a screenshot or describe your product. Agent Amir and Agent Keren will review
              it together — dual perspective, real insights, instantly.
            </p>
          </div>
        )}

        {/* Content states */}
        {status === "idle" ? (
          <>
            <AuditForm onSubmit={onSubmit} />
            <p className="mt-4 text-center text-xs text-stone-400">
              Takes 15–20 seconds &middot; Powered by{" "}
              <span className="text-teal-600 font-medium">Agent Amir</span> &{" "}
              <span className="text-amber-600 font-medium">Agent Keren</span>
            </p>
          </>
        ) : status === "done" && result ? (
          <AuditResults result={result} onReset={onReset} />
        ) : status === "error" ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error ?? "Something went wrong."}</p>
            <button
              onClick={onReset}
              className="text-sm text-stone-400 hover:text-stone-600 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <LoadingState status={status} />
        )}

      </div>
    </section>
  );
}
