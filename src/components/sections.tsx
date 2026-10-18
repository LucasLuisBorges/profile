"use client";

import { motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { accents, impact, journey, links, tr, ui, type Locale } from "@/content/i18n";
import { ease, Reveal } from "./motion";

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="font-mono text-sm tracking-widest text-lime uppercase">{kicker}</p>
      <h2 className="mt-4 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl">{title}</h2>
    </Reveal>
  );
}

export function Impact({ lang }: { lang: Locale }) {
  const t = ui[lang].impact;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {impact.map((m, i) => {
        const max = Math.max(m.before, m.after);
        const color = accents[m.accent];
        return (
          <Reveal key={m.beforeText} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-white/10 bg-ink-2 p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-bold tracking-tight">{m.label[lang]}</h3>
                <span className="shrink-0 rounded-full px-3 py-1 font-display text-xl font-extrabold text-ink" style={{ background: color }}>
                  {m.delta}
                </span>
              </div>
              <div className="mt-7 space-y-3 font-mono text-sm">
                {[
                  { label: t.before, value: m.before, text: m.beforeText, bg: "rgb(255 255 255 / 0.12)", fg: "#f4f4f8" },
                  { label: t.after, value: m.after, text: m.afterText, bg: color, fg: "#07070c" },
                ].map((b, j) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-xs text-fog">{b.label}</span>
                    <div className="h-10 flex-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(b.value / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + j * 0.35, ease }}
                        className="flex h-full min-w-[4.5rem] items-center justify-end overflow-hidden rounded-lg px-3 font-bold whitespace-nowrap"
                        style={{ background: b.bg, color: b.fg }}
                      >
                        {b.text}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-fog">{m.how[lang]}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Journey({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const now = ui[lang].journey.now;

  return (
    <ol ref={ref} className="relative space-y-6 pl-12 sm:pl-16">
      <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-0.5 bg-white/10 sm:left-[23px]" />
      <motion.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute top-2 bottom-2 left-[15px] w-0.5 origin-top bg-gradient-to-b from-lime via-pink to-violet sm:left-[23px]"
      />
      {journey.map((j, i) => {
        const color = accents[j.accent];
        return (
          <li key={i} className="relative">
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute top-7 -left-12 grid size-8 place-items-center rounded-full border-4 border-ink sm:-left-16 sm:size-12"
              style={{ background: color, boxShadow: `0 0 30px -6px ${color}` }}
            />
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-ink-2 p-6 transition-colors hover:border-white/25 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-fog">
                  <span>{j.period[lang]}</span>
                  {j.current && (
                    <span className="rounded-full bg-lime px-2.5 py-0.5 font-semibold text-ink uppercase">{now}</span>
                  )}
                  {j.badge && (
                    <span className="rounded-full border px-2.5 py-0.5" style={{ borderColor: color, color }}>
                      {j.badge[lang]}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {tr(j.role, lang)} <span style={{ color }}>@ {j.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-fog">{j.body[lang]}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function CopyEmail({ lang }: { lang: Locale }) {
  const t = ui[lang].contact;
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(links.email).then(() => (setCopied(true), setTimeout(() => setCopied(false), 2000)))}
      className="rounded-full border-2 border-ink px-6 py-3.5 font-semibold transition-colors hover:bg-ink hover:text-lime"
      aria-live="polite"
    >
      {copied ? t.copied : t.copy}
    </button>
  );
}
