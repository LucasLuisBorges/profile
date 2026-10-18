// Site content that isn't UI copy (UI strings live in /messages for next-intl).
// Every visitor-facing string here has a `pt` and an `en` version.

import type { Locale } from "next-intl";

export type { Locale };
export type L = Record<Locale, string>;
type List = Record<Locale, string[]>;

export const tr = (v: string | L, lang: Locale) => (typeof v === "string" ? v : v[lang]);

export const links = {
  email: "lucasluisborges1205@gmail.com",
  github: "https://github.com/LucasLuisBorges",
  linkedin: "https://www.linkedin.com/in/lucasluisborges/",
  cv: { pt: "/cv/lucas-borges-cv-pt.pdf", en: "/cv/lucas-borges-cv-en.pdf" } as L,
};

export const accents = {
  lime: "#c8ff2e",
  pink: "#ff3ea5",
  violet: "#8b5cff",
  cyan: "#2ee6ff",
  orange: "#ff7a2e",
  yellow: "#ffd23f",
};
export type Accent = keyof typeof accents;

export const stats: { value: number; suffix: string; label: L }[] = [
  { value: 5, suffix: "+", label: { pt: "anos construindo produto", en: "years building product" } },
  { value: 15, suffix: "+", label: { pt: "plataformas enterprise no ar", en: "enterprise platforms shipped" } },
  { value: 30, suffix: "K+", label: { pt: "transações por mês", en: "transactions per month" } },
  { value: 991, suffix: "/991", label: { pt: "testes verdes no release do Aura", en: "green tests at Aura's release" } },
];

export const principles: { title: L; body: L; accent: Accent }[] = [
  {
    title: { pt: "Dono do problema, não do ticket", en: "I own problems, not tickets" },
    body: {
      pt: "Liderei a reescrita do Aura de .NET para um monorepo TypeScript e assinei ~75% dos commits da V2.",
      en: "Led the Aura rewrite from .NET to a TypeScript monorepo and authored ~75% of V2 commits.",
    },
    accent: "lime",
  },
  {
    title: { pt: "Qualidade é gate, não etapa", en: "Quality is a gate, not a phase" },
    body: {
      pt: "991/991 testes e 23 testes de integração do runner antes do release: 5 falhas graves pegas antes do cliente.",
      en: "991/991 tests and 23 runner integration tests before release: 5 critical issues caught before the client saw them.",
    },
    accent: "cyan",
  },
  {
    title: { pt: "IA com cinto de segurança", en: "AI with a seatbelt" },
    body: {
      pt: "Guardrails, mascaramento de segredos e dados pessoais, proteção SSRF, rate limiting e cotas de custo atômicas.",
      en: "Guardrails, secret and PII masking, SSRF protection, rate limiting and atomic AI cost quotas.",
    },
    accent: "pink",
  },
  {
    title: { pt: "Time melhor do que encontrei", en: "Leave the team better" },
    body: {
      pt: "Mentorei 3 devs júnior com code review, padrões de lint, Conventional Commits e Clean Architecture.",
      en: "Mentored 3 junior developers through code review, lint standards, Conventional Commits and Clean Architecture.",
    },
    accent: "orange",
  },
];

export const skills: { title: L; items: string[]; accent: Accent }[] = [
  {
    title: { pt: "Agentes de IA & RAG", en: "AI agents & RAG" },
    items: ["LangGraph.js", "Vercel AI SDK", "OpenAI", "Claude", "Codex / Claude CLI", "MCP servers", "OpenAI Responses API", "pgvector", "OpenWebUI", "Guardrails"],
    accent: "lime",
  },
  {
    title: { pt: "Frontend", en: "Frontend" },
    items: ["React 19", "Next.js", "TanStack", "React Native", "Tailwind CSS", "shadcn/ui", "React Flow", "Recharts"],
    accent: "pink",
  },
  {
    title: { pt: "Backend", en: "Backend" },
    items: ["Node.js", "Bun", "Hono", "oRPC", "NestJS", "Fastify", "tRPC", "Rust (BFF)", ".NET", "Python", "Drizzle", "Prisma", "Better Auth", "OAuth2 / RBAC", "Mercado Pago / Pix", "Stripe"],
    accent: "violet",
  },
  {
    title: { pt: "Dados & Cloud", en: "Data & cloud" },
    items: ["PostgreSQL", "Redis Streams", "DynamoDB", "BigQuery", "AWS", "Terraform", "Docker", "GitHub Actions", "GitLab CI", "OpenTelemetry", "Grafana"],
    accent: "cyan",
  },
  {
    title: { pt: "Arquitetura", en: "Architecture" },
    items: ["Multi-tenant", "Microsserviços", "Event-driven", "Observabilidade", "Alta disponibilidade", "DDD", "Clean Architecture"],
    accent: "yellow",
  },
  {
    title: { pt: "Qualidade", en: "Quality" },
    items: ["Vitest", "Bun test", "Jest", "Playwright", "Cypress", "Mutation testing", "TDD", "Code review"],
    accent: "orange",
  },
];

export const impact: { label: L; how: L; before: number; after: number; beforeText: string; afterText: string | L; delta: string; accent: Accent }[] = [
  {
    label: { pt: "Resposta dos dashboards analíticos", en: "Analytics dashboard response" },
    how: { pt: "Queries PostgreSQL otimizadas + cache Redis nas views de alto tráfego", en: "Tuned PostgreSQL queries + Redis caching on high-traffic views" },
    before: 3.2, after: 1.2, beforeText: "3.2s", afterText: "1.2s", delta: "−62%", accent: "lime",
  },
  {
    label: { pt: "Setup de um novo ambiente SaaS", en: "New SaaS environment setup" },
    how: { pt: "GitHub API + Neon + Vercel orquestrados por Server Actions", en: "GitHub API + Neon + Vercel orchestrated by Server Actions" },
    before: 240, after: 3, beforeText: "4h", afterText: "3min", delta: "−99%", accent: "pink",
  },
  {
    label: { pt: "Tempo de deploy", en: "Deploy time" },
    how: { pt: "Pipelines de CI/CD reescritos com GitHub Actions e Docker", en: "CI/CD pipelines rebuilt with GitHub Actions and Docker" },
    before: 45, after: 8, beforeText: "45min", afterText: "8min", delta: "−82%", accent: "cyan",
  },
  {
    label: { pt: "Releases por semana", en: "Releases per week" },
    how: { pt: "Consequência direta do pipeline mais rápido", en: "A direct result of the faster pipeline" },
    before: 1, after: 4, beforeText: "1", afterText: { pt: "3 a 4", en: "3 to 4" }, delta: "4×", accent: "orange",
  },
];

/** Single-number wins shown under the before/after bars. */
export const wins: { value: string; label: L; context: string; accent: Accent }[] = [
  { value: "47", label: { pt: "ferramentas MCP para Claude e ChatGPT", en: "MCP tools for Claude and ChatGPT" }, context: "Elencar", accent: "cyan" },
  { value: "1146", label: { pt: "testes unitários na última validação", en: "unit tests in the latest run" }, context: "Elencar", accent: "lime" },
  { value: "~75%", label: { pt: "dos commits da V2", en: "of V2 commits" }, context: "Aura", accent: "pink" },
  { value: "5", label: { pt: "falhas graves pegas antes do release", en: "critical issues caught pre-release" }, context: "Aura", accent: "orange" },
  { value: "3", label: { pt: "provedores Git integrados", en: "Git providers integrated" }, context: "GitHub · GitLab · Azure DevOps", accent: "violet" },
  { value: "20K+", label: { pt: "startups processadas via BigQuery", en: "startups processed via BigQuery" }, context: "Sebrae", accent: "yellow" },
  { value: "10K+", label: { pt: "acessos simultâneos no lançamento", en: "concurrent visitors at launch" }, context: "Startup Summit", accent: "cyan" },
  { value: "200+", label: { pt: "usuários simultâneos sem degradar", en: "concurrent users, no degradation" }, context: "TDBUSINESS", accent: "pink" },
  { value: "0", label: { pt: "vazamentos de dados entre tenants", en: "cross-tenant data leaks" }, context: "TDBUSINESS", accent: "lime" },
  { value: "3", label: { pt: "devs júnior mentorados", en: "junior devs mentored" }, context: "TDBUSINESS", accent: "orange" },
];

export type Job = {
  role: string | L;
  company: string;
  type: L;
  /** "YYYY-MM"; `end` omitted = current role. */
  start: string;
  end?: string;
  body: L;
  points?: List;
  tags: string[];
  badge?: L;
  accent: Accent;
};

export const journey: Job[] = [
  {
    role: "Senior AI Engineer",
    company: "Cadmus",
    type: { pt: "Tempo integral · Remoto", en: "Full-time · Remote" },
    start: "2026-05",
    body: {
      pt: "Liderei a reescrita do Aura (AMS autônomo com IA) e construo o AI Hub, workspace multi-tenant de agentes e RAG.",
      en: "Led the rewrite of Aura (AI-driven autonomous AMS) and build AI Hub, a multi-tenant workspace for agents and RAG.",
    },
    points: {
      pt: [
        "Reescrita do Aura de .NET para monorepo TypeScript, com ~75% dos commits da V2.",
        "Pipeline de agentes: logs → triagem por LLM → LangGraph.js → agente Codex/Claude em Docker efêmero → Draft PR.",
        "Guardrails: mascaramento de segredos e PII, proteção SSRF, rate limiting e cotas de custo de IA atômicas.",
        "Homologação com 991/991 testes e 23 testes de integração do runner em Docker.",
        "AI Hub: multi-tenancy com RBAC de 6 papéis e construtor visual de agentes no estilo n8n.",
      ],
      en: [
        "Rewrote Aura from .NET to a TypeScript monorepo, authoring ~75% of V2 commits.",
        "Agent pipeline: logs → LLM triage → LangGraph.js → Codex/Claude agent in ephemeral Docker → Draft PR.",
        "Guardrails: secret and PII masking, SSRF protection, rate limiting and atomic AI cost quotas.",
        "Release sign-off with 991/991 tests and 23 Docker runner integration tests.",
        "AI Hub: multi-tenancy with a 6-role RBAC and an n8n-style visual agent builder.",
      ],
    },
    tags: ["LangGraph.js", "Codex / Claude", "RAG", "pgvector", "Bun", "Hono", "oRPC", "Drizzle", "Redis Streams", "Docker", "Terraform"],
    badge: { pt: "Full Stack → Senior em 4 meses", en: "Full Stack → Senior in 4 months" },
    accent: "lime",
  },
  {
    role: "Full Stack Developer",
    company: "Cadmus",
    type: { pt: "Tempo integral · Remoto", en: "Full-time · Remote" },
    start: "2026-01",
    end: "2026-05",
    body: {
      pt: "Plataforma de crédito integrada a QiTech e Wellhub, com validação facial e BFF em Rust.",
      en: "Credit platform integrated with QiTech and Wellhub, with facial verification and a Rust BFF.",
    },
    points: {
      pt: [
        "Fluxo completo de cadastro, análise de crédito, parceiros, sessões e controle de status.",
        "Validação de identidade com reconhecimento facial e leitura de documentos.",
        "Serviços Backend for Frontend em Rust e testes automatizados em Jest em toda a aplicação.",
      ],
      en: [
        "Full flow for signup, credit analysis, partners, sessions and status control.",
        "Identity verification with facial recognition and document reading.",
        "Rust Backend-for-Frontend services and automated Jest tests across the app.",
      ],
    },
    tags: ["React", "Next.js", "NestJS", "PostgreSQL", "Rust", "Jest", "QiTech", "Wellhub"],
    accent: "orange",
  },
  {
    role: "Full Stack Developer",
    company: "TDBUSINESS",
    type: { pt: "Tempo integral · Remoto · Florianópolis", en: "Full-time · Remote · Florianópolis" },
    start: "2022-09",
    end: "2025-12",
    body: {
      pt: "Plataformas SaaS enterprise multi-tenant (CRM, analytics, chatbot e automações) para 200+ usuários.",
      en: "Multi-tenant enterprise SaaS (CRM, analytics, chatbot and automations) for 200+ users.",
    },
    points: {
      pt: [
        "APIs e microsserviços em Node.js integrando OpenAI, Power BI, WhatsApp Business e OAuth2.",
        "Dashboards de 3,2s para 1,2s com tuning de PostgreSQL e cache Redis.",
        "Provisionamento de ambientes de 4h para 3min com GitHub API, Neon e Vercel API.",
        "CI/CD de 45 para 8 min e de 1 para 3 a 4 releases por semana.",
        "Mentoria de 3 devs júnior, code review e padrões de engenharia.",
      ],
      en: [
        "Node.js APIs and microservices integrating OpenAI, Power BI, WhatsApp Business and OAuth2.",
        "Dashboards from 3.2s to 1.2s with PostgreSQL tuning and Redis caching.",
        "Environment provisioning from 4h to 3min with the GitHub API, Neon and the Vercel API.",
        "CI/CD from 45 to 8 min and from 1 to 3 or 4 releases per week.",
        "Mentored 3 junior devs, ran code reviews and set engineering standards.",
      ],
    },
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Node.js", "Express", "OpenAI", "Power BI", "WhatsApp API", "GitHub Actions", "Docker"],
    accent: "pink",
  },
  {
    role: { pt: "Frontend / Full Stack", en: "Frontend / Full Stack" },
    company: "Freelancer",
    type: { pt: "Autônomo · Remoto", en: "Self-employed · Remote" },
    start: "2022-02",
    end: "2024-11",
    body: {
      pt: "Dashboards internos e aplicações web para clientes com React, Next.js e TypeScript.",
      en: "Internal dashboards and client web apps with React, Next.js and TypeScript.",
    },
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    accent: "violet",
  },
  {
    role: { pt: "Desenvolvedor React Native", en: "React Native Developer" },
    company: "Khomp",
    type: { pt: "Estágio · Presencial · Florianópolis", en: "Internship · On-site · Florianópolis" },
    start: "2021-08",
    end: "2022-01",
    body: {
      pt: "Primeiro emprego: apps mobile internos em React Native e TypeScript.",
      en: "First job: internal mobile apps with React Native and TypeScript.",
    },
    points: {
      pt: ["Integração com APIs REST e autenticação de usuários.", "Interfaces responsivas e manutenção de funcionalidades internas."],
      en: ["REST API integration and user authentication.", "Responsive interfaces and upkeep of internal features."],
    },
    tags: ["React Native", "TypeScript", "REST APIs", "Auth"],
    accent: "cyan",
  },
  {
    role: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis & Development" },
    company: "Faculdade Cesusc",
    type: { pt: "Graduação", en: "Degree" },
    start: "2020-01",
    end: "2022-12",
    body: {
      pt: "Projetos práticos em React, Next.js, Docker, deploy em cloud e métodos ágeis.",
      en: "Hands-on projects in React, Next.js, Docker, cloud deployment and agile methods.",
    },
    tags: ["React", "Next.js", "Docker", "Cloud", "Scrum"],
    accent: "yellow",
  },
];

const month = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  return y * 12 + m - 1;
};

/** "mai 2026 → hoje · 6 meses", counting both end months like LinkedIn does. */
export function period(job: Job, lang: Locale, now = new Date()) {
  const fmt = (iso: string) =>
    new Date(`${iso}-01T12:00:00Z`).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }).replace(".", "").replace(" de ", " ");
  const end = job.end ? month(job.end) : now.getUTCFullYear() * 12 + now.getUTCMonth();
  const total = end - month(job.start) + 1;
  const [y, m] = [Math.floor(total / 12), total % 12];
  const words = lang === "pt" ? [["ano", "anos"], ["mês", "meses"]] : [["yr", "yrs"], ["mo", "mos"]];
  const parts = [y && `${y} ${words[0][+(y > 1)]}`, m && `${m} ${words[1][+(m > 1)]}`].filter(Boolean).join(" ");
  return `${fmt(job.start)} → ${job.end ? fmt(job.end) : lang === "pt" ? "hoje" : "now"} · ${parts}`;
}
