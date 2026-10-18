"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease } from "./motion";

/** Animated pipeline: steps light up in order, like a job running. */
export function Flow({ steps, color }: { steps: string[]; color: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (reduce) return setActive(steps.length);
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (steps.length + 2)), 750);
    return () => clearInterval(id);
  }, [inView, reduce, steps.length]);

  return (
    <ol ref={ref} className="relative space-y-3" style={{ ["--accent" as string]: color }}>
      <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-0.5 bg-white/10" />
      <motion.span
        aria-hidden
        className="absolute top-5 bottom-5 left-[19px] w-0.5 origin-top bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: Math.min(Math.max(active, 0), steps.length - 1) / (steps.length - 1) }}
        transition={{ duration: 0.5, ease }}
      />
      {steps.map((s, i) => {
        const on = i <= active;
        return (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className="relative flex items-center gap-4"
          >
            <span
              className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border font-mono text-xs transition-all duration-300 ${
                on ? "border-[var(--accent)] bg-[var(--accent)] text-ink shadow-[0_0_24px_-4px_var(--accent)]" : "border-white/15 bg-ink-2 text-fog"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                i === active ? "border-[var(--accent)] bg-white/5 text-white" : "border-white/10 bg-ink-2/60 text-fog"
              }`}
            >
              {s}
            </span>
          </motion.li>
        );
      })}
    </ol>
  );
}
