"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { links, ui, type Locale } from "@/content/i18n";
import { ease, trackPointer } from "./motion";
import { Terminal } from "./terminal";

export function Hero({ lang }: { lang: Locale }) {
  const t = ui[lang].hero;
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % t.roles.length), 2600);
    return () => clearInterval(id);
  }, [t.roles.length]);

  return (
    <section
      id="top"
      onMouseMove={trackPointer}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-drift-a absolute -top-48 -left-48 size-[44rem] rounded-full bg-violet/40 blur-[130px]" />
        <div className="animate-drift-b absolute top-1/4 -right-48 size-[38rem] rounded-full bg-pink/30 blur-[130px]" />
        <div className="animate-drift-a absolute -bottom-40 left-1/4 size-[30rem] rounded-full bg-lime/20 blur-[130px]" />
        <div className="spotlight absolute inset-0" style={{ ["--accent" as string]: "#c8ff2e" }} />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-fog backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            {t.status} · {t.location}
          </motion.p>

          <h1 className="relative mt-6 font-display text-[clamp(4.2rem,14vw,10.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em]">
            <span className="sr-only">Lucas Borges — Senior AI Engineer</span>
            <span aria-hidden className="block">
              {"Lucas".split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block cursor-default hover:text-lime"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    whileHover={{ y: -14, rotate: -6 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="text-gradient inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease }}
              >
                Borges
              </motion.span>
            </span>
            <motion.span
              aria-hidden
              initial={{ scale: 2.4, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.1 }}
              className="absolute top-2 right-0 rounded-xl border-2 border-ink bg-lime px-3 py-1.5 font-display text-[clamp(0.9rem,2.2vw,1.4rem)] font-extrabold tracking-normal text-ink shadow-[6px_6px_0_0_var(--color-pink)] sm:top-6 lg:-right-4"
            >
              SENIOR AI ENGINEER
            </motion.span>
          </h1>

          <p className="mt-8 font-display text-2xl leading-tight font-semibold sm:text-3xl">
            {t.prefix}
            <span className="block min-h-[2.5em] overflow-hidden sm:min-h-[1.25em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={role}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="block text-lime"
                >
                  {t.roles[role]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-fog"
          >
            {t.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_var(--color-lime)]"
            >
              {t.work}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={links.cv[lang]}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition-colors hover:border-pink hover:text-pink"
            >
              {t.cv} ↓
            </a>
            <a href={links.github} target="_blank" className="px-3 py-3.5 font-mono text-sm text-fog transition-colors hover:text-white">
              GitHub ↗
            </a>
            <a href={links.linkedin} target="_blank" className="px-3 py-3.5 font-mono text-sm text-fog transition-colors hover:text-white">
              LinkedIn ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
        >
          <Terminal />
        </motion.div>
      </div>

      <a
        href="#work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-fog uppercase md:flex"
      >
        {t.scroll}
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="text-lime">
          ↓
        </motion.span>
      </a>
    </section>
  );
}
