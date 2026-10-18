export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export type L = Record<Locale, string>;

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
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

export const ui = {
  pt: {
    meta: {
      title: "Lucas Borges — Senior AI Engineer",
      description:
        "Senior AI Engineer com 5+ anos em Full Stack TypeScript. Agentes de IA, RAG e plataformas SaaS multi-tenant em produção.",
    },
    nav: { work: "Projetos", impact: "Impacto", about: "Sobre", journey: "Trajetória", contact: "Contato" },
    hero: {
      status: "Senior AI Engineer na Cadmus",
      prefix: "Eu construo",
      roles: [
        "agentes de IA que corrigem produção",
        "RAG para empresas inteiras",
        "SaaS multi-tenant que escala",
        "produto TypeScript de ponta a ponta",
      ],
      bio: "5+ anos em Full Stack TypeScript. Liderei a reescrita do Aura, plataforma em que agentes de IA investigam incidentes reais e abrem o Pull Request da correção — com guardrails, auditoria e 991 testes verdes.",
      work: "Ver projetos",
      cv: "Baixar CV",
      location: "Brasil · UTC−3",
      scroll: "role para baixo",
    },
    stats: [
      { value: 5, suffix: "+", label: "anos construindo produto" },
      { value: 15, suffix: "+", label: "plataformas enterprise no ar" },
      { value: 30, suffix: "K+", label: "transações por mês" },
      { value: 991, suffix: "/991", label: "testes verdes no release do Aura" },
    ],
    work: {
      kicker: "01 — Projetos",
      title: "Coisas que eu coloquei em produção",
      more: "Mais projetos",
      view: "Ver case",
    },
    impact: {
      kicker: "02 — Impacto",
      title: "Números que eu movi",
      before: "antes",
      after: "depois",
    },
    about: {
      kicker: "03 — Sobre",
      title: "Senior, na prática",
      bio: [
        "Comecei em 2021 fazendo apps React Native na Khomp, ainda na faculdade. Entre a TDBUSINESS e projetos freelance, passei quatro anos colocando no ar plataformas para Sebrae, Agência Espacial Brasileira, Sindipi e Fapesc — CRMs multi-tenant, dashboards analíticos, chatbots e automação de infraestrutura.",
        "Hoje, como Senior AI Engineer na Cadmus, trabalho onde produto, IA e segurança se encontram: agentes que mexem em código de verdade, RAG multi-tenant e a governança que deixa tudo isso rodar em produção sem susto.",
      ],
      skills: "Onde eu sou forte",
    },
    journey: { kicker: "04 — Trajetória", title: "De React Native a agentes de IA", now: "atual" },
    contact: {
      kicker: "05 — Contato",
      title: "Tem um problema difícil? Bora conversar.",
      body: "Agentes de IA, plataformas SaaS, reescritas grandes ou aquele sistema que ninguém quer encostar. Me chama.",
      copy: "Copiar e-mail",
      copied: "E-mail copiado!",
    },
    project: {
      back: "Todos os projetos",
      role: "Papel",
      client: "Cliente",
      year: "Ano",
      stack: "Stack",
      highlights: "O que eu fiz",
      flow: "Como funciona",
      confidential: "Projeto interno: as telas são confidenciais, então o fluxo abaixo resume a arquitetura.",
      gallery: "Telas",
      live: "Ver online",
      with: "Em parceria com",
      next: "Próximo projeto",
    },
    footer: "Desenhado e codado por Lucas Borges.",
    switchTo: "English",
  },
  en: {
    meta: {
      title: "Lucas Borges — Senior AI Engineer",
      description:
        "Senior AI Engineer with 5+ years of Full Stack TypeScript. AI agents, RAG and multi-tenant SaaS platforms in production.",
    },
    nav: { work: "Work", impact: "Impact", about: "About", journey: "Journey", contact: "Contact" },
    hero: {
      status: "Senior AI Engineer at Cadmus",
      prefix: "I build",
      roles: [
        "AI agents that fix production",
        "RAG for whole companies",
        "multi-tenant SaaS that scales",
        "end-to-end TypeScript products",
      ],
      bio: "5+ years of Full Stack TypeScript. I led the rewrite of Aura, a platform where AI agents investigate real incidents and open the fix Pull Request — with guardrails, audit trails and 991 green tests.",
      work: "See my work",
      cv: "Download CV",
      location: "Brazil · UTC−3",
      scroll: "scroll down",
    },
    stats: [
      { value: 5, suffix: "+", label: "years building product" },
      { value: 15, suffix: "+", label: "enterprise platforms shipped" },
      { value: 30, suffix: "K+", label: "transactions per month" },
      { value: 991, suffix: "/991", label: "green tests at Aura's release" },
    ],
    work: {
      kicker: "01 — Work",
      title: "Things I put into production",
      more: "More projects",
      view: "View case",
    },
    impact: {
      kicker: "02 — Impact",
      title: "Numbers I moved",
      before: "before",
      after: "after",
    },
    about: {
      kicker: "03 — About",
      title: "Senior, in practice",
      bio: [
        "I started in 2021 building React Native apps at Khomp while still in college. Between TDBUSINESS and freelance work, I spent four years shipping platforms for Sebrae, the Brazilian Space Agency, Sindipi and Fapesc — multi-tenant CRMs, analytics dashboards, chatbots and infrastructure automation.",
        "Today, as a Senior AI Engineer at Cadmus, I work where product, AI and security meet: agents that touch real codebases, multi-tenant RAG, and the governance that lets all of it run in production without surprises.",
      ],
      skills: "Where I'm strong",
    },
    journey: { kicker: "04 — Journey", title: "From React Native to AI agents", now: "now" },
    contact: {
      kicker: "05 — Contact",
      title: "Got a hard problem? Let's talk.",
      body: "AI agents, SaaS platforms, big rewrites, or that system nobody wants to touch. Reach out.",
      copy: "Copy email",
      copied: "Email copied!",
    },
    project: {
      back: "All projects",
      role: "Role",
      client: "Client",
      year: "Year",
      stack: "Stack",
      highlights: "What I did",
      flow: "How it works",
      confidential: "Internal project: screens are confidential, so the flow below sums up the architecture.",
      gallery: "Screens",
      live: "Visit live",
      with: "Built with",
      next: "Next project",
    },
    footer: "Designed and coded by Lucas Borges.",
    switchTo: "Português",
  },
} satisfies Record<Locale, unknown>;

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
    items: ["LangGraph.js", "Vercel AI SDK", "OpenAI", "Claude", "Codex / Claude CLI", "pgvector", "OpenWebUI", "Guardrails"],
    accent: "lime",
  },
  {
    title: { pt: "Frontend", en: "Frontend" },
    items: ["React 19", "Next.js", "TanStack", "React Native", "Tailwind CSS", "shadcn/ui", "React Flow", "Recharts"],
    accent: "pink",
  },
  {
    title: { pt: "Backend", en: "Backend" },
    items: ["Node.js", "Bun", "Hono", "oRPC", "NestJS", "Fastify", "Rust (BFF)", ".NET", "Python", "Drizzle", "Prisma", "OAuth2 / RBAC"],
    accent: "violet",
  },
  {
    title: { pt: "Dados & Cloud", en: "Data & cloud" },
    items: ["PostgreSQL", "Redis Streams", "DynamoDB", "BigQuery", "AWS", "Terraform", "Docker", "GitHub Actions", "GitLab CI"],
    accent: "cyan",
  },
  {
    title: { pt: "Qualidade", en: "Quality" },
    items: ["Vitest", "Bun test", "Jest", "Playwright", "Cypress", "TDD", "DDD", "Code review"],
    accent: "orange",
  },
];

export const impact: { label: L; how: L; before: number; after: number; beforeText: string; afterText: string; delta: string; accent: Accent }[] = [
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
    before: 1, after: 4, beforeText: "1", afterText: "3–4", delta: "4×", accent: "orange",
  },
];

export const journey: { period: L; role: L | string; company: string; body: L; badge?: L; current?: boolean; accent: Accent }[] = [
  {
    period: { pt: "mai 2026 — hoje", en: "May 2026 — now" },
    role: "Senior AI Engineer",
    company: "Cadmus",
    body: {
      pt: "Liderei a reescrita do Aura (AMS autônomo com IA) e construo o AI Hub, workspace multi-tenant de agentes e RAG.",
      en: "Led the rewrite of Aura (AI-driven autonomous AMS) and build AI Hub, a multi-tenant workspace for agents and RAG.",
    },
    badge: { pt: "Full Stack → Senior em 4 meses", en: "Full Stack → Senior in 4 months" },
    current: true,
    accent: "lime",
  },
  {
    period: { pt: "jan 2026 — mai 2026", en: "Jan 2026 — May 2026" },
    role: "Full Stack Developer",
    company: "Cadmus",
    body: {
      pt: "Plataforma de crédito integrada a QiTech e Wellhub, com validação facial e BFF em Rust.",
      en: "Credit platform integrated with QiTech and Wellhub, with facial verification and a Rust BFF.",
    },
    accent: "orange",
  },
  {
    period: { pt: "set 2022 — dez 2025", en: "Sep 2022 — Dec 2025" },
    role: "Full Stack Developer",
    company: "TDBUSINESS",
    body: {
      pt: "SaaS enterprise para 200+ usuários. Dashboards de 3,2s para 1,2s, deploy de 45 para 8 min e mentoria de 3 devs júnior.",
      en: "Enterprise SaaS for 200+ users. Dashboards from 3.2s to 1.2s, deploys from 45 to 8 min, and mentoring 3 junior devs.",
    },
    accent: "pink",
  },
  {
    period: { pt: "fev 2022 — nov 2024", en: "Feb 2022 — Nov 2024" },
    role: { pt: "Frontend / Full Stack", en: "Frontend / Full Stack" },
    company: "Freelancer",
    body: {
      pt: "Dashboards internos e aplicações web para clientes com React, Next.js e TypeScript.",
      en: "Internal dashboards and client web apps with React, Next.js and TypeScript.",
    },
    accent: "violet",
  },
  {
    period: { pt: "ago 2021 — jan 2022", en: "Aug 2021 — Jan 2022" },
    role: "Frontend Developer",
    company: "Khomp",
    body: {
      pt: "Primeiro emprego: apps mobile internos em React Native e TypeScript.",
      en: "First job: internal mobile apps with React Native and TypeScript.",
    },
    accent: "cyan",
  },
  {
    period: { pt: "2020 — 2022", en: "2020 — 2022" },
    role: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis & Development" },
    company: "Faculdade Cesusc",
    body: {
      pt: "Graduação com projetos práticos em React, Next.js, Docker e deploy em cloud.",
      en: "Degree with hands-on projects in React, Next.js, Docker and cloud deployment.",
    },
    accent: "yellow",
  },
];
