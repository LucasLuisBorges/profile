"use client";

import { animate, motion, MotionConfig, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}

/** Feeds the `.spotlight` glow with the pointer position. */
export function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}
