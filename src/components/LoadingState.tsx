"use client";

import type { AuditStatus } from "@/types/audit";

interface Props {
  status: AuditStatus;
}

const STEPS: {
  id: AuditStatus[];
  label: string;
  message: string;
  color: string;
}[] = [
  {
    id: ["uploading", "amir_thinking"],
    label: "Amir",
    message: "Amir is looking at your design...",
    color: "text-teal-600",
  },
  {
    id: ["keren_thinking"],
    label: "Keren",
    message: "Keren is adding strategic depth to Amir's analysis...",
    color: "text-amber-600",
  },
  {
    id: ["synthesizing"],
    label: "Two Otters",
    message: "Putting together your Two Otters recommendation...",
    color: "text-stone-700",
  },
];

function stepState(
  stepIds: AuditStatus[],
  current: AuditStatus
): "done" | "active" | "waiting" {
  const order: AuditStatus[] = [
    "uploading",
    "amir_thinking",
    "keren_thinking",
    "synthesizing",
  ];
  const currentIndex = order.indexOf(current);
  const stepIndex = Math.max(...stepIds.map((id) => order.indexOf(id)));

  if (currentIndex > stepIndex) return "done";
  if (stepIds.includes(current)) return "active";
  return "waiting";
}

export function LoadingState({ status }: Props) {
  const activeStep = STEPS.find((s) => s.id.includes(status));

  return (
    <div className="text-center space-y-10">
      <p className="text-2xl">🦦🦦</p>

      {activeStep && (
        <p className={`text-lg font-medium ${activeStep.color} animate-pulse`}>
          {activeStep.message}
        </p>
      )}

      <div className="space-y-4 max-w-sm mx-auto text-left">
        {STEPS.map((step) => {
          const state = stepState(step.id, status);
          return (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs
                  ${state === "done" ? "bg-teal-600 text-white" : ""}
                  ${state === "active" ? "border-2 border-current animate-spin" + " " + step.color : ""}
                  ${state === "waiting" ? "bg-stone-200" : ""}
                `}
              >
                {state === "done" && "✓"}
              </div>
              <span
                className={`text-sm ${
                  state === "done"
                    ? "text-stone-400 line-through"
                    : state === "active"
                    ? step.color + " font-medium"
                    : "text-stone-300"
                }`}
              >
                {step.label === "Amir"
                  ? "Amir is reviewing your UX & design"
                  : step.label === "Keren"
                  ? "Keren is adding the strategic layer"
                  : "Synthesizing the Two Otters recommendation"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
