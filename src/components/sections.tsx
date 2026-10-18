"use client";

import { motion, useScroll } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { accents, impact, journey, links, period, tr, wins } from "@/content/site";
import { Counter, ease, Reveal } from "./motion";

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="font-mono text-sm tracking-widest text-lime uppercase">{kicker}</p>
      <h2 className="mt-4 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl">{title}</h2>
    </Reveal>
  );
}

/** "~75%" → "~", 75, "%": only the number counts up, with the locale's thousands separator. */
function AnimatedValue({ value }: { value: string }) {
  const lang = useLocale();
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return <>{value}</>;
  const nf = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US");
  return (
    <>
      {m[1]}
      <Counter value={Number(m[2])} format={(n) => nf.format(n)} />
      {m[3]}
    </>
  );
}

export function Impact() {
  const t = useTranslations("impact");
  const lang = useLocale();
  return (
    <>
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
                    { label: t("before"), value: m.before, text: m.beforeText, bg: "rgb(255 255 255 / 0.12)", fg: "#f4f4f8" },
                    { label: t("after"), value: m.after, text: tr(m.afterText, lang), bg: color, fg: "#07070c" },
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

      <h3 className="mt-16 mb-6 font-display text-3xl font-bold tracking-tight">{t("more")}</h3>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
        {wins.map((w, i) => (
          <Reveal key={w.label.en} delay={(i % 5) * 0.06} className="group h-full bg-ink p-6 transition-colors hover:bg-ink-2">
            <p className="font-display text-4xl font-extrabold tracking-tight transition-transform duration-300 group-hover:-translate-y-1" style={{ color: accents[w.accent] }}>
              <AnimatedValue value={w.value} />
            </p>
            <p className="mt-2 text-sm leading-snug">{w.label[lang]}</p>
            <p className="mt-3 font-mono text-[11px] tracking-wide text-fog uppercase">{w.context}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const t = useTranslations("journey");
  const lang = useLocale();

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
          <li key={i} className="relative" style={{ ["--accent" as string]: color }}>
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
              <div className="rounded-3xl border border-white/10 bg-ink-2 p-6 transition-colors hover:border-[var(--accent)]/40 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-fog">
                  <span>{period(j, lang)}</span>
                  {!j.end && <span className="rounded-full bg-lime px-2.5 py-0.5 font-semibold text-ink uppercase">{t("now")}</span>}
                  {j.badge && (
                    <span className="rounded-full border border-[var(--accent)] px-2.5 py-0.5 text-[var(--accent)]">{j.badge[lang]}</span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {tr(j.role, lang)} <span className="text-[var(--accent)]">@ {j.company}</span>
                </h3>
                <p className="mt-1 font-mono text-xs text-fog">{j.type[lang]}</p>
                <p className="mt-4 max-w-3xl text-white/90">{j.body[lang]}</p>
                {j.points && (
                  <ul className="mt-4 grid gap-2 text-sm text-fog lg:grid-cols-2">
                    {j.points[lang].map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {j.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-fog transition-colors hover:border-[var(--accent)] hover:text-white"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function CopyEmail() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(links.email).then(() => (setCopied(true), setTimeout(() => setCopied(false), 2000)))}
      className="rounded-full border-2 border-ink px-6 py-3.5 font-semibold transition-colors hover:bg-ink hover:text-lime"
      aria-live="polite"
    >
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
