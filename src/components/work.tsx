"use client";

import Link from "next/link";
import { accents, tr, ui, type Locale } from "@/content/i18n";
import type { Project } from "@/content/projects";
import { Flow } from "./flow";
import { trackPointer } from "./motion";

type Props = { p: Project; lang: Locale };
const accentVar = (p: Project) => ({ ["--accent" as string]: accents[p.accent] });

export function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex gap-1.5 border-b border-white/10 bg-ink-3 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
      </div>
      <img src={src} alt={alt} width={1600} height={840} loading="lazy" className="aspect-[16/9] w-full object-cover object-top" />
    </div>
  );
}

export function FeaturedProject({ p, lang, index }: Props & { index: number }) {
  const t = ui[lang].work;
  const title = tr(p.title, lang);
  const color = accents[p.accent];

  return (
    <article
      onMouseMove={trackPointer}
      style={accentVar(p)}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 p-6 transition-colors hover:border-[var(--accent)]/50 sm:p-10"
    >
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div aria-hidden className="absolute -top-32 -right-32 size-80 rounded-full opacity-25 blur-[110px]" style={{ background: color }} />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            {tr(p.client, lang)} · {p.year}
          </p>
          <h3 className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            <Link href={`/${lang}/projects/${p.slug}/`} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h3>
          <p className="mt-4 text-xl leading-snug text-white/90">{p.tagline[lang]}</p>

          {p.metrics && (
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {p.metrics.map((m) => (
                <div key={m.value}>
                  <dt className="font-display text-2xl font-extrabold text-[var(--accent)] sm:text-3xl">{m.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-fog">{m.label[lang]}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.slice(0, 7).map((s) => (
              <li key={s} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-fog">
                {s}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
            {t.view}
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>

        <div className="relative">
          {p.images ? (
            <div className="relative pb-6 sm:pr-8">
              {p.images[1] && (
                <Shot
                  src={p.images[1]}
                  alt=""
                  className="absolute top-8 right-0 left-10 rotate-3 opacity-60 transition-transform duration-700 group-hover:translate-x-4 group-hover:rotate-6"
                />
              )}
              <Shot
                src={p.images[0]}
                alt={title}
                className="relative transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-1"
              />
            </div>
          ) : (
            p.flow && (
              <div className="rounded-2xl border border-white/10 bg-ink/60 p-6">
                <Flow steps={p.flow[lang]} color={color} />
              </div>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ p, lang }: Props) {
  const color = accents[p.accent];
  return (
    <Link
      href={`/${lang}/projects/${p.slug}/`}
      onMouseMove={trackPointer}
      style={accentVar(p)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]"
    >
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
        {p.images ? (
          <img
            src={p.images[0]}
            alt=""
            width={1600}
            height={840}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex size-full flex-wrap content-center items-center gap-2 p-6"
            style={{ background: `radial-gradient(circle at 20% 10%, ${color}55, transparent 60%), radial-gradient(circle at 90% 100%, ${color}22, transparent 50%)` }}
          >
            {p.flow?.[lang].map((s, i) => (
              <span key={s} className="flex items-center gap-2 text-xs">
                {i > 0 && <span className="text-[var(--accent)]">→</span>}
                <span className="rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono">{s}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex justify-between gap-4 font-mono text-xs text-fog">
          <span>{tr(p.client, lang)}</span>
          <span>{p.year}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{tr(p.title, lang)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fog">{p.tagline[lang]}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--accent)]">
          {ui[lang].work.view}
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">→</span>
        </span>
      </div>
    </Link>
  );
}
