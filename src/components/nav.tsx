"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const sections = ["work", "impact", "about", "journey"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX }} className="h-[3px] origin-left bg-gradient-to-r from-lime via-pink to-violet" />
      <nav className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-ink/70 font-display text-lg font-extrabold backdrop-blur transition-colors hover:border-lime hover:text-lime"
          aria-label="Lucas Borges"
        >
          LB
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-1.5 backdrop-blur md:flex">
          {sections.map((s) => (
            <Link key={s} href={`/#${s}`} className="rounded-full px-4 py-2 text-sm text-fog transition-colors hover:bg-white/10 hover:text-white">
              {t(s)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t("language")}
            className={`flex rounded-full border border-white/10 bg-ink/70 p-1 font-mono text-xs backdrop-blur transition-opacity ${pending ? "opacity-60" : ""}`}
          >
            {routing.locales.map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                aria-pressed={l === locale}
                onClick={() => l !== locale && startTransition(() => router.replace(pathname, { locale: l, scroll: false }))}
                className={`rounded-full px-3 py-2 uppercase transition-colors ${l === locale ? "bg-white text-ink" : "text-fog hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            href="/#contact"
            className="rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            {t("contact")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
