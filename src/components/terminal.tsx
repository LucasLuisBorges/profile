"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Illustrative run of the kind of agent pipeline built in Aura.
const LINES = [
  { text: "$ aura agent run --incident INC-4821", color: "text-white" },
  { text: "› 312 log events grouped into 1 incident", color: "text-fog" },
  { text: "› llm triage: NullReferenceException · sev high", color: "text-yellow" },
  { text: "› spinning up ephemeral runner (docker)", color: "text-fog" },
  { text: "› codex: patching src/billing/invoice.ts", color: "text-cyan" },
  { text: "› self-review: 48/48 tests passing", color: "text-fog" },
  { text: "› guardrails: secrets masked · cost within quota", color: "text-pink" },
  { text: "✓ Draft PR #1294 opened", color: "text-lime" },
];

export function Terminal() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (reduce) return setLine(LINES.length);
    if (line >= LINES.length) {
      const id = setTimeout(() => (setLine(0), setChar(0)), 4000);
      return () => clearTimeout(id);
    }
    const full = LINES[line].text.length;
    const id =
      char < full
        ? setTimeout(() => setChar(char + 1), line === 0 ? 45 : 14)
        : setTimeout(() => (setLine(line + 1), setChar(0)), line === 0 ? 600 : 380);
    return () => clearTimeout(id);
  }, [line, char, reduce]);

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-lime/30 via-violet/20 to-pink/30 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-pink" />
          <span className="size-3 rounded-full bg-yellow" />
          <span className="size-3 rounded-full bg-lime" />
          <span className="ml-3 font-mono text-xs text-fog">aura — agent</span>
        </div>
        <pre
          aria-label="Illustrative AI agent run"
          className="min-h-[19rem] overflow-hidden whitespace-pre-wrap p-5 font-mono text-[13px] leading-7 sm:text-sm"
        >
          {LINES.slice(0, line).map((l) => (
            <div key={l.text} className={l.color}>
              {l.text}
            </div>
          ))}
          {line < LINES.length && (
            <div className={LINES[line].color}>
              {LINES[line].text.slice(0, char)}
              <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-lime" />
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
