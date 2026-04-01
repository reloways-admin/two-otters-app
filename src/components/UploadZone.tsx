"use client";

import { useState, useRef } from "react";
import type { AuditInput } from "@/types/audit";

interface Props {
  onSubmit: (input: AuditInput) => void;
}

export function UploadZone({ onSubmit }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setText("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file && !text.trim()) return;

    const input: AuditInput = { type: file ? "file" : "text" };

    if (file) {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      input.fileData = base64;
      input.fileMimeType = file.type;
      input.fileName = file.name;
    } else {
      input.textDescription = text.trim();
    }

    if (goal.trim()) input.goal = goal.trim();
    if (audience.trim()) input.audience = audience.trim();

    onSubmit(input);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-stone-800">
          Want to see how we think?
        </h2>
        <p className="text-stone-500 mt-1">Drop your product here.</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${dragging
            ? "border-teal-500 bg-teal-50"
            : file
            ? "border-teal-400 bg-teal-50"
            : "border-stone-300 hover:border-stone-400 bg-white"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {file ? (
          <div>
            <p className="font-medium text-teal-700">{file.name}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="text-xs text-stone-400 mt-1 hover:text-stone-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="text-stone-400">
            <p className="text-sm">Drop a screenshot or PDF</p>
            <p className="text-xs mt-1">or click to browse</p>
          </div>
        )}
      </div>

      {/* Text fallback */}
      {!file && (
        <div>
          <p className="text-xs text-stone-400 text-center mb-2">
            — or describe your product in text —
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your product, idea, or what you're trying to build..."
            rows={4}
            className="w-full rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>
      )}

      {/* Optional context */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">
            What&apos;s the goal? <span className="font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Increase signups"
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">
            Who&apos;s the audience? <span className="font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. B2B SaaS founders"
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!file && !text.trim()}
        className="w-full py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Get your free audit
      </button>
    </form>
  );
}
