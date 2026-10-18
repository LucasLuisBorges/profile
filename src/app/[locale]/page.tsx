import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { Counter, Reveal } from "@/components/motion";
import { CopyEmail, Impact, Journey, SectionTitle } from "@/components/sections";
import { FeaturedProject, ProjectCard } from "@/components/work";
import { accents, links, principles, skills, stats, tr, type Locale } from "@/content/site";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";

// Re-render daily so "today" in the journey durations stays current.
export const revalidate = 86400;

const band = ["AI Agents", "RAG", "LangGraph.js", "TypeScript", "React 19", "Next.js", "Node.js", "Bun", "PostgreSQL", "pgvector", "Docker", "Terraform", "AWS", "Multi-tenant", "RBAC"];

function Marquee({ items, className, reverse }: { items: string[]; className: string; reverse?: boolean }) {
  return (
    <div className={`overflow-hidden py-4 ${className}`} aria-hidden>
      <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {s} <span className="text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale: lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured && !p.archived);
  const archive = projects.filter((p) => p.archived);

  return (
    <main className="overflow-x-clip">
      <Hero />

      <div className="relative z-10 -my-4 py-10">
        <Marquee items={band} className="-rotate-2 bg-lime text-ink" />
        <Marquee items={[...band].reverse()} reverse className="-mt-6 rotate-[1.5deg] bg-pink text-ink" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label.en} className="bg-ink p-6 sm:p-8">
              <dt className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl" style={{ color: Object.values(accents)[i] }}>
                <Counter value={s.value} />
                {s.suffix}
              </dt>
              <dd className="mt-2 text-sm text-fog">{s.label[lang]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker={t("work.kicker")} title={t("work.title")} />
        <div className="space-y-8">
          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <FeaturedProject p={p} lang={lang} index={i} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-24 mb-8 font-display text-3xl font-bold tracking-tight">{t("work.more")}</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard p={p} lang={lang} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h3 className="font-display text-3xl font-bold tracking-tight">{t("work.archive")}</h3>
            <p className="font-mono text-xs text-fog">{t("work.archiveNote")}</p>
          </div>
          <ul className="mt-6 border-t border-white/10">
            {archive.map((p) => (
              <li key={p.slug} style={{ ["--accent" as string]: accents[p.accent] }}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-white/10 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[16rem_1fr_6rem_auto]"
                >
                  <span className="col-start-1 row-start-1 font-display text-lg font-bold transition-colors group-hover:text-[var(--accent)]">{tr(p.title, lang)}</span>
                  <span className="col-span-2 row-start-2 text-sm text-fog sm:col-span-1 sm:col-start-2 sm:row-start-1">{p.tagline[lang]}</span>
                  <span className="hidden font-mono text-xs text-fog sm:col-start-3 sm:row-start-1 sm:block">{p.year}</span>
                  <span className="col-start-2 row-start-1 transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)] sm:col-start-4">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="impact" className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker={t("impact.kicker")} title={t("impact.title")} />
        <Impact />
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker={t("about.kicker")} title={t("about.title")} />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto w-fit lg:mx-0">
              <div aria-hidden className="absolute -inset-1.5 animate-spin rounded-full bg-[conic-gradient(var(--color-lime),var(--color-cyan),var(--color-violet),var(--color-pink),var(--color-orange),var(--color-lime))] [animation-duration:8s]" />
              <img
                src="https://github.com/LucasLuisBorges.png"
                alt="Lucas Borges"
                width={176}
                height={176}
                className="relative size-44 rounded-full border-4 border-ink object-cover"
              />
            </div>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-fog">
              {(t.raw("about.bio") as string[]).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title.en} delay={i * 0.08}>
                <div
                  className="group h-full rounded-3xl border border-white/10 bg-ink-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]"
                  style={{ ["--accent" as string]: accents[p.accent] }}
                >
                  <span className="block h-1.5 w-10 rounded-full bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{p.title[lang]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.body[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20">
          <h3 className="mb-6 font-display text-3xl font-bold tracking-tight">{t("about.skills")}</h3>
          <div className="space-y-5">
            {skills.map((g) => (
              <div key={g.title.en} className="grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[14rem_1fr]" style={{ ["--accent" as string]: accents[g.accent] }}>
                <p className="font-mono text-sm text-[var(--accent)]">{g.title[lang]}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="cursor-default rounded-full border border-white/10 px-3.5 py-1.5 text-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="journey" className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker={t("journey.kicker")} title={t("journey.title")} />
        <Journey />
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-lime p-8 text-ink sm:p-14">
            <div aria-hidden className="animate-drift-b absolute -top-24 -right-24 size-96 rounded-full bg-cyan/60 blur-[90px]" />
            <div aria-hidden className="animate-drift-a absolute -bottom-32 -left-20 size-80 rounded-full bg-yellow/70 blur-[90px]" />
            <div className="relative">
              <p className="font-mono text-sm tracking-widest uppercase">{t("contact.kicker")}</p>
              <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight text-balance sm:text-8xl">
                {t("contact.title")}
              </h2>
              <p className="mt-6 max-w-xl text-lg font-medium">{t("contact.body")}</p>
              <a
                href={`mailto:${links.email}`}
                className="mt-10 block w-fit max-w-full font-display text-2xl font-bold break-all underline decoration-4 underline-offset-8 transition-colors hover:text-pink sm:text-4xl"
              >
                {links.email}
              </a>
              <div className="mt-10 flex flex-wrap gap-3">
                <CopyEmail />
                <a href={links.linkedin} target="_blank" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-lime transition-transform hover:-translate-y-0.5">
                  LinkedIn ↗
                </a>
                <a href={links.github} target="_blank" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-lime transition-transform hover:-translate-y-0.5">
                  GitHub ↗
                </a>
                <a href={links.cv[lang]} target="_blank" className="rounded-full border-2 border-ink px-6 py-3.5 font-semibold transition-colors hover:bg-ink hover:text-lime">
                  {t("hero.cv")} ↓
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
