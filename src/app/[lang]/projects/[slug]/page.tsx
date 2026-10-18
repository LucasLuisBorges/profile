import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flow } from "@/components/flow";
import { Reveal } from "@/components/motion";
import { Shot } from "@/components/work";
import { accents, tr, ui, type Locale } from "@/content/i18n";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return { title: tr(p.title, lang), description: p.tagline[lang] };
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const t = ui[lang].project;
  const color = accents[p.accent];
  const title = tr(p.title, lang);

  return (
    <main className="overflow-x-clip" style={{ ["--accent" as string]: color }}>
      <section className="relative isolate pt-32 pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="animate-drift-a absolute -top-40 -left-40 size-[36rem] rounded-full opacity-30 blur-[130px]" style={{ background: color }} />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <Link href={`/${lang}/#work`} className="font-mono text-sm text-fog transition-colors hover:text-[var(--accent)]">
            ← {t.back}
          </Link>
          <Reveal>
            <p className="mt-10 font-mono text-sm tracking-widest text-[var(--accent)] uppercase">
              {tr(p.client, lang)} · {p.year}
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.03em] text-balance">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug font-medium text-white/90 sm:text-3xl">{p.tagline[lang]}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 grid gap-6 border-y border-white/10 py-8 sm:grid-cols-[1fr_1fr_2fr]">
              <div>
                <dt className="font-mono text-xs text-fog uppercase">{t.role}</dt>
                <dd className="mt-2 font-medium">{tr(p.role, lang)}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-fog uppercase">{t.year}</dt>
                <dd className="mt-2 font-medium">{p.year}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-fog uppercase">{t.stack}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          {p.url && (
            <Reveal delay={0.2}>
              <a
                href={p.url}
                target="_blank"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                {t.live} ↗
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {p.metrics && (
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {p.metrics.map((m, i) => (
              <Reveal key={m.value} delay={i * 0.08} className="bg-ink p-7">
                <p className="font-display text-5xl font-extrabold tracking-tight text-[var(--accent)]">{m.value}</p>
                <p className="mt-2 text-sm text-fog">{m.label[lang]}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-6xl gap-14 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-xl leading-relaxed text-white/90 sm:text-2xl">{p.summary[lang]}</p>
          {p.team && (
            <p className="mt-8 font-mono text-sm text-fog">
              {t.with}{" "}
              {p.team.map((m) => (
                <a key={m.github} href={m.github} target="_blank" className="text-white underline decoration-[var(--accent)] underline-offset-4">
                  {m.name}
                </a>
              ))}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase">{t.highlights}</h2>
          <ol className="mt-6 space-y-4">
            {p.highlights[lang].map((h, i) => (
              <li key={h} className="flex gap-4 border-b border-white/10 pb-4">
                <span className="font-mono text-sm text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-fog">{h}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {p.flow && (
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">{t.flow}</h2>
            {!p.images && <p className="mt-5 max-w-md text-lg text-fog">{t.confidential}</p>}
          </Reveal>
          <div className="rounded-3xl border border-white/10 bg-ink-2 p-6 sm:p-10">
            <Flow steps={p.flow[lang]} color={color} />
          </div>
        </section>
      )}

      {p.images && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{t.gallery}</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {p.images.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
                <a href={p.url ?? src} target="_blank" className="block transition-transform duration-500 hover:-translate-y-1">
                  <Shot src={src} alt={`${title} — ${i + 1}`} />
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Link
          href={`/${lang}/projects/${next.slug}/`}
          className="group block rounded-[2rem] border border-white/10 bg-ink-2 p-8 transition-colors hover:border-[var(--next)] sm:p-12"
          style={{ ["--next" as string]: accents[next.accent] }}
        >
          <p className="font-mono text-sm text-fog uppercase">{t.next}</p>
          <p className="mt-3 flex items-center justify-between gap-6 font-display text-4xl font-extrabold tracking-tight transition-colors group-hover:text-[var(--next)] sm:text-6xl">
            {tr(next.title, lang)}
            <span className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45">→</span>
          </p>
        </Link>
      </section>
    </main>
  );
}
