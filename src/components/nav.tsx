"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui, type Locale } from "@/content/i18n";

const sections = ["work", "impact", "about", "journey"] as const;

export function Nav({ lang }: { lang: Locale }) {
  const t = ui[lang];
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const swap = (to: Locale) => pathname.replace(/^\/(pt|en)/, `/${to}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX }} className="h-[3px] origin-left bg-gradient-to-r from-lime via-pink to-violet" />
      <nav className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href={`/${lang}/`}
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-ink/70 font-display text-lg font-extrabold backdrop-blur transition-colors hover:border-lime hover:text-lime"
          aria-label="Lucas Borges"
        >
          LB
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-1.5 backdrop-blur md:flex">
          {sections.map((s) => (
            <Link
              key={s}
              href={`/${lang}/#${s}`}
              className="rounded-full px-4 py-2 text-sm text-fog transition-colors hover:bg-white/10 hover:text-white"
            >
              {t.nav[s]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/10 bg-ink/70 p-1 font-mono text-xs backdrop-blur" role="group" aria-label="Language">
            {(["pt", "en"] as const).map((l) => (
              <Link
                key={l}
                href={swap(l)}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded-full px-3 py-2 uppercase transition-colors ${l === lang ? "bg-white text-ink" : "text-fog hover:text-white"}`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${lang}/#contact`}
            className="rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            {t.nav.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}
